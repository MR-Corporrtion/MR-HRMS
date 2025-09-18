
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {apiClient} from "../../../../../config/route.config"
import {
  Dialog,
  DialogContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TablePagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

interface PersonalDetailsData {
  empid: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  employee_type: string;
  email: string;
  date_of_birth: string;
  material_status: string;
  blood_group: string;
  nationality: string;
  phone_number: string;
  emergency_phone_number: string;
  alternative_phone_number: string;
  religion: string;
  gender: string;
  permanent_address: string;
  address: string;
  currentDistrict: string;
  currentState: string;
  dempid: string;
  desigid: string;
  shiftid: string;
  mobile: string;
  registrationFee:string;
  paidRegistrationFee:string;
  formulaHead:number;
}

const PersonalDetails: React.FC = () => {
  const [personalDetailsData, setPersonalDetailsData] = useState<PersonalDetailsData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PersonalDetailsData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isSameAddress, setIsSameAddress] = useState(false); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      fetchEmployeeDetails(searchTerm);
    } else {
      fetchAllPersonalDetails();
    }
  }, [searchTerm]);

  const fetchAllPersonalDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/employee/getall', {
         headers: {
        'Authorization': `Bearer ${token}`,
      }, withCredentials: true });
      setPersonalDetailsData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };

  const fetchEmployeeDetails = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get(`/getemployeebyid/${empid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setPersonalDetailsData([response.data.data]);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleOpenDialog = (empid?: string) => {
    if (empid) {
      const employee = personalDetailsData.find((e) => e.empid === empid);
      if (employee) {
        setFormData(employee);
        setEditingId(empid);
      }
    } else {
      setFormData({});
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
    setEditingId(null);
  };

  const filteredpersonalDetailsData = personalDetailsData.filter((edu) =>
    edu.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("object",formData)
      if (editingId === null) {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.post('/employee/create-employee', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
      } else {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.put(`/employee/update-single/${editingId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }
      fetchAllPersonalDetails();
      handleCloseDialog();
      alert('Employee details updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating employee details:', error);
      alert('Failed to update employee details');
    }
  };

  const handleDelete = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete(`/employee/delete/${empid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchAllPersonalDetails();
    } catch (error) {
      console.error('Error deleting employee details:', error);
    }
  };


  const handleCheckboxChange = (e:any) => {
    setIsSameAddress(e.target.checked);
    if (e.target.checked) {
      // If checkbox is checked, set present address to permanent address
      setFormData((prev) => ({
        ...prev,
        address: prev.permanent_address,
      }));
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4 flex items-center">
        <TextField
          variant="outlined"
          label="Search by Emp ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          onClick={() => fetchEmployeeDetails(searchTerm)}
          className="mr-2 bg-gradient-to-t from-[#ee7623] to-[#282461]"
        >
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className="ml-auto bg-gradient-to-t from-[#ee7623] to-[#282461]"
        >
          Add Employee
        </Button>
      </div>
      <Typography variant="h4" gutterBottom>
        Personal Details
      </Typography>
      <TableContainer className="bg-white shadow-md rounded-md" >
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461]">
              <TableCell className="text-white font-bold text-xs text-center">Emp ID</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">First Name</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Last Name</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Email</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Mobile</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(personalDetailsData) && 
  personalDetailsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.empid}>
                <TableCell>{row.empid}</TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenDialog(row.empid)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(row.empid)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={personalDetailsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {editingId ? 'Edit Employee Details' : 'Add New Employee'}
          </Typography>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="empid"
                value={formData.empid || ''}
                onChange={handleInputChange}
              />
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middle_name"
                value={formData.middle_name || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name || ''}
                onChange={handleInputChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Employee Type"
                name="employee_type"
                value={formData.employee_type || ''}
                onChange={handleInputChange}
              />
              
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Formula Head"
                name="formulaHead"
                type="formulaHead"
                value={formData.formulaHead || ''}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth || ''}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marital Status"
                name="material_status"
                value={formData.material_status || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="blood_group"
                value={formData.blood_group || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nationality"
                name="nationality"
                value={formData.nationality || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Phone Number"
                name="emergency_phone_number"
                value={formData.emergency_phone_number || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Alternative Phone Number"
                name="alternative_phone_number"
                value={formData.alternative_phone_number || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Religion"
                name="religion"
                value={formData.religion || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                name="dempid"
                value={formData.dempid || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designation"
                name="desigid"
                value={formData.desigid || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shift"
                name="shiftid"
                value={formData.shiftid || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                name="currentDistrict"
                value={formData.currentDistrict || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="currentState"
                value={formData.currentState || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Permanent Address"
                name="permanent_address"
                value={formData.permanent_address || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Present Address"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSameAddress}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Is Present Address the same as Permanent Address?"
        />
      </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleInputChange}
              />
            </Grid> */}
          </Grid>
          <div className="mt-4 flex justify-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {editingId ? 'Update' : 'Add'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseDialog} className="ml-2">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalDetails;

