import React from "react"
import { apiBaseURL } from "@/config/route.config"

export default function OfficeAssets({ employeeData, companyData, branchData }: { employeeData: any, companyData: any, branchData: any }) {
  return (
    <div
      className="border border-gray-300 mx-auto px-4 py-3 text-base"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "8mm",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        fontSize: "13pt",
        lineHeight: "1.2",
      }}
    >
      {/* Header Section - Made more compact */}
      <div className="flex flex-col items-center mb-2">
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
        <p className="text-center text-md leading-tight">
          Arya Surya Enclave, Plot No- K5/475, Khata No 95/937, Fourth Floor, Mouza-Subudhi Pur, Kalinga Vihar, Patrapada, Bhubaneswar, Dist- Khurda, Odisha, India-751019.
        </p>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold mb-2 text-center">Employee Declaration for Return of Office Assets</h2>

      {/* Recipient Address - Made more compact */}
      <div className="mb-2 text-sm">
        <p>TO,</p>
        <p>Human Resource Department</p>
        <p>{companyData?.compname}</p>
        <p>Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar</p>
        <p>751013, Odisha</p>
      </div>

      <p className="font-semibold mt-2 mb-2 text-sm">Subject: Employee Declaration for Clearance of Office Assets</p>
      
      {/* Content - Reduced spacing and font size */}
      <p className="mb-2 text-sm">Dear Madam/Sir,</p>
      <p className="mb-2 text-sm">
        I have joined <strong>{companyData?.compname}</strong> on{" "}
        <span className="font-bold">{employeeData.hiring_date}</span> as the Designation{" "}
        <span className="font-bold">{employeeData.designation}</span>. I am posted at the client site{" "}
        <span className="font-bold">{employeeData.companyName}</span>, located at{" "}
        <span className="font-bold">{employeeData.location}</span>.
      </p>

      <p className="mb-2 text-sm">
        I have received the following office assets at joining time at <strong>{companyData?.compname}</strong>:
      </p>

      {/* Table - Made more compact */}
      <table className="w-full border-collapse border border-gray-300 text-sm mb-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-1 w-8">SL</th>
            <th className="border p-1">Product</th>
            <th className="border p-1 w-16">Size</th>
            <th className="border p-1 w-16">Pair</th>
            <th className="border p-1 w-20">Status</th>
          </tr>
        </thead>
        <tbody>
          {["ID Card", "Paint", "Shirt", "T-Shirt", "Cap", "Belt", "Shoe", "Apron", "Soldier flop", "Liner Guard"].map((item, index) => (
            <tr key={index} className="h-6">
              <td className="border p-1 text-center">{index + 1}</td>
              <td className="border p-1">{item}</td>
              <td className="border p-1"></td>
              <td className="border p-1"></td>
              <td className="border p-1"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mb-2 text-sm">
        I received the above materials from the HR Department on{" "}
        <span className="font-bold">{employeeData.hiring_date}</span>.
      </p>

      <p className="mb-2 text-sm leading-tight">
        I declare that I will follow the Dress Code Policy, Attendance Policy, and Leave Policy as per the Principal
        Employer. Before leaving the job, I will notify my reporting authority, serve a one-month notice period, and
        return all office assets issued to me in perfect condition for clearance purposes.
      </p>

      {/* Footer Section - Made more compact */}
      <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
        <div>
          <p>
            Place: <span className="font-bold">{employeeData.address}</span>
          </p>
        </div>
        <div>
          <p>
            Date: <span className="font-bold">{employeeData.hiring_date}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p>
            Employee Name: <span className="font-bold">{employeeData.fullName}</span>
          </p>
          <p>
            Employee Code: <span className="font-bold">{employeeData.empid}</span>
          </p>
          <p>
            Client Site: <span className="font-bold">{employeeData.companyName}</span>
          </p>
        </div>
        <div className="space-y-1">
          <p>
            Permanent Address: <span className="font-small">{employeeData.permanent_address}</span>
          </p>
          <p className="mt-4">
            <strong>Employee Signature:</strong> _________________________
          </p>
        </div>
      </div>
    </div>
  )
}