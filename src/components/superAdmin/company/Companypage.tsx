// import React, { useEffect, useState } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import AddCompanyForm from './AddCompanyForm';
// import {
//   Table, 
//   TableHead, 
//   TableBody, 
//   TableCell, 
//   TableRow, 
//   TableContainer, 
//   Paper, 
//   Button, 
//   Typography,
//   Dialog,
//   TextField
// } from '@mui/material';

// const CompanyPage: React.FC = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [open, setOpen] = useState<boolean>(false);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [mobile, setMobile] = useState<string>("");
//   const [company_address, setCompany_address] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [data, setData] = useState<any[]>([]);
//   const [companyid, setCompanyid] = useState<string>("");

//   const handleAddCompanyClick = () => {
//     setIsFormOpen(true);
//   };

//   const handleFormClose = () => {
//     setIsFormOpen(false);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('${apiBaseURL}/user/signup-user', { 
//         name,  
//         email, 
//         mobile,
//         company_address,
//         password, 
//         companyid
//       },{
//         withCredentials: true,
//       });
      
//       if (response.status === 201) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Signup successful',
//           icon: 'success',
//           confirmButtonText: 'OK'
//         });
//         setOpen(false);
//       } else {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Signup failed',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'An error occurred during signup',
//         icon: 'error',
//         confirmButtonText: 'OK'
//       });
//       console.log(err);
//     }
//   };




//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('${apiBaseURL}/company/getall', {
//           withCredentials: true,
//         });
//         setData(response.data);
//         console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   },[]);              

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${apiBaseURL}/company/delete/${id}`, {
//         withCredentials: true,
//       });
//       setData(data.filter((item: any) => item.id !== id));
//       Swal.fire({
//         title: 'Deleted!',
//         text: 'Company deleted successfully!',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       });
//     } catch (error) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to delete company',
//         icon: 'error',
//         confirmButtonText: 'OK'
//       });
//       console.error('Error deleting company:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h4" component="h1">
//           COMPANY
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleAddCompanyClick}
//         >
//           Add Company
//         </Button>
//       </div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow style={{ backgroundColor: '#6B23CA' }}>
//               <TableCell style={{ color: 'white' }}>Sl No.</TableCell>
//               <TableCell style={{ color: 'white', cursor: 'pointer' }}>Company Name</TableCell>
//               <TableCell style={{ color: 'white' }}>Phone</TableCell>
//               <TableCell style={{ color: 'white' }}>Email</TableCell>
//               <TableCell style={{ color: 'white' }}>Website</TableCell>
//               <TableCell style={{ color: 'white' }}>Address</TableCell>
//               <TableCell style={{ color: 'white' }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((company, index) => (
//               <TableRow key={company.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell
//                   className="cursor-pointer"
//                   onClick={() => {
//                     setOpen(true);
//                     setCompanyid(company.companyid);
//                     setName(company.compname);
//                     setEmail(company.email);
//                     setMobile(company.phone);
//                     setCompany_address(company.company_address);
//                   }}
//                 >
//                   {company.compname}
//                 </TableCell>
//                 <TableCell>{company.phone}</TableCell>
//                 <TableCell>{company.email}</TableCell>
//                 <TableCell>{company.website}</TableCell>
//                 <TableCell>{company.company_address}</TableCell>
//                 <TableCell>
//                   <button className="text-white hover:text-blue-500 mr-2 py-1 px-5 bg-[#5738DA] rounded-3xl">
//                     <EditIcon />
//                   </button>
//                   <button onClick={() => handleDelete(company.id)} className="text-white hover:text-red-700 py-1 px-5 bg-[#FF0000] rounded-3xl">
//                     <DeleteIcon />
//                   </button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={isFormOpen} onClose={handleFormClose}>
//         <AddCompanyForm onClose={handleFormClose} />
//       </Dialog>
//       <Dialog
//         maxWidth={"lg"}
//         open={open}
//         onClose={() => { setOpen(false); }}
//       >
//         <div className='w-full flex flex-col items-start justify-start gap-6 p-6'>
//           <TextField
//             autoFocus
//             margin="dense"
//             value={name}
//             onChange={(e) => { setName(e.target.value); }}
//             label="Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             value={email}
//             onChange={(e) => { setEmail(e.target.value); }}
//             label="Email"
//             type="text"
//             fullWidth
//             variant="outlined"
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             label=" Address"
//             value={company_address}
//             onChange={(e) => { setCompany_address(e.target.value); }}
//             type="text"
//             fullWidth
//             variant="outlined"
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Phone number"
//             value={mobile}
//             onChange={(e) => { setMobile(e.target.value); }}
//             type="text"
//             fullWidth
//             variant="outlined"
//             required
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => { setPassword(e.target.value); }}
//             fullWidth
//             variant="outlined"
//             required
//           />
//           <button
//             type='button'
//             onClick={handleSubmit}
//             className='py-3 w-full bg-blue-500 uppercase font-bold text-white rounded-md'
//           >
//             Submit
//           </button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CompanyPage;




import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from 'axios';
import {apiClient} from "../../../../config/route.config";
import AddCompanyForm from './AddCompanyForm';
import {
  Table, 
  TableHead,
  DialogTitle,
  DialogContent,
  DialogActions, 
  TableBody, 
  TableCell, 
  TableRow, 
  TableContainer, 
  Paper, 
  Button, 
  Typography,
  Dialog,
  TextField
} from '@mui/material';

const CompanyPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [company_address, setCompany_address] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [companyid, setCompanyid] = useState<string>("");

  const handleAddCompanyClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
       console.log(token)     

      const response = await apiClient.post('/user/signup-user', { 
        name,  
        email, 
        mobile,
        company_address,
        password, 
        companyid
      },{
        headers: {
        'Authorization': `Bearer ${token}`,
      },
        withCredentials: true,
      });
      
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Signup successful',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setOpen(false);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Signup failed',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred during signup',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get('/company/getall', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[]);              




  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/company/delete/${id}`, {
        withCredentials: true,
      });
      setData(data.filter((item: any) => item.id !== id));
      Swal.fire({
        title: 'Deleted!',
        text: 'Company deleted successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete company',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error deleting company:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" component="h1">
          COMPANY
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCompanyClick}
        >
          Add Company
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='bg-gradient-to-t from-[#ee7623] to-[#282461]'>
              <TableCell style={{ color: 'white' }}>Sl No.</TableCell>
              <TableCell style={{ color: 'white', cursor: 'pointer' }}>Company Name</TableCell>
              <TableCell style={{ color: 'white' }}>Phone</TableCell>
              <TableCell style={{ color: 'white' }}>Email</TableCell>
              <TableCell style={{ color: 'white' }}>Website</TableCell>
              <TableCell style={{ color: 'white' }}>Address</TableCell>
              <TableCell style={{ color: 'white' }}>EmpId Code</TableCell>
              <TableCell style={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((company, index) => (
              <TableRow key={company.companyid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setCompanyid(company.companyid);
                    setName(company.compname);
                    setEmail(company.email);
                    setMobile(company.mobile);
                    setCompany_address(company.company_address);
                  }}
                >
                  {company.compname}
                </TableCell>
                <TableCell>{company.phone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>{company.website}</TableCell>
                <TableCell>{company.company_address}</TableCell>
                <TableCell>{company.company_initial}</TableCell>
                <TableCell>
                  <button className="text-white hover:text-blue-500 py-1 px-5 bg-blue-500 rounded-3xl">
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="text-white hover:text-red-500 py-1 px-5 bg-red-500 rounded-3xl"
                  >
                    <DeleteIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isFormOpen} onClose={handleFormClose}>
        <AddCompanyForm onClose={handleFormClose} />
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-md p-4 bg-white rounded-lg">
          <DialogTitle>Credential for Company </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="User Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Mobile Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Company Address"
              type="text"
              fullWidth
              variant="outlined"
              value={company_address}
              onChange={(e) => setCompany_address(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleSubmit} 
              color="primary" 
              variant="contained"
              type='button'
            >
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyPage;

