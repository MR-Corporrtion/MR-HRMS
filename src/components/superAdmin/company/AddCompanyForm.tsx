

import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { apiClient } from "../../../../config/route.config";
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

interface AddCompanyFormProps {
  onClose: () => void;
}

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ onClose }) => {
  const [compname, setCompname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [company_address, setCompany_address] = useState<string>("");
  const [company_prefix, setCompany_prefix] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    const companyData = {
      compname, 
      email, 
      phone, 
      website,
      company_address,
      company_prefix 
    };

    console.log("Data sent to backend:", companyData);

    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      console.log("Token:-", token);
      
      const response = await apiClient.post('/company/create', companyData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
 
      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Company created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        onClose();
        window.location.reload();
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create company',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text:  'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      // Optionally reset fields here if needed
      setCompname("");
      setEmail("");
      setPhone("");
      setWebsite("");
      setCompany_address("");
      setCompany_prefix("");
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <DialogTitle>Add New Company</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Company Name"
          type="text"
          fullWidth
          variant="outlined"
          value={compname}
          onChange={(e) => setCompname(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Website of Company"
          type="text"
          fullWidth
          variant="outlined"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Company Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Company Phone Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <TextField
          margin="dense"
          label="Company Prefix EMPID Code"
          type="text"
          fullWidth
          variant="outlined"
          value={company_prefix}
          onChange={(e) => setCompany_prefix(e.target.value)}
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
  );
};

export default AddCompanyForm;



// import React, { useState } from 'react';
// import { DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// import {apiClient} from "../../../../config/route.config";
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useRouter } from 'next/router';

// interface AddCompanyFormProps {
//   onClose: () => void;
// }

// const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ onClose }) => {
//   const [compname, setCompname] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");
//   const [website, setWebsite] = useState<string>("");
//   const [company_address, setCompany_address] = useState<string>("");
//   const router = useRouter();

//   const handleSubmit = async () => {
//     const companyData = {
//       compname, 
//       email, 
//       phone, 
//       website,
//       company_address 
//     };

//     console.log("Data sent to backend:", companyData);

//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await apiClient.post('/company/create', companyData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       if (response.status === 201) {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Company created successfully',
//           icon: 'success',
//           confirmButtonText: 'OK'
//         });
//         onClose();
//         window.location.reload();  // Refresh the page
//       } else {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Failed to create company',
//           icon: 'error',
//           confirmButtonText: 'Try Again'
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         title: 'Error!',
//         text: 'Something went wrong',
//         icon: 'error',
//         confirmButtonText: 'Try Again'
//       });
      
//       console.error(err);
//     } finally {
//       setCompname("");
//       setEmail("");
//       setPhone("");
//       setWebsite("");
//       setCompany_address("");
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-4">
//       <DialogTitle>Add New Company</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="New Company Name"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={compname}
//           onChange={(e) => setCompname(e.target.value)}
//           required
//         />
//         <TextField
//           margin="dense"
//           label="Website of Company"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={website}
//           onChange={(e) => setWebsite(e.target.value)}
//         />
//         <TextField
//           margin="dense"
//           label="Company Email"
//           type="email"
//           fullWidth
//           variant="outlined"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <TextField
//           margin="dense"
//           label="Company Phone Number"
//           type="tel"
//           fullWidth
//           variant="outlined"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <TextField
//           margin="dense"
//           label="Company Address"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={company_address}
//           onChange={(e) => setCompany_address(e.target.value)}
//           required
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button 
//           onClick={handleSubmit} 
//           color="primary" 
//           variant="contained"
//           type='button'
//         >
//           Submit
//         </Button>
//       </DialogActions>
//     </div>
//   );
// };

// export default AddCompanyForm;
