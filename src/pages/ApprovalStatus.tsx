// components/ApprovalStatus.tsx
"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/config/route.config";
import Swal from "sweetalert2";

interface Approval {
  id: string;
  approval_type: string;
  status: string;
  approver_id?: string;
  approval_date?: string;
  comments?: string;
}

interface ApprovalStatusProps {
  employeeId: string;
  onStatusChange?: (status: string) => void;
}

export default function ApprovalStatus({ employeeId, onStatusChange }: ApprovalStatusProps) {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    fetchApprovalStatus();
    fetchUserRole();
  }, [employeeId]);

  const fetchApprovalStatus = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const response = await apiClient.get(`/approval/status/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApprovals(response.data);
      
      // Calculate overall status
      const overallStatus = calculateOverallStatus(response.data);
      onStatusChange?.(overallStatus);
    } catch (error) {
      console.error('Error fetching approval status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRole = () => {
    const role = localStorage.getItem("userRole") || "employee";
    setUserRole(role);
  };

  const calculateOverallStatus = (approvals: Approval[]) => {
    if (approvals.some(a => a.status === 'rejected')) return 'rejected';
    if (approvals.every(a => a.status === 'approved')) return 'fully_approved';
    if (approvals.some(a => a.status === 'pending')) return 'pending';
    return 'in_progress';
  };

  const handleApprove = async (approvalId: string) => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      
      await apiClient.post(`/approval/${approvalId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Approved!', 'Approval submitted successfully', 'success');
      fetchApprovalStatus();
    } catch (error) {
      Swal.fire('Error', 'Failed to approve', 'error');
    }
  };

  const handleReject = async (approvalId: string) => {
    const { value: reason } = await Swal.fire({
      title: 'Reason for rejection',
      input: 'textarea',
      inputLabel: 'Please specify the reason',
      showCancelButton: true
    });

    if (reason) {
      try {
        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        
        await apiClient.post(`/approval/${approvalId}/reject`, { comments: reason }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire('Rejected!', 'Employee has been rejected', 'success');
        fetchApprovalStatus();
      } catch (error) {
        Swal.fire('Error', 'Failed to reject', 'error');
      }
    }
  };

  const canApprove = (approvalType: string) => {
    const roleMapping: any = {
      'hr': ['hr', 'admin'],
      'branch_manager': ['branch_manager', 'admin'],
      'final': ['admin']
    };
    return roleMapping[approvalType]?.includes(userRole);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getApprovalTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'hr': 'HR Approval',
      'branch_manager': 'Branch Manager Approval',
      'final': 'Final Approval'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const overallStatus = calculateOverallStatus(approvals);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Approval Status</h3>
        <span className={`px-3 py-1 rounded text-sm font-medium ${
          overallStatus === 'fully_approved' ? 'bg-green-100 text-green-800' :
          overallStatus === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {overallStatus.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-3">
        {approvals.map((approval) => (
          <div key={approval.id} className={`p-3 border rounded-lg ${getStatusColor(approval.status)}`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{getApprovalTypeLabel(approval.approval_type)}</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  approval.status === 'approved' ? 'bg-green-200 text-green-800' :
                  approval.status === 'rejected' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {approval.status.toUpperCase()}
                </span>
              </div>
              
              {approval.status === 'pending' && canApprove(approval.approval_type) && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleApprove(approval.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(approval.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
            
            {approval.approval_date && (
              <p className="text-sm text-gray-600 mt-1">
                Approved on: {new Date(approval.approval_date).toLocaleDateString()}
              </p>
            )}
            
            {approval.comments && (
              <p className="text-sm text-gray-600 mt-1">Comments: {approval.comments}</p>
            )}
          </div>
        ))}
        
        {approvals.length === 0 && (
          <p className="text-center text-gray-500 py-4">Not submitted for approval yet</p>
        )}
      </div>
    </div>
  );
}