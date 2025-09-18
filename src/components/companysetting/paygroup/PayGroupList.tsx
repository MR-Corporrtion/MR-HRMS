import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddPayGroupList from './AddPayGroupList';
import { apiBaseURL } from '@/config/route.config';

interface PayGroup {
  sl: number;
  paygroupname: string;
}

const PayGroupList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<PayGroup[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/paygroup/getall`, {
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
        await axios.delete(`http://localhost:6567/api/v1/paygroup/delete/${id}`, {
          withCredentials: true,
        });
        setData(data.filter((item) => item.sl !== id));
        Swal.fire({
          icon: 'success',
          title: 'Pay Group deleted successfully!',
          showConfirmButton: false,
          timer: 1700,
        });
      } catch (error) {
        console.error('Error deleting pay group:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete pay group',
        });
      }
    }
  };

  const handleEdit = async (item: PayGroup) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Pay Group',
      html: `
        <input id="paygroupname" class="swal2-input" placeholder="Pay Group Name" value="${item.paygroupname}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => ({
        paygroupname: (document.getElementById('paygroupname') as HTMLInputElement).value,
      }),
    });

    if (formValues) {
      try {
        await axios.patch(`http://localhost:6567/api/v1/paygroup/update/${item.sl}`, formValues, {
          withCredentials: true,
        });
        fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Pay Group updated successfully!',
          showConfirmButton: false,
          timer: 1700,
        });
      } catch (error) {
        console.error('Error updating pay group:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update pay group',
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
        <p className='text-2xl'>Pay Group</p>
        <button
          className='bg-blue-500 text-white py-2 px-4 shadow-lg shadow-slate-400 text-xs rounded cursor-pointer uppercase hover:shadow-lg'
          onClick={() => setOpen(true)}
        >
          <AddIcon /> Add Pay Group
        </button>
      </div>
      <div className='grid grid-cols-4 gap-5'>
        {data.map((item) => (
          <div
            key={item.sl}
            className='w-full flex flex-col p-2 items-start justify-center h-28 gap-2 bg-slate-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl'
          >
            <p className='text-blue-700 text-sm'>{item.paygroupname}</p>
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
      <AddPayGroupList open={open} setOpen={setOpen} />
    </section>
  );
};

export default PayGroupList;
