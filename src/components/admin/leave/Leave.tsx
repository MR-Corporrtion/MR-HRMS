import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { leave } from '@/src/assets/admin/adminicon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { apiClient } from '../../../../config/route.config';

const LeavePage: React.FC = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust as needed

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token =
          localStorage.getItem('accessToken') ||
          sessionStorage.getItem('accessToken');
        const response = await apiClient.get('/leave/getall', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };
    fetchLeaves();
  }, []);

  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (leave: any) => {
    console.log(`Editing leave for employee ID: ${leave.empid}`);
    // Logic to open the edit dialog goes here
  };

  const handleDeleteLeave = (empid: string) => {
    console.log(`Deleting leave for employee ID: ${empid}`);
    // Logic to delete the leave goes here
  };

  return (
    <section className="w-full main-containerAdmin flex flex-col items-start justify-start gap-6 my-2">
      <div className="w-full flex flex-col gap-8">
        <span className="flex items-center justify-start gap-2">
          <p className="text-2xl text-[#282461] flex gap-3 font-semibold">
            <img src={leave.src} alt="" className="h-6" />
            Leave
          </p>
        </span>
      </div>
      <div className="w-full shadow-lg">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461] w-full h-10">
                <td className="text-white font-bold text-xs text-center ">
                  Employee ID
                </td>
                <td className="text-white font-bold text-xs text-center ">
                  Leave Date
                </td>
                <td className="text-white font-bold text-xs text-center ">
                  Leave Type
                </td>
                <td className="text-white font-bold text-xs text-center ">
                  Leave Name
                </td>
                <td className="text-white font-bold text-xs text-center ">
                  Status
                </td>
                <td className="text-white font-bold text-xs text-center ">
                  Actions
                </td>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((leave) => (
                  <TableRow key={leave.empid}>
                    <TableCell className="text-black font-bold text-center">
                      {leave.empid}
                    </TableCell>
                    <TableCell className="text-black font-bold text-center">
                      {leave.leave_date}
                    </TableCell>
                    <TableCell className="text-black font-bold text-center">
                      {leave.leave_type}
                    </TableCell>
                    <TableCell className="text-black font-bold text-center">
                      {leave.leavename}
                    </TableCell>
                    <TableCell className="text-black font-bold text-center">
                      {leave.approval_status === '0'
                        ? 'Pending'
                        : leave.approval_status === '1'
                        ? 'Approved'
                        : 'Rejected'}
                    </TableCell>
                    <TableCell className="flex justify-between">
                      <button
                        onClick={() => handleOpenDialog(leave)}
                        className="text-yellow-500"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteLeave(leave.empid)}
                        className="text-red-500"
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={leaves.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
};

export default LeavePage;
