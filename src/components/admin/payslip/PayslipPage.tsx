

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {apiClient} from "../../../../config/route.config";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableContainer,
//   Paper,
//   Typography,
//   Button,
//   TablePagination,
//   TextField,
//   IconButton,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   SelectChangeEvent,
// } from '@mui/material';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import EditIcon from '@mui/icons-material/Edit';
// import DownloadIcon from '@mui/icons-material/Download';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// interface PayslipData {
//   slno: number;
//   empid: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   status: string;
//   employee_id: string;
//   companyid: string;
// }

// const PayslipPage: React.FC = () => {
//   const [payslipData, setPayslipData] = useState<PayslipData[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [companyid, setcompanyid] = useState('');
//   const router = useRouter()
//   // Fetch payslip data from API
//   const fetchPayslipData = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.get(`/employee/getall`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       setPayslipData(response.data);
//     } catch (error) {
//       console.error('Error fetching payslip data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPayslipData();
//   }, []);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEdit = (id: number) => {
//     console.log(`Editing payslip with ID: ${id}`);
//     // Implement logic to edit payslip with id
//   };

//   const getStatusStyle = (status: string) => {
//     if (status == 'Active') {
//       return 'text-green-400 text-white font-bold p-2 rounded-md text-center';
//     }
//     if (status == 'Inactive') {
//       return 'text-red-600 text-white font-bold p-2 rounded-md text-center';
//     }
//     return '';
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchEmployeeId(event.target.value);
//   };

//   const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
//     setStatusFilter(event.target.value);
//   };

//   const handleMonthChange = (event: SelectChangeEvent<string>) => {
//     setMonth(event.target.value);
//   };

//   const handleYearChange = (event: SelectChangeEvent<string>) => {
//     setYear(event.target.value);
//   };

//   const handleDownload = async () => {
//     console.log('Download button clicked');

//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.post(
//         `/salary-calculation/dynamic-salary`,
//         { month, year,companyid },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//     } catch (error) {
//       console.error('Error downloading the payslip:', error);
//     }
//   };


//   const handleExport = async () => {
//     console.log('Export button clicked');
  
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.post(
//         '/salary-calculation/export-salary',{ month, year, companyid },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           withCredentials: true,
//           responseType: 'blob',
//         }
//       );
  
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'CONSOLIDATED_WAGESLIP.xlsx'); // Specify the file name and extension
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading the payslip:', error);
//     }
//   };
// console.log(payslipData)
//   const filteredData = payslipData.filter((payslip) => {
//     const employeeId = payslip.empid || '';
//     return (
//       employeeId.includes(searchEmployeeId) &&
//       (statusFilter === '' || payslip.status === statusFilter)
//     );
//   });

//   return (
//     <section className="w-full main-containerAdmin flex flex-col items-start justify-start gap-6 my-2">
//       <div className="w-full flex flex-col gap-8">
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h5" component="h1" gutterBottom>
//             Payslip
//           </Typography>
//           <Box display="flex" gap={2} alignItems="center">
//             <TextField
//               label="Search Employee ID"
//               variant="outlined"
//               size="small"
//               className="border-none pl-1 focus:outline-none w-64"
//               value={searchEmployeeId}
//               onChange={handleSearchChange}
//             />
//             <FormControl variant="outlined" size="small" className="w-40">
//               <InputLabel>Status Filter</InputLabel>
//               <Select
//                 value={statusFilter}
//                 onChange={handleStatusFilterChange}
//                 label="Status Filter"
//               >
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="Active">Active</MenuItem>
//                 <MenuItem value="Inactive">Inactive</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl variant="outlined" size="small" className="w-40">
//               <InputLabel>Month</InputLabel>
//               <Select
//                 value={month}
//                 onChange={handleMonthChange}
//                 label="Month"
//               >
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="January">January</MenuItem>
//                 <MenuItem value="February">February</MenuItem>
//                 <MenuItem value="March">March</MenuItem>
//                 <MenuItem value="April">April</MenuItem>
//                 <MenuItem value="May">May</MenuItem>
//                 <MenuItem value="June">June</MenuItem>
//                 <MenuItem value="July">July</MenuItem>
//                 <MenuItem value="August">August</MenuItem>
//                 <MenuItem value="September">September</MenuItem>
//                 <MenuItem value="October">October</MenuItem>
//                 <MenuItem value="November">November</MenuItem>
//                 <MenuItem value="December">December</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl variant="outlined" size="small" className="w-40">
//               <InputLabel>Year</InputLabel>
//               <Select
//                 value={year}
//                 onChange={handleYearChange}
//                 label="Year"
//               >
//                 <MenuItem value="">All</MenuItem>
//                 <MenuItem value="2022">2022</MenuItem>
//                 <MenuItem value="2023">2023</MenuItem>
//                 <MenuItem value="2024">2024</MenuItem>
//               </Select>
//             </FormControl>
//             <IconButton
//               color="primary"
//               className="p-2 rounded-full bg-[#5A12CF] hover:bg-gray-400"
//             >
//               <FilterAltIcon className="text-blue-400 text-2xl" />
//             </IconButton>
//             <IconButton
//               color="secondary"
//               className="p-2 rounded-full bg-yellow-400 hover:bg-gray-400"
//             >
//               <FilterAltOffIcon className="text-blue-400 text-2xl" />
//             </IconButton>
//             <IconButton
//               color="primary"
//               className="p-2 rounded-full text-gray-500 hover:bg-red-500"
//               onClick={handleDownload}
//             >
//               <DownloadIcon className="text-green-500 text-2xl" />
//             </IconButton>
//             <IconButton
//               color="primary"
//               className="p-2 rounded-full text-gray-500 hover:bg-red-500"
//               onClick={handleExport}
//             >
//               <ImportExportIcon className="text-green-500 text-2xl" />
//             </IconButton>
//           </Box>
//         </Box>
//       </div>
//       <div className="w-full">
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow className="bg-gradient-to-t from-[#6B23CA] to-[#F4ECFF]">
//                 <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">EMPLOYEE ID</TableCell>
//                 <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">FIRST NAME</TableCell>
//                 <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">LAST NAME</TableCell>
//                 {/* <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">EMAIL</TableCell> */}
//                 <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">PHONE NUMBER</TableCell>
//                 {/* <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">STATUS</TableCell> */}
//                 <TableCell className="text-white font-bold text-xs text-center shadow-[-4px_4px_27px_0px_#6B23CA]">ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((payslip) => (
//                   <TableRow key={payslip.empid}>
//                     <TableCell className="text-xs text-center">{payslip.empid}</TableCell>
//                     <TableCell className="text-xs text-center">{payslip.first_name}</TableCell>
//                     <TableCell className="text-xs text-center">{payslip.last_name}</TableCell>
//                     {/* <TableCell className="text-xs text-center">{payslip.email}</TableCell> */}
//                     <TableCell className="text-xs text-center">{payslip.phone_number}</TableCell>
//                     {/* <TableCell className={getStatusStyle(payslip.status)}>{payslip.status}</TableCell> */}
//                     <TableCell className="flex justify-center text-sm gap-4">
//                       <Link href="/EditEmployeePage">
//                         <IconButton
//                           aria-label="edit"
//                           className="p-2 text-[#F4ECFF] rounded-full bg-[#5A12CF] hover:bg-gray-400"
//                           onClick={() => handleEdit(payslip.slno)}
//                         >
//                           <EditIcon className="text-xs" />
//                         </IconButton>
//                       </Link>
                 
//                         <Button
//                           variant="contained"
//                            color="primary"
//                            className="px-2 py-1 rounded-full bg-green-400"
//                            onClick={() => {
//                             router.push({
//                               pathname: `/payslip/${payslip.empid}`,
//                               query: { month: month, year: year },
//                             });
//                           }}
                          

//                          >
//                            <DownloadIcon />
//                          </Button>
                       
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
//           rowsPerPageOptions={[5, 10, 15]}
//         />
//       </div>
//     </section>
//   );
// };

// export default PayslipPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { apiClient } from "../../../../config/route.config";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableContainer,
//   Paper,
//   Typography,
//   Button,
//   TablePagination,
//   TextField,
//   IconButton,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   SelectChangeEvent,
// } from '@mui/material';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import EditIcon from '@mui/icons-material/Edit';
// import DownloadIcon from '@mui/icons-material/Download';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// interface PayslipData {
//   slno: number;
//   empid: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   status: string;
//   employee_id: string;
//   companyid: string;
// }

// const PayslipPage: React.FC = () => {
//   const [payslipData, setPayslipData] = useState<PayslipData[]>([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [companyid, setCompanyid] = useState('');
//   const router = useRouter();

//   // Fetch payslip data from API
//   const fetchPayslipData = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.get(`/employee/getall`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       setPayslipData(response.data.data);
//       console.log(response.data.data)
//     } catch (error) {
//       console.error('Error fetching payslip data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPayslipData();
//   }, []);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleEdit = (id: number) => {
//     console.log(`Editing payslip with ID: ${id}`);
//   };

//   const getStatusStyle = (status: string) => {
//     return status === 'Active'
//       ? 'text-green-600 bg-green-100 rounded-md p-1 text-center'
//       : 'text-red-600 bg-red-100 rounded-md p-1 text-center';
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchEmployeeId(event.target.value);
//   };

//   const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
//     setStatusFilter(event.target.value);
//   };

//   const handleMonthChange = (event: SelectChangeEvent<string>) => {
//     setMonth(event.target.value);
//   };

//   const handleYearChange = (event: SelectChangeEvent<string>) => {
//     setYear(event.target.value);
//   };

//   const handleDownload = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       await apiClient.post(
//         `/salary-calculation/dynamic-salary`,
//         { month, year, companyid },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       console.error('Error downloading the payslip:', error);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.post(
//         '/salary-calculation/export-salary', { month, year, companyid },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//           withCredentials: true,
//           responseType: 'blob',
//         }
//       );
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'CONSOLIDATED_WAGESLIP.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error exporting the payslip:', error);
//     }
//   };

//   const filteredData = payslipData.filter((payslip) => {
//     const employeeId = payslip.empid || '';
//     return (
//       employeeId.includes(searchEmployeeId) &&
//       (statusFilter === '' || payslip.status === statusFilter)
//     );
//   });

//   return (
//     <section className="w-full main-containerAdmin flex flex-col gap-6 my-2 p-6 bg-gray-50">
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h5" className="font-bold text-gray-700">Payslip Management</Typography>
//         <Box display="flex" gap={2}>
//           <TextField
//             label="Search Employee ID"
//             variant="outlined"
//             size="small"
//             value={searchEmployeeId}
//             onChange={handleSearchChange}
//           />
//           <FormControl variant="outlined" size="small">
//             <InputLabel>Status Filter</InputLabel>
//             <Select value={statusFilter} onChange={handleStatusFilterChange} label="Status Filter">
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl variant="outlined" size="small">
//             <InputLabel>Month</InputLabel>
//             <Select value={month} onChange={handleMonthChange} label="Month">
//               <MenuItem value="">All</MenuItem>
//               {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
//                 <MenuItem key={month} value={month}>{month}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl variant="outlined" size="small">
//             <InputLabel>Year</InputLabel>
//             <Select value={year} onChange={handleYearChange} label="Year">
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="2023">2023</MenuItem>
//               <MenuItem value="2024">2024</MenuItem>
//             </Select>
//           </FormControl>
//           <IconButton onClick={handleDownload}>
//             <ImportExportIcon className="text-blue-500" />
//           </IconButton>
//           <IconButton onClick={handleExport}>
//             <DownloadIcon className="text-green-500" />
//           </IconButton>
//         </Box>
//       </Box>
//       <TableContainer component={Paper} className="shadow-md rounded-lg">
//         <Table>
//           <TableHead>
//             <TableRow className="bg-blue-600">
//               <TableCell className="text-white font-semibold">Employee ID</TableCell>
//               <TableCell className="text-white font-semibold">First Name</TableCell>
//               <TableCell className="text-white font-semibold">Last Name</TableCell>
//               <TableCell className="text-white font-semibold">Phone Number</TableCell>
//               <TableCell className="text-white font-semibold">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((payslip) => (
//                 <TableRow key={payslip.empid}>
//                   <TableCell>{payslip.empid}</TableCell>
//                   <TableCell>{payslip.first_name}</TableCell>
//                   <TableCell>{payslip.last_name}</TableCell>
//                   <TableCell>{payslip.phone_number}</TableCell>
//                   <TableCell>
//                     <Link href={`/payslip/${payslip.empid}`}>
//                       <IconButton color="primary">
//                         <EditIcon />
//                       </IconButton>
//                     </Link>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => {
//                         router.push({
//                           pathname: `/payslip/${payslip.empid}`,
//                           query: { month, year },
//                         });
//                       }}
//                     >
//                       <DownloadIcon />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </section>
//   );
// };

// export default PayslipPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../config/route.config";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Button,
  TablePagination,
  TextField,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Link from 'next/link';
import { useRouter } from 'next/router'; 

interface PayslipData {
  slno: number;
  empid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: string;
  employee_id: string;
  companyid: string;
}
export interface FormulasType {
  sl: string;
  formula_type: string;
  // Add other properties as needed
}

const PayslipPage: React.FC = () => {
  const [payslipData, setPayslipData] = useState<PayslipData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [companyid, setCompanyid] = useState('');
  const [formulaType, setFormulaType] = useState(''); // Added state for formula type
  const [formulas, setFormulas] = useState<FormulasType[]>([]); // Updated state for formulas
  const router = useRouter();

  // Fetch payslip data from API
  const fetchPayslipData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/employee/getall', {
        headers: {
          'Authorization': `Bearer ${token}`, // Corrected Authorization header
        },
        withCredentials: true,
      });
      setPayslipData(response.data.data);
    } catch (error) {
      console.error('Error fetching payslip data:', error);
    }
  };

  useEffect(() => {
    fetchPayslipData();
    //Call getFormulas after component mounts.  Requires companyIdBody to be defined.
    // getFormulas();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id: number) => {
    console.log(`Editing payslip with ID: ${id}`);
  };

  const getStatusStyle = (status: string) => {
    return status === 'Active'
      ? 'text-green-600 bg-green-100 rounded-md p-1 text-center'
      : 'text-red-600 bg-red-100 rounded-md p-1 text-center';
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmployeeId(event.target.value);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
  };
  const handleDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(event.target.value);
  };
  const handleDateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(event.target.value);
  };

  const handleFormulaTypeChange = (event: SelectChangeEvent<string>) => {
    setFormulaType(event.target.value);
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const respo=await apiClient.post(
        '/salary-calculation/dynamic-salary',
        { month, year, companyid },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(respo)
    } catch (error) {
      console.error('Error downloading the payslip:', error);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post(
        '/salary-calculation/export-salary',
        { month, year, companyid, formula_type: formulaType},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'CONSOLIDATED_WAGESLIP.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting the payslip:', error);
    }
  };

  const getFormulas = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/formula/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
        params: { companyid } // companyIdBody needs to be defined elsewhere
      });
      console.log(response)
      setFormulas(response.data.data);
    } catch (error) {
      console.error('Error fetching formulas:', error);
      alert('Error fetching formulas');
    }
  };

  const filteredData = payslipData.filter((payslip) => {
    const employeeId = payslip.empid || '';
    return (
      employeeId.includes(searchEmployeeId) &&
      (statusFilter === '' || payslip.status === statusFilter)
    );
  });

  return (
    <section className="w-full main-containerAdmin flex flex-col gap-6 my-2 p-6 bg-gray-50">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5" className="font-bold text-gray-700">Payslip Management</Typography>
        <Box display="flex" gap={2}>
          <TextField
            label="Search Employee ID"
            variant="outlined"
            size="small"
            value={searchEmployeeId}
            onChange={handleSearchChange}
          />
          <FormControl variant="outlined" size="small">
            <InputLabel>Status Filter</InputLabel>
            <Select value={statusFilter} onChange={handleStatusFilterChange} label="Status Filter">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Month</InputLabel>
            <Select value={month} onChange={handleMonthChange} label="Month">
              <MenuItem value="">All</MenuItem>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={handleYearChange} label="Year">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel>Formula Type</InputLabel>
            <Select value={formulaType} onChange={handleFormulaTypeChange} onClick={getFormulas} label="Formula Type">
              <MenuItem value="">All</MenuItem>
              {formulas.map((formula) => (
                <MenuItem key={formula.sl} value={formula.formula_type}>
                  {formula.formula_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton onClick={handleDownload}>
            <ImportExportIcon className="text-blue-500" />
          </IconButton>
          <IconButton onClick={handleExport}>
            <DownloadIcon className="text-green-500" />
          </IconButton>
        </Box>
      </Box>
      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461] h-10">
              <td className="text-white font-semibold">Employee ID</td>
              <td className="text-white font-semibold">First Name</td>
              <td className="text-white font-semibold">Last Name</td>
              <td className="text-white font-semibold">Phone Number</td>
              <td className="text-white font-semibold">Action</td>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payslip) => (
                <TableRow key={payslip.empid}>
                  <TableCell>{payslip.empid}</TableCell>
                  <TableCell>{payslip.first_name}</TableCell>
                  <TableCell>{payslip.last_name}</TableCell>
                  <TableCell>{payslip.phone_number}</TableCell>
                  <TableCell>
                    <Link href={`/payslip/${payslip.empid}`}>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        router.push({
                          pathname: `/payslip/${payslip.empid}`,
                          query: { month, year },
                        });
                      }}
                    >
                      <DownloadIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
};

export default PayslipPage;


