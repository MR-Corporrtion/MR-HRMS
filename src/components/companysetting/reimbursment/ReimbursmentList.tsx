import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddReimbursement from './AddReimbursmentLists';
import { apiBaseURL } from '@/config/route.config';

interface Reimbursement {
  sl: number;
  reimbursementName: string;
}

const ReimbursementList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Reimbursement[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/reimbursement/getall`, {
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiBaseURL}/reimbursement/delete/${id}`, {
          withCredentials: true,
        });
        setData(data.filter((item) => item.sl !== id));
        Swal.fire({
          icon: 'success',
          title: 'Reimbursement deleted successfully!',
          showConfirmButton: false,
          timer: 1700,
        });
      } catch (error) {
        console.error('Error deleting reimbursement:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete reimbursement',
        });
      }
    }
  };

  const handleEdit = async (item: Reimbursement) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Reimbursement',
      html: `
        <input id="reimbursementName" class="swal2-input" placeholder="Reimbursement Name" value="${item.reimbursementName}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => ({
        reimbursementName: (document.getElementById('reimbursementName') as HTMLInputElement).value,
      }),
    });

    if (formValues) {
      try {
        await axios.patch(`${apiBaseURL}/reimbursement/update/${item.sl}`, formValues, {
          withCredentials: true,
        });
        fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Reimbursement updated successfully!',
          showConfirmButton: false,
          timer: 1700,
        });
      } catch (error) {
        console.error('Error updating reimbursement:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update reimbursement',
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <section className='w-full main-containerAdmin flex flex-col gap-3'>
      <div className='w-full flex items-center justify-between'>
        <p className='text-2xl'>Reimbursement</p>
        <button
          className='bg-blue-500 text-white py-2 px-4 shadow-lg shadow-slate-400 text-sm rounded cursor-pointer hover:shadow-lg'
          onClick={() => setOpen(true)}
        >
          <AddIcon /> Add Reimbursement
        </button>
      </div>
      <div className='grid grid-cols-4 gap-5'>
        {data.map((item) => (
          <div
            key={item.sl}
            className='w-full flex flex-col p-2 items-start justify-center h-28 gap-2 bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl'
          >
            <p className='text-blue-700 text-sm'>{item.reimbursementName}</p>
            <span className='flex items-center justify-start gap-3 text-sm'>
              <button
                className='text-red-500 hover:bg-red-100 rounded hover:cursor-pointer ease-in-out duration-300'
                onClick={() => handleDelete(item.sl)}
              >
                <DeleteOutlineIcon /> Delete
              </button>
              <button
                className='text-green-500 hover:bg-green-100 rounded p-1 hover:cursor-pointer ease-in-out duration-300'
                onClick={() => handleEdit(item)}
              >
                <EditIcon /> Edit
              </button>
            </span>
          </div>
        ))}
      </div>
      <AddReimbursement open={open} setOpen={setOpen} />
    </section>
  );
};

export default ReimbursementList;
