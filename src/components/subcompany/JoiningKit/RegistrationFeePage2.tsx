import React from "react"
import { logo } from "@/src/assets/admin/adminicon"
import { apiBaseURL } from "@/config/route.config"

export default function RegistrationFeePage2({ employeeData,companyData,branchData }: { employeeData: any,companyData:any,branchData: any }) {
  return (
    <div
      style={{
        width: "210mm",
        height: "297mm",
        padding: "10mm",
        border: "1px solid #ddd",
        backgroundColor: "white",
        boxSizing: "border-box",
        fontSize: "14pt",
        lineHeight: "1.3",
      }}
      className="mx-auto shadow-lg"
    >
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
        <p className="text-center text-sm">
          Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar 751013, Odisha
        </p>
      </div>

      <h3 className="text-base font-semibold mb-1">Penalty Policy for Specified Offences:</h3>

      <table className="w-full border-collapse border border-gray-300 mb-2 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-1">Offences</th>
            <th className="border p-1">Penalties & Punishment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-1">Not found displaying photo ID & not in proper Uniform</td>
            <td className="border p-1">Warning 1st and 2nd Rs 200/- per instance thereafter.</td>
          </tr>
          <tr>
            <td className="border p-1">
              Under the influence of alcohol/tobacco/sleeping or any other misconduct during duty hours.
            </td>
            <td className="border p-1">Rs 1000/- with removal of the offender and termination of employment.</td>
          </tr>
          <tr>
            <td className="border p-1">Unsatisfactory performance</td>
            <td className="border p-1">
              Individual Complaint: Warning 1st & 2nd 200/- per instance thereafter and termination
            </td>
          </tr>
          <tr>
            <td className="border p-1">Absenteeism</td>
            <td className="border p-1">Rs 100/- per instance</td>
          </tr>
          <tr>
            <td className="border p-1">Wrong/Improper work Complaints are not registered or not addressed.</td>
            <td className="border p-1">Rs 200/- per instance</td>
          </tr>
          <tr>
            <td className="border p-1">
              For any other breach, violation or contravention of any terms and conditions.
            </td>
            <td className="border p-1">Rs 500/- will be imposed per day</td>
          </tr>
          <tr>
            <td className="border p-1">Absence of personal protective gears</td>
            <td className="border p-1">Rs 200/- per instance</td>
          </tr>
          <tr>
            <td className="border p-1">Misbehaviour/Theft/Sexual harassment etc.</td>
            <td className="border p-1">Rs 1000/- with removal of the offender and termination of employment.</td>
          </tr>
          <tr>
            <td className="border p-1">
              Min.24 attendance required each month. If leave application not submitted through proper channel.
            </td>
            <td className="border p-1">Count as absenteeism and impose penalty accordingly.</td>
          </tr>
          <tr>
            <td className="border p-1">Employment less than 15 days</td>
            <td className="border p-1">Payment will not be paid</td>
          </tr>
        </tbody>
      </table>

      <p className="text-sm mb-2">
        The Company reserves the right to terminate his/her employment without any notice. If an employee commits any
        breach of the Code of Conduct and Disciplinary Procedures or his conduct is detrimental to the interests of the
        Company, his/her services will be terminated without any notice or payment in lieu thereof.
      </p>

      <h3 className="text-base font-semibold mb-1">Acceptance:</h3>
      <p className="text-sm mb-2">
        I, <strong>{employeeData.fullName}</strong>, S/O/D/O <strong>{employeeData.relativeName}</strong>, have
        carefully read and understood the terms and conditions stated in the appointment letter and hereby confirm my
        acceptance for the same as designation of <strong>{employeeData.designation}</strong>. I undertake to abide by
        the same.
      </p>

      <div className="mt-4 text-sm">
        <p className="font-semibold">Declaration:</p>
        <p>
          I hereby declare that I have read and understood all the terms and conditions mentioned in this document,
          including the penalty policy. I agree to comply with these terms and conditions during my employment with
          {companyData?.compname}.
        </p>
      </div>
      <div className="mt-2 flex justify-between items-center text-sm">
        <div>
          <p className="font-semibold">
            Place: <strong>{employeeData.address}</strong>
          </p>
          <p className="font-semibold">
            Date: <strong>{employeeData.hiring_date}</strong>
          </p>
        </div>

        <div>
          <p className="font-semibold">Employee Name: {employeeData.fullName}</p>
          <p className="font-semibold">Employee ID: {employeeData.empid}</p>
          <p className="font-semibold">Date: {employeeData.hiring_date}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="font-semibold mb-2">Employee Signature</p>
          <p>{employeeData.fullName}</p>
        </div>
        <div>
          <p className="font-semibold mb-2">HR Representative</p>
          <p>{employeeData.hr_representative}</p>
        </div>
      </div>
    </div>
  )
}

