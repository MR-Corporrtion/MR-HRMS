import React from "react";
import { logo } from "@/src/assets/admin/adminicon";
import { apiBaseURL } from "@/config/route.config";

export default function Checklist({ employeeData,companyData,branchData }: { employeeData: any, companyData: any, branchData: any }) {
  const documents = [
    "UFS 360 Form",
    "Joining Form",
    "Employee Information Form",
    "Terms & Condition Annexure-1",
    "Employee Documents Adhaar Card",
    "Pan Card",
    "Voter ID",
    "Passport Size Photo",
    "Bank Details",
    "Education Certificate",
    "Medical Fitness Certificate",
    "Character Certificate/Police Verification",
    "Appointment Letter Acceptance Copy",
    "Induction for Registration fee structure",
    "Salary breakup",
    "Annexure details",
    "Leave criteria",
  ];

  return (
    <div className="a4-size bg-white p-4 mx-auto border shadow-lg">
      {/* Logo and Address */}
      <div className="flex flex-col items-center mb-3">
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
          Arya Surya Enclave, Plot No- K5/475, Khata No 95/937, Fourth Floor, Mouza-Subudhi Pur, Kalinga Vihar, Patrapada, Bhuabneswar, Dist- Khurda, Odisha, India-751019.
        </p>
      </div>

      {/* Employee Details */}
      <div className="text-xl mb-3">
        <p>Name: <strong>{employeeData.fullName}</strong> <strong>({employeeData.empid})</strong></p>
        <p>Site: <strong>{employeeData.companyName}</strong></p>
      </div>

      {/* Checklist Title */}
      <h2 className="text-base font-bold text-center mb-3">
        New Joinee Checklist by HR
      </h2>

      {/* Checklist Table */}
      <table className="w-full border-collapse border border-gray-300 text-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-1 w-6">SL</th>
            <th className="border p-1">Documents</th>
            <th className="border p-1 w-16">Status</th>
            <th className="border p-1 w-20">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td className="border p-1 text-center">{index + 1}</td>
              <td className="border p-1">{doc}</td>
              <td className="border p-1 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3"
                      value="Yes"
                    />
                    <span className="ml-1">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-3 w-3"
                      value="No"
                    />
                    <span className="ml-1">No</span>
                  </label>
                </div>
              </td>
              <td className="border p-1">
                <input
                  type="text"
                  className="w-full p-1 border rounded text-center text-xs"
                  placeholder="Remarks"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-6 text-right text-lg font-bold">
        <p>for <strong>{companyData?.compname}</strong></p>
        <p className="mt-4">Authorised Signatory</p>
      </div>

      {/* Print and Styles */}
      <style jsx>{`
        @media print {
          .a4-size {
            margin: 0 auto;
            width: 210mm;
            height: 297mm;
            padding: 10mm;
            box-sizing: border-box;
            page-break-inside: avoid;
          }
          table {
            font-size: 10px;
          }
          tr {
            page-break-inside: avoid;
          }
        }
        .a4-size {
          max-width: 210mm;
          height: 297mm;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
