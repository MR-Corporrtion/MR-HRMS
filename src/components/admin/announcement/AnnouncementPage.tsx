import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {apiBaseURL, apiClient} from "../../../../config/route.config";
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
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

interface AnnouncementData {
  sl: number;
  title: string;
  description: string;
  date: string;
  status: number;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<AnnouncementData>>({});
  const router = useRouter();

  useEffect(() => {
    fetchAnnouncements();
  }, []); // Add an empty dependency array to avoid infinite loop

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/announcements/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true });
      setAnnouncements(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleOpenDialog = (id?: number) => {
    if (id !== undefined) {
      const announcement = announcements.find((a) => a.sl === id);
      if (announcement) {
        setFormData(announcement);
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
        await axios.post(`${apiBaseURL}/announcements/create`, formData, 
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }, withCredentials: true });
      } else {
        await axios.post(`${apiBaseURL}/announcements/update/${editingId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }, withCredentials: true });
      }
      fetchAnnouncements();
      handleCloseDialog();
      router.push('/AnnouncementsPage'); // Adjust if needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await axios.delete(`${apiBaseURL}/announcements/delete/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
        }, withCredentials: true });
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className='bg-gradient-to-t from-[#ee7623] to-[#282461]'
        >
          Add Announcement
        </Button>
      </div>

      <TableContainer className="bg-white shadow-md rounded-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-t from-[#ee7623] to-[#282461] h-10">
              <td className="text-white font-bold text-xs text-center">Sl.NO</td>
              <td className="text-white font-bold text-xs text-center">Title</td>
              <td className="text-white font-bold text-xs text-center">Description</td>
              <td className="text-white font-bold text-xs text-center">Date</td>
              <td className="text-white font-bold text-xs text-center">Actions</td>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.sl}>
                <TableCell className="text-black font-bold text-center">{announcement.sl}</TableCell>
                <TableCell className="text-black font-bold text-center">{announcement.title}</TableCell>
                <TableCell className="text-black font-bold text-center">{announcement.description}</TableCell>
                <TableCell className="text-black font-bold text-center">{announcement.date}</TableCell>
                <TableCell className="text-black font-bold text-center">
                  <IconButton onClick={() => handleOpenDialog(announcement.sl)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(announcement.sl)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Announcement' : 'Add Announcement'}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date || ''}
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
            {editingId === null ? 'Submit' : 'Update'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
