import { useState, useEffect } from "react";
import axios from "axios";
import { apiClient } from "../../../../config/route.config";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import BulkUpload from "../../companysetting/leavepolicy/BulkUpload";

const LeavePolicyPage = () => {
  const [policyName, setPolicyName] = useState("");
  const [empid, setEmpid] = useState("");
  const [leaveBalance, setLeaveBalance] = useState<{ [key: string]: number }>(
    {}
  );
  const [newLeaveType, setNewLeaveType] = useState("");
  const [newLeaveValue, setNewLeaveValue] = useState<number | "">("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leavePolicies, setLeavePolicies] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLeavePolicies = async () => {
      try {
        const token =
          localStorage.getItem("accessToken") ||
          sessionStorage.getItem("accessToken");
        const response = await apiClient.get(`/leavepolicy/getall`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setLeavePolicies(response.data);
      } catch (error) {
        console.error("Error fetching leave policies:", error);
      }
    };

    fetchLeavePolicies();
  }, []);

  // Function to auto-update leave balance
  const autoUpdateLeaveBalance = async () => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.post(
        "/leavepolicy/sync-app",
        {
          fiscal_year: new Date().getFullYear(),
          policyName: "leave",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage(response.data.msg);
        // Optionally refetch policies to show updated balances
        const updatedPolicies = await apiClient.get(`/leavepolicy/getall`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        setLeavePolicies(updatedPolicies.data);
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      console.error("Error updating leave balance:", error);
      setMessage("Error updating leave balance.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("policyName", policyName);
    formData.append("empid", empid);
    formData.append("leave_balance", JSON.stringify(leaveBalance));

    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.post(`/leavepolicy/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setMessage(response.data.msg);
      setLeavePolicies((prev) => [...prev, response.data.newPolicy]);
      setPolicyName("");
      setEmpid("");
      setLeaveBalance({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating leave policy:", error);
      setMessage("Error creating leave policy.");
    }
  };

  const handleAddNewLeaveType = () => {
    if (newLeaveType && newLeaveValue !== "") {
      setLeaveBalance((prevBalance) => ({
        ...prevBalance,
        [newLeaveType]: newLeaveValue,
      }));
      setNewLeaveType("");
      setNewLeaveValue("");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto p-4">
      <BulkUpload open={open} setOpen={setOpen} />
      <div className="flex justify-end mb-4 gap-4">
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Add Leave Policy
        </button>
        <button
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
          onClick={() => {
            setOpen(true);
          }}
        >
          Bulk Upload
        </button>
        <button
          onClick={autoUpdateLeaveBalance}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 transition"
        >
          Auto Update Leave Balance
        </button>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create Leave Policy</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="policyName" className="block text-sm font-medium">
                Policy Name
              </label>
              <input
                type="text"
                id="policyName"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="empid" className="block text-sm font-medium">
                Employee ID
              </label>
              <input
                type="text"
                id="empid"
                value={empid}
                onChange={(e) => setEmpid(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                required
              />
            </div>

            <h3 className="text-lg font-semibold mb-4">Leave Types</h3>
            {Object.keys(leaveBalance).map((leaveType) => (
              <div key={leaveType} className="mb-2 flex items-center">
                <label className="w-1/4 text-sm">{leaveType}:</label>
                <input
                  type="number"
                  value={leaveBalance[leaveType]}
                  onChange={(e) =>
                    setLeaveBalance({
                      ...leaveBalance,
                      [leaveType]: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>
            ))}

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Add New Leave Type</h4>
              <div className="flex gap-4">
                <select
                  value={newLeaveType}
                  onChange={(e) => setNewLeaveType(e.target.value)}
                  className="w-1/2 px-3 py-2 border rounded-md shadow-sm"
                >
                  <option value="">Select Leave</option>
                  {/* Leave type options */}
                  {[
                    "PL",
                    "EL",
                    "CL",
                    "SL",
                    "PRL",
                    "PDL",
                    "ML",
                    "PTL",
                    "AL",
                    "MRL",
                    "BL",
                    "C-OFF",
                    "LOP",
                    "LWP",
                    "SBL",
                    "HDL",
                    "PH",
                    "STL",
                    "VL",
                    "PLV",
                    "UL",
                    "CML",
                    "HL",
                    "JDL",
                    "CSL",
                    "BL",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Value (e.g., 5)"
                  value={newLeaveValue}
                  onChange={(e) =>
                    setNewLeaveValue(parseInt(e.target.value) || "")
                  }
                  className="w-1/2 px-3 py-2 border rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleAddNewLeaveType}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            {message && <p className="mt-4 text-green-500">{message}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleCloseModal}
            className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Leave Policies</h2>
        {/* Leave Policies Table */}
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white">
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">
                Leave Balance
              </th>
              <th className="border border-gray-300 px-4 py-2">Policy Name</th>
            </tr>
          </thead>
          <tbody>
            {leavePolicies.map((policy, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {policy.empid}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  {policy.leave_balance ? JSON.stringify(policy.leave_balance) : 'N/A'}
                </td> */}

                <td className="border border-gray-300 px-4 py-2">
                  EL: {policy.leave_balance?.EL || "N/A"} <br />
                  SL: {policy.leave_balance?.SL || "N/A"} <br />
                  CL: {policy.leave_balance?.CL || "N/A"}
                </td>

                {/* <td className="border border-gray-300 px-4 py-2">
                  EL:{policy.leave_balance ? JSON.stringify(policy.leave_balance.EL) : ""} <br/>
                  SL:{policy.leave_balance ?  JSON.stringify(policy.leave_balance.SL) : ""}
                </td> */}

                <td className="border border-gray-300 px-4 py-2">
                  {policy.policyName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeavePolicyPage;
