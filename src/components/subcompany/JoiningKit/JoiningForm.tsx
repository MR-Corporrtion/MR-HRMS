import { apiBaseURL } from "@/config/route.config";
import { companyData } from "@/src/utils/superAdmin/data";
import React from "react";

export default function JoiningForm({
  employeeData,
  companyData,
  branchData,
}: {
  employeeData: any;
  companyData:any;
  branchData: any;
  logo: { src: string };
}) {
  return (
    <div className="a4-size p-8 border-2 border-gray-300 mx-auto max-w-[210mm] bg-white">
      {/* Logo and Address */}
      <div className="flex flex-col items-center mb-6">
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
        <p className="text-center text-base">
          Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar
          751013, Odisha
        </p>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-center mb-4">JOINING FORM</h2>

      {/* Personal Details */}
      <h3 className="text-lg font-semibold mb-2">PERSONAL DETAILS</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p>
          <strong>Name:</strong> {employeeData.fullName}
        </p>
        <p>
          <strong>Present Address:</strong> {employeeData.address}
        </p>
        <p>
          <strong>Fathers / Spouse Name:</strong> {employeeData.relativeName}
        </p>
        <p>
          <strong>Mothers Name:</strong> {employeeData.mother_name}
        </p>
        <p>
          <strong>Marital Status:</strong> {employeeData.material_status}
        </p>
        <p>
          <strong>Gender:</strong> {employeeData.gender}
        </p>
        <p>
          <strong>Blood Group:</strong> {employeeData.blood_group}
        </p>
        <p>
          <strong>Mobile No:</strong> {employeeData.phone_number}
        </p>
        <p>
          <strong>Alt. Mobile No:</strong>{" "}
          {employeeData.alternative_phone_number}
        </p>
        <p>
          <strong>Aadhar Card No:</strong> {employeeData.aadhaarNumber}
        </p>
        <p>
          <strong>Edu Qualification:</strong> {employeeData.degree}
        </p>
        <p>
          <strong>EPF No:</strong> {employeeData.epf_no}
        </p>
        <p>
          <strong>ESI No:</strong> {employeeData.esicNumber}
        </p>
      </div>

      {/* Document Details */}
      <h3 className="text-lg font-semibold mb-2">Document Details</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
  {[
    "Passport Size Photo- 4",
    "Bank statement",
    "Aadhar Card",
    "Educational Certificate",
    "Voter Card",
    "Police Verification",
    "Pan Card",
  ].map((doc, index) => (
    <div key={index} className="flex items-center">
      <input
        type="checkbox"
        id={`doc-${index}`}
        name={`doc-${index}`}
        className="mr-2"
      />
      <label htmlFor={`doc-${index}`} className="text-lg">
        {doc}
      </label>
    </div>
  ))}
</div>


      {/* Joining Details */}
      <h3 className="text-lg font-semibold mb-2">JOINING DETAILS</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p>
          <strong>Date of Joining:</strong> {employeeData.hiring_date}
        </p>
        <p>
          <strong>Designation:</strong> {employeeData.designation}
        </p>
        <p>
          <strong>Salary per month:</strong> {employeeData.salary_monthly}
        </p>
        <p>
          <strong>Registration Fees:</strong> {employeeData.paidRegistrationFee}
        </p>
        <p>
          <strong>Site Name:</strong> {employeeData.companyName}
        </p>
        <p>
          <strong>Pending fees:</strong> {employeeData.balanceRegistrationFee}
        </p>
      </div>

      {/* Declaration */}
      <div className="mt-6">
        <p className="mb-4">
          I do hereby declare that all the information given above is true to
          the best of my knowledge and belief.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Date:</strong> {employeeData.hiring_date}
          </p>
          <p>
            <strong>Employee Signature:</strong> ___________________________
          </p>
        </div>
      </div>
    </div>
  );
}
