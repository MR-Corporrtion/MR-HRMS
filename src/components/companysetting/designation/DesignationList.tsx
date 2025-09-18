// import React, { useEffect, useState } from 'react';
// import { apiClient } from "../../../../config/route.config";

// interface Designation {
//   sl: number;
//   desigcode: string;
//   designame: string;
//   parentcode: string;
//   dcodelevel: string;
//   companyid: string; // Add companyid here if it's required
// }

// const DesignationPage: React.FC = () => {
//   const [designations, setDesignations] = useState<Designation[]>([]);
//   const [formData, setFormData] = useState({
//     desigcode: '',
//     designame: '',
//     parentcode: '',
//     dcodelevel: '',
//     companyid: '', // Add companyid here
//   });
//   const [editing, setEditing] = useState(false);
//   const [currentId, setCurrentId] = useState<number | null>(null);

//   useEffect(() => {
//     fetchDesignations();
//   }, []);

//   const fetchDesignations = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const response = await apiClient.get('/designation/getall', {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setDesignations(response.data);
//     } catch (error) {
//       console.error('Error fetching designations:', error);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       const url = editing && currentId !== null
//         ? `/designation/update/${currentId}`
//         : '/designation/create';

//       const response = await apiClient({
//         method: editing && currentId !== null ? 'patch' : 'post',
//         url,
//         data: formData,
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       console.log('Response:', response.data.message);
//       setFormData({ desigcode: '', designame: '', parentcode: '', dcodelevel: '', companyid: '' });
//       setEditing(false);
//       fetchDesignations();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleEdit = (designation: Designation) => {
//     setFormData({
//       desigcode: designation.desigcode,
//       designame: designation.designame,
//       parentcode: designation.parentcode,
//       dcodelevel: designation.dcodelevel,
//       companyid: designation.companyid, // Ensure companyid is set when editing
//     });
//     setCurrentId(designation.sl);
//     setEditing(true);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//       await apiClient.delete(`/designation/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       fetchDesignations();
//     } catch (error) {
//       console.error('Error deleting designation:', error);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Designation Management</h1>

//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="desigcode"
//             value={formData.desigcode}
//             onChange={handleChange}
//             placeholder="Designation Code"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="designame"
//             value={formData.designame}
//             onChange={handleChange}
//             placeholder="Designation Name"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="parentcode"
//             value={formData.parentcode}
//             onChange={handleChange}
//             placeholder="Parent Code"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="dcodelevel"
//             value={formData.dcodelevel}
//             onChange={handleChange}
//             placeholder="Code Level"
//             className="p-2 border border-gray-300 rounded"
//           />
//           <input
//             type="text"
//             name="companyid" // Ensure this field is populated
//             value={formData.companyid}
//             onChange={handleChange}
//             placeholder="Company ID"
//             className="p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//           {editing ? 'Update Designation' : 'Create Designation'}
//         </button>
//       </form>

//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border-b">Designation Code</th>
//             <th className="p-2 border-b">Designation Name</th>
//             <th className="p-2 border-b">Parent Code</th>
//             <th className="p-2 border-b">Code Level</th>
//             <th className="p-2 border-b">Company ID</th> {/* Display Company ID */}
//             <th className="p-2 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {designations.map((designation) => (
//             <tr key={designation.sl}>
//               <td className="p-2 border-b">{designation.desigcode}</td>
//               <td className="p-2 border-b">{designation.designame}</td>
//               <td className="p-2 border-b">{designation.parentcode}</td>
//               <td className="p-2 border-b">{designation.dcodelevel}</td>
//               <td className="p-2 border-b">{designation.companyid}</td> {/* Display Company ID */}
//               <td className="p-2 border-b flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(designation)}
//                   className="px-2 py-1 bg-yellow-400 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(designation.sl)}
//                   className="px-2 py-1 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DesignationPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../config/route.config";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Designation {
  id: number;
  desigcode: string;
  designame: string;
  parentcode: string;
  dcodelevel: number;
  status: string;
}

const DesignationManagement: React.FC = () => {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentDesignation, setCurrentDesignation] = useState<Designation | null>(null);
  const [formData, setFormData] = useState({
    desigcode: '',
    designame: '',
    parentcode: '',
    dcodelevel: 0,
  });

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/designation/getall',{ headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDesignations(response.data);
    } catch (error) {
      console.error('Error fetching designations:', error);
    }
  };

  const handleOpenForm = (designation: Designation | null = null) => {
    if (designation) {
      setFormData(designation);
      setCurrentDesignation(designation);
    } else {
      setFormData({
        desigcode: '',
        designame: '',
        parentcode: '',
        dcodelevel: 0,
      });
      setCurrentDesignation(null);
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentDesignation(null);
  };

  const handleOpenDelete = (designation: Designation) => {
    setCurrentDesignation(designation);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setCurrentDesignation(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (currentDesignation) {
        await apiClient.put(`/designation/update/${currentDesignation.id}`, formData, {headers: { Authorization: `Bearer ${token}` },
           withCredentials: true,
          });
      } else {
        await apiClient.post('/designation/create', formData,{ headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
      fetchDesignations();
      handleCloseForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async () => {
    if (currentDesignation) {
      try {
        await axios.delete(`/api/designations/${currentDesignation.id}`);
        fetchDesignations();
        handleCloseDelete();
      } catch (error) {
        console.error('Error deleting designation:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Designation Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenForm()} className="mb-4">
        Add New Designation
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Designation Code</TableCell>
              <TableCell>Designation Name</TableCell>
              <TableCell>Parent Code</TableCell>
              <TableCell>Code Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designations.map((designation) => (
              <TableRow key={designation.id}>
                <TableCell>{designation.desigcode}</TableCell>
                <TableCell>{designation.designame}</TableCell>
                <TableCell>{designation.parentcode}</TableCell>
                <TableCell>{designation.dcodelevel}</TableCell>
                <TableCell>{designation.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenForm(designation)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDelete(designation)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{currentDesignation ? 'Edit Designation' : 'Add New Designation'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="desigcode"
              label="Designation Code"
              value={formData.desigcode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="designame"
              label="Designation Name"
              value={formData.designame}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="parentcode"
              label="Parent Code"
              value={formData.parentcode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="dcodelevel"
              label="Code Level"
              type="number"
              value={formData.dcodelevel}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleCloseForm}>Cancel</Button>
              <Button type="submit" color="primary">
                {currentDesignation ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Are you sure you want to delete the designation {currentDesignation?.designame}? */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DesignationManagement;

