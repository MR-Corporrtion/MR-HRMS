import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCompanyForm from './AddCompanyForm';
import {
  Table, 
  TableHead, 
  TableBody, 
  TableCell, 
  TableRow, 
  TableContainer, 
  Paper, 
  Button, 
  Typography,
  Dialog,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import axios from 'axios';
import { apiBaseURL, apiClient } from '../../../../config/route.config';
import Swal from 'sweetalert2';

const CompanyPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [companyid, setCompanyid] = useState<string>("");
  const [company_address, setCompany_address] = useState<string>("");

  const handleAddCompanyClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post(`/user/signup-user`, { 
        name,  
        email, 
        mobile, 
        password, 
        companyid,
        company_address
      },{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'ADMIN Credential Created successful',
          showConfirmButton: false,
          timer: 1500
        });
        setOpen(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup failed',
          text: 'Please try again later.',
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while signing up.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get(`/company/getbyid/${sessionStorage.getItem("companyId")}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch company data.',
        });
      }
    };
    fetchData();
  },[]);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
          await apiClient.delete(`/company/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setData(data.filter((item: any) => item.id !== id));
          Swal.fire(
            'Deleted!',
            'Company has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting company:', error);
          Swal.fire(
            'Error!',
            'Failed to delete company.',
            'error'
          );
        }
      }
    });
  };

  const handleAssignNewCompanyId = async (companyId: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post('/user/assign-companyid', { companyid: companyId }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
        console.log(response)
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Company ID Assigned',
          text: 'New company ID has been successfully assigned.',
          showConfirmButton: false,
          timer: 1500
        });
        // Update the access token in storage
        localStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('accessToken', response.data.accessToken);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Assignment Failed',
          text: response.data.msg || 'Failed to assign new company ID.',
        });
      }
    } catch (error) {
      console.error('Error assigning new company ID:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while assigning new company ID.',
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" component="h1">
          COMPANY
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCompanyClick}
        >
          Add Company
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#6B23CA' }}>
              <TableCell style={{ color: 'white' }}>Sl No.</TableCell>
              <TableCell style={{ color: 'white', cursor: 'pointer' }}>Company Name</TableCell>
              <TableCell style={{ color: 'white' }}>Phone</TableCell>
              <TableCell style={{ color: 'white' }}>Email</TableCell>
              <TableCell style={{ color: 'white' }}>Website</TableCell>
              <TableCell style={{ color: 'white' }}>Address</TableCell>
              <TableCell style={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((company, index) => (
              <TableRow key={company.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setCompanyid(company.companyid);
                    setName(company.compname);
                    setEmail(company.email);
                    setMobile(company.phone);
                    setCompany_address(company.company_address);
                  }}
                >
                  {company.compname}
                </TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.website}</TableCell>
                <TableCell>{company.company_address}</TableCell>
                <TableCell>
                  <button className="text-white hover:text-blue-500 mr-2 py-1 px-5 bg-[#5738DA] rounded-3xl">
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDelete(company.id)} className="text-white hover:text-red-700 py-1 px-5 bg-[#FF0000] rounded-3xl">
                    <DeleteIcon />
                  </button>
                  <Tooltip title="Assign New Company ID">
                    <IconButton onClick={() => handleAssignNewCompanyId(company.companyid)} color="primary">
                      <SwapHorizIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isFormOpen} onClose={handleFormClose}>
        <AddCompanyForm onClose={handleFormClose} />
      </Dialog>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={() => { setOpen(false); }}
      >
        <div className='w-full flex flex-col items-start justify-start gap-6 p-6'>
          <TextField
            autoFocus
            margin="dense"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone number"
            value={mobile}
            onChange={(e) => { setMobile(e.target.value); }}
            type="text"
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
              margin="dense"
              label="Company Address"
              type="text"
              fullWidth
              variant="outlined"
              value={company_address}
              onChange={(e) => setCompany_address(e.target.value)}
              required
            />
          <button
            type='button'
            onClick={handleSubmit}
            className='py-3 w-full bg-blue-500 uppercase font-bold text-white rounded-md'
          >
            Submit
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyPage;

