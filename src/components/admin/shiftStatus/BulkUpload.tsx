import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Link from 'next/link';
import { apiClient, apiBaseURL } from "../../../../config/route.config";

export default function BulkUpload({ open, setOpen }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [excludeGenShift, setExcludeGenShift] = useState(false); // State for exclude general shift

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Check if the uploaded file is of type xlsx
      if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        alert('Please upload a valid XLSX file.');
        return;
      }
      setFile(selectedFile); // Store the selected file
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

      if (file) {
        const formData = new FormData();
        formData.append('file', file); // Append the file to FormData
        formData.append('excludeGenShift', String(excludeGenShift)); // Append the excludeGenShift value

        const response = await apiClient.post('/shiftApplicability/create', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important for file upload
          },
          withCredentials: true,
        });

        console.log('Data submitted:', response.data);
        alert('Shift Applicability created successfully!');
        window.location.reload();
        setFile(null); // Clear file after submission
        setOpen(false);
      } else {
        console.error('No file to submit');
        alert('No file to submit. Please upload a valid XLSX file.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the data. Please try again.');
    }
  };

  return (
    <>
      <section>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className='p-4 w-full flex flex-col bg-gradient-to-t from-[#ee7623] to-white rounded-2xl items-start justify-start gap-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>Bulk Upload</h2>
            <Link 
              href={`${apiBaseURL}/shiftApplicability/sample`} 
              target='_blank' 
              className='px-6 py-1 bg-gradient-to-t from-[#ee7623] to-[#282461] text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300'
            >
              Download Sample
            </Link>
            <p className='text-2xl font-normal text-gray-800'>Upload XLSX file to import Shift status data</p>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            
            {/* Checkbox for excluding general shifts */}
            <label className='flex items-center'>
              <input
                type="checkbox"
                checked={excludeGenShift}
                onChange={(e) => setExcludeGenShift(e.target.checked)}
                className='mr-2'
              />
              Exclude General Shift
            </label>
            
            <button
              className='px-6 py-1 bg-gradient-to-t from-[#ee7623] to-[#282461] text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Dialog>
      </section>
    </>
  );
}
