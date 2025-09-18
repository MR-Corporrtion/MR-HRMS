// // components/EditEmployeeForm.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {apiClient} from "../../../../config/route.config";
// import Swal from 'sweetalert2';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

// interface EditEmployeeFormProps {
//   open: boolean;
//   handleClose: () => void;
//   employeeId: number;
// }

// const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ open, handleClose, employeeId }) => {
//   const [employeeData, setEmployeeData] = useState<any>({ first_name: '', last_name: '', phone_number: '', email: '', blood_group: '' });
  
//   useEffect(() => {
//     if (employeeId) {
//       apiClient.get(`/employee/${employeeId}`)
//         .then(response => setEmployeeData(response.data))
//         .catch(error => console.error('Error fetching employee data:', error));
//     }
//   }, [employeeId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await apiClient.put(`/employee/update/${employeeId}`, employeeData);
//       Swal.fire({
//         icon: 'success',
//         title: 'Employee updated successfully!',
//         showConfirmButton: false,
//         timer: 1500
//       });
//       handleClose();
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update employee'
//       });
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Edit Employee</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="First Name"
//           name="first_name"
//           value={employeeData.first_name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Last Name"
//           name="last_name"
//           value={employeeData.last_name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Phone Number"
//           name="phone_number"
//           value={employeeData.phone_number}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           name="email"
//           value={employeeData.email}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Blood Group"
//           name="blood_group"
//           value={employeeData.blood_group}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditEmployeeForm;
// import React, { useState, useEffect } from 'react';
// import { apiClient } from "../../../../config/route.config";
// import Swal from 'sweetalert2';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

// interface EditEmployeeFormProps {
//   open: boolean;
//   handleClose: () => void;
//   empid: string;
// }

// const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ open, handleClose, empid }) => {
//   const [employeeData, setEmployeeData] = useState<any>({});
//   const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for selected image

//   useEffect(() => {
//     console.log('useEffect triggered, empid:', empid); // Check when useEffect is triggered and what empid is
  
//     const fetchEmployeeData = async () => {
//       if (empid) {
//         console.log('Fetching data for empid:', empid); // Log empid when the fetch starts
//         try {
//           const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
//           console.log('Access token:', token); // Log the token to ensure it is being retrieved correctly
  
//           const response = await apiClient.get(`/employee/get/${empid}`, {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//             withCredentials: true,
//           });
  
//           console.log('Fetched employee data:', response.data); // Log the fetched data
//           setEmployeeData(response.data); // Ensure the structure of response.data matches the state
  
//         } catch (error) {
//           console.error('Error fetching employee data:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Failed to fetch employee data'
//           });
//         }
//       } else {
//         console.log('empid is null or undefined'); // Log if empid is falsy
//       }
//     };
  
//     fetchEmployeeData();
//   }, [empid]);

//   // Handle text field change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
//   };

//   // Handle image file selection
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

//       const formData = new FormData();
//       Object.keys(employeeData).forEach(key => {
//         formData.append(key, employeeData[key]);
//       });

//       // Append the selected image if any
//       if (selectedImage) {
//         formData.append('image', selectedImage);
//       }

//       await apiClient.put(`/employee/update/${empid}`, formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set for file upload
//         },
//         withCredentials: true,
//       });

//       Swal.fire({
//         icon: 'success',
//         title: 'Employee updated successfully!',
//         showConfirmButton: false,
//         timer: 1500
//       });
//       handleClose();
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update employee'
//       });
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Edit Employee profile:</DialogTitle>
//       <DialogContent>
//           {/* Image Upload Field */}
//           <div style={{ margin: '20px 0' }}>
//             <label htmlFor="">Upload your profile image: </label><br/>
//           <input
//             accept="image/*"
//             type="file"
//             onChange={handleImageChange}
//           />
//           {/* {selectedImage && <p>Selected image/file: {selectedImage.name}</p>} */}
//         </div>
//         {Object.keys(employeeData).map((key) => (
//           <TextField
//             key={key}
//             label={key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
//             name={key}
//             value={employeeData[key]}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//         ))}

//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="primary">Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditEmployeeForm;


import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from "../../../../config/route.config";
import Swal from 'sweetalert2';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface EditEmployeeFormProps {
  open: boolean;
  handleClose: () => void;
  empid: string;
}

const EditEmployeeForm: React.FC<EditEmployeeFormProps> = ({ open, handleClose, empid }) => {
  const [employeeData, setEmployeeData] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for selected image
  const [useCamera, setUseCamera] = useState<boolean>(false); // State for camera choice
  const [stream, setStream] = useState<MediaStream | null>(null); // State to hold camera stream
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element

  useEffect(() => {
    if (useCamera) {
      // If using camera, initialize the video stream
      const startCamera = async () => {
        try {
          const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(cameraStream);
          if (videoRef.current) {
            videoRef.current.srcObject = cameraStream;
            videoRef.current.play();
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          Swal.fire({
            icon: 'error',
            title: 'Camera access error',
            text: 'Unable to access the camera. Please check your device settings.',
          });
        }
      };

      startCamera();
    } else {
      // Stop the camera when switching to file upload
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop all tracks
      }
    }

    return () => {
      // Cleanup camera stream when the component unmounts or camera is turned off
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useCamera]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (empid) {
        try {
          const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  
          const response = await apiClient.get(`/employee/get/${empid}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          });
  
          setEmployeeData(response.data);
        } catch (error) {
          console.error('Error fetching employee data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to fetch employee data',
          });
        }
      }
    };
    fetchEmployeeData();
  }, [empid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && stream) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context && videoRef.current.videoWidth && videoRef.current.videoHeight) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // Draw the current video frame onto the canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert the captured image to a Blob and set it as selected image
        canvas.toBlob(blob => {
          if (blob) {
            setSelectedImage(new File([blob], 'captured.jpg', { type: 'image/jpeg' }));
          }
        });
      } else {
        console.error('Video element dimensions are not available');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

      const formData = new FormData();
      Object.keys(employeeData)
      .filter((key) => key !== "password")
      .forEach(key => {
        formData.append(key, employeeData[key]);
      });

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await apiClient.put(`/employee/update/${empid}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      Swal.fire({
        icon: 'success',
        title: 'Employee updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose();
    } catch (error) {
      console.error('Error updating employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update employee',
      });
    }
  };

  const handleDownloadHTML = () => {
    const htmlContent = `
      <html>
        <head>
          <title>Employee Joining Form</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f7fc;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #2d87f0;
              padding: 20px;
              background-color: #f0f4f8;
              margin-bottom: 30px;
              font-size: 26px;
              border-bottom: 2px solid #e0e5ec;
            }
            .container {
              width: 70%;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .section {
              margin-bottom: 25px;
              padding: 15px;
              background-color: #f9f9f9;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .section h3 {
              color: #555;
              font-size: 20px;
              margin-bottom: 10px;
            }
            .form-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 15px;
            }
            .form-item label {
              font-weight: bold;
              color: #333;
              width: 35%;
            }
            .form-item span {
              font-size: 16px;
              color: #777;
              width: 60%;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              padding: 20px;
              font-size: 14px;
              color: #aaa;
              border-top: 2px solid #e0e5ec;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Employee Joining Form</h1>
            <div class="section">
              <h3>Personal Information</h3>
              ${Object.entries(employeeData).map(([key, value]) => {
                return `
                <div class="form-item">
                  <label for="${key}">${key.replace(/_/g, ' ').replace(/\b\w/g, char => char)}:</label>
                  <span>${value}</span>
                </div>`;
              }).join('')}
            </div>
            <div class="footer">
              <p>Generated by Admin Panel</p>
            </div>
          </div>
        </body>
      </html>
    `;
  
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_${empid}_joining_form.html`;
    a.click();
  
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Employee profile:</DialogTitle>
      <DialogContent>
        {/* Camera/File option toggle */}
        <div style={{ margin: '20px 0' }}>
          <Button variant="outlined" onClick={() => setUseCamera(!useCamera)}>
            {useCamera ? 'Switch to File Upload' : 'Use Camera'}
          </Button>
        </div>

        {/* Camera or File Upload */}
        {useCamera ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <video ref={videoRef} style={{ width: '100%', maxWidth: '300px' }}></video>
            <Button variant="contained" color="primary" onClick={handleCapturePhoto}>
              Capture Photo
            </Button>
          </div>
        ) : (
          <div style={{ margin: '20px 0' }}>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </div>
        )}

        {Object.keys(employeeData)
          .filter((key) => key !== "password" && key !== "companyid" && key !== "branchID" && key !== "createdAt" && key !== "updatedAt" && key !== "deletedAt")
          .map((key) => (
          <TextField
            key={key}
            // label={key.replace(/_/g, ' ').replace(/\b\w/g, char => char)}
            label={key}
            name={key}
            value={employeeData[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
        <Button
          onClick={handleDownloadHTML}
          color="primary"
          variant="outlined"
          className=" py-2 text-white bg-blue-500 hover:bg-blue-600"
        >
          Download as HTML
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeForm;
