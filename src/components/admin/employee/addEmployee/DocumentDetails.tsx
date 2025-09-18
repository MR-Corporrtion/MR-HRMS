import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../../config/route.config"
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
  InputLabel,
  TablePagination,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

interface DocumentData {
  sl: number;
  empid: string;
  documentType: string;
  documentTitle: string;
  status: number;
  createdBy: string;
  updatedBy: string;
  documentFile?: File; // Optional file field for upload
}

const DocumentDetails: React.FC = () => {
  const [documentData, setDocumentData] = useState<DocumentData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<DocumentData>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null); // State to store selected file
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const router = useRouter();

  useEffect(() => {
    fetchDocumentData();
  }, []);

  const fetchDocumentData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/documents/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true });
      setDocumentData(response.data);
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
    setDocumentFile(null); // Reset file input
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('empid', formData.empid || '');
      formDataToSubmit.append('documentType', formData.documentType || '');
      formDataToSubmit.append('documentTitle', formData.documentTitle || '');
      formDataToSubmit.append('status', formData.status?.toString() || '');
      if (documentFile) {
        formDataToSubmit.append('documentFile', documentFile);
      }

      if (editingId === null) {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.post('/documents/create', formDataToSubmit, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true });
      } else {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.put(`/documents/update/${editingId}`, formDataToSubmit, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        });
      }
      fetchDocumentData();
      handleCloseDialog();
      router.push('/salaryProcess'); // Navigate to /documentDetails after submit
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/documents/delete/${id}`);
      fetchDocumentData();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDocumentData = documentData.filter((docu) =>
    docu.empid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredDocumentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

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
          label="Search by Employee ID"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />
          }}
          className="mr-4"
        />
      </div>
      <TableContainer className="bg-white shadow-md rounded-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461]">
              <TableCell className="text-white font-bold text-xs text-center">Sl. No.</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Employee ID</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Document Type</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Document Title</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Status</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((doc) => (
              <TableRow key={doc.sl}>
                <TableCell>{doc.sl}</TableCell>
                <TableCell>{doc.empid}</TableCell>
                <TableCell>{doc.documentType}</TableCell>
                <TableCell>{doc.documentTitle}</TableCell>
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

      {/* Pagination Control */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredDocumentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for Adding/Editing Documents */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <h2 className="text-lg font-bold">{editingId ? 'Edit Document' : 'Add Document'}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Employee ID"
                name="empid"
                value={formData.empid || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Document Type"
                name="documentType"
                value={formData.documentType || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Document Title"
                name="documentTitle"
                value={formData.documentTitle || ''}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
  <InputLabel>Status</InputLabel>
  <Select
    name="status"
    value={formData.status || ''}
    onChange={(e: SelectChangeEvent<number>) => handleChange(e)}
    fullWidth
  >
    <MenuItem value={0}>Inactive</MenuItem>
    <MenuItem value={1}>Active</MenuItem>
  </Select>
</Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSubmit} variant="contained" className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'>
                {editingId ? 'Update' : 'Add'} Document
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentDetails;
