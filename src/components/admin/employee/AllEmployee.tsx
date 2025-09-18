// import React, { useEffect, useState } from 'react';
// import PeopleIcon from '@mui/icons-material/People';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useRouter } from 'next/router';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TablePagination,
// } from '@mui/material';
// import BulkUpload from './BulkUpload';
// import axios from 'axios';
// import {apiClient} from "../../../../config/route.config";
// import Swal from 'sweetalert2';
// import { empl } from '@/src/assets/admin/adminicon';
// import EditEmployeeForm from './EditEmployeeForm';

// export default function AllEmployee() {
//   const [openBulkUpload, setOpenBulkUpload] = useState(false);
//   const [openEditForm, setOpenEditForm] = useState(false);
//   const [editEmployeeId, setEditEmployeeId] = useState<any>(null);
//   const [allData, setAllData] = useState<any[]>([]);
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [empIdFilter, setEmpIdFilter] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const router = useRouter();

//   const handleFetch = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.get(`/employee/getall`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       setAllData(response.data);
//       setFilteredData(response.data);
//     } catch (error) {
//       console.error('Error fetching employee details:', error);
//     }
//   };

//   useEffect(() => {
//     handleFetch();
//   },[]);

//   const handleDelete = async (id: number) => {
//     try {
//       await apiClient.delete(`/employee/delete/${id}`, {
//         withCredentials: true,
//       });
//       setAllData(allData.filter((item) => item.sl !== id));
//       setFilteredData(filteredData.filter((item) => item.sl !== id));
//       Swal.fire({
//         icon: 'success',
//         title: 'Employee deleted successfully!',
//         showConfirmButton: false,
//         timer: 1700
//       });
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to delete employee',
//       });
//     }
//   };

//   const handleEditClick = (empid: string) => {
//     setEditEmployeeId(empid);
//     setOpenEditForm(true);
//   };

//   const handleCloseEditForm = () => {
//     setOpenEditForm(false);
//     setEditEmployeeId(null);
//   };

//   const handleBulkUploadClose = () => {
//     setOpenBulkUpload(false);
//     handleFetch(); // Refresh data after bulk upload
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmpIdFilter(e.target.value);
//     const filteredData = allData.filter((item) =>
//       item.empid.toString().includes(e.target.value)
//     );
//     setFilteredData(filteredData);
//     setPage(0); // Reset to first page on filter change
//   };

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page on rows per page change
//   };

//   return (
//     <section className='w-full main-containerAdmin flex flex-col items-start justify-start gap-6'>
//       <BulkUpload open={openBulkUpload} setOpen={setOpenBulkUpload} onClose={handleBulkUploadClose} />
//       <EditEmployeeForm open={openEditForm} handleClose={handleCloseEditForm} employeeId={editEmployeeId!} />
//       <div className='w-full flex flex-col gap-8'>
//         <span className='flex items-center justify-start'>
//           <p className='text-xl text-[#5A12CF] flex gap-3 font-semibold '>
//             <img src={empl.src} alt='' className='h-6' />Employees
//           </p>
//         </span>
//         <div className='w-full flex items-center justify-between '>
//           <div className='w-full flex items-center justify-start gap-8'>
//             <input
//               type='text'
//               placeholder='Employee Id'
//               value={empIdFilter}
//               onChange={handleFilterChange}
//               className='border-none pl-6 focus:outline-none w-64 py-2 rounded-full bg-gradient-to-t text-black from-[#6B23CA] to-[#F4ECFF]'
//             />
//             <span className='p-2 rounded-full center bg-gradient-to-t from-[#5F1B81] to-[#5A12CF]'>
//               <FilterAltIcon className='!text-white !text-2xl' />
//             </span>
//           </div>
//           <div className='w-full flex items-center justify-start gap-8'>
//             <button
//               className='px-8 py-2 rounded-full bg-gradient-to-t from-[#6B23CA] to-[#F4ECFF] flex items-center justify-start gap-2 text-base font-bold capitalize shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
//               onClick={() => setOpenBulkUpload(true)}
//             >
//               <FileUploadIcon /> bulk upload
//             </button>
//             <button
//               className='px-8 py-2 rounded-full bg-gradient-to-t from-[#5F1B81] to-[#5A12CF] flex items-center justify-start gap-2 text-base font-bold capitalize text-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
//               onClick={() => router.push('/addEmployee')}
//             >
//               add employee
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className='w-full shadow-[-4px_4px_27px_0px_#6B23CA]'>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow className='bg-gradient-to-t from-[#6B23CA] to-[#F4ECFF] w-full h-3'>
//                 <TableCell className='text-white font-bold text-xs text-center'>Emp ID</TableCell>
//                 <TableCell className='text-white font-bold text-xs text-center'>Name</TableCell>
//                 {/* <TableCell className='text-white font-bold text-xs text-center'>Phone Number</TableCell>
//                 <TableCell className='text-white font-bold text-xs text-center'>Email ID</TableCell> */}
//                 <TableCell className='text-white font-bold text-xs text-center'>BloodGroup</TableCell>
//                 <TableCell className='text-white font-bold text-xs text-center'>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((item: any) => (
//                   <TableRow key={item.sl}>
//                     <TableCell className='text-black font-bold text-center'>{item.empid}</TableCell>
//                     <TableCell className='text-black font-bold text-center'>{item.first_name} {item.last_name}</TableCell>
//                     {/* <TableCell className='text-black font-bold text-center'>{item.phone_number}</TableCell>
//                     <TableCell className='text-black font-bold text-center'>{item.email}</TableCell> */}
//                     <TableCell className='text-black font-bold text-center'>{item.blood_group}</TableCell>
//                     <TableCell className='text-white font-bold flex gap-2 justify-center'>
//                       <IconButton
//                         className='px-2 py-1 rounded-full bg-white'
//                         onClick={() => handleEditClick(item.sl)}
//                       >
//                         <EditIcon className='!text-blue-500' />
//                       </IconButton>
//                       <IconButton
//                         className='px-2 py-1 rounded-full bg-white'
//                         onClick={() => handleDelete(item.sl)}
//                       >
//                         <DeleteIcon className='!text-red-500' />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircle from '@mui/icons-material/CheckCircle';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import Cancel from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';
import {
  IconButton,
  TablePagination,
  Paper,
  Dialog,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import BulkUpload from './BulkUpload';
import { apiBaseURL, apiClient } from "@/config/route.config";
import Swal from 'sweetalert2';
import { empl } from '@/src/assets/admin/adminicon';
import EditEmployeeForm from './EditEmployeeForm';
import NewJoineeKit from '../../subcompany/NewJoineeKit';

export default function AllEmployee() {
  const [openBulkUpload, setOpenBulkUpload] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openNewJoineeKit, setOpenNewJoineeKit] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState<string | null>(null);
  const [allData, setAllData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [empIdFilter, setEmpIdFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [statusData, setStatusData] = useState<{ presentEmployees: any[]; absentEmployees: any[] } | null>(null)
  const router = useRouter();

  const handleFetch = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/employee/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const data = response.data.data;
      console.log(response.data.data)
      setAllData(Array.isArray(data) ? data : []);
      setFilteredData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleDelete = async (sl: number) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete(`/employee/delete/${sl}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setAllData(allData.filter((item:(any)) => item.sl !== sl));
      setFilteredData(filteredData.filter((item:(any)) => item.sl !== sl));
      Swal.fire({
        icon: 'success',
        title: 'Employee deleted successfully!',
        showConfirmButton: false,
        timer: 1700,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete employee',
      });
    }
  };

  const handleEditClick = (empid: string) => {
    setEditEmployeeId(empid);
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setEditEmployeeId(null);
  };

  const handleBulkUploadClose = () => {
    setOpenBulkUpload(false);
    handleFetch();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpIdFilter(e.target.value);
    const filtered = allData.filter((item: (any)) =>
      item.empid.toString().includes(e.target.value.toUpperCase())
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNewJoineeKitClick = (empid: string) => {
    setEditEmployeeId(empid);
    setOpenNewJoineeKit(true);
  };

  const handleCloseNewJoineeKit = () => {
    setOpenNewJoineeKit(false);
    setEditEmployeeId(null);
  };

  const handleStatusCheck = async (date: string) => {
    try {
      const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
      const response = await apiClient.get("daily-attendance/status", {
        headers: { Authorization: `Bearer ${token}` },
        params: { date },
      })
      setStatusData(response.data)
      console.log(response.data)
      setStatusModalOpen(true)
    } catch (error) {
      console.error("Error fetching status data:", error)
    }
  }

  return (
    <section className='w-full main-containerAdmin flex flex-col items-start justify-start gap-4'>
      <BulkUpload open={openBulkUpload} setOpen={setOpenBulkUpload} onClose={handleBulkUploadClose} />
      <EditEmployeeForm open={openEditForm} handleClose={handleCloseEditForm} empid={editEmployeeId!} />
      <Dialog open={openNewJoineeKit} onClose={handleCloseNewJoineeKit} maxWidth="lg" fullWidth>
        <NewJoineeKit empid={editEmployeeId!} />
      </Dialog>
      <div className='w-full flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl text-[#282461] font-semibold flex items-center gap-2'>
            <img src={empl.src || "/placeholder.svg"} alt='Employees Icon' className='h-8' />
            Employees
          </h2>
          <div className='flex items-center gap-4'>
            <input
              type='text'
              placeholder='Employee Id'
              value={empIdFilter}
              onChange={handleFilterChange}
              className='border-none pl-4 focus:outline-none w-48 h-10 rounded-full bg-[#F4ECFF] shadow-lg'
            />
            <button
              className='bg-gradient-to-r from-[#ee7623] to-[#282461] text-white py-2 px-4 rounded-full flex items-center gap-1'
              onClick={() => setOpenBulkUpload(true)}
            >
              <FileUploadIcon /> Bulk Upload
            </button>
            <button
              className='bg-gradient-to-r from-[#ee7623] to-[#282461] text-white py-2 px-4 rounded-full flex items-center gap-1'
              onClick={() => router.push('/addEmployee')}
            >
              Add Employee
            </button>
            <IconButton className="text-red-600" onClick={() => handleStatusCheck(new Date().toISOString().split("T")[0])}>
                      <RemoveRedEye />
                    </IconButton>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {filteredData.length > 0 &&
            filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item:(any)) => (
                <Paper key={item.empid} className='p-4 rounded-lg shadow-lg flex flex-row bg-gradient-to-r from-[#ee7623] to-[#282461] '>
                  <div className='w-1/3 flex justify-center align-middle '>
                  <img src={`${apiBaseURL}/photo/${item.employee_photo}`} alt="image" className='w-16 h-16 rounded-full border border-gray-600' />
                  </div>

                  <div className='flex flex-col gap-2 justify-center  w-2/3'>
                  <div className='text-lg font-semibold text-white text-center'>
                    {item.fullName}
                  </div>
                  <strong className='text-sm text-center text-white'>Emp ID: {item.empid}</strong>
                  <strong className='text-sm text-center text-white'>Blood Group: {item.blood_group}</strong>
                  <div className='flex justify-center gap-2 mt-3'>
                    <IconButton
                      className='text-white rounded-full p-1 hover:bg-blue-600'
                      onClick={() => handleEditClick(item.empid)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      className='text-white rounded-full p-1 hover:bg-red-600'
                      onClick={() => handleDelete(item.empid)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      className='text-white rounded-full p-1 hover:bg-green-600'
                      onClick={() => handleNewJoineeKitClick(item.empid)}
                    >
                      <WorkIcon />
                    </IconButton>
                  </div>
                  </div>
                </Paper>
              ))}
        </div>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <Modal
                open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        aria-labelledby="status-modal-title"
        aria-describedby="status-modal-description"
        
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="status-modal-title" variant="h6" component="h2">
            Attendance Status
          </Typography>
          {statusData && (
        <Box sx={{ maxHeight: 600, overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px", p: 2 }}>
        {/* Present Employees Section */}
        <Box display="flex" alignItems="center" mb={1}>
          <CheckCircle color="success" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "green", ml: 1 }}>
            Present Employees
          </Typography>
        </Box>
        <List>
          {statusData.presentEmployees.map((employee: any, index: number) => (
            <ListItem key={index} sx={{ bgcolor: index % 2 === 0 ? "#f0f9f4" : "white", borderRadius: "4px" }}>
              <ListItemText primary={`${employee.fullName} (${employee.empid})`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Absent Employees Section */}
        <Box display="flex" alignItems="center" mb={1}>
          <Cancel color="error" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "red", ml: 1 }}>
            Absent Employees
          </Typography>
        </Box>
        <List>
          {statusData.absentEmployees.map((employee: any, index: number) => (
            <ListItem key={index} sx={{ bgcolor: index % 2 === 0 ? "#fde8e8" : "white", borderRadius: "4px" }}>
              <ListItemText primary={`${employee.fullName} (${employee.empid})`} />
            </ListItem>
          ))}
        </List>
      </Box>
          )}
        </Box>
      </Modal>
      </div>
    </section>
  );
}

