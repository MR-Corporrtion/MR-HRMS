import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../../config/route.config";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';

interface EducationData {
  sl: number;
  empid: string;
  degree: string;
  university: string;
  board: string;
  passingYear: number;
  passingPercentage: number;
  division: string;
  status: number;
}

const EducationDetails: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<EducationData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/education/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, 
        withCredentials: true 
      });
      setEducationData(response.data);
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  const handleOpenDialog = (id?: number) => {
    if (id !== undefined) {
      const education = educationData.find((e) => e.sl === id);
      if (education) {
        setFormData(education);
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

  const handleInputChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInputChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (editingId === null) {
        await apiClient.post('/education/create', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        });
      } else {
        await apiClient.post(`/education/update/${editingId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        });
      }
      fetchEducationData();
      handleCloseDialog();
      window.location.reload();// Navigate to /education after submit
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete(`/education/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          withCredentials: true 
        },
      });
      fetchEducationData();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEducationData = educationData.filter((edu) =>
    edu.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination handlers
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
        <h1 className="text-2xl font-bold">Education Details</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Add Education
        </Button>
      </div>
      <div className="mb-4 flex items-center">
        <TextField
          variant="outlined"
          label="Search by Emp ID "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          onClick={() => fetchEducationData()}
          className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Search
        </Button>
      </div>
      <TableContainer className="bg-white shadow-md rounded-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461]">
              <TableCell className="text-white font-bold text-xs text-center">Sl. No.</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">empid</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Degree</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">University</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Board</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Passing Year</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Percentage</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Division</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEducationData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((edu) => (
              <TableRow key={edu.sl}>
                <TableCell>{edu.sl}</TableCell>
                <TableCell>{edu.empid}</TableCell>
                <TableCell>{edu.degree}</TableCell>
                <TableCell>{edu.university}</TableCell>
                <TableCell>{edu.board}</TableCell>
                <TableCell>{edu.passingYear}</TableCell>
                <TableCell>{edu.passingPercentage}</TableCell>
                <TableCell>{edu.division}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(edu.sl)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(edu.sl)}>
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
        count={filteredEducationData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Education' : 'Add Education'}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                name="empid"
                value={formData.empid || ''}
                onChange={handleInputChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Degree</InputLabel>
                <Select
                  name="degree"
                  value={formData.degree || ''}
                  onChange={handleInputChangeSelect}
                >
                  <MenuItem value="10th">10th</MenuItem>
                  <MenuItem value="+2">+2</MenuItem>
                  <MenuItem value="BSc">BSc</MenuItem>
                  <MenuItem value="BA">BA</MenuItem>
                  <MenuItem value="BE">BE</MenuItem>
                  <MenuItem value="BBA">BBA</MenuItem>
                  <MenuItem value="BCA">BCA</MenuItem>
                  <MenuItem value="B.TECH">B.TECH</MenuItem>
                  <MenuItem value="MSc">MSc</MenuItem>
                  <MenuItem value="MBA">MBA</MenuItem>
                  <MenuItem value="MCA">MCA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="University"
                name="university"
                value={formData.university || ''}
                onChange={handleInputChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Board"
                name="board"
                value={formData.board || ''}
                onChange={handleInputChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passing Year"
                type="number"
                name="passingYear"
                value={formData.passingYear || ''}
                onChange={handleInputChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passing Percentage"
                type="number"
                name="passingPercentage"
                value={formData.passingPercentage || ''}
                onChange={handleInputChangeTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Division"
                name="division"
                value={formData.division || ''}
                onChange={handleInputChangeTextField}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSubmit} className="mt-4 bg-gradient-to-t from-[#ee7623] to-[#282461]">
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationDetails;
