import React from 'react';
import { logo } from "@/src/assets/admin/adminicon";
import { apiBaseURL } from '@/config/route.config';
import { companyData } from '@/src/utils/superAdmin/data';

// Import your API client



function PaymentRecept({ employeeData,companyData,branchData }: { employeeData: any,companyData:any,branchData: any }) {

  return (
    <div className="a4-size mx-auto bg-white p-6 shadow-lg rounded-lg">
  {/* Header Section */}
  <div className="text-center items-center mb-4">
    {/* Centered Logo */}
    <div className="flex items-center justify-center mb-2">
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
    </div>
    <p className="font-semibold">Registration Fees Payment Receipt Form</p>
  </div>

  {/* Employee Data Section */}
  {employeeData ? (
    <div className="space-y-4">
      <div className="flex">
        <span className="font-bold">Employee Name:</span>
        <span>{employeeData.fullName}</span>
      </div>
      <div className="flex">
        <span className="font-bold">Site Name:</span>
        <span>{employeeData.companyName}</span>
      </div>
      <div className="flex">
        <span className="font-bold">Designation:</span>
        <span>{employeeData.designation}</span>
      </div>
      <div className="flex">
        <span className="font-bold">Registration Fee:</span>
        <span>₹{employeeData.registrationFee}</span>
      </div>
      <div className="flex">
        <span className="font-bold">Registration Fee Received:</span>
        <span>{employeeData.paidRegistrationFee}</span>
      </div>
      <div className="flex">
  <span className="font-bold">Date of Payment:</span>
  <span>{employeeData.registrationFeeReceivedDate}</span>
</div>

      {/* Notes Section */}
      <div className="mt-4 text-sm">
        <p className="font-semibold">Note:</p>
        <ul className="list-disc list-inside">
          <li>No cash transaction is permissible.</li>
          <li>Photocopy of the same to be submitted at the account department.</li>
        </ul>
      </div>

      {/* Signature Section */}
      <div className="flex justify-between mt-6">
        <div className="text-center">
          <p className="font-semibold">Employee Signature</p>
          <p>____________</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">HR SPOC Name & Signature</p>
          <p>____________</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">Accountant Signature</p>
          <p>____________</p>
        </div>
      </div>
      <div>
            <p>Note:</p>
            <p>1-No cash transaction is permissible.</p>
            <p>2-Photocopy of the same to be submitted at account department.</p>
          </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">Loading employee data...</p>
  )}
</div>
  );
};

export default PaymentRecept;




