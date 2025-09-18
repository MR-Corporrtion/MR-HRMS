import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent
} from '@mui/material';

interface AttendanceFormProps {
  handleFormClose: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ handleFormClose }) => {
  const [formData, setFormData] = useState({
    empid: '',
    companyid: '',
    attendance_date: '',
    clock_in_time: '',
    clock_out_time: '',
    time_difference: 0,
    createdBy: '',
    updatedBy: '',
    status: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as number,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form Data:', formData);
    handleFormClose();
  };

  return (
    <Dialog open={true} onClose={handleFormClose} maxWidth="sm" fullWidth>
      <DialogTitle>Attendance Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee ID"
                name="empid"
                value={formData.empid}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Attendance Date"
                name="attendance_date"
                type="date"
                value={formData.attendance_date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Clock In Time"
                name="clock_in_time"
                type="time"
                value={formData.clock_in_time}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Clock Out Time"
                name="clock_out_time"
                type="time"
                value={formData.clock_out_time}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Time Difference (Hours)"
                name="time_difference"
                type="number"
                value={formData.time_difference}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created By"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Updated By"
                name="updatedBy"
                value={formData.updatedBy}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleSelectChange}
                  label="Status"
                >
                  <MenuItem value={1}>Present</MenuItem>
                  <MenuItem value={0}>Absent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleFormClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceForm;
