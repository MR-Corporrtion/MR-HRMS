import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../../config/route.config";
import { Dialog, DialogContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Grid, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

interface ExperienceData {
  sl: number;
  empid: string;
  nameOfOrganization: string;
  typeOfDocument: string;
  documentTitle: string;
  workingDurationStart: string;
  workingDurationEnd: string;
  status: number;
}

const ExperienceDetails: React.FC = () => {
  const [experienceData, setExperienceData] = useState<ExperienceData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    fetchExperienceData();
  }, []);

  const fetchExperienceData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/experience/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });
      setExperienceData(response.data);
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  const handleOpenDialog = (id?: number) => {
    if (id !== undefined) {
      const experience = experienceData.find((e) => e.sl === id);
      if (experience) {
        setFormData(experience);
        setEditingId(id);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (editingId === null) {
        await apiClient.post('/experience/create', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true
        });
      } else {
        await apiClient.put(`/experience/update/${editingId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true
        });
      }
      fetchExperienceData();
      handleCloseDialog();
      window.location.reload(); // Adjust if needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete(`/experience/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });
      fetchExperienceData();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredExperienceData = experienceData.filter((exp) =>
    exp.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredExperienceData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Experience Details</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
           className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Add Experience
        </Button>
      </div>
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
          onClick={() => fetchExperienceData()}
           className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Search
        </Button>
      </div>
      <TableContainer className="bg-white shadow-md rounded-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461]">
              <TableCell className="text-white font-bold text-xs text-center">ID</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Emp ID</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Organization</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Document Type</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Document Title</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Start Date</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">End Date</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((exp) => (
              <TableRow key={exp.sl}>
                <TableCell>{exp.sl}</TableCell>
                <TableCell>{exp.empid}</TableCell>
                <TableCell>{exp.nameOfOrganization}</TableCell>
                <TableCell>{exp.typeOfDocument}</TableCell>
                <TableCell>{exp.documentTitle}</TableCell>
                <TableCell>{exp.workingDurationStart}</TableCell>
                <TableCell>{exp.workingDurationEnd}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(exp.sl)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(exp.sl)}>
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
        count={filteredExperienceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="empid"
                value={formData.empid || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organization"
                name="nameOfOrganization"
                value={formData.nameOfOrganization || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Document Type"
                name="typeOfDocument"
                value={formData.typeOfDocument || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Document Title"
                name="documentTitle"
                value={formData.documentTitle || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="workingDurationStart"
                value={formData.workingDurationStart || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="workingDurationEnd"
                value={formData.workingDurationEnd || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="mt-4 bg-gradient-to-t from-[#ee7623] to-[#282461]"
          >
            {editingId ? 'Update' : 'Submit'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceDetails;
