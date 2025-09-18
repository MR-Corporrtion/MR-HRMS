// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableContainer,
//   Paper,
//   Typography,
//   TextField,
//   IconButton,
//   Box,
//   TablePagination,
// } from '@mui/material';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import UpdateIcon from '@mui/icons-material/Update';
// import axios from 'axios';
// import {apiClient} from "../../../../config/route.config";
// import { attensta } from '@/src/assets/admin/adminicon';
// import BulkUpload from './BulkUpload';

// const AttendanceStatusPage: React.FC = () => {
//   const [attendanceData, setAttendanceData] = useState<any[]>([]);
//   const [allData, setAllData] = useState<any[]>([]);
//   const [openBulkUpload, setOpenBulkUpload] = useState(false);
//   const [username, setUsername] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');

//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Fetch data from the API
//   const fetchAttendanceData = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.get('/attendance/getall', {
//         params: {
//           username,
//           month,
//           year
//         },headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true
//       });
//       setAttendanceData(response.data);
//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   const handleFetch = async () => {
//     try {
//       const response = await apiClient.get(`/employee/getall`, {
//         withCredentials: true,
//       });
//       setAllData(response.data);
//     } catch (error) {
//       console.error('Error fetching employee details:', error);
//     }
//   };

//   // Handle Update button click
//   const handleUpdate = async () => {
//     try {
//       await apiClient.post('/attendance/sync', {}, {
//         withCredentials: true
//       });
//       await fetchAttendanceData();
//     } catch (error) {
//       console.error('Error syncing data:', error);
//     }
//   };

//   // Handle change of page
//   const handleChangePage = (event: unknown, newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   const handleBulkUploadClose = () => {
//     setOpenBulkUpload(false);
//     handleFetch(); // Refresh data after bulk upload
//   };

//   // Handle change of rows per page
//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   useEffect(() => {
//     fetchAttendanceData();
//   }, [username, month, year]);

//   return (
//     <section className="p-4 w-full main-admincontainer bg-white rounded-lg shadow-[-4px_4px_17px_0px_#6B23CA]">
//       <BulkUpload open={openBulkUpload} setOpen={setOpenBulkUpload} onClose={handleBulkUploadClose} />
//       <Typography variant="h4" component="h1" className='text-xl text-[#5A12CF] flex gap-3 font-semibold'>
//         <img src={attensta.src} alt='Attendance Icon' className="h-10" />
//         Attendance Status
//       </Typography>
//       <Box display="flex" gap={2} mb={4} alignItems="center">
//         <TextField
//           label="Username"
//           variant="outlined"
//           size="small"
//           className="hover:shadow-lg"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Month"
//           variant="outlined"
//           size="small"
//           className="hover:shadow-lg"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         />
//         <TextField
//           label="Year"
//           variant="outlined"
//           size="small"
//           className="hover:shadow-lg"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         />
//         <Box display="flex" alignItems="center" className="filter-container">
//           <div className="py-1 px-3 bg-blue-400 p-4 rounded-full hover:shadow-lg">
//             <IconButton color="primary" onClick={fetchAttendanceData}>
//               <FilterAltIcon />
//             </IconButton>
//           </div>
//           <div className="py-1 px-3 bg-yellow-300 p-4 rounded-full hover:shadow-lg">
//             <IconButton color="secondary">
//               <FilterAltOffIcon />
//             </IconButton>
//           </div>
//           <div className="py-1 px-3 bg-green-500 p-4 rounded-full hover:shadow-lg">
//             <IconButton color="success" onClick={handleUpdate}>
//               <UpdateIcon />
//             </IconButton>
//           </div>
//           <button
//               className='px-8 py-2 rounded-full bg-gradient-to-t from-[#6B23CA] to-[#F4ECFF] flex items-center justify-start gap-2 text-base font-bold capitalize shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
//               onClick={() => setOpenBulkUpload(true)}
//             >
//               <FileUploadIcon /> bulk upload
//             </button>
//         </Box>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow className="bg-gradient-to-t from-[#6B23CA] to-[#F4ECFF]">
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Emp. ID</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">First Name</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Middle Name</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Last Name</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Month</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Year</TableCell>
//               {[...Array(31)].map((_, index) => (
//                 <TableCell key={index + 1} className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">{index + 1}</TableCell>
//               ))}
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Total OT HOURs</TableCell>
//               {/*  */}
//               {/* <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Total Half Days</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Leave Taken</TableCell>

//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Total Absent Days</TableCell> */}
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Total Days</TableCell>
//               <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Absent Days</TableCell>
//               {/* <TableCell className="text-white font-bold text-xs shadow-[-4px_4px_27px_0px_#6B23CA]">Salary</TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {attendanceData.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((record: any) => (
//               <TableRow key={record.sl}>
//                 <TableCell>{record.empid}</TableCell>
//                 <TableCell>{record.employee?.first_name}</TableCell>
//                 <TableCell>{record.employee?.middle_name}</TableCell>
//                 <TableCell>{record.employee?.last_name}</TableCell>
//                 <TableCell>{record.month}</TableCell>
//                 <TableCell>{record.year}</TableCell>
//                 {[...Array(31)].map((_, index) => (
//                   <TableCell key={index + 1}>
//                     {record[`day${index + 1}`]=="1"?"P":record[`day${index + 1}`]=="0.5"?"HD":'A'}
//                   </TableCell>
//                 ))}
//                 <TableCell>{record.total_ot_hours|| 0}</TableCell>
//                 <TableCell>{record.totaldays || 0}</TableCell>
//                 <TableCell>{record.totalabsentdays || 0}</TableCell>
//                 {/* <TableCell>{record.totalhalfdays || 0}</TableCell> */}
//                 {/* <TableCell>{record.leavetaken || 0}</TableCell>
//                 <TableCell>{record.absentdayscount || 0}</TableCell>
//                  */}

//                 {/* <TableCell>{record.salary || 0}</TableCell> */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           component="div"
//           count={attendanceData.length}
//           page={currentPage}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </section>
//   );
// };

// export default AttendanceStatusPage;


'use client'

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Swal from "sweetalert2";
import {apiClient} from "../../../../config/route.config";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TextField,
  IconButton,
  Box,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Modal,
} from "@mui/material"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import UpdateIcon from "@mui/icons-material/Update"
import { attensta } from "@/src/assets/admin/adminicon"
import BulkUpload from "./BulkUpload"

interface EmployeeData {
  empid: string
  first_name: string
  middle_name: string
  last_name: string
  month: number
  year: number
  [key: string]: any
}

interface AttendanceRecord extends EmployeeData {
  total_ot_hours: number
  totaldays: number
}

export default function AttendanceManagement() {
  // State for AttendanceManagementCreate
  const [createFormData, setCreateFormData] = useState({
    empid: '',
    reason: '',
    attendance_date: '',
    clockInTime: '',
    clockOutTime: '',
  })
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false)

  // State for AttendanceStatusPage
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null)
  const [username, setUsername] = useState("")
  const [month, setMonth] = useState(moment().format("MM"))
  const [year, setYear] = useState(moment().format("YYYY"))
  const [openBulkUpload, setOpenBulkUpload] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // New state for attendance request modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  // Functions for AttendanceManagementCreate
  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateFormData({ ...createFormData, [e.target.name]: e.target.value })
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
      await apiClient.post(
        '/attendance-request/create',
        createFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      setCreateFormData({
        empid: '',
        reason: '',
        attendance_date: '',
        clockInTime: '',
        clockOutTime: '',
      })
      setIsCreateFormVisible(false)
      setIsRequestModalOpen(false)
      fetchAttendanceData()
    } catch (error) {
      console.error('Error creating attendance request:', error)
    }
  }

  const toggleCreateFormVisibility = () => {
    setIsCreateFormVisible(!isCreateFormVisible)
  }

  // Functions for AttendanceStatusPage
  const fetchAttendanceData = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      const response = await apiClient.get("/attendance/getall", {
        params: { username, month, year },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      setAttendanceData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching attendance data:", error)
    }
  }

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      await apiClient.post(
        "/attendance/sync",
        { username, month, year },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      
      await fetchAttendanceData();
  
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Data Synced",
        text: "Attendance data has been successfully updated!",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error syncing data:", error);
  
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to sync attendance data. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  const handleEmployeeClick = async (empid: string, month: number, year: number) => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      const response = await apiClient.get("/daily-attendance/getall", {
        params: { empid, month, year },
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      setSelectedEmployee(response.data.data)
    } catch (error) {
      console.error("Error fetching employee details:", error)
    }
  }

  // New function to handle day cell click
  const handleDayCellClick = (empid: string, day: number) => {
    const date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD").format("YYYY-MM-DD")
    setSelectedDate(date)
    setCreateFormData(prevState => ({
      ...prevState,
      empid,
      attendance_date: date
    }))
    setIsRequestModalOpen(true)
  }

  useEffect(() => {
    fetchAttendanceData()
  }, [])

  return (
    <section className="p-2 w-full main-admincontainer bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
      <BulkUpload open={openBulkUpload} setOpen={setOpenBulkUpload} />
      <Typography variant="h5" className="text-[#282461] flex gap-2 font-semibold mb-4">
        <img src={attensta.src} alt="Attendance Icon" className="h-8" />
        Attendance Status
      </Typography>

      {/* Create Attendance Request Form */}
      <div className="mb-8">
        {/* <button
          onClick={toggleCreateFormVisibility}
          className="bg-green-500 text-white p-2 rounded mb-4"
        >
          {isCreateFormVisible ? 'Close Form' : 'Add Attendance Request'}
        </button> */}

        {isCreateFormVisible && (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label htmlFor="empid" className="block">EMP ID</label>
              <input
                id="empid"
                name="empid"
                type="text"
                value={createFormData.empid}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="reason" className="block">Reason</label>
              <input
                id="reason"
                name="reason"
                type="text"
                value={createFormData.reason}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="attendance_date" className="block">Date</label>
              <input
                id="attendance_date"
                name="attendance_date"
                type="date"
                value={createFormData.attendance_date}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="clockInTime" className="block">Clock In Time</label>
              <input
                id="clockInTime"
                name="clockInTime"
                type="time"
                value={createFormData.clockInTime}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="clockOutTime" className="block">Clock Out Time</label>
              <input
                id="clockOutTime"
                name="clockOutTime"
                type="time"
                value={createFormData.clockOutTime}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Submit Request
            </button>
          </form>
        )}
      </div>

      {/* Attendance Status Table */}
      <Box display="flex" gap={1} mb={2} alignItems="center">
        <TextField
          label="Username"
          variant="outlined"
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: "120px" }}
        />
        <TextField
          label="Month"
          variant="outlined"
          size="small"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ width: "80px" }}
        />
        <TextField
          label="Year"
          variant="outlined"
          size="small"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ width: "80px" }}
        />
        <Box display="flex" alignItems="center">
          <IconButton color="primary" onClick={fetchAttendanceData} size="small">
            <FilterAltIcon fontSize="small" />
          </IconButton>
          <IconButton color="secondary" size="small">
            <FilterAltOffIcon fontSize="small" />
          </IconButton>
          <IconButton color="success" onClick={handleUpdate} size="small">
            <UpdateIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setOpenBulkUpload(true)} size="small">
            <FileUploadIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
          <TableRow style={{ background: "linear-gradient(to top, #ee7623, #282461)" }}>
  {[
    "Emp. ID",
    "First Name",
    "Middle Name",
    "Last Name",
    "Month",
    "Year",
    ...Array.from({ length: 31 }, (_, i) => i + 1),
    "Total OT HOURS",
    "Total Days",
    "Absent Days",
  ].map((head) => (
    <TableCell
      key={head}
      style={{
        color: "white",
        fontWeight: "bold",
        fontSize: "12px", // Tailwind's `text-xs`
      }}
    >
      {head}
    </TableCell>
  ))}
</TableRow>

          </TableHead>
          <TableBody>
            {attendanceData
              .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
              .map((record: AttendanceRecord) => {
                const totalPresentDays = Array.from({ length: 31 }, (_, index) => record[`day${index + 1}`])
                  .reduce((total, day) => total + (day == "1" ? 1 : day == "0.5" ? 0.5 : 0), 0)

                const totalDaysInMonth = 31
                const absentDays = totalDaysInMonth - totalPresentDays

                return (
                  <TableRow key={record.empid} hover>
                    <TableCell>{record.empid}</TableCell>
                    <TableCell
                      onClick={() => handleEmployeeClick(record.empid, record.month, record.year)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {record.employee?.first_name}
                    </TableCell>
                    <TableCell>{record.employee?.middle_name}</TableCell>
                    <TableCell>{record.employee?.last_name}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>{record.year}</TableCell>
                    {Array.from({ length: 31 }, (_, index) => (
                      <TableCell 
                        key={index + 1} 
                        className="cursor-pointer"
                        onClick={() => handleDayCellClick(record.empid, index + 1)}
                      >
                        {record[`day${index + 1}`] == "1"
                          ? "P"
                          : record[`day${index + 1}`] == "0.5"
                          ? "HD"
                          : "A"}
                      </TableCell>
                    ))}
                    <TableCell>{record.total_ot_hours || 0}</TableCell>
                    <TableCell>{record.totaldays || 0}</TableCell>
                    <TableCell>{absentDays}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={attendanceData.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={selectedEmployee !== null}>
        <DialogTitle>Attendance Details</DialogTitle>
        <DialogContent>
          {Array.isArray(selectedEmployee) ? (
            <div className="grid grid-cols-3 gap-4">
              {selectedEmployee.map((o: any) => (
                <div key={o.id} className="p-2 border shadow-md">
                  <Typography variant="body2" className="w-full">
                    Date: {o.attendance_date}
                  </Typography>
                  <Typography variant="body2" className="w-full">
                    In Time: {o.clock_in_time.slice(11, 19)}
                  </Typography>
                  <Typography variant="body2" className="w-full">
                    Out Time: {o.clock_out_time.slice(11, 19)}
                  </Typography>
                  <Typography variant="body2" className="w-full">
                    Time Diff.: {o.time_difference}
                  </Typography>
                  <Typography variant="body2" className="w-full">
                    Status: {o.attendance_status}
                  </Typography>
                  <Typography variant="body2" className="w-full">
                    OT Hour(s): {o.ot_hour}
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <div>No attendance data available</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedEmployee(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Modal for Attendance Request */}
      <Modal
        open={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        aria-labelledby="attendance-request-modal"
        aria-describedby="attendance-request-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="attendance-request-modal" variant="h6" component="h2" gutterBottom>
            Attendance Request
          </Typography>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label htmlFor="empid" className="block">EMP ID</label>
              <input
                id="empid"
                name="empid"
                type="text"
                value={createFormData.empid}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="reason" className="block">Reason</label>
              <input
                id="reason"
                name="reason"
                type="text"
                value={createFormData.reason}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="attendance_date" className="block">Date</label>
              <input
                id="attendance_date"
                name="attendance_date"
                type="date"
                value={createFormData.attendance_date}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="clockInTime" className="block">Clock In Time</label>
              <input
                id="clockInTime"
                name="clockInTime"
                type="time"
                value={createFormData.clockInTime}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="clockOutTime" className="block">Clock Out Time</label>
              <input
                id="clockOutTime"
                name="clockOutTime"
                type="time"
                value={createFormData.clockOutTime}
                onChange={handleCreateInputChange}
                required
                className="border p-2 w-full"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Submit Request
            </Button>
          </form>
        </Box>
      </Modal>
    </section>
  )
}

