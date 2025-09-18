import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiClient } from '@/config/route.config'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

interface Employee {
  empid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  address: string;
}

const MapEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        setLoading(true);
        const response = await apiClient.get('/employee/get',{
            headers: {
            'Authorization': `Bearer ${token}`,
          },
            withCredentials: true,
          });
        setEmployees(response.data);
        setError(null);
      } catch (err: any) {
        const errorMessage = err.response?.data?.msg || 'An error occurred while fetching employees';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage, // Ensure this is always a string
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='bg-gradient-to-t from-[#ee7623] to-[#282461]'>
              <TableCell className='text-white'>Employee ID</TableCell>
              <TableCell className='text-white'>Name</TableCell>
              <TableCell className='text-white'>Email</TableCell>
              <TableCell className='text-white'>Phone Number</TableCell>
              <TableCell className='text-white'>Role</TableCell>
              <TableCell className='text-white'>Adress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.empid}>
                <TableCell>{employee.empid}</TableCell>
                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone_number}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MapEmployee;
