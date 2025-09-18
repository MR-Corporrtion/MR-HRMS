// export default LeaveManagement;
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { apiClient } from '../../../../config/route.config';

interface Leave {
  
  empid: string;
  leave_date: string;
  leave_type: string;
  leavename: string;
  companyid: string;
  approval_status: string; // Keep this as a string to match your API response
}

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [newLeave, setNewLeave] = useState<Leave>({
    empid: '',
    leave_date: '',
    leave_type: '',
    leavename: '',
    companyid: '',
    approval_status: '0', // Default status as "Pending"
  });
  const [editLeaveId, setEditLeaveId] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get('/leave/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };
    fetchLeaves();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewLeave({ ...newLeave, [name]: value });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLeave({ ...newLeave, [name]: value });
  };

  const handleAddLeave = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post(`/leave/create-leave`, newLeave, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      // Add the new leave to the list
      setLeaves([...leaves, response.data]);
  
      // Reset the form
      resetNewLeave();
  
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Leave Added',
        text: 'The leave has been successfully added!',
        timer: 2000, // Auto close after 2 seconds
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error adding leave:', error);
  
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error adding the leave. Please try again.',
      });
    }
  };

  // const handleEditLeave = async (empid: string) => {
  //   try {
  //     const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  //     const response = await apiClient.put(`/leave/update/${empid}`, newLeave, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     });
  //     setLeaves(leaves.map((leave) => (leave.empid == empid ? { ...leave, ...response.data } : leave)));
  //     resetEdit();
  //     handleCloseDialog();
  //   } catch (error) {
  //     console.error('Error updating leave:', error);
  //   }
  // };


  const handleEditLeave = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.put(`/leave/update/${empid}`, newLeave, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      // Update the leaves list with the edited leave
      setLeaves(leaves.map((leave) => (leave.empid === empid ? { ...leave, ...response.data } : leave)));
  
      // Reset the edit form and close the dialog
      resetEdit();
      handleCloseDialog();
  
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Leave Updated',
        text: 'The leave has been successfully updated!',
        timer: 2000, // Auto close after 2 seconds
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error updating leave:', error);
  
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Not enough leave balance for AL. Please contact HR.',
      });
    }
  };
  const handleDeleteLeave = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete(`/leave/${empid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setLeaves(leaves.filter((leave) => leave.empid !== empid));
    } catch (error) {
      console.error('Error deleting leave:', error);
    }
  };

  const resetNewLeave = () => {
    setNewLeave({ empid: '', leave_date: '', leave_type: '', leavename: '', companyid: '', approval_status: '0' });
  };

  const resetEdit = () => {
    setEditLeaveId(null);
    resetNewLeave();
  };

  const handleOpenDialog = (leave: Leave) => {
    setNewLeave(leave);
    setEditLeaveId(leave.empid);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetEdit();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Leave Application</h1>
      <div className="mb-4">
        {/* Input Fields */}
        <input
          name="empid"
          value={newLeave.empid}
          onChange={handleInputChange}
          placeholder="Employee ID"
          className="border p-2 mr-2"
        />
        <input
          name="leave_date"
          type="date"
          value={newLeave.leave_date}
          onChange={handleInputChange}
          className="border p-2 mr-2"
        />
        <select
          name="leave_type"
          value={newLeave.leave_type}
          onChange={handleSelectChange}
          className="border p-2 mr-2"
        >
          {/* Add more leave types here */}
          <option value="">Select Leave Type</option>
          <option value="PL">Privilege Leave</option>
          <option value="EL">Earned Leave</option>
          <option value="CL">Casual Leave</option>
          <option value="SL">Sick Leave</option>
          <option value="PRL">Personal Leave</option>
          <option value="PDL">Paid Leave</option>
          <option value="ML">Maternity Leave</option>
          <option value="PTL">Paternity Leave</option>
          <option value="AL">Adoption Leave</option>
          <option value="MRL">Marriage Leave</option>
          <option value="BL">Bereavement Leave</option>
          <option value="C-OFF">Compensatory Off</option>
          <option value="LOP">Loss of Pay</option>
          <option value="LWP">Leave Without Pay</option>
          <option value="SBL">Sabbatical Leave</option>
          <option value="HDL">Half-day Leave</option>
          <option value="PH">Public Holidays</option>
          {/* <option value="MLV">Menstruation Leave</option> */}
          <option value="STL">Study Leave</option>
          <option value="VL">Volunteer Leave</option>
          <option value="PLV">Parental Leave</option>
          <option value="UL">Unpaid Leav</option>
          <option value="CML">Compassionate Leave</option>
          <option value="HL">Health Leave</option>
          <option value="JDL">Jury Duty Leave</option>
          <option value="CSL">Community Service Leave</option>
          <option value="EL">Community Service Leave</option>
          <option value="BL">Birthday Leave</option>
        </select>
        {/* <input
          name="leavename"
          value={newLeave.leavename}
          onChange={handleInputChange}
          placeholder="Leave Name"
          className="border p-2 mr-2"
        /> */}
        <button
          onClick={editLeaveId ? () => handleEditLeave(editLeaveId) : handleAddLeave}
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white p-2"
        >
          {editLeaveId ? 'Update Leave' : 'Add Leave'}
        </button>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white">
            <th className="py-2 px-4 border">Employee ID</th>
            <th className="py-2 px-4 border">Leave Date</th>
            <th className="py-2 px-4 border">Leave Type</th>
            <th className="py-2 px-4 border">Leave Name</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.empid}>
              <td className="py-2 px-4 border text-center">{leave.empid}</td>
              <td className="py-2 px-4 border text-center">{leave.leave_date}</td>
              <td className="py-2 px-4 border text-center">{leave.leave_type}</td>
              <td className="py-2 px-4 border text-center">{leave.leavename}</td>
              <td className="py-2 px-4 border text-center">
                {leave.approval_status == '0'
                  ? 'Pending'
                  : leave.approval_status == '1'
                  ? 'Approved'
                  : 'Rejected'}
              </td>
              <td className="py-2 px-4 border flex space-x-2">
                <button
                  onClick={() => handleOpenDialog(leave)}
                  className="text-yellow-500"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDeleteLeave(leave.empid)}
                  className="text-red-500"
                >
                  <DeleteOutlineIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Leave Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Leave</DialogTitle>
        <DialogContent>
          <TextField
            label="Leave Date"
            name="leave_date"
            type="date"
            value={newLeave.leave_date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Leave Type"
            name="leave_type"
            value={newLeave.leave_type}
            onChange={handleInputChange}
            select
            fullWidth
            margin="normal"
          >
            {/* Add options for different leave types */}
            <MenuItem value="">Select Leave Type</MenuItem>
  <MenuItem value="PL">Privilege Leave</MenuItem>
  <MenuItem value="EL">Earned Leave</MenuItem>
  <MenuItem value="CL">Casual Leave</MenuItem>
  <MenuItem value="SL">Sick Leave</MenuItem>
  <MenuItem value="PRL">Personal Leave</MenuItem>
  <MenuItem value="PDL">Paid Leave</MenuItem>
  <MenuItem value="ML">Maternity Leave</MenuItem>
  <MenuItem value="PTL">Paternity Leave</MenuItem>
  <MenuItem value="AL">Adoption Leave</MenuItem>
  <MenuItem value="MRL">Marriage Leave</MenuItem>
  <MenuItem value="BL">Bereavement Leave</MenuItem>
  <MenuItem value="C-OFF">Compensatory Off</MenuItem>
  <MenuItem value="LOP">Loss of Pay</MenuItem>
  <MenuItem value="LWP">Leave Without Pay</MenuItem>
  <MenuItem value="SBL">Sabbatical Leave</MenuItem>
  <MenuItem value="HDL">Half-day Leave</MenuItem>
  <MenuItem value="PH">Public Holidays</MenuItem>
  {/* <MenuItem value="MLV">Menstruation Leave</MenuItem> */}
  <MenuItem value="STL">Study Leave</MenuItem>
  <MenuItem value="VL">Volunteer Leave</MenuItem>
  <MenuItem value="PLV">Parental Leave</MenuItem>
  <MenuItem value="UL">Unpaid Leave</MenuItem>
  <MenuItem value="CML">Compassionate Leave</MenuItem>
  <MenuItem value="HL">Health Leave</MenuItem>
  <MenuItem value="JDL">Jury Duty Leave</MenuItem>
  <MenuItem value="CSL">Community Service Leave</MenuItem>
  <MenuItem value="BL">Birthday Leave</MenuItem>
          </TextField>
          <TextField
            label="Approval Status"
            name="approval_status"
            value={newLeave.approval_status}
            onChange={handleInputChange}
            select
            fullWidth
            margin="normal"
          >
            <MenuItem value="0">Pending</MenuItem>
            <MenuItem value="1">Approved</MenuItem>
            <MenuItem value="2">Rejected</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={editLeaveId ? () => handleEditLeave(editLeaveId) : handleAddLeave}
            color="primary"
            variant="contained"
          >
            {editLeaveId ? 'Update Leave' : 'Add Leave'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LeaveManagement;

