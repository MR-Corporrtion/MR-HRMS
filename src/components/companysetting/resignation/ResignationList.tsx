import { useState, useEffect } from 'react';
import ExitInterviewForm from './AddResignationList';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { apiClient } from "../../../../config/route.config";

interface ResignationData {
  id:string;
  empid: string;
  resignation_type: string;
  resignation_reason: string;
  reason_for_leaving: string;
  wish_to_rejoin: string;
  job_satisfaction_msg: string;
  job_frustration_msg: string;
  job_policy_msg: string;
  recommend_to_other: string;
  suggestion_for_company: string;
  employee_comment: string;
  approval_status: string | number;
}

export default function ResignationPage() {
  const [open, setOpen] = useState(false);
  const [resignations, setResignations] = useState<ResignationData[]>([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentResignation, setCurrentResignation] = useState<ResignationData | null>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleApprovalConfirmation = (resignation: ResignationData, action: 'approve' | 'reject') => {
    setCurrentResignation(resignation);
    setApprovalAction(action);
    setConfirmationOpen(true);
  };

  const handleApprovalClose = () => {
    setConfirmationOpen(false);
    setCurrentResignation(null);
    setApprovalAction(null);
  };

  const fetchResignations = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/resignation/get', {
        headers: { 'Authorization': `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data.success) {
        setResignations(response.data.resignations);
      } else {
        console.error("Failed to fetch resignations:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching resignation data:", error);
    }
  };

  useEffect(() => {
    fetchResignations();
  }, []);

  const handleApproval = async () => {
    const updatedStatus = approvalAction === 'approve' ? '1' : '2';
  
    if (currentResignation) {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        
        // Use backticks for string interpolation here
        const response = await apiClient.post(`/resignation/update/${currentResignation.empid}`, {
          empid: currentResignation.empid,
          approval_status: updatedStatus,
        }, {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.data.success) {
          fetchResignations();
        } else {
          console.error("Failed to update resignation status:", response.data.msg);
        }
      } catch (error) {
        console.error("Error updating resignation status:", error);
      } finally {
        handleApprovalClose();
      }
    }
  };

  const mapApprovalStatus = (status: string | number): string => {
    switch (status) {
      case '0':
      case 0:
        return 'Pending';
      case '1':
      case 1:
        return 'Approved';
      case '2':
      case 2:
        return 'Rejected';
      default:
        return status as string;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Resignation Page</h1>
      
      <button 
        className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white px-6 py-2 rounded-lg hover:bg-blue-600" 
        onClick={handleOpen}
      >
        Add Resignation
      </button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div className="p-8">
          <ExitInterviewForm fetchResignations={fetchResignations} closeDialog={handleClose} />
          <div className="flex justify-end mt-4">
            <button 
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600" 
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>

      <h2 className="text-xl font-bold mt-10 mb-4">Resignation Data</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white">
            <th className="border border-gray-300 px-4 py-2">Emp ID</th>
            <th className="border border-gray-300 px-4 py-2">Resignation Type</th>
            <th className="border border-gray-300 px-4 py-2">Reason for Leaving</th>
           <th className="border border-gray-300 px-4 py-2">Suggestion For Company</th>
            <th className="border border-gray-300 px-4 py-2">Employee Comment</th>
            <th className="border border-gray-300 px-4 py-2">Approval Status</th>
            
          </tr>
        </thead>
        <tbody>
          {resignations.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">No resignations found.</td>
            </tr>
          ) : (
            resignations.map((resignation, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">{resignation.empid}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{resignation.resignation_type}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{resignation.reason_for_leaving}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{resignation.suggestion_for_company}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{resignation.employee_comment}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {mapApprovalStatus(resignation.approval_status)}
                  {mapApprovalStatus(resignation.approval_status) === 'Pending' && (
                    <div className="mt-2 space-x-2">
                      <Button 
                        variant="contained" 
                        color="success" 
                        onClick={() => handleApprovalConfirmation(resignation, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        onClick={() => handleApprovalConfirmation(resignation, 'reject')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Confirmation Dialog for Approve/Reject */}
      <Dialog open={confirmationOpen} onClose={handleApprovalClose}>
        <DialogTitle>Confirm {approvalAction === 'approve' ? 'Approval' : 'Rejection'}</DialogTitle>
        <DialogContent>
          Are you sure you want to {approvalAction} this resignation?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApprovalClose}>Cancel</Button>
          <Button onClick={handleApproval} color={approvalAction === 'approve' ? 'success' : 'error'}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
