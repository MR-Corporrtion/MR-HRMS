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

interface DialogComponentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddLeavePolicy: React.FC<DialogComponentProps> = ({ open, setOpen }) => {
  const [policyName, setPolicyName] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!policyName || !pdfFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Policy name and PDF file are required",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("policyName", policyName);
      formData.append("pdfFile", pdfFile);

      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiBaseURL}/leavepolicy/create`, formData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Leave Policy Created successfully!!!',
          showConfirmButton: false,
          timer: 1700
        });
        setOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error creating leave policy",
        });
      }
    } catch (error) {
      console.error('There was an error!', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error creating leave policy",
      });
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: 'rounded-lg' }}
      PaperProps={{
        style: {
          width: '1000px',
          height: '400px',
        },
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        <span className="text-lg font-semibold">Add Leave Policy</span>
        <button
          onClick={() => setOpen(false)}
          className="rounded-full outline outline-offset-2 outline-3 bg-gray-200 hover:bg-gray-300 transition"
        >
          <CloseIcon />
        </button>
      </DialogTitle>
      <DialogContent>
        <span className='text-sm'>Policy Name*</span>
        <TextField
          autoFocus
          margin="dense"
          label=""
          type="text"
          fullWidth
          variant="outlined"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
        />
        <span className='text-sm'>Upload PDF*</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
          className="mt-2"
        />
      </DialogContent>
      <DialogActions>
        <Button
          className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeavePolicy;
