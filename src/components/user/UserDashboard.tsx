import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "@/config/route.config";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

type Leave = {
  sl: string;
  empid: string;
  leave_date: string;
  leave_date_from: string;
  leave_date_to: string;
  leave_type: string;
  leave_reason: string;
  status: string;
};

const Dashboard: React.FC = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Leave, "sl" | "status">>({
    empid: "",
    leave_date: "",
    leave_date_from: "",
    leave_date_to: "",
    leave_type: "",
    leave_reason: "",
  });

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const response = await apiClient.get(`/leave/mapped`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = async (empid: string, approval_status: string) => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const leaveDate = leaves.find((leave) => leave.empid === empid)?.leave_date;
      if (!leaveDate) throw new Error("Leave date not found!");

      // Update leave status in the backend
      await apiClient.put(
        `/leave/mapped/${empid}`,
        {
          leave_date: leaveDate,
          approval_status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Update status in the UI without re-fetching from backend
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) =>
          leave.empid === empid ? { ...leave, status: approval_status === "1" ? "Approved" : "Rejected" } : leave
        )
      );
    } catch (error) {
      console.error(`Error updating leave status to ${approval_status}:`, error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      await apiClient.post(`/leave/mapped`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchLeaves();
      setFormData({
        empid: "",
        leave_date: "",
        leave_date_from: "",
        leave_date_to: "",
        leave_type: "",
        leave_reason: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding leave:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee Leave Management</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Leave
      </Button>

      {/* Add Leave Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Leave</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="empid"
                placeholder="Employee ID"
                value={formData.empid}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="date"
                name="leave_date"
                value={formData.leave_date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                name="leave_date_from"
                value={formData.leave_date_from}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                name="leave_date_to"
                value={formData.leave_date_to}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <select
                name="leave_type"
                value={formData.leave_type}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="SICK">Sick Leave</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="ANNUAL">Annual Leave</option>
              </select>
              <input
                type="text"
                name="leave_reason"
                placeholder="Leave Reason"
                value={formData.leave_reason}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Leaves Table */}
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Leave Date</th>
            <th className="border px-4 py-2">Leave Type</th>
            <th className="border px-4 py-2">Leave Reason</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.sl}>
              <td className="border px-4 py-2">{leave.empid}</td>
              <td className="border px-4 py-2">{leave.leave_date}</td>
              <td className="border px-4 py-2">{leave.leave_type}</td>
              <td className="border px-4 py-2">{leave.leave_reason}</td>
              <td className="border px-4 py-2">{leave.status}</td>
              <td className="border px-4 py-2">
                {leave.status === "Approved" || leave.status === "Rejected" ? (
                  <span className="text-green-500">{leave.status}</span>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(leave.empid, "1")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleApprove(leave.empid, "3")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
