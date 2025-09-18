import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Papa from 'papaparse';
import axios from 'axios';
import { apiBaseURL, apiClient } from '../../../../config/route.config';
import Link from 'next/link';
import * as XLSX from 'xlsx';
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
        console.log('Submitting data:', csvData);
        const response = await apiClient.post('/leavepolicy/bulk-create', csvData, {
          withCredentials: true,
        });
        console.log('Data submitted:', response.data);
        setOpen(false);
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
          <Link href={`${apiBaseURL}/leavepolicy/sample`} target='_blank' className='px-6 py-1 bg-gradient-to-t from-[#ee7623] to-[#282461] text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300'> Download Sample</Link>
          <p className='text-2xl font-normal text-gray-800'>Upload CSV file to import leave policy data</p>
          <input type="file" onChange={handleFileChange} />
          <button className='px-6 py-1 bg-gradient-to-t from-[#ee7623] to-[#282461] text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ' onClick={handleSubmit}> Submit</button>
        </div>
        
      </Dialog>
        </section>
   </>
  )
}

// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import axios from 'axios';
// import { apiClient } from '../../../../config/route.config';
// import Link from 'next/link';

// export default function BulkUpload({ open, setOpen }: any) {
//   const [file, setFile] = useState<File | null>(null);
//   const [fileName, setFileName] = useState('');
//   const [successMessages, setSuccessMessages] = useState<any[]>([]);
//   const [errorMessages, setErrorMessages] = useState<any[]>([]);
//   const [error, setError] = useState('');

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const uploadedFile = event.target.files?.[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       setFileName(uploadedFile.name);
//       setError(''); // Clear any previous error
//     }
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       setError('Excel file is required');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await apiClient.post('/leavepolicy/bulk-create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },withCredentials: true,
//       });

//       const { success, errors } = response.data;
//       setSuccessMessages(success || []);
//       setErrorMessages(errors || []);
//     } catch (err: any) {
//       console.error('Error uploading file:', err);
//       setError('Error processing bulk leave policy creation');
//     }
//   };

//   return (
//     <>
//       <section>
//         <Dialog
//           fullWidth={true}
//           maxWidth={"sm"}
//           open={open}
//           onClose={() => setOpen(false)}
//         >
//           <div className="p-4 w-full flex flex-col bg-violet-300 rounded-2xl items-start justify-start gap-4">
//             <h2 className="text-2xl font-semibold text-gray-800">Bulk Upload Leave Policies</h2>
//             <Link
//               href=`${apiBaseURL}/leavepolicy/sample` // Adjust this link based on the backend's sample download route
//               target="_blank"
//               className="px-6 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
//             >
//               Download Sample
//             </Link>
//             <p className="text-2xl font-normal text-gray-800">
//               Upload Excel file to import leave policies for employees
//             </p>
//             <input
//               type="file"
//               accept=".xlsx, .xls"
//               onChange={handleFileChange}
//             />
//             <p>{fileName ? `Selected file: ${fileName}` : 'No file selected'}</p>

//             {/* Display error message */}
//             {error && <p className="text-red-500">{error}</p>}

//             <button
//               className="px-6 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>

//             {/* Display Success and Error Messages */}
//             {successMessages.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-green-600 font-bold">Success:</h3>
//                 <ul>
//                   {successMessages.map((msg, index) => (
//                     <li key={index} className="text-green-500">{msg.empid}: {msg.msg}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {errorMessages.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-red-600 font-bold">Errors:</h3>
//                 <ul>
//                   {errorMessages.map((msg, index) => (
//                     <li key={index} className="text-red-500">{msg.empid}: {msg.error}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </Dialog>
//       </section>
//     </>
//   );
// }
