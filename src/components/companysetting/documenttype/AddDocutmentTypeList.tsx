import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiBaseURL } from '@/config/route.config';

interface AddDocumentTypeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddDocumentType: React.FC<AddDocumentTypeProps> = ({ open, setOpen }) => {
  const [documentTypeName, setDocumentTypeName] = useState<string>("");
  const [documentNumber, setDocumentNumber] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${apiBaseURL}/documentType/create`, {
        documentTypeName,
        documentNumber,
      }, {
        withCredentials: true,
      });
      Swal.fire({
        icon: 'success',
        title: 'Document type added successfully!',
        showConfirmButton: false,
        timer: 1700
      });
      setDocumentTypeName("");
      setDocumentNumber("");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding document type:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add document type",
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => { setOpen(false) }} classes={{ paper: 'rounded-lg' }} PaperProps={{
      style: {
        width: '1000px',
        height: '300px', 
      },
    }}>
      <DialogTitle className="flex justify-between items-center">
        <span className="text-lg font-semibold">Add Document Type</span>
        <button
          onClick={() => { setOpen(false) }}
          className="rounded-full outline outline-offset-2 outline-3 bg-gray-200 hover:bg-gray-300 transition"
        >
          <CloseIcon />
        </button>
      </DialogTitle>
      <DialogContent>
        <span className='text-sm'>Document Type Name*</span>
        <TextField
          autoFocus
          margin="dense"
          label=""
          type="text"
          fullWidth
          variant="outlined"
          value={documentTypeName}
          onChange={(e) => setDocumentTypeName(e.target.value)}
        />
        <span className='text-sm mt-2'>Document Number*</span>
        <TextField
          margin="dense"
          label=""
          type="text"
          fullWidth
          variant="outlined"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button className='bg-blue-500 text-white py-2 px-4 hover:bg-blue-800 shadow-slate-400 rounded cursor-pointer' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocumentType;
