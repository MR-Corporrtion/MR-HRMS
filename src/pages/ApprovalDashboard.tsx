// components/ApprovalDashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/config/route.config";
import Swal from "sweetalert2";

interface PendingApproval {
  id: string;
  empid: string;
  approval_type: string;
  status: string;
  employee: {
    empid: string;
    name: string;
    email: string;
    position: string;
    department: string;
  };
}

export default function ApprovalDashboard() {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    fetchUserRole();
    fetchPendingApprovals();
  }, []);

  const fetchUserRole = () => {
    const role = localStorage.getItem("userRole") || "employee";
    setUserRole(role);
  };

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const response = await apiClient.get("/approval/pending",{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("Pending Approvals:", response.data);
      setPendingApprovals(response.data);
    } catch (error: any) {
      console.error("Error fetching pending approvals:", error);
      if (error.response?.status !== 404) {
        Swal.fire('Error', 'Failed to load pending approvals', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickApprove = async (approvalId: string, employeeName: string) => {
    const result = await Swal.fire({
      title: 'Approve Employee?',
      text: `Are you sure you want to approve ${employeeName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve',
      confirmButtonColor: '#10b981',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        await apiClient.post(`/approval/${approvalId}/approve`, {},{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: 'Employee has been approved successfully',
          timer: 2000,
          showConfirmButton: false
        });
        fetchPendingApprovals();
      } catch (error: any) {
        Swal.fire('Error', error.response?.data?.error || 'Failed to approve', 'error');
      }
    }
  };

  const handleReject = async (approvalId: string, employeeName: string) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject Employee',
      text: `Please specify the reason for rejecting ${employeeName}`,
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter reason here...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a reason!';
        }
      }
    });

    if (reason) {
      try {
        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        await apiClient.post(`/approval/${approvalId}/reject`, { comments: reason },{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        
        Swal.fire('Rejected!', 'Employee has been rejected', 'success');
        fetchPendingApprovals();
      } catch (error: any) {
        Swal.fire('Error', error.response?.data?.error || 'Failed to reject', 'error');
      }
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

  const canTakeAction = (approvalType: string) => {
    const roleMapping: any = {
      'hr': ['hr', 'admin'],
      'branch_manager': ['branch_manager', 'admin'],
      'final': ['admin']
    };
    return roleMapping[approvalType]?.includes(userRole);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-4 rounded-lg shadow border mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Approval Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage employee approval requests
              </p>
            </div>
            <button
              onClick={fetchPendingApprovals}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {approval.employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{approval.employee.name}</h3>
                      <p className="text-gray-600">{approval.employee.position} • {approval.employee.department}</p>
                      <p className="text-sm text-gray-500">{approval.employee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {getApprovalTypeLabel(approval.approval_type)}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Employee ID: {approval.empid}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {canTakeAction(approval.approval_type) && (
                    <>
                      <button
                        onClick={() => handleQuickApprove(approval.id, approval.employee.name)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(approval.id, approval.employee.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => window.open(`/employee/${approval.empid}/joining-kit`, '_blank')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {pendingApprovals.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pending Approvals</h3>
              <p className="text-gray-500">All approval requests have been processed.</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        {pendingApprovals.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-blue-600">{pendingApprovals.length}</div>
              <div className="text-gray-600">Total Pending</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-yellow-600">
                {pendingApprovals.filter(a => a.approval_type === 'hr').length}
              </div>
              <div className="text-gray-600">HR Approvals</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="text-2xl font-bold text-purple-600">
                {pendingApprovals.filter(a => a.approval_type === 'branch_manager').length}
              </div>
              <div className="text-gray-600">Branch Manager</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}