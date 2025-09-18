import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiClient } from '../../../../config/route.config';

type Department = {
  sl: string; // MongoDB ObjectId or your unique identifier
  deptCode: string; // Include deptCode from the backend
  deptName: string; // Use the same name as the backend
  headOfDepartment: string; // Update to reflect backend property
  status: string; // Include status from the backend
};

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState<Department | null>(null);
  const [formValues, setFormValues] = useState({ deptCode: '', deptName: '', headOfDepartment: '', status: '' });

  // Fetch departments from the backend
  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/department/get', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setDepartments(response.data.data); // Adjust according to your response structure
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openAddDepartmentModal = () => {
    setEditDepartment(null);
    setFormValues({ deptCode: '', deptName: '', headOfDepartment: '', status: '' });
    setIsModalOpen(true);
  };

  const openEditDepartmentModal = (department: Department) => {
    setEditDepartment(department);
    setFormValues({ deptCode: department.deptCode, deptName: department.deptName, headOfDepartment: department.headOfDepartment, status: department.status });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editDepartment) {
      // Edit department
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.put(`/department/update/${editDepartment.sl}`, formValues,{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        fetchDepartments();
        setDepartments((prev) =>
          prev.map((dept) => (dept.sl === editDepartment.sl ? { ...dept, ...response.data } : dept))
        );
      } catch (error) {
        console.error('Error updating department:', error);
      }
    } else {
      // Add department
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.post('/department/create', formValues, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setDepartments((prev) => [...prev, response.data]);
      } catch (error) {
        console.error('Error adding department:', error);
      }
    }
    closeModal();
  };

  const handleDelete = async (sl: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`/department/${sl}`);
        setDepartments((prev) => prev.filter((dept) => dept.sl !== sl));
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-12 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-[#5A12CF] font-bold">Departments</h1>
        <button
          onClick={openAddDepartmentModal}
          className="bg-[#5A12CF] text-white px-4 py-2 rounded-lg hover:bg-[#7A3DF6] transition-all"
        >
          Add Department
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Department Code
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Head of Department
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.sl} className="hover:bg-gray-100 transition-all">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {department.deptCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {department.deptName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {department.headOfDepartment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {department.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <button
                    onClick={() => openEditDepartmentModal(department)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(department.sl)}
                    className="text-red-600 ml-4 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold text-[#5A12CF] mb-4">
              {editDepartment ? 'Edit Department' : 'Add Department'}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="deptCode"
                placeholder="Department Code"
                value={formValues.deptCode}
                onChange={handleInputChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="deptName"
                placeholder="Department Name"
                value={formValues.deptName}
                onChange={handleInputChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="headOfDepartment"
                placeholder="Head of Department"
                value={formValues.headOfDepartment}
                onChange={handleInputChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={formValues.status}
                onChange={handleInputChange}
                required
                className="border p-2 rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 hover:underline mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5A12CF] text-white px-4 py-2 rounded-lg hover:bg-[#7A3DF6] transition-all"
                >
                  {editDepartment ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
