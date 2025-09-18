import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../config/route.config";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface Shift {
  shift_id: string;
  shift_name: string;
  shift_start_time: string;
  shift_end_time: string;
}

const ShiftPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shiftData, setShiftData] = useState({
    shift_id: '',
    shift_name: '',
    shift_start_time: '',
    shift_end_time: '',
  });
  const [shifts, setShifts] = useState<Shift[]>([]);

  // Fetch all shifts from backend
  const fetchShifts = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/company-shift/get',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      }); // Replace with actual API endpoint
      if (response.data.success) {
        setShifts(response.data.data); // Assuming response contains an array of shifts in 'data'
      }
    } catch (error) {
      console.error('Error fetching shifts:', error);
    }
  };

  useEffect(() => {
    fetchShifts(); // Fetch shifts on component mount
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShiftData({ ...shiftData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post('/company-shift/create', shiftData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      ); 
      if (response.data.success==true) {
        alert('Shift added successfully!');
        setIsOpen(false); 
        fetchShifts(); // Refresh the shift list
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('Error adding shift:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Company Shifts</h1>

      {/* Add Shift Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
        className="mb-6 bg-gradient-to-t from-[#ee7623] to-[#282461]">
        Add Shift
      </Button>

      {/* Shifts Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gradient-to-t from-[#ee7623] to-[#282461] text-white text-left">
              <th className="py-2 px-4 text-center">Shift ID</th>
              <th className="py-2 px-4 text-center">Shift Name</th>
              <th className="py-2 px-4 text-center">Start Time</th>
              <th className="py-2 px-4 text-center">End Time</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No shifts available.
                </td>
              </tr>
            ) : (
              shifts.map((shift) => (
                <tr key={shift.shift_id} className="border-t">
                  <td className="py-2 px-4 text-center">{shift.shift_id}</td>
                  <td className="py-2 px-4 text-center">{shift.shift_name}</td>
                  <td className="py-2 px-4 text-center">{shift.shift_start_time}</td>
                  <td className="py-2 px-4 text-center">{shift.shift_end_time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MUI Dialog for Add Shift Form */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Shift</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* <TextField
              label="Shift ID"
              name="shift_id"
              value={shiftData.shift_id}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            /> */}
            <TextField
              label="Shift Name"
              name="shift_name"
              value={shiftData.shift_name}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              label="Shift Start Time"
              type="time"
              name="shift_start_time"
              value={shiftData.shift_start_time}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              label="Shift End Time"
              type="time"
              name="shift_end_time"
              value={shiftData.shift_end_time}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} className='bg-gradient-to-t from-[#ee7623] to-[#282461] text-white'>
              Cancel
            </Button>
            <Button type="submit" className='bg-gradient-to-t from-[#ee7623] to-[#282461] text-white'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ShiftPage;
