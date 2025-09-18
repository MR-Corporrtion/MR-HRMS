// import { useState } from 'react';
// import axios from 'axios';
// import {apiClient, apiBaseURL} from "../../../../config/route.config";

// const SalaryFormulaBuilder = () => {
//   const initialSalaryComponents = {
//     salary_lpa: 'salary_lpa',
//     salary_monthly: 'salary_monthly',
//     rate_per_day: 'rate_per_day',
//     paidDays: 'paidDays',
//     calculatedBasicPayEvos: 'calculatedBasicPayEvos',
//     earnedFourDaysFixed: 'earnedFourDaysFixed',
//     fixedBasicEvos: 'fixedBasicEvos',
//     miscellaneous_charges: 'miscellaneous_charges',
//     other: 'other',
//     gross_salary: 'gross_salary',
//     esic: 'esic',
//     canteen: 'canteen',
//     registration: 'registration',
//     advance: 'advance',
//     petty: 'petty',
//     fourDaysFixed: 'fourDaysFixed',
//     basic_pay: 'basic_pay',
//     employers_contribution_to_PF: 'employers_contribution_to_PF',
//     performance_linked_incentive: 'performance_linked_incentive',
//     children_education_allowance: 'children_education_allowance',
//     medical_reimbursement: 'medical_reimbursement',
//     uniform_allowance: 'uniform_allowance',
//     conveyence_reimbursement: 'conveyence_reimbursement',
//     prof_persuit_peimbursement: 'prof_persuit_peimbursement',
//     hra: 'hra',
//     leave_travel_allowance: 'leave_travel_allowance',
//     bonus: 'bonus',
//     special_allowance: 'special_allowance',
//     gratuity: 'gratuity',
//     gpai: 'gpai',
//     extra: 'extra',
//     food_n_room: 'food_n_room',
//     medi_claim: 'medi_claim',
//     net_salary: 'net_salary',
//   };

//   const [expression, setExpression] = useState<string>('');
//   const [formulaField, setFormulaField] = useState<string>('');
//   const [companyIdBody, setCompanyIdBody] = useState<string>('');
//   const [formulaType, setFormulaType] = useState<string>('salary');

//   const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

//   const handleButtonClick = (value: string) => {
//     setFormulaField((prev) => {
//       let trimmed = prev.trim();

//       if (isOperator(value)) {
//         // Remove trailing operator if present
//         if (isOperator(trimmed.slice(-1))) {
//           trimmed = trimmed.slice(0, -1);
//         }
//       }

//       return `${trimmed} ${value}`.trim();
//     });
//   };

//   const handleDelete = () => {
//     setFormulaField((prev) => prev.slice(0, -1).trim());
//   };

//   const finalizeFormula = () => {
//     const trimmedFormula = formulaField.trim().replace(/[\+\-\*\]\/]+$/, '');
//     setFormulaField(trimmedFormula);
//   };

//   const handleClear = () => {
//     setFormulaField('');
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFormulaField(e.target.value);
//   };

// const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//     await apiClient.post(
//       '/formula/create',
//       {
//         companyIdBody,
//         formula_type: formulaType,
//         formula_expression: formulaField,
//         expression: formulaField,
//       },
//       {
//         headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//         withCredentials: true

//       }
//     );
//     alert('Formula created successfully');
//   } catch (error) {
//     console.error('Error creating formula:', error);
//     alert('Error creating formula');
//   }
// };

// const handleUpdate = async () => {
//   try {
//     await apiClient.put('/formula/update', {
//       companyIdBody,
//       formula_type: formulaType,
//       formula_expression: formulaField,
//       expression: formulaField,
//     });
//     alert('Formula updated successfully');
//   } catch (error) {
//     console.error('Error updating formula:', error);
//     alert('Error updating formula');
//   }
// };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <header className="bg-blue-600 p-4 text-white text-2xl font-bold text-center shadow-md">
//         Salary Formula Builder
//       </header>
//       <main className="flex-1 p-8 overflow-auto">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Salary Components Section */}
//           <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
//             <div className="mb-6 flex flex-col gap-4">
//               <label className="block text-lg font-semibold">Company ID:</label>
//               <input
//                 type="text"
//                 value={companyIdBody}
//                 onChange={(e) => setCompanyIdBody(e.target.value)}
//                 className="border border-gray-300 p-3 rounded-lg w-full"
//                 placeholder="Enter Company ID"
//               />
//             </div>

//             <div className="mb-6 flex items-center">
//               <label className="block text-lg font-semibold mr-4">Formula Type:</label>
//               <input
//                 type="text"
//                 value={formulaType}
//                 onChange={(e) => setFormulaType(e.target.value)}
//                 className="border border-gray-300 p-3 rounded-lg w-full"
//               />
//             </div>

//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-4">Salary Components</h3>
//               <div className="overflow-y-auto h-64 border border-gray-300 rounded-lg p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(initialSalaryComponents).map(([key, value]) => (
//                     <button
//                       key={key}
//                       onClick={() => handleButtonClick(value)}
//                       className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full text-left"
//                     >
//                       {value}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Calculator Section */}
//           <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
//             <h3 className="text-lg font-semibold mb-4">Formula</h3>
//             <textarea
//               value={formulaField}
//               onChange={handleChange}
//               className="border border-gray-300 p-3 rounded-lg w-full h-32 text-gray-700 font-mono bg-gray-50"
//               placeholder="Enter or paste formula here"
//             />

//             <div className="grid grid-cols-4 gap-4 mt-4">
//               {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '.', '/', '=', ',', '(', ')'].map(
//                 (item) => (
//                   <button
//                     key={item}
//                     onClick={() => handleButtonClick(item)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//                   >
//                     {item}
//                   </button>
//                 )
//               )}
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//               >
//                 Delete
//               </button>
//             </div>

//             <div className="flex gap-4 mt-6">
//               <button
//                 onClick={handleClear}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300"
//               >
//                 Clear
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SalaryFormulaBuilder;

// import AddIcon from '@mui/icons-material/Add';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import AddResignationList from './AddResignationList';

// interface ResignationType {
//   sl: number;
//   typeName: string;
// }

// const ResignationTypeList: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [data, setData] = useState<ResignationType[]>([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('${apiBaseURL}/resignationType/getall', {
//         withCredentials: true,
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     const result = await Swal.fire({
//       icon: 'warning',
//       title: 'Are you sure?',
//       text: 'You won’t be able to revert this!',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${apiBaseURL}/resignationType/delete/${id}`, {
//           withCredentials: true,
//         });
//         setData(data.filter((item) => item.sl !== id));
//         Swal.fire({
//           icon: 'success',
//           title: 'Resignation Type deleted successfully!',
//           showConfirmButton: false,
//           timer: 1700,
//         });
//       } catch (error) {
//         console.error('Error deleting resignation type:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Failed to delete Resignation Type',
//         });
//       }
//     }
//   };

//   const handleEdit = async (item: ResignationType) => {
//     const { value: formValues } = await Swal.fire({
//       title: 'Edit Resignation Type',
//       html: `
//         <input id="typeName" class="swal2-input" placeholder="Type Name" value="${item.typeName}">
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: 'Save changes',
//       cancelButtonText: 'Cancel',
//       preConfirm: () => ({
//         typeName: (document.getElementById('typeName') as HTMLInputElement).value,
//       }),
//     });

//     if (formValues) {
//       try {
//         await axios.patch(`${apiBaseURL}/resignationType/update/${item.sl}`, formValues, {
//           withCredentials: true,
//         });
//         fetchData();
//         Swal.fire({
//           icon: 'success',
//           title: 'Resignation Type updated successfully!',
//           showConfirmButton: false,
//           timer: 1700,
//         });
//       } catch (error) {
//         console.error('Error updating resignation type:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Failed to update Resignation Type',
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   });

//   return (
//     <section className='w-full main-containerAdmin flex flex-col gap-3'>
//       <div className='w-full flex items-center justify-between'>
//         <p className='text-2xl'>Resignation Type</p>
//         <button
//           className='bg-blue-500 text-white py-2 px-4 shadow-lg shadow-slate-400 text-sm rounded cursor-pointer hover:shadow-lg'
//           onClick={() => setOpen(true)}
//         >
//           <AddIcon /> Add Type
//         </button>
//       </div>
//       <div className='grid grid-cols-4 gap-5'>
//         {data.map((item) => (
//           <div
//             key={item.sl}
//             className='w-full flex flex-col p-2 items-start justify-center h-28 gap-2 bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl'
//           >
//             <p className='text-blue-700 text-sm'>{item.typeName}</p>
//             <span className='flex items-center justify-start gap-3 text-sm'>
//               <button
//                 className='text-red-500 hover:bg-red-100 rounded hover:cursor-pointer ease-in-out duration-300'
//                 onClick={() => handleDelete(item.sl)}
//               >
//                 <DeleteOutlineIcon /> Delete
//               </button>
//               <button
//                 className='text-green-500 hover:bg-green-100 rounded p-1 hover:cursor-pointer ease-in-out duration-300'
//                 onClick={() => handleEdit(item)}
//               >
//                 <EditIcon /> Edit
//               </button>
//             </span>
//           </div>
//         ))}
//       </div>
//       <AddResignationList open={open} setOpen={setOpen} />
//     </section>
//   );
// };

// export default ResignationTypeList;

import React, { useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import * as XLSX from "xlsx";
import { apiClient } from "../../../../config/route.config";
import SearchBox from "./SearchBox";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";

// Define the type for company data
type Company = {
  companyid: string;
  compname: string;
  company_address: string;
};

// Define the type for employee data
type EmployeeData = {
  empid: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  uanNumber?: string;
  basic_pay?: string;
  presentDays?: string;
  paidDays?: string;
  salary_month?: string;
  salary_year?: string;
  employee_PF_contribution?: number;
  employers_PF_contribution?: number;
};

const ReportsPage: React.FC = () => {
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [esicDialogOpen, setEsicDialogOpen] = useState(false);
  const [pfDialogOpen, setpfDialogOpen] = useState(false);
  const [esiDialogOpen, setesiDialogOpen] = useState(false);
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [company, setCompany] = useState<Company | null>(null);
  const [employeesAllData, setEmployeesAllData] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusData, setStatusData] = useState<{
    presentEmployees: any[];
    absentEmployees: any[];
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  const rowsPerPage = 5;

  const handleStatusCheck = async (date: string) => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.get("daily-attendance/status", {
        headers: { Authorization: `Bearer ${token}` },
        params: { date },
      });
      setStatusData(response.data);
      console.log(response.data);
      setStatusModalOpen(true);
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };

  const handleOpenDialog = (report: string) => {
    setActiveReport(report);
    setCurrentPage(1);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setMonth("");
    setYear("");
  };
  const handleOpenpfDialog = () => {
    setpfDialogOpen(true);
    setCurrentPage(1);
    setMonth("");
    setYear("");
  };

  const handleClosepfDialog = () => {
    setpfDialogOpen(false);
  };

  const handleOpenEsicDialog = () => {
    setEsicDialogOpen(true);
    setCurrentPage(1);
    setMonth("");
    setYear("");
  };

  const handleCloseEsicDialog = () => {
    setEsicDialogOpen(false);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value
    setSelectedDate(newDate)
    handleStatusCheck(newDate) // Fetch data when date changes
  }

  const fetchReportData = async (month: number, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.get("/report/pfdetails", {
        headers: { Authorization: `Bearer ${token}` },
        params: { month, year },
      });

      if (response.data.success) {
        setCompany(response.data.company);
        setEmployeesAllData(response.data.employeesAllData);
      } else {
        setError(response.data.msg || "Error fetching report data.");
      }
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError("Error fetching report data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchpfReportData = async (month: number, year: number) => {
    setLoading(true);
    setError(null);

    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.get("/report/pf-challan", {
        headers: { Authorization: `Bearer ${token}` },
        params: { month, year },
        responseType: "blob", // Specify the response type as 'blob' for file download
      });

      if (response.status === 200) {
        // Create a blob from the response data
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }); // Use the correct MIME type for Excel
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `PF_Challan_${month}_${year}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up the URL object
      } else {
        setError("Error fetching PF report data.");
      }
    } catch (err) {
      console.error("Error fetching PF report data:", err);
      setError("Error fetching PF report data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEsicReportData = async (month: number, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.get("/report/esic-challan", {
        headers: { Authorization: `Bearer ${token}` },
        params: { month, year },
      });

      if (response.status === 200) {
        // Trigger download
        const blob = new Blob([response.data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ESIC_Challan_${month}_${year}.txt`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        setError("Error fetching ESIC report data.");
      }
    } catch (err) {
      console.error("Error fetching ESIC report data:", err);
      setError("Error fetching ESIC report data.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = () => {
    if (month && year && activeReport) {
      fetchReportData(month, year);
    }
    handleCloseDialog();
  };
  const handlepfView = () => {
    if (month && year && activeReport) {
      fetchpfReportData(month, year);
    }
    handleCloseDialog();
  };

  const handleEsicView = () => {
    if (month && year) {
      fetchEsicReportData(month, year);
    }
    handleCloseEsicDialog();
  };

  const handleDownload = () => {
    if (Array.isArray(employeesAllData) && employeesAllData.length > 0) {
      const dataToExport = employeesAllData.map((employeeData) => ({
        "Employee ID": employeeData.empid || "",
        "First Name": employeeData.first_name || "",
        "Middle Name": employeeData.middle_name || "",
        "Last Name": employeeData.last_name || "",
        "UAN Number": employeeData.uanNumber || "",
        "Basic Pay": employeeData.basic_pay || "",
        "Present Days": employeeData.presentDays || "",
        "Paid Days": employeeData.paidDays || "",
        "Salary Month": employeeData.salary_month || "",
        "Salary Year": employeeData.salary_year || "",
        "Employee PF Contribution": employeeData.employee_PF_contribution || "",
        "Employer PF Contribution":
          employeeData.employers_PF_contribution || "",
      }));
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "PF Report");

      const excelFileName = `PF_Report_${month}_${year}.xlsx`;
      XLSX.writeFile(workbook, excelFileName);
    }
  };

  const renderReportTable = () => {
    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!employeesAllData.length) {
      return <p>No data available for the selected month and year.</p>;
    }

    const paginatedData = employeesAllData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    return (
      <div>
        {company && (
          <Card className="my-4">
            <CardContent>
              <Typography variant="h5" component="div" align="center">
                {company.compname}
              </Typography>
              <Typography variant="body2" align="center">
                {company.company_address}
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
              >
                PF Statement Report for {month}/{year}
              </Typography>
            </CardContent>
          </Card>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-2 py-1">Employee ID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">UAN Number</th>
                <th className="border px-2 py-1">Basic Pay</th>
                <th className="border px-2 py-1">Present Days</th>
                <th className="border px-2 py-1">Paid Days</th>
                <th className="border px-2 py-1">Salary Month</th>
                <th className="border px-2 py-1">Salaty Year</th>
                <th className="border px-2 py-1">Employee PF Contribution</th>
                <th className="border px-2 py-1">Employer PF Contribution</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((employeeData, index) => {
                const fullName = `${employeeData.first_name} ${
                  employeeData.middle_name || ""
                } ${employeeData.last_name}`;
                return (
                  <tr
                    key={index}
                    className={`text-sm ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="border px-2 py-1">{employeeData.empid}</td>
                    <td className="border px-2 py-1">{fullName}</td>
                    <td className="border px-2 py-1">
                      {employeeData.uanNumber || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.basic_pay || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.presentDays || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.paidDays || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.salary_month || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.salary_year || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.employee_PF_contribution || "N/A"}
                    </td>
                    <td className="border px-2 py-1">
                      {employeeData.employers_PF_contribution || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(employeesAllData.length / rowsPerPage)
                )
              )
            }
            disabled={
              currentPage >= Math.ceil(employeesAllData.length / rowsPerPage)
            }
          >
            Next
          </Button>
        </div>

        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleDownload}
        >
          Download Report
        </Button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="font-bold mb-4" align="center">
        Reports
      </Typography>
      {/* <Button variant="contained" onClick={() => handleOpenDialog('PF Details')} color="primary" className="ml-2 w-auto h-10">
        Generate PF Report
      </Button>
      <Button variant="contained" onClick={handleOpenpfDialog} color="secondary" className="ml-2 w-auto h-10">
        Generate PF Challan
      </Button>
      <Button variant="contained" onClick={handleOpenEsicDialog} color="primary" className="ml-2 w-auto h-10">
        Generate ESIC Report
      </Button>
      <Button variant="contained" onClick={handleOpenEsicDialog} color="secondary" className="ml-2 w-auto h-10">
        Generate ESIC Challan
      </Button> */}
      <Grid container spacing={2} justifyContent="center">
        {/* PF Report Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                PF Report
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleOpenDialog("PF Details")}
                color="primary"
                fullWidth
              >
                Generate PF Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* PF Challan Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                PF Challan
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenpfDialog}
                color="secondary"
                fullWidth
              >
                Generate PF Challan
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ESIC Report Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ESIC Report
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenEsicDialog}
                color="primary"
                fullWidth
              >
                Generate ESIC Report
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ESIC Challan Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ESIC Challan
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenEsicDialog}
                color="secondary"
                fullWidth
              >
                Generate ESIC Challan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Check Employee Attendance
              </Typography>
              <Button
                variant="contained"
                onClick={() =>
                  handleStatusCheck(new Date().toISOString().split("T")[0])
                }
                color="warning"
                fullWidth
              >
                Generate Attendance Status
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          width: 900,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography id="status-modal-title" variant="h6" component="h2">
          Attendance Status
        </Typography>

        {/* Date Filter */}
        <TextField
          label="Select Date"
          type="date"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
          value={selectedDate}
          onChange={handleDateChange}
        />

        {statusData && (
          <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
            {/* Present Employees Table */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "green", my: 2 }}
            >
              <CheckCircle color="success" sx={{ mr: 1 }} />
              Present Employees
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#e8f5e9" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statusData.presentEmployees.length > 0 ? (
                    statusData.presentEmployees.map(
                      (employee: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{employee.empid}</TableCell>
                          <TableCell>{employee.fullName}</TableCell>
                          <TableCell>{employee.phone_number}</TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No Present Employees
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Absent Employees Table */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "red", my: 2 }}
            >
              <Cancel color="error" sx={{ mr: 1 }} />
              Absent Employees
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#ffebee" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statusData.absentEmployees.length > 0 ? (
                    statusData.absentEmployees.map(
                      (employee: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{employee.empid}</TableCell>
                          <TableCell>{employee.fullName}</TableCell>
                          <TableCell>{employee.phone_number}</TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No Absent Employees
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Modal>

    
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select Month and Year for PF Report</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              labelId="month-label"
              value={month}
              onChange={(e: any) => setMonth(e.target.value)}
              label="Month"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              value={year}
              onChange={(e: any) => setYear(e.target.value)}
              label="Year"
            >
              {Array.from({ length: 10 }, (_, index) => {
                const currentYear = new Date().getFullYear();
                return (
                  <MenuItem
                    key={currentYear - index}
                    value={currentYear - index}
                  >
                    {currentYear - index}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleView}
            color="primary"
            disabled={!month || !year}
          >
            View Report
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={pfDialogOpen} onClose={handleClosepfDialog}>
        <DialogTitle>Select Month and Year for PF Challan</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="esic-month-label">Month</InputLabel>
            <Select
              labelId="esic-month-label"
              value={month}
              onChange={(e: any) => setMonth(e.target.value)}
              label="Month"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="esic-year-label">Year</InputLabel>
            <Select
              labelId="esic-year-label"
              value={year}
              onChange={(e: any) => setYear(e.target.value)}
              label="Year"
            >
              {Array.from({ length: 10 }, (_, index) => {
                const currentYear = new Date().getFullYear();
                return (
                  <MenuItem
                    key={currentYear - index}
                    value={currentYear - index}
                  >
                    {currentYear - index}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosepfDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handlepfView}
            color="primary"
            disabled={!month || !year}
          >
            Generate PF Challan Report
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={esicDialogOpen} onClose={handleCloseEsicDialog}>
        <DialogTitle>Select Month and Year for ESIC Report</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="esic-month-label">Month</InputLabel>
            <Select
              labelId="esic-month-label"
              value={month}
              onChange={(e: any) => setMonth(e.target.value)}
              label="Month"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="esic-year-label">Year</InputLabel>
            <Select
              labelId="esic-year-label"
              value={year}
              onChange={(e: any) => setYear(e.target.value)}
              label="Year"
            >
              {Array.from({ length: 10 }, (_, index) => {
                const currentYear = new Date().getFullYear();
                return (
                  <MenuItem
                    key={currentYear - index}
                    value={currentYear - index}
                  >
                    {currentYear - index}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEsicDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEsicView}
            color="primary"
            disabled={!month || !year}
          >
            Generate EPF Report
          </Button>
        </DialogActions>
      </Dialog>

      {renderReportTable()}
      <SearchBox />
    </div>
  );
};

export default ReportsPage;
