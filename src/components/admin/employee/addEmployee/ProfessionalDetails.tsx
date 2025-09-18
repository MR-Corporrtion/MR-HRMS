


import React, { useState, useEffect } from "react";
import axios from "axios";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

interface ProfessionalDetailsFormValues {
  empid: string;
  companyName: string;
  designation: string;
  department: string;
  subDepartment: string;
  location: string;
  division: string;
  grade: string;
  reportingManagerName: string;
  employmentType: string;
  hiring_date: string;
  workEmailID: string;
  cugNumber: string;
  biometricID: string;
  panNumber: string;
  aadhaarNumber: string;
  uanNumber: string;
  esicNumber: string;
  voterIDNumber: string;
  drivingLicense: string;
  status: string;
}

const ProfessionalDetails: React.FC = () => {
  const [professionalData, setProfessionalData] = useState<
    ProfessionalDetailsFormValues[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Partial<ProfessionalDetailsFormValues>>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProfessionalData();
  }, []);

  const fetchProfessionalData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get(
        "/professional/getall",
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true }
      );
      setProfessionalData(response.data);
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  const handleOpenDialog = (empid?: string) => {
    if (empid) {
      const dataToEdit = professionalData.find((data) => data.empid === empid);
      if (dataToEdit) {
        setFormValues(dataToEdit);
        setEditingId(empid);
      }
    } else {
      setFormValues({});
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormValues({});
    setEditingId(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filteredData = professionalData.filter((data) =>
        data.empid.includes(searchTerm)
      );
      setProfessionalData(filteredData);
    } else {
      fetchProfessionalData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.put(
          `/professional/update/${editingId}`,
          formValues,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }, withCredentials: true }
        );
        alert("Employee details updated successfully!");
      } else {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.post(
          `/professional/create`,
          formValues,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }, withCredentials: true }
        );
        alert("Employee details created successfully!");
      }
      fetchProfessionalData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating/creating employee details:", error);
      alert("Failed to update/create employee details.");
    }
  };

  const handleDelete = async (empid: string) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete(
        `/professional/delete/${empid}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true }
      );
      alert("Employee details deleted successfully!");
      fetchProfessionalData();
    } catch (error) {
      console.error("Error deleting employee details:", error);
      alert("Failed to delete employee details.");
    }
  };

  return (
    <div>
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
          onClick={handleSearch}
          className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Search
        </Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        className=' bg-gradient-to-t from-[#ee7623] to-[#282461]'
      >
        Add Professional Details
      </Button>
      <TableContainer  className="bg-white shadow-md rounded-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461]">
              <TableCell className="text-white font-bold text-xs text-center">Emp ID</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Company Name</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Designation</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Department</TableCell>
              <TableCell className="text-white font-bold text-xs text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(professionalData) && 
  professionalData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
              <TableRow key={data.empid}>
                <TableCell>{data.empid}</TableCell>
                <TableCell>{data.companyName}</TableCell>
                <TableCell>{data.designation}</TableCell>
                <TableCell>{data.department}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(data.empid)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(data.empid)}>
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
        count={professionalData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            {editingId ? "Edit Professional Details" : "Add Professional Details"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Employee id"
                  name="empid"
                  value={formValues.empid || ""}
                  onChange={handleChange}
                  disabled={!!editingId}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formValues.companyName || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formValues.designation || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={formValues.department || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sub Department"
                  name="subDepartment"
                  value={formValues.subDepartment || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formValues.location || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Division"
                  name="division"
                  value={formValues.division || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Grade"
                  name="grade"
                  value={formValues.grade || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reporting Manager Name"
                  name="reportingManagerName"
                  value={formValues.reportingManagerName || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Employment Type"
                  name="employmentType"
                  value={formValues.employmentType || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Hire"
                  name="hiring_date"
                  value={formValues.hiring_date || ""}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Work Email ID"
                  name="workEmailID"
                  value={formValues.workEmailID || ""}
                  onChange={handleChange}
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CUG Number"
                  name="cugNumber"
                  value={formValues.cugNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Biometric ID"
                  name="biometricID"
                  value={formValues.biometricID || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PAN Number"
                  name="panNumber"
                  value={formValues.panNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Aadhaar Number"
                  name="aadhaarNumber"
                  value={formValues.aadhaarNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="UAN Number"
                  name="uanNumber"
                  value={formValues.uanNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ESIC Number"
                  name="esicNumber"
                  value={formValues.esicNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Voter ID Number"
                  name="voterIDNumber"
                  value={formValues.voterIDNumber || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Driving License"
                  name="drivingLicense"
                  value={formValues.drivingLicense || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formValues.status || ""}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </Select>
                  <FormHelperText>
                    Select the current employment status
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Button onClick={handleCloseDialog}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  {editingId ? "Update" : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalDetails;
