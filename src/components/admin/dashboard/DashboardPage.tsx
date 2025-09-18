import React, { useEffect, useState } from 'react';
import { apiClient } from "../../../../config/route.config";
import { image1, image2, image3, image4, image5, image6 } from '@/src/assets/admin/adminicon';
import {
  Business,
  People,
  FlightTakeoff,
  MonetizationOn,
  Schedule,
  Payment,
} from '@mui/icons-material';
import Image from 'next/image';

export default function DashboardPage() {
  const [companyCount, setCompanyCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [allLeaves, setAllLeaves] = useState(0);
  const [allAttendances, setAllAttendances] = useState(0);
  const [allSalaryAdvances, setAllSalaryAdvances] = useState(0);
  const [allReimbursement, setAllReimbursement] = useState(0);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState<string>(""); // Default to empty string
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const response = await apiClient.get("/report/get", {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true,
        });

        if (!response.data) {
          throw new Error("Failed to fetch company data");
        }

        const data = response.data;
        setCompanyCount(data?.allCompanies?.length || 1);
        setEmployeeCount(data?.allEmployees?.length || 0);
        setAllLeaves(data?.allLeaves?.length || 0);
        setAllAttendances(data?.allAttendances?.length || 0);
        setAllSalaryAdvances(data?.allSalaryAdvances?.length || 0);
        setAllReimbursement(data?.allReimbursement?.length || 0);
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("Failed to fetch company data");
      }
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('branch/get', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setBranches(response.data?.data);
      console.log("response",response.data?.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch branches');
      console.error('Error fetching branches:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBranchChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branchID = e.target.value === "" ? null : e.target.value;
    setSelectedBranch(e.target.value);

    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post(
        '/user/assign-branchid',
        { branchID },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        localStorage.setItem('branchID', branchID || '');
        sessionStorage.setItem('branchID', branchID || '');
        alert('Branch assigned successfully');
      } else {
        alert(response.data.msg || 'Failed to assign branch');
      }
    } catch (error: any) {
      console.error("Error assigning branch:", error);
      alert(error.response?.data?.msg || 'Something went wrong');
    }
  };

  const cardData = [
    { title: "Company", count: companyCount, img: image1, bgColor: "bg-gradient-to-r from-green-400 to-blue-500" },
    { title: "Employee", count: employeeCount, img: image2, bgColor: "bg-gradient-to-r from-red-400 to-pink-500" },
    { title: "Leave", count: allLeaves, img: image3, bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500" },
    { title: "Reimbursement", count: allReimbursement, img: image4,bgColor: "bg-gradient-to-r from-indigo-400 to-purple-500" },
    { title: "Attendance", count: allAttendances, img: image5 ,bgColor: "bg-gradient-to-r from-teal-400 to-cyan-500"},
    { title: "Advance Salary", count: allSalaryAdvances, img: image6,bgColor: "bg-gradient-to-r from-gray-400 to-gray-600" },
  ];

  return (
    <div className="flex flex-col gap-12 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-[#5A12CF] flex items-center gap-4 font-bold">
          Dashboard
        </h1>

        {/* Branch Selection */}
        <div>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <select
              className="p-2 border border-gray-300 rounded-md"
              value={selectedBranch}
              onChange={handleBranchChange}
            >
              <option value="">All</option>
              {branches.map((branch: any) => (
                <option key={branch.branchID} value={branch.branchID}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          )}
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`card w-64 h-40 ${card.bgColor} text-white p-6 rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{card.title}</span>
                <span className="text-3xl font-bold">{card.count}</span>
              </div>
              <div className="w-14 h-14 text-5xl">
                <Image src={card.img} alt={card.title} className="rounded-full" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
