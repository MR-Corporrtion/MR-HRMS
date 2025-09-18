import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../config/route.config";
import {
  Button,
  Dialog,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

interface SalaryAdvance {
  sl?: number;
  empid: string;
  date: string;
  amount: string;
  principalAmount: string;
  emi: string;
  totalInterest: string;
  outstandingAmount: string;
  reason: string;
  type: string;
  roi?: string;
  tenureInMonths?: string;
  approvalStatus?:'0'|'1'|'2';
}

const SalaryAdvanceForm: React.FC<{
  selectedSalaryAdvance: SalaryAdvance | null;
  onSubmit: (data: SalaryAdvance) => void;
  onClose: () => void;
}> = ({ selectedSalaryAdvance, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<SalaryAdvance>({
    empid: '',
    date: '',
    amount: '',
    principalAmount: '',
    emi: '',
    totalInterest: '',
    outstandingAmount: '',
    reason: '',
    type: 'advance',
    approvalStatus: '0',
  });

  useEffect(() => {
    if (selectedSalaryAdvance) {
      setFormData(selectedSalaryAdvance);
    } else {
      setFormData({
        empid: '',
        date: '',
        amount: '',
        principalAmount: '',
        emi: '',
        totalInterest: '',
        outstandingAmount: '',
        reason: '',
        type: 'advance',
        approvalStatus: '0',
      });
    }
  }, [selectedSalaryAdvance]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | { value: unknown; name?: string; }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement | { name?: string; value: unknown; };
    setFormData({ ...formData, [name!]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">{selectedSalaryAdvance ? 'Edit' : 'Add'} Salary Advance</Typography>
      <TextField
        label="Employee ID"
        name="empid"
        value={formData.empid}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={(event: SelectChangeEvent<string>) => {
            handleChange(event);
          }}
          required
        >
          <MenuItem value="advance">Advance</MenuItem>
          <MenuItem value="loan">Loan</MenuItem>
        </Select>
      </FormControl>
      {formData.type === 'loan' && (
        <>
          <TextField
            label="Rate of Interest"
            name="roi"
            type="number"
            value={formData.roi || ''}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Tenure in Months"
            name="tenureInMonths"
            type="number"
            value={formData.tenureInMonths || ''}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </>
      )}
      <TextField
        label="Reason"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Approval Status</InputLabel>
        <Select
          name="approvalStatus"
          value={formData.approvalStatus || 'Pending'}
          onChange={(event: SelectChangeEvent<string>) => {
            handleChange(event);
          }}
          required
        >
          <MenuItem value="0">Pending</MenuItem>
          <MenuItem value="1">Approved</MenuItem>
          <MenuItem value="2">Rejected</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" className='bg-gradient-to-t from-[#ee7623] to-[#282461]' fullWidth>
        {selectedSalaryAdvance ? 'Update' : 'Add'} Salary Advance
      </Button>
    </form>
  );
};

const SalaryAdvanceTable: React.FC<{ salaryAdvances: SalaryAdvance[]; onEdit: (salaryAdvance: SalaryAdvance) => void; }> = ({ salaryAdvances, onEdit }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow className='bg-gradient-to-t from-[#ee7623] to-[#282461] h-10'>
          <td className='text-white'>Date</td>
          <td className='text-white'>Employee ID</td>
          <td className='text-white'>Type</td>
          <td className='text-white'>Amount</td>
          <td className='text-white'>Reason</td>
          <td className='text-white'>EMI</td>
          <td className='text-white'>Total Interest</td>
          <td className='text-white'>Rate of Interest</td>
          <td className='text-white'>Tenure (Months)</td>
          <td className='text-white'>Outstanding Amount</td>
          <td className='text-white'>Approval Status</td>
          <td className='text-white'>Actions</td>
        </TableRow>
      </TableHead>
      <TableBody>
        {salaryAdvances.map((advance) => (
          <TableRow key={advance.empid}>
            <TableCell>{advance.date}</TableCell>
            <TableCell>{advance.empid}</TableCell>
            <TableCell>{advance.type}</TableCell>
            <TableCell>{advance.amount}</TableCell>
            <TableCell>{advance.reason}</TableCell>
            <TableCell>{advance.emi}</TableCell>
            <TableCell>{advance.totalInterest}</TableCell>
            <TableCell>{advance.roi}</TableCell>
            <TableCell>{advance.tenureInMonths}</TableCell>
            <TableCell>{advance.outstandingAmount}</TableCell>
            <TableCell>{advance.approvalStatus == '1' ? 'Approved' : advance.approvalStatus == '2' ?  'Rejected':'Not Approved'}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(advance)}>Edit</Button>
              {/* Add delete functionality if needed */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const SalaryAdvanceManager: React.FC = () => {
  const [salaryAdvances, setSalaryAdvances] = useState<SalaryAdvance[]>([]);
  const [selectedSalaryAdvance, setSelectedSalaryAdvance] = useState<SalaryAdvance | null>(null);
  const [open, setOpen] = useState(false);

  const fetchSalaryAdvances = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/salary-advance/get', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setSalaryAdvances(response.data.data);
    } catch (error) {
      console.error("Error fetching salary advances:", error);
    }
  };

  useEffect(() => {
    fetchSalaryAdvances();
  }, []);

  const handleSubmit = async (data: SalaryAdvance) => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    try {
      if (selectedSalaryAdvance) {
        await apiClient.put(`/salary-advance/update/${selectedSalaryAdvance.empid}`, data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        await apiClient.post('/salary-advance/create', data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
      fetchSalaryAdvances();
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleEdit = (salaryAdvance: SalaryAdvance) => {
    setSelectedSalaryAdvance(salaryAdvance);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedSalaryAdvance(null);
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" className='bg-gradient-to-t from-[#ee7623] to-[#282461]' onClick={() => { setSelectedSalaryAdvance(null); setOpen(true); }}>
        Add Salary Advance
      </Button>
      <SalaryAdvanceTable salaryAdvances={salaryAdvances} onEdit={handleEdit} />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <SalaryAdvanceForm
            selectedSalaryAdvance={selectedSalaryAdvance}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SalaryAdvanceManager;
