import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiClient } from '@/config/route.config';
import Swal from 'sweetalert2';

interface UserProfileProps {
  empid: string;
  companyid: string;
  branchID: string;
  fullName:string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  gender: string;
  blood_group: string;
  nationality: string;
  phone_number: string;
  alternative_phone_number?: string;
  emergency_phone_number?: string;
  address: string;
  permanent_address: string;
  religion: string;
  marital_status: string;
  date_of_birth: string;
  employee_type: string;
  skill_type?: string;
  formulaHead?: string;
  deptid: string;
  desigid: string;
  role: string;
  employee_photo?: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem('accessToken') ||
          sessionStorage.getItem('accessToken');
        const response = await apiClient.get(
          '/employee/self',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setProfile(response.data);
        setError(null);
      } catch (err: any) {
        const errorMessage =
          err.response?.data || 'An error occurred while fetching profile data';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async () => {
    try {
      const token =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken');
      await apiClient.put(
        '/employee/self',
        { ...profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been successfully updated.',
      });
      setIsEditing(false);
    } catch (err: any) {
      const errorMessage =
        err.response?.data || 'An error occurred while updating profile data';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      const token =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken');
      await apiClient.put(
        '/employee/self',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Your password has been successfully updated.',
      });
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
    } catch (err: any) {
      const errorMessage =
        err.response?.data || 'An error occurred while changing password';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-gradient-to-t from-[#ee7623] to-[#282461] rounded-lg shadow-xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-10">
        <img
          src={profile?.employee_photo || '/default-user.png'}
          alt="Employee Photo"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
        <div className="ml-6 text-white text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">
            {profile?.fullName}
          </h1>
          <p className="text-lg mt-2 text-white">{profile?.role}</p>
          <p className="text-sm mt-1 text-white">{profile?.email}</p>
        </div>
      </div>

      {/* Profile Details or Edit Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(profile || {}).map(([key, value], idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
          >
            <p className="text-sm font-semibold text-gray-500">{key}</p>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={value || ''}
                onChange={handleInputChange}
                className="text-lg font-medium text-gray-900 w-full border rounded p-2"
              />
            ) : (
              <p className="text-lg font-medium text-gray-900">
                {value || 'N/A'}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        )}
        {/* Password Change Button */}
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Change Password
        </button>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
