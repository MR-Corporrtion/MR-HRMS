import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { apiClient } from "../../../../config/route.config";



interface Grade {
  id?: string;
  gradecode: string;
  gradename: string;
  otcoff?: string;
  otflag?: string;
  hrsinday?: number;
  daysinmonth?: number;
  timesothrs?: number;
  absentifhrs?: number;
  halfdayhrs?: number;
  ingraceminutes?: number;
  outgraceminutes?: number;
  allowedlatecount?: number;
  extralateleavechar?: string;
  halfdayiflatehrs?: number;
  absentiflatehrs?: number;
  inmachineid?: string;
  outmachineid?: string;
  absentforoffday?: string;
  absentforholiday?: string;
  latemarkflag?: number;
  status?: number;
}

const GradePage = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [formData, setFormData] = useState<Grade>({
    gradecode: '',
    gradename: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editGradeId, setEditGradeId] = useState<string | null>(null);

  // Fetch all grades
  const fetchGrades = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/grade/getall',{
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  // Handle input changes in form
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to create or update a grade
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode && editGradeId) {
      // Update grade
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.patch(`/grade/update/${editGradeId}`, formData,
          {
            headers: { 'Authorization': `Bearer ${token}` },
            withCredentials: true,
          }
        );
        alert("Grade updated successfully!");
      } catch (error) {
        console.error("Error updating grade:", error);
      }
    } else {
      // Create grade
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        await apiClient.post('/grade/create', formData, {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true,
        });
        alert("Grade created successfully!");
      } catch (error) {
        console.error("Error creating grade:", error);
      }
    }
    setFormData({ gradecode: '', gradename: '' });
    setIsEditMode(false);
    setEditGradeId(null);
    fetchGrades();
  };

  // Edit a grade
  const handleEdit = (grade: Grade) => {
    setFormData(grade);
    setIsEditMode(true);
    setEditGradeId(grade.id || null);
  };

  // Delete a grade
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/grades/delete/${id}`);
      alert("Grade deleted successfully!");
      fetchGrades();
    } catch (error) {
      console.error("Error deleting grade:", error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Grade Management</h1>

      {/* Grade Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="gradecode" className="block font-medium">Grade Code</label>
            <input
              type="text"
              id="gradecode"
              name="gradecode"
              value={formData.gradecode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="gradename" className="block font-medium">Grade Name</label>
            <input
              type="text"
              id="gradename"
              name="gradename"
              value={formData.gradename}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isEditMode ? 'Update Grade' : 'Create Grade'}
        </button>
      </form>

      {/* Grades Table */}
      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Grade Code</th>
            <th className="px-4 py-2 border-b">Grade Name</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td className="px-4 py-2 border-b text-center">{grade.gradecode}</td>
              <td className="px-4 py-2 border-b text-center">{grade.gradename}</td>
              <td className="px-4 py-2 border-b space-x-2 text-center">
                <button
                  onClick={() => handleEdit(grade)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => grade.id && handleDelete(grade.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradePage;

