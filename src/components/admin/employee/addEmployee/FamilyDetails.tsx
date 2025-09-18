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
  TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

interface FamilyData {
  sl: number;
  empid: string;
  relativeName: string;
  relation: string;
  relative_dob: string;
  bloodGroup: string;
  status: number;
}

const FamilyDetails: React.FC = () => {
  const [familyData, setFamilyData] = useState<FamilyData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FamilyData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    fetchFamilyData();
  }, []);

  const fetchFamilyData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/familydetail/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });
      setFamilyData(response.data);
    } catch (error) {
      console.error('Error fetching family data:', error);
    }
  };

  const handleOpenDialog = (empid?: string) => {
    if (empid !== undefined) {
      const familyMember = familyData.find((f) => f.empid === empid);
      if (familyMember) {
        setFormData(familyMember);
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
        await apiClient.post('/familydetail/create', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true
        });
      } else {
        await apiClient.put(`/familydetail/update/${editingId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true
        });
      }
      fetchFamilyData();
      handleCloseDialog();
      window.location.reload(); // Adjust if needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/family/delete/${id}`);
      fetchFamilyData();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredFamilyData = familyData.filter((fam) =>
    fam.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Family Details</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Add Family Member
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
          onClick={() => fetchFamilyData()}
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
              <TableCell className="text-white font-bold text-xs text-center">Name</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Relationship</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Date of Birth</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Blood Group</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFamilyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((family) => (
              <TableRow key={family.sl}>
                <TableCell>{family.sl}</TableCell>
                <TableCell>{family.empid}</TableCell>
                <TableCell>{family.relativeName}</TableCell>
                <TableCell>{family.relation}</TableCell>
                <TableCell>{family.relative_dob}</TableCell>
                <TableCell>{family.bloodGroup}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(family.empid)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(family.sl)}>
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
        count={filteredFamilyData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Family Member' : 'Add Family Member'}</h2>
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
                label="Name"
                name="relativeName"
                value={formData.relativeName || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Relationship"
                name="relation"
                value={formData.relation || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="relative_dob"
                type="date"
                value={formData.relative_dob || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup || ''}
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
            {editingId ? 'Update' : 'Add'} Family Member
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyDetails;
