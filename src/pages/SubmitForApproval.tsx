// components/SubmitForApproval.tsx
"use client";

import React from 'react';
import { apiClient } from "@/config/route.config";
import Swal from "sweetalert2";

interface SubmitForApprovalProps {
  employeeId: string;
  onSubmitted: () => void;
}

export default function SubmitForApproval({ employeeId, onSubmitted }: SubmitForApprovalProps) {
  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Submit for Approval?',
      text: 'This will send the employee for HR and Branch Manager approval',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
        await apiClient.post(`/approval/submit/${employeeId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire('Submitted!', 'Employee has been sent for approval', 'success');
        onSubmitted();
      } catch (error: any) {
        Swal.fire('Error', error.response?.data?.error || 'Failed to submit for approval', 'error');
      }
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
    >
      Submit for Approval
    </button>
  );
}