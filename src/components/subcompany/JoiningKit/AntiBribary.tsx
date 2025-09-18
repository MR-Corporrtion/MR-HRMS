

import React from "react";
import { logo } from "@/src/assets/admin/adminicon";
import { apiBaseURL } from "@/config/route.config";
import { companyData } from "@/src/utils/superAdmin/data";

const calculateAge = (dateOfBirth: string): number => {
  const dob = new Date(dateOfBirth); // Convert date_of_birth to a Date object
  const today = new Date(); // Current date
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // Adjust age if the birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
  }
  return age;
};


export default function AntiBribery({ employeeData,companyData,branchData }: { employeeData: any, companyData:any,branchData: any }) {
  return (
    <div className="max-w-[210mm] mx-auto p-8 border shadow bg-white flex flex-col items-center ">
    <div className="flex items-center justify-center w-24 h-24 mb-1">
             <img
               src={
                 branchData?.branchLogo
                   ? `${apiBaseURL}/photo/${branchData.branchLogo}`
                   : `${apiBaseURL}/photo/${companyData?.company_logo}`
               }
               alt="Company Logo"
               className="object-contain w-full h-full"
             />
           </div>
      <h2 className="text-2xl font-bold mb-6 text-center">DECLARATION</h2>

      <div className="space-y-4 text-justify">
        <p>
          <strong>NAME:</strong> {employeeData.fullName}
        </p>

        <p>
          I, <span className="font-bold">{employeeData.fullName}</span>, Son/Daughter of Shri
          <span className="font-bold"> {employeeData.relativeName}</span>,
          age <span className="font-bold">{calculateAge(employeeData.date_of_birth)}</span> years, resident of
          <span className="font-bold"> {employeeData.address}</span> in the District of
          <span className="font-bold"> {employeeData.currentDistrict}</span>,
          <span className="font-bold"> {employeeData.currentState}</span>, do hereby declare that I am
          not giving & taking any kind of Bribe or any monetary transaction from any of UFS staffs.
        </p>

        <p>
          If the information given by me is proved false / not true at any point of time, I will have
          to face punishment as per any provision of Law for the time being in force as well as the
          benefit availed of by me or the benefit accrued to me shall be summarily cancelled.
        </p>

        <p className="font-semibold">The Punishments are:</p>
        <ul className="list-disc list-inside pl-4">
          <li>Salary hold</li>
          <li>Legal action</li>
          <li>Penalty</li>
        </ul>

        <div className="mt-6 flex justify-between">
          <div>
            <p className="font-semibold">Date:</p>
            <p>{employeeData.hiring_date}</p>
          </div>

          <div>
            <p className="font-semibold">Signature:</p>
            <p className="italic font-bold">________________________</p>
          </div>
        </div>
      </div>
    </div>
  );
}
