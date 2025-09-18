import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient} from "../../../../config/route.config";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TablePagination
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = [2021, 2022, 2023, 2024, 2025];

const PayrollDetailsPage: React.FC = () => {
  const [attendances, setAttendances] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    // Fetch attendance data on component mount or when month/year changes
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get('/attendance/getall', {
          params: { month, year }, 
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true,
        });
        setAttendances(response.data);
        console.log("response",response)
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [month, year]); // Re-fetch when month/year changes

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setYear(event.target.value);
  };

  const handleSubmit = () => {
    // Optionally, you could fetch data again here if necessary
    console.log({ month, year });
  };

  return (
    <section className="w-full main-containerAdmin flex flex-col items-start justify-start gap-6 my-2">
      <div className="w-full flex flex-col gap-8">
        <span className="flex items-center justify-start gap-2">
          <PeopleAltIcon className="!text-3xl" />
          <p className="text-lg font-bold capitalize text-[#282461]">Payroll Details</p>
        </span>
      </div>
      <Box display="flex" gap={2} mb={4} alignItems="center">
        <FormControl variant="outlined" size="small" className="w-40">
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange} label="Month">
            {months.map((month, index) => (
              <MenuItem key={index} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className="w-40">
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange} label="Year">
            {years.map((year, index) => (
              <MenuItem key={index} value={year.toString()}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" className="bg-gradient-to-t from-[#ee7623] to-[#282461] w-40" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <div className="w-full">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461] w-full h-10">
                <td className="text-white font-bold text-xs text-center ">NAME</td>
                <td className="text-white font-bold text-xs text-center">EMP ID</td>
                <td className="text-white font-bold text-xs text-center">Month</td>
                <td className="text-white font-bold text-xs text-center">Year</td>
                <td className="text-white font-bold text-xs text-center">PAYABLE DAYS</td>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((attendance) => (
                <TableRow key={attendance.empid}>
                  <TableCell className="text-black font-bold text-center">{attendance.employee.first_name} {attendance.employee.middle_name} {attendance.employee.last_name}</TableCell>
                  <TableCell className="text-black font-bold text-center">{attendance.employee.empid}</TableCell>
                  <TableCell className="text-black font-bold text-center">{attendance.month}</TableCell>
                  <TableCell className="text-black font-bold text-center">{attendance.year}</TableCell>
                  <TableCell className="text-black font-bold text-center">{attendance.totaldays}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={attendances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
};

export default PayrollDetailsPage;
