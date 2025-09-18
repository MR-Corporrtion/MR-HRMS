'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiClient } from '../../../../config/route.config';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface Branch {
  branchID: string;
  branchName: string;
  branchPhone: string;
  branchEmail: string;
  branchLocation: string;
  branchAddress: string;
  branchLatitude: number;
  branchLongitude: number;
}

const API_BASE_URL = 'http://localhost:6567/api/v1/branch'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export default function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null)
  const [formData, setFormData] = useState<Partial<Branch>>({
    branchName: '',
    branchPhone: '',
    branchEmail: '',
    branchLocation: '',
    branchAddress: '',
    branchLatitude: 0,
    branchLongitude: 0,
  })

  // Fetch Branches when component mounts
  useEffect(() => {
    fetchBranches()
  }, [])

  const fetchBranches = async () => {
    setIsLoading(true)
    try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('branch/get',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      })
      setBranches(response.data.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch branches')
      console.error('Error fetching branches:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch)
    setFormData(branch)
    setIsFormOpen(true)
  }

  const handleDelete = (branch: Branch) => {
    setBranchToDelete(branch)
    setIsDeleteModalOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingBranch(null)
    setFormData({
      branchName: '',
      branchPhone: '',
      branchEmail: '',
      branchLocation: '',
      branchAddress: '',
      branchLatitude: 0,
      branchLongitude: 0,
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (editingBranch) {
        await apiClient.put(`branch/update/${editingBranch.branchID}`, formData,{
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          })
      } else {
        await apiClient.post('branch/create', formData,{
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          })
      }
      fetchBranches()
      handleFormClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Failed to submit form')
    }
  }

  const handleDeleteConfirm = async () => {
    if (branchToDelete) {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.delete(`/delete/${branchToDelete.branchID}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          })
        fetchBranches()
      } catch (error) {
        console.error('Error deleting branch:', error)
        setError('Failed to delete branch')
      }
    }
    setIsDeleteModalOpen(false)
    setBranchToDelete(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'branchLatitude' || name === 'branchLongitude' ? parseFloat(value) : value
    }))
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Branches</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Branch
        </button>
      </div>

      {isLoading ? (
        <p>Loading branches...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {branches.map((branch) => (
                      <tr key={branch.branchID}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{branch.branchName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{branch.branchPhone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{branch.branchEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{branch.branchLocation}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(branch)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(branch)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingBranch ? 'Edit Branch' : 'Add New Branch'}
              </h3>
              <form onSubmit={handleFormSubmit} className="mt-2 text-left">
                {/* Input Fields for Branch Form */}
                <div className="mb-4">
                  <label htmlFor="branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
                  <input
                    type="text"
                    name="branchName"
                    id="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="branchPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="branchPhone"
                    id="branchPhone"
                    value={formData.branchPhone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="branchEmail" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="branchEmail"
                    id="branchEmail"
                    value={formData.branchEmail}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="branchLocation" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="branchLocation"
                    id="branchLocation"
                    value={formData.branchLocation}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="branchAddress" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="branchAddress"
                    id="branchAddress"
                    value={formData.branchAddress}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="branchLatitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                  <input
                    type="number"
                    name="branchLatitude"
                    id="branchLatitude"
                    value={formData.branchLatitude}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="branchLongitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                  <input
                    type="number"
                    name="branchLongitude"
                    id="branchLongitude"
                    value={formData.branchLongitude}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                  >
                    {editingBranch ? 'Save Changes' : 'Add Branch'}
                  </button>
                  <button
                    type="button"
                    onClick={handleFormClose}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && branchToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Deletion</h3>
              <p className="mt-2 text-sm text-gray-500">Are you sure you want to delete this branch?</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
