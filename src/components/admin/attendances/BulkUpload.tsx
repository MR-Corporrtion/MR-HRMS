import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Papa from 'papaparse';
import axios from 'axios';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { apiBaseURL } from '@/config/route.config';
import { apiClient } from '../../../../config/route.config';
export default function BulkUpload({open, setOpen}:any) {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData); // Log parsed data to console
        setCsvData(jsonData);  // Store parsed data in state
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (csvData.length > 0) {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        console.log('Submitting data:', csvData);
        const response = await apiClient.post(`/daily-attendance/bulk-create`, csvData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log('Data submitted:', response.data);
        setOpen(false);
        window.location.reload();
      } else {
        console.error('No data to submit');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

console.log(csvData,"path")

  return (
   <>
        <section className=''>
        <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div className='p-4 w-full flex flex-col bg-gradient-to-t from-[#ee7623] to-white rounded-2xl items-start justify-start gap-4'>
          <h2 className='text-2xl font-semibold text-gray-800'>Bulk Upload</h2>
          <Link href={`${apiBaseURL}/daily-attendance/bulk-sample`} target='_blank' className='px-6 py-1 bg-gradient-to-t from-[#ee7623] to-[#282461] text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300'> Download Sample</Link>
          <p className='text-2xl font-normal text-gray-800'>Upload CSV file to import attendance data</p>
          <input type="file" onChange={handleFileChange} />
          <button className='px-6 py-1 bg-gradient-to-t from-[#282461] to-[#ee7623] text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ' onClick={handleSubmit}> Submit</button>
        </div>
        
      </Dialog>
        </section>
   </>
  )
}
