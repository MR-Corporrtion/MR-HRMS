import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddDocumentType from './AddDocutmentTypeList';
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiBaseURL } from '@/config/route.config';

const DocumentTypeList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);

  const fetchDocumentTypes = async () => {
    try {
      const result = await axios.get(`${apiBaseURL}/documentType/getall`, {
        withCredentials: true,
      });
      setDocumentTypes(result.data);
    } catch (error) {
      console.error('Error fetching document types:', error);
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
        await axios.delete(`${apiBaseURL}/documentType/delete/${id}`, {
          withCredentials: true,
        });
        setDocumentTypes(documentTypes.filter((item: any) => item.sl !== id));
        Swal.fire({
          icon: 'success',
          title: 'Document type deleted successfully!',
          showConfirmButton: false,
          timer: 1700,
        });
      } catch (error) {
        console.error('Error deleting document type:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete document type',
        });
      }
    }
  };

  const handleEdit = async (item: any) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Document Type',
      html: `
        <input id="documentTypeName" class="swal2-input" placeholder="Document Type Name" value="${item.documentTypeName}">
        <input id="documentNumber" class="swal2-input" placeholder="Document Number" value="${item.documentNumber}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save changes',
      cancelButtonText: 'Cancel',
      preConfirm: () => ({
        documentTypeName: (document.getElementById('documentTypeName') as HTMLInputElement).value,
        documentNumber: (document.getElementById('documentNumber') as HTMLInputElement).value,
      }),
    });

    if (formValues) {
      try {
        await axios.patch(`${apiBaseURL}/documentType/update/${item.sl}`, formValues, {
          withCredentials: true,
        });
        fetchDocumentTypes();
        Swal.fire({
          icon: 'success',
          title: 'Document type updated successfully!',
          showConfirmButton: false,
          timer: 1700,
        });
      } catch (error) {
        console.error('Error updating document type:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update document type',
        });
      }
    }
  };

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Document Type</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <AddIcon className="mr-2" />
          Add Document Type
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {documentTypes.map((item) => (
          <div key={item.sl} className="bg-white p-4 shadow-md hover:shadow-lg rounded">
            <p className="text-lg font-semibold">{item.documentTypeName}</p>
            <p className="text-sm truncate">{item.documentNumber}</p>
            <div className="flex justify-between items-center mt-4">
              <EditIcon
                className="text-blue-500 cursor-pointer mr-2"
                onClick={() => handleEdit(item)}
              />
              <DeleteIcon
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(item.sl)}
              />
            </div>
          </div>
        ))}
      </div>
      <AddDocumentType open={open} setOpen={setOpen} />
    </section>
  );
};

export default DocumentTypeList;
