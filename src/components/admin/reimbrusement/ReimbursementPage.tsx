import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  Table, TableHead, TableBody, TableCell, TableRow, TableContainer,
  Paper, Typography, Button, TablePagination, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
} from '@mui/material';
import { apiClient } from '../../../../config/route.config';

interface Reimbursement {
  id: string;
  empid: string;
  reimbursementName: string;
  reimbursementAmount: string;
  reimbursementDate: string;
  description: string;
  reimbursementDocument: string;
  approvalStatus: '0' | '1' | '2'; // 0 = Pending, 1 = Approved, 2 = Rejected
}

const ReimbursementPage: React.FC = () => {
  const [reimbursementData, setReimbursementData] = useState<Reimbursement[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newReimbursement, setNewReimbursement] = useState<Reimbursement>({
    empid: '',
    reimbursementName: '',
    reimbursementAmount: '',
    reimbursementDate: '',
    description: '',
    reimbursementDocument: '',
    approvalStatus: '0', // default to Pending
    id: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchReimbursements = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get('/reimbursement/get', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (response.data?.data) {
          setReimbursementData(response.data.data);
        } else {
          console.error('Invalid API response format');
        }
      } catch (error) {
        console.error("Error fetching reimbursements:", error);
        alert("Failed to fetch reimbursements");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReimbursements();
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReimbursement((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddReimbursement = async () => {
    if (!newReimbursement.empid || !newReimbursement.reimbursementName || !newReimbursement.reimbursementAmount) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post('/reimbursement/create', newReimbursement, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setReimbursementData((prevData) => [...prevData, response.data.data]);
      handleClose();
    } catch (error) {
      console.error("Error adding reimbursement:", error);
      alert("Failed to add reimbursement");
    }
  };

  const handleApprove = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.patch(
        `/reimbursement/update/${empid}`,
        { approvalStatus: '1' }, // Approve status
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      if (response.data.success) {
        setReimbursementData((prevData) =>
          prevData.map((reimbursement) =>
            reimbursement.empid === empid ? { ...reimbursement, approvalStatus: '1' } : reimbursement
          )
        );
      }
    } catch (error) {
      console.error("Error approving reimbursement:", error);
      alert("Failed to approve reimbursement");
    }
  };

  const handleReject = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.patch(
        `/reimbursement/update/${empid}`,
        { approvalStatus: '2' }, // Reject status
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      if (response.data.success) {
        setReimbursementData((prevData) =>
          prevData.map((reimbursement) =>
            reimbursement.empid === empid ? { ...reimbursement, approvalStatus: '2' } : reimbursement
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting reimbursement:", error);
      alert("Failed to reject reimbursement");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusText = (status: '0' | '1' | '2') => {
    switch (status) {
      case '0':
        return 'Pending';
      case '1':
        return 'Approved';
      case '2':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full main-containerAdmin flex flex-col items-start gap-6 my-2">
      <div className="w-full flex justify-between items-center mb-4">
        <Typography variant="h4" component="h1">
          Reimbursement
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          className='bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Add Reimbursement
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["EMPLOYEE ID", "REIMBURSEMENT TYPE", "AMOUNT", "DETAIL", "DATE", "DOCUMENT", "STATUS", "ACTION"].map((header) => (
                <td key={header} className="text-white font-bold text-xs text-center bg-gradient-to-t from-[#ee7623] to-[#282461] h-10">{header}</td>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reimbursementData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reimbursement) => (
              <TableRow key={reimbursement.empid || reimbursement.id}>
                <TableCell className="text-black text-center">{reimbursement.empid || "N/A"}</TableCell>
                <TableCell className="text-black text-center">{reimbursement.reimbursementName}</TableCell>
                <TableCell className="text-black text-center">{reimbursement.reimbursementAmount}</TableCell>
                <TableCell className="text-black text-center">{reimbursement.description}</TableCell>
                <TableCell className="text-black text-center">{reimbursement.reimbursementDate}</TableCell>
                <TableCell className="text-black text-center">{reimbursement.reimbursementDocument}</TableCell>
                <TableCell className="text-black text-center">{getStatusText(reimbursement.approvalStatus)}</TableCell>
                <TableCell className="text-center">
                  <Button variant="contained" color="success" onClick={() => handleApprove(reimbursement.empid)}>Approve</Button>
                  <Button variant="contained" color="error" onClick={() => handleReject(reimbursement.empid)}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reimbursementData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Reimbursement</DialogTitle>
        <DialogContent>
          {["empid", "reimbursementName", "reimbursementAmount", "reimbursementDate", "description", "reimbursementDocument"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.replace(/([A-Z])/g, ' $1')}
              type={field === "reimbursementDate" ? "date" : "text"}
              fullWidth
              variant="outlined"
              value={newReimbursement[field as keyof Reimbursement] || ''}
              onChange={handleInputChange}
              InputLabelProps={field === "reimbursementDate" ? { shrink: true } : undefined}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white">Cancel</Button>
          <Button onClick={handleAddReimbursement} className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white">Submit</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default ReimbursementPage;
