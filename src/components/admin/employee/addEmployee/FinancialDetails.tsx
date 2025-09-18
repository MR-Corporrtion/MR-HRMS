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

interface DocumentData {
  sl: number;
  empid: string;
  bankname: string;
  branchname: string;
  ifsc_code: string;
  bankaccountnumber: string;
  status: number;
  createdBy: string;
  updatedBy: string;
}

const DocumentDetails: React.FC = () => {
  const [documentData, setDocumentData] = useState<DocumentData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<DocumentData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    fetchDocumentData();
  }, []);

  const fetchDocumentData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/bankdetail/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true
      });
      setDocumentData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = (id?: number) => {
    if (id !== undefined) {
      const document = documentData.find((doc) => doc.sl === id);
      if (document) {
        setFormData(document);
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
        await apiClient.post('/bankdetail/create', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true
        });
      } else {
        await apiClient.post(`/bankdetail/update/${editingId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true
        });
      }
      fetchDocumentData();
      handleCloseDialog();
      window.location.reload(); // Navigate to /documentDetails after submit
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/bankdetail/delete/${id}`);
      fetchDocumentData();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDocumentData = documentData.filter((doc) =>
    doc.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Slicing the filtered data for pagination
  const paginatedData = filteredDocumentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Document Details</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Add Document
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
          onClick={() => fetchDocumentData()}
          className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Search
        </Button>
      </div>
      <TableContainer className="bg-white shadow-md rounded-md">
        <Table>
          <TableHead>
            <TableRow className=" bg-gradient-to-t from-[#ee7623] to-[#282461]">
              <TableCell className="text-white font-bold text-xs text-center">Sl. No.</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Employee ID</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Bank Name</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Bank Branch</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Account Number</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">IFSC Code</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Status</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((doc) => (
              <TableRow key={doc.sl}>
                <TableCell>{doc.sl}</TableCell>
                <TableCell>{doc.empid}</TableCell>
                <TableCell>{doc.bankname}</TableCell>
                <TableCell>{doc.branchname}</TableCell>
                <TableCell>{doc.bankaccountnumber}</TableCell>
                <TableCell>{doc.ifsc_code}</TableCell>
                <TableCell>{doc.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(doc.sl)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(doc.sl)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDocumentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Document' : 'Add Document'}</h2>
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
                label="Bank Name"
                name="bankname"
                value={formData.bankname || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Branch Name"
                name="branchname"
                value={formData.branchname || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Account Number"
                name="bankaccountnumber"
                value={formData.bankaccountnumber || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code || ''}
                onChange={handleInputChange}
              />
            </Grid>
            {/* Add other fields as needed */}
          </Grid>
          <div className="mt-4">
            <Button variant="contained" className=' bg-gradient-to-t from-[#ee7623] to-[#282461]' onClick={handleSubmit}>
              {editingId ? 'Update Document' : 'Add Document'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentDetails;
