import React from "react"
import { logo } from "@/src/assets/admin/adminicon"
import { apiBaseURL } from "@/config/route.config"
import { companyData } from "@/src/utils/superAdmin/data"

export default function OfficeAssets({ employeeData,companyData,branchData }: { employeeData: any,companyData:any, branchData: any }) {
  return (
    <div
      className="border border-gray-300 mx-auto px-4 py-3 text-base"
      style={{
        width: "210mm", // A4 width
        height: "297mm", // A4 height
        padding: "10mm", // Reduced padding to fit content
        boxSizing: "border-box",
        backgroundColor: "#fff",
        fontSize: "12pt", // Increased base font size
        lineHeight: "1.3", // Adjusted line height for better readability
      }}
    >
      <div className="flex flex-col items-center mb-4">
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
        <p className="text-center text-sm">
          Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar 751013, Odisha
        </p>
      </div>
      <h2 className="text-xl font-bold mb-2 text-center">Employee Declaration for Return of Office Assets</h2>
      <div className="mb-2">
        <p>TO,</p>
        <p>Human Resource Department</p>
        <p>{companyData?.compname}</p>
        <p>Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar</p>
        <p>751013, Odisha</p>
      </div>

      <p className="font-semibold mt-3 mb-3">Subject: Employee Declaration for Clearance of Office Assets</p>
      <p className="mb-3">Dear Madam/Sir,</p>
      <p className="mb-3">
        I have joined <strong>{companyData?.compname}</strong> on{" "}
        <span className="font-bold">{employeeData.hiring_date}</span> as the Designation{" "}
        <span className="font-bold">{employeeData.designation}</span>. I am posted at the client site{" "}
        <span className="font-bold">{employeeData.companyName}</span>, located at{" "}
        <span className="font-bold">{employeeData.location}</span>.
      </p>

      <p className="mb-3">
        I have received the following office assets at joining time at <strong>{companyData?.compname}</strong>:
      </p>

      <table className="w-full border-collapse border border-gray-300 text-sm mb-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-1">SL</th>
            <th className="border p-1">Product</th>
            <th className="border p-1">Size</th>
            <th className="border p-1">Pair</th>
            <th className="border p-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {["ID Card", "Paint", "Shirt", "T-Shirt", "Cap", "Belt", "Shoe", "Apron"].map((item, index) => (
            <tr key={index}>
              <td className="border p-1 text-center">{index + 1}</td>
              <td className="border p-1">{item}</td>
              <td className="border p-1"></td>
              <td className="border p-1"></td>
              <td className="border p-1"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mb-3">
        I received the above materials from the HR Department on{" "}
        <span className="font-bold">{employeeData.hiring_date}</span>.
      </p>

      <p className="mb-3">
        I declare that I will follow the Dress Code Policy, Attendance Policy, and Leave Policy as per the Principal
        Employer. Before leaving the job, I will notify my reporting authority, serve a one-month notice period, and
        return all office assets issued to me in perfect condition for clearance purposes.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-3">
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
     <div className="grid grid-cols-2 gap-4 mb-3">
      <p className="mb-3">
        Employee Name: <span className="font-bold">{employeeData.fullName}</span>
      </p>
      <p className="mb-3">
            <strong>Employee Signature:</strong>
            </p>
      <p className="mb-3">
        Employee Code: <span className="font-bold">{employeeData.empid}</span>
      </p>
      <p className="mb-3">
        Client Site: <span className="font-bold">{employeeData.companyName}</span>
      </p>
      <p className="mb-3">
        Permanent Address: <span className="font-medium">{employeeData.permanent_address}</span>
      </p>
      </div>
    </div>
  )
}

