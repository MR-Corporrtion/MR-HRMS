import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Box, Typography, Button, TextField, TablePagination
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  FilterAlt as FilterAltIcon, FilterAltOff as FilterAltOffIcon,
  FileUpload as FileUploadIcon, Download as DownloadIcon
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { apiClient } from '../../../../config/route.config';
import BulkUpload from './BulkUpload';
import { atten } from '@/src/assets/admin/adminicon';

interface Attendance {
  sl: number;
  empid: string;
  companyid: string;
  attendance_date: string;
  clock_in_time: string;
  clock_out_time: string;
  time_difference: number;
  attendance_status: string;
  createdBy: string;
  updatedBy: string;
}

const AttendancePage: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [filteredData, setFilteredData] = useState<Attendance[]>([]);
  const [filters, setFilters] = useState({ empid: '', month: '', year: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  const handleFetch = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/daily-attendance/getall', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const { data } = response;

      const records = Array.isArray(data) ? data : data?.data || [];

      // Sort descending by date
      const sortedData = records.sort(
        (a: Attendance, b: Attendance) => new Date(b.attendance_date).getTime() - new Date(a.attendance_date).getTime()
      );

      setAttendanceData(sortedData);
      setFilteredData(sortedData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setAttendanceData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = () => {
    const filtered = attendanceData.filter(({ attendance_date, empid }) => {
      const month = new Date(attendance_date).getMonth() + 1;
      const year = new Date(attendance_date).getFullYear();
      return (
        (!filters.empid || empid.includes(filters.empid)) &&
        (!filters.month || month === parseInt(filters.month.split('-')[1])) &&
        (!filters.year || year === parseInt(filters.year))
      );
    });
    setFilteredData(filtered);
    setPage(0);
  };

  const handleClear = () => {
    setFilters({ empid: '', month: '', year: '' });
    setFilteredData(attendanceData);
    setPage(0);
  };

  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map(({ sl, empid, attendance_date, clock_in_time, clock_out_time, time_difference, attendance_status }) => ({
        SL: sl,
        'Employee ID': empid,
        Date: attendance_date,
        'Check In': new Date(clock_in_time).toLocaleString(),
        'Check Out': new Date(clock_out_time).toLocaleString(),
        'Time Difference (hours)': time_difference,
        'Attendance Status': attendance_status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Data');
    XLSX.writeFile(workbook, 'Attendance_Report.xlsx');
  };

  return (
    <section className="main-containerAdmin">
      <BulkUpload open={open} setOpen={setOpen} />
      <Box className="mb-4">
        <Typography variant="h5" className="text-2xl text-[#282461] flex items-center gap-3">
          <img src={atten.src} alt="" className="h-6" /> Attendance
        </Typography>
      </Box>
      <Box className="flex items-center gap-4 mb-4">
        <TextField
          label="Employee Id"
          size="small"
          value={filters.empid}
          onChange={(e) => handleChange('empid', e.target.value)}
          className="bg-gradient-to-t from-[#ee7623] to-[#f2e8ff] text-black rounded-full"
        />
        <TextField
          label="Month"
          type="month"
          size="small"
          value={filters.month}
          onChange={(e) => handleChange('month', e.target.value)}
          className="bg-gradient-to-t from-[#ee7623] to-[#f2e8ff] text-black rounded-full"
        />
        <TextField
          label="Year"
          type="number"
          size="small"
          value={filters.year}
          onChange={(e) => handleChange('year', e.target.value)}
          className="bg-gradient-to-t from-[#ee7623] to-[#f2e8ff] text-black rounded-full"
        />
        <Button
          variant="contained"
          onClick={handleFilter}
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-sm"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          onClick={handleClear}
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-sm"
          startIcon={<FilterAltOffIcon />}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-sm"
          startIcon={<FileUploadIcon />}
        >
          Bulk Upload
        </Button>
        <Button
          variant="contained"
          onClick={handleExportToExcel}
          className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-sm"
          startIcon={<DownloadIcon />}
        >
          Export to Excel
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461]">
              {['Sl', 'Employee ID', 'Date', 'Check In', 'Check Out', 'Time Difference', 'Status', 'Action'].map(
                (header) => (
                  <td key={header} className="text-white font-bold text-xs text-center h-10">
                    {header}
                  </td>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow
                  key={row.sl}
                  className="hover:bg-gradient-to-t from-[#ee7623] to-[#F4ECFF]"
                >
                  <TableCell className="text-black font-bold text-xs text-center">{row.sl}</TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">{row.empid}</TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">
                    {new Date(row.attendance_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">
                    {row.clock_in_time ? new Date(row.clock_in_time).toLocaleTimeString() : 'Not Available'}
                  </TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">
                    {row.clock_out_time ? new Date(row.clock_out_time).toLocaleTimeString() : 'Not Available'}
                  </TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">
                    {row.time_difference}
                  </TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">
                    {row.attendance_status}
                  </TableCell>
                  <TableCell className="text-black font-bold text-xs text-center">
                    <IconButton className="text-[#5A12CF]">
                      <EditIcon />
                    </IconButton>
                    <IconButton className="text-red-600">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No data available or unable to fetch data.
                </TableCell>
              </TableRow>
            )}
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
        rowsPerPageOptions={[10, 30, 50, 100]}
      />
    </section>
  );
};

export default AttendancePage; 