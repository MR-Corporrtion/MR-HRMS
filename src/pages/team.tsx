"use client";

import { useState } from "react";
import { Search, FilterList, Add } from "@mui/icons-material";
import ApprisalMainlayout from "../layouts/admin/ApprisalMainlayout";

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);

  interface TeamMember {
    id: number;
    name: string;
    position: string;
    department: string;
  }

  const handleStartAppraisal = (employeeId: number): void => {
    alert(`Start appraisal for employee ID: ${employeeId}`);
  };

  const handleViewProfile = (employeeId: number): void => {
    alert(`View profile for employee ID: ${employeeId}`);
  };

  const teamMembers: TeamMember[] = [
    { id: 1, name: "John Doe", position: "Designer", department: "design" },
    { id: 2, name: "Jane Smith", position: "Engineer", department: "engineering" },
    { id: 3, name: "Alice Johnson", position: "Product Manager", department: "product" },
    { id: 4, name: "Bob Brown", position: "Marketing Specialist", department: "marketing" },
    { id: 5, name: "Charlie Davis", position: "Data Analyst", department: "data" },
  ];

  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" ||
      member.department.toLowerCase() === departmentFilter.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  return (
    <ApprisalMainlayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Team</h1>
            <p className="text-gray-500">Manage your team members and their performance</p>
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => setShowAddMemberForm(true)}
          >
            <Add fontSize="small" />
            <span>Add Team Member</span>
          </button>
        </header>

        {/* Team Members List */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ul className="divide-y divide-gray-200">
            {filteredTeamMembers.map((member) => (
              <li key={member.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.position} - {member.department}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleViewProfile(member.id)}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleStartAppraisal(member.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                  >
                    Start Appraisal
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ApprisalMainlayout>
  );
}
