// // pages/shift-applicability/index.tsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { apiClient } from "../../../../config/route.config";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import AddIcon from "@mui/icons-material/Add";
// import BulkUpload from "./BulkUpload";
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

// interface Shift {
//   sl: number;
//   empid: string;
//   shift_name: string;
//   shift_start_time: string;
//   shift_end_time: string;
//   week_start_date: string;
//   week_end_date: string;
// }

// const ShiftApplicabilityPage: React.FC = () => {
//   const [shifts, setShifts] = useState<Shift[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [file, setFile] = useState<File | null>(null);
//   const [openBulkUpload, setOpenBulkUpload] = useState(false);
//   const [openAddShift, setOpenAddShift] = useState(false);
//   const [newShift, setNewShift] = useState({
//     empid: "",
//     shift_name: "",
//     shift_start_time: "",
//     shift_end_time: "",
//     week_start_date: "",
//     week_end_date: "",
//   });

//   useEffect(() => {
//     fetchShifts();
//   }, []);

//   const fetchShifts = async () => {
//     try {
//       const token =
//         localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
//       const response = await apiClient.get("/shiftApplicability/getall", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       setShifts(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching shift data:", error);
//       setLoading(false);
//     }
//   };

//   const handleBulkUploadClose = () => {
//     setOpenBulkUpload(false);
//     fetchShifts(); // Refresh data after bulk upload
//   };

//   const handleAddShift = async () => {
//     try {
//       const token =
//         localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
//       await apiClient.post(
//         "/shiftApplicability/create",
//         newShift,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       setOpenAddShift(false);
//       setNewShift({
//         empid: "",
//         shift_name: "",
//         shift_start_time: "",
//         shift_end_time: "",
//         week_start_date: "",
//         week_end_date: "",
//       });
//       fetchShifts(); // Refresh data after adding shift
//     } catch (error) {
//       console.error("Error adding shift:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Shift Status</h1>
//       <div className="flex gap-4 mb-4">
//         <button
//           className="bg-gradient-to-r from-[#6B23CA] to-[#5F1B81] text-white py-2 px-4 rounded-full flex items-center gap-1"
//           onClick={() => setOpenBulkUpload(true)}
//         >
//           <FileUploadIcon /> Bulk Upload
//         </button>
//         <button
//           className="bg-gradient-to-r from-[#6B23CA] to-[#5F1B81] text-white py-2 px-4 rounded-full flex items-center gap-1"
//           onClick={() => setOpenAddShift(true)}
//         >
//           <AddIcon /> Add Shift
//         </button>
//       </div>

//       {/* Bulk Upload Section */}
//       <BulkUpload
//         open={openBulkUpload}
//         setOpen={setOpenBulkUpload}
//         onClose={handleBulkUploadClose}
//       />

//       {/* Add Shift Dialog */}
//       <Dialog open={openAddShift} onClose={() => setOpenAddShift(false)} fullWidth>
//         <DialogTitle>Add Shift</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Employee ID"
//             value={newShift.empid}
//             onChange={(e) =>
//               setNewShift({ ...newShift, empid: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Shift Name"
//             value={newShift.shift_name}
//             onChange={(e) =>
//               setNewShift({ ...newShift, shift_name: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Start Time"
//             type="time"
//             value={newShift.shift_start_time}
//             onChange={(e) =>
//               setNewShift({ ...newShift, shift_start_time: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="End Time"
//             type="time"
//             value={newShift.shift_end_time}
//             onChange={(e) =>
//               setNewShift({ ...newShift, shift_end_time: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Week Start Date"
//             type="date"
//             value={newShift.week_start_date}
//             onChange={(e) =>
//               setNewShift({ ...newShift, week_start_date: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Week End Date"
//             type="date"
//             value={newShift.week_end_date}
//             onChange={(e) =>
//               setNewShift({ ...newShift, week_end_date: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddShift(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddShift} color="primary" variant="contained">
//             Add Shift
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Shift Applicability Table */}
//       <h2 className="text-2xl font-semibold mb-4">Shift Applicability</h2>
//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gradient-to-t from-[#6B23CA] to-[#F4ECFF]">
//             <th className="border border-gray-300 p-2">Employee ID</th>
//             <th className="border border-gray-300 p-2">Shift Name</th>
//             <th className="border border-gray-300 p-2">Start Time</th>
//             <th className="border border-gray-300 p-2">End Time</th>
//             <th className="border border-gray-300 p-2">Week Start Date</th>
//             <th className="border border-gray-300 p-2">Week end Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={8} className="text-center p-4">
//                 Loading...
//               </td>
//             </tr>
//           ) : (
//             shifts.map((shift) => (
//               <tr key={shift.sl} className="border-t">
//                 <td className="border border-gray-300 p-2 text-center">
//                   {shift.empid}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {shift.shift_name}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {shift.shift_start_time}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {shift.shift_end_time}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {shift.week_start_date}
//                 </td>
//                 <td className="border border-gray-300 p-2 text-center">
//                   {shift.week_end_date}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShiftApplicabilityPage;

'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiClient } from "@/config/route.config";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FileUpload, Add } from "@mui/icons-material";
import BulkUpload from "./BulkUpload";

interface Shift {
  sl: number;
  empid: string;
  shift_id: string;
  shift_name: string;
  shift_start_time: string;
  shift_end_time: string;
  week_start_date: string;
  week_end_date: string;
  month: number;
  year: number;
  flag: "weekly" | "monthly" | "bimonthly";
  excludeGenShift: boolean;
}

const MergedShiftApplicability: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [openBulkUpload, setOpenBulkUpload] = useState(false);
  const [openAddShift, setOpenAddShift] = useState(false);
  const [openAddMultipleShifts, setOpenAddMultipleShifts] = useState(false);
  const [newShift, setNewShift] = useState<Shift>({
    sl: 0,
    empid: "",
    shift_id: "",
    shift_name: "",
    shift_start_time: "",
    shift_end_time: "",
    week_start_date: "",
    week_end_date: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    flag: "monthly",
    excludeGenShift: false,
  });
  const [multipleShifts, setMultipleShifts] = useState<Shift[]>([
    {
      sl: 0,
      empid: "",
      shift_id: "",
      shift_name: "",
      shift_start_time: "",
      shift_end_time: "",
      week_start_date: "",
      week_end_date: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      flag: "weekly",
      excludeGenShift: false,
    },
  ]);

  // useEffect(() => {
  //   fetchShifts();
  // }, [handleAddMultipleShifts]);

  const fetchShifts = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      const response = await apiClient.get("/shiftApplicability/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setShifts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shift data:", error);
      setLoading(false);
    }
  };

  const handleAddSingleShift = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      await apiClient.post(
        "/shiftApplicability/create",
        [newShift],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setOpenAddShift(false);
      setNewShift({
        sl: 0,
        empid: "",
        shift_id: "",
        shift_name: "",
        shift_start_time: "",
        shift_end_time: "",
        week_start_date: "",
        week_end_date: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        flag: "monthly",
        excludeGenShift: false,
      });
      fetchShifts();
    } catch (error) {
      console.error("Error adding shift:", error);
    }
  };

  const handleAddMultipleShifts = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      await apiClient.post("/shiftApplicability/create-combined", multipleShifts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setOpenAddMultipleShifts(false);
      setMultipleShifts([
        {
          sl: 0,
          empid: "",
          shift_id: "",
          shift_name: "",
          shift_start_time: "",
          shift_end_time: "",
          week_start_date: "",
          week_end_date: "",
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          flag: "weekly",
          excludeGenShift: false,
        },
      ]);
      fetchShifts();
    } catch (error) {
      console.error("Error adding multiple shifts:", error);
    }
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    const newMultipleShifts = [...multipleShifts];
    newMultipleShifts[index] = {
      ...newMultipleShifts[index],
      [name as string]: name === "excludeGenShift" ? value === "yes" : value,
    };
    setMultipleShifts(newMultipleShifts);
  };

  const addNewRow = () => {
    setMultipleShifts([
      ...multipleShifts,
      {
        sl: 0,
        empid: "",
        shift_id: "",
        shift_name: "",
        shift_start_time: "",
        shift_end_time: "",
        week_start_date: "",
        week_end_date: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        flag: "weekly",
        excludeGenShift: false,
      },
    ]);
  };

  const removeRow = (index: number) => {
    const newMultipleShifts = multipleShifts.filter((_, i) => i !== index);
    setMultipleShifts(newMultipleShifts);
  };
  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#282461]">Shift Applicability</h1>
      <div className="flex gap-4 mb-4">
        <button
          className=" bg-gradient-to-t from-[#ee7623] to-[#282461] text-white py-2 px-4 rounded-full flex items-center gap-1"
          onClick={() => setOpenBulkUpload(true)}
        >
          <FileUpload /> Bulk Upload
        </button>
        <button
          className=" bg-gradient-to-t from-[#ee7623] to-[#282461] text-white py-2 px-4 rounded-full flex items-center gap-1"
          onClick={() => setOpenAddShift(true)}
        >
          <Add /> Add Monthly Shift
        </button>
        <button
          className=" bg-gradient-to-t from-[#ee7623] to-[#282461] text-white py-2 px-4 rounded-full flex items-center gap-1"
          onClick={() => setOpenAddMultipleShifts(true)}
        >
          <Add /> Add Multiple Shifts
        </button>
      </div>

      <BulkUpload
        open={openBulkUpload}
        setOpen={setOpenBulkUpload}
        onClose={() => {
          setOpenBulkUpload(false);
          fetchShifts();
        }}
      />

      <Dialog open={openAddShift} onClose={() => setOpenAddShift(false)} fullWidth>
        <DialogTitle>Add Single Shift</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee ID"
            value={newShift.empid}
            onChange={(e) => setNewShift({ ...newShift, empid: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Shift ID"
            value={newShift.shift_id}
            onChange={(e) => setNewShift({ ...newShift, shift_id: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Shift Name"
            value={newShift.shift_name}
            onChange={(e) => setNewShift({ ...newShift, shift_name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Month"
            type="number"
            value={newShift.month}
            onChange={(e) => setNewShift({ ...newShift, month: parseInt(e.target.value) })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Year"
            type="number"
            value={newShift.year}
            onChange={(e) => setNewShift({ ...newShift, year: parseInt(e.target.value) })}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Flag</InputLabel>
            <Select
              value={newShift.flag}
              onChange={(e) => setNewShift({ ...newShift, flag: e.target.value as "weekly" | "monthly" | "bimonthly" })}
            >
              {/* <MenuItem value="weekly">Weekly</MenuItem> */}
              <MenuItem value="monthly">Monthly</MenuItem>
              {/* <MenuItem value="bimonthly">Bi-Monthly</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Exclude General Shift</InputLabel>
            <Select
              value={newShift.excludeGenShift ? "yes" : "no"}
              onChange={(e) => setNewShift({ ...newShift, excludeGenShift: e.target.value === "yes" })}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddShift(false)} className="bg-gradient-to-t from-[#282461] to-[#ee7623] text-white">
            Cancel
          </Button>
          <Button onClick={handleAddSingleShift} className="bg-gradient-to-t from-[#282461] to-[#ee7623]" variant="contained">
            Add Shift
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddMultipleShifts} onClose={() => setOpenAddMultipleShifts(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Weekly Shifts</DialogTitle>
        <DialogContent>
          {multipleShifts.map((shift, index) => (
            <div key={index} className="border p-4 mb-4 rounded bg-white shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Employee ID"
                  name="empid"
                  value={shift.empid}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Shift ID"
                  name="shift_id"
                  value={shift.shift_id}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Shift Name"
                  name="shift_name"
                  value={shift.shift_name}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Month"
                  name="month"
                  type="number"
                  value={shift.month}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  label="Year"
                  name="year"
                  type="number"
                  value={shift.year}
                  onChange={(e) => handleInputChange(index, e)}
                  fullWidth
                  margin="dense"
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Flag</InputLabel>
                  <Select
                    name="flag"
                    value={shift.flag}
                    onChange={(e:any) => handleInputChange(index, e)}
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    {/* <MenuItem value="monthly">Monthly</MenuItem> */}
                    {/* <MenuItem value="bimonthly">Bi-Monthly</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Exclude General Shift</InputLabel>
                  <Select
                    name="excludeGenShift"
                    value={shift.excludeGenShift ? "yes" : "no"}
                    onChange={(e:any) => handleInputChange(index, e)}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => removeRow(index)}
                  className="bg-gradient-to-t from-[#282461] to-[#ee7623]"
                  variant="contained"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            onClick={addNewRow}
            className="bg-gradient-to-t from-[#282461] to-[#ee7623]"
            variant="contained"
            fullWidth
          >
            Add Row
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddMultipleShifts(false)} className="bg-gradient-to-t from-[#282461] to-[#ee7623] text-white">
            Cancel
          </Button>
          <Button onClick={handleAddMultipleShifts} className="bg-gradient-to-t from-[#282461] to-[#ee7623]" variant="contained">
            Add Multiple Shifts
          </Button>
        </DialogActions>
      </Dialog>

      <h2 className="text-2xl font-semibold mb-4">Shift Applicability Table</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white">
            <th className="border border-gray-300 p-2">Employee ID</th>
            <th className="border border-gray-300 p-2">Shift Name</th>
            <th className="border border-gray-300 p-2">Start Time</th>
            <th className="border border-gray-300 p-2">End Time</th>
            <th className="border border-gray-300 p-2">Week Start Date</th>
            <th className="border border-gray-300 p-2">Week End Date</th>
            <th className="border border-gray-300 p-2">Month</th>
            <th className="border border-gray-300 p-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            shifts.map((shift) => (
              <tr key={shift.sl} className="border-t">
                <td className="border border-gray-300 p-2 text-center">{shift.empid}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.shift_name}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.shift_start_time}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.shift_end_time}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.week_start_date}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.week_end_date}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.month}</td>
                <td className="border border-gray-300 p-2 text-center">{shift.year}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MergedShiftApplicability;

