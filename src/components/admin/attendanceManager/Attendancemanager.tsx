'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiClient } from "../../../../config/route.config";

export default function AttendanceManagement() {
  const [attendanceRequests, setAttendanceRequests] = useState([])
  const [formData, setFormData] = useState({
    empid: '',
    reason: '',
    attendance_date: '',
    clockInTime: '',
    clockOutTime: '',
    approvalStatus: 0,
  })
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  console.log(attendanceRequests);
  
  useEffect(() => {
    fetchAttendanceRequests()
  }, [])

  const fetchAttendanceRequests = async () => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      const response = await apiClient.get(`/attendance-request/getall`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true })
      setAttendanceRequests(response.data.data)
    } catch (error) {
      console.error('Error fetching attendance requests:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      if (editMode) {
        // Update the attendance request
        await apiClient.put(`/attendance-request/update/${formData.empid}`, { ...formData }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true })
        setEditMode(false)
      } else {
        // Create a new attendance request
        await apiClient.post(`/attendance-request/create`, formData, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true })
      }
      fetchAttendanceRequests()
      setFormData({ empid: '', reason: '', attendance_date: '', clockInTime: '', clockOutTime: '', approvalStatus:0 })
      setIsFormVisible(false)
    } catch (error) {
      console.error('Error saving attendance request:', error)
    }
  }

  const handleEdit = (request: any) => {
    setFormData({
      empid: request.empid,
      reason: request.reason,
      attendance_date: request.attendance_date,
      clockInTime: request.clock_in_time.slice(11,16),
      clockOutTime: request.clock_out_time.slice(11,16),
      approvalStatus: request.approval_status || '',  // Include approvalStatus for editing
    })
    setEditMode(true)
    setIsFormVisible(true)
  }

  const handleDelete = async (empid: string) => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");
      await apiClient.delete(`/attendance/${empid}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true })
      fetchAttendanceRequests()
    } catch (error) {
      console.error('Error deleting attendance request:', error)
    }
  }

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
    if (isFormVisible) {
      setEditMode(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      {/* <button onClick={toggleFormVisibility} className="bg-green-500 text-white p-2 rounded mb-4">
        {isFormVisible ? 'Close Form' : 'Add Attendance Request'}
      </button> */}

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label htmlFor="empid" className="block">EMP ID</label>
            <input
              id="empid"
              name="empid"
              type="text"
              value={formData.empid}
              onChange={handleInputChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block">Reason</label>
            <input
              id="reason"
              name="reason"
              type="text"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="attendance_date" className="block">Date</label>
            <input
              id="attendance_date"
              name="attendance_date"
              type="date"
              value={formData.attendance_date}
              onChange={handleInputChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="clockInTime" className="block">Clock In Time</label>
            <input
              id="clockInTime"
              name="clockInTime"
              type="time"
              value={formData.clockInTime}
              onChange={handleInputChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="clockOutTime" className="block">Clock Out Time</label>
            <input
              id="clockOutTime"
              name="clockOutTime"
              type="time"
              value={formData.clockOutTime}
              onChange={handleInputChange}
              required
              className="border p-2 w-full"
            />
          </div>

          {/* Show approvalStatus only in edit mode */}
          {editMode && (
            <div>
              <label htmlFor="approvalStatus" className="block">Approval Status</label>
              <select
                id="approvalStatus"
                name="approvalStatus"
                value={formData.approvalStatus || 0}
                onChange={handleInputChange}
                required
                className="border p-2 w-full"
              >
                <option value="">Select Approval Status</option>
                <option value="false">Not Approved</option>
                <option value="1">Approve</option>
                <option value="2">Reject</option>
              </select>
            </div>
          )}

          <button type="submit" className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white p-2 rounded">
            {editMode ? 'Update Request' : 'Submit Request'}
          </button>
        </form>
      )}

      <table className="w-full text-white table-auto bg-gradient-to-t from-[#ee7623] to-[#282461]">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Clock In</th>
            <th className="border px-4 py-2">Clock Out</th>
            <th className="border px-4 py-2">Approval Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRequests.map((request: any) => (
            <tr key={request.empid}>
              <td className="border px-4 py-2">{request.empid}</td>
              <td className="border px-4 py-2">{request.reason}</td>
              <td className="border px-4 py-2">{request.attendance_date}</td>
              <td className="border px-4 py-2">{request.clock_in_time.slice(11,16)}</td>
              <td className="border px-4 py-2">{request.clock_out_time.slice(11,16)}</td>
              <td className="border px-4 py-2">
                {request.approvalStatus==0 ? 'Not Approved' :request.approvalStatus==1 ? 'Approved': "Rejected"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(request)}
                  className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
