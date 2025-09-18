import React, { useEffect, useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { apiBaseURL, apiClient } from '../../../../config/route.config';
import Swal from 'sweetalert2';

interface AddCompanyFormProps {
  onClose: () => void;
}

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ onClose }) => {
  const [compname, setCompname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [parent_id, setParent_id] = useState<string>("");
  const [company_address, setCompany_address] = useState<string>("");

  useEffect(() => {
    const companyId = sessionStorage.getItem("companyId");
    if (companyId) {
      setParent_id(companyId);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post(`/company/create-child-company`, { 
        compname, 
        email, 
        phone, 
        website, 
        parent_id,
        company_address
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Company Created',
          text: 'The new company has been created successfully!',
        });
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Creation Failed',
          text: 'Failed to create the company. Please try again.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the company.',
      });
    } finally {
      setCompname("");
      setEmail("");
      setPhone("");
      setWebsite("");
      setCompany_address("");
    }
  };

  return (
    <Box component="form" sx={{ width: '400px' }}>
      <DialogTitle>Add New Company</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Company Name"
          type="text"
          fullWidth
          variant="outlined"
          value={compname}
          onChange={(e) => setCompname(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Website of Company"
          type="text"
          fullWidth
          variant="outlined"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Company Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Company Phone Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Company Adress"
          type="text"
          fullWidth
          variant="outlined"
          value={company_address}
          onChange={(e) => setCompany_address(e.target.value)}
          required
        />
        
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Box>
  );
};

export default AddCompanyForm;
