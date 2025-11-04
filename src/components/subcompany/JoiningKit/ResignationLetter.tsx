import { apiBaseURL } from '@/config/route.config';
import React from 'react';

export default function ResignationLetter({
  employeeData,
  companyData,
  branchData,
}: {
  employeeData: any;
  companyData: any;
  branchData: any;
}) {
  return (
    <div className="a4-size p-8 border-2 border-gray-300 mx-auto max-w-[210mm] bg-white">
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
          {companyData?.address || 'Arya Surya Enclave, Plot No- K5/475, Khata No 95/937, Fourth Floor, Mouza-Subudhi Pur, Kalinga Vihar, Patrapada, Bhubaneswar, Dist- Khurda, Odisha, India-751019.'}
        </p>
      </div>
      
      <div className="mb-8">
        <p><strong>To</strong></p>
        <p><strong>The Manager/HR</strong></p>
        <p><strong>{companyData?.company_name || 'Utkal Facility Services Pvt. Ltd.'}</strong></p>
        <p><strong>{companyData?.address || 'Bhubaneswar, Odisha'}</strong></p>
        <p><strong>Sub :- Resignation Letter.</strong></p>
      </div>
      
      <div className="mb-8">
        <p className="mb-4">
          I <span className="underline">{employeeData?.fullName || '___________________________'}</span> working as a <span className="underline">{employeeData?.designation || '______________________'}</span> in your organization since <span className="underline">{employeeData?.hiring_date || '_______________________'}</span>, won't be able to continue from <span className="underline">_________________________________________</span> because of unavailable personal circumstance. I would like to thank you for all the learning and the good time.
        </p>
        
        <p className="mb-4">
          Therefore, I submit my resignation. Kindly accept my resignation from my role as <span className="underline">{employeeData?.designation || '____________________'}</span> and my last day of employment will be <span className="underline">___/___/______</span>.
        </p>
        
        <p className="mb-4">
          Thank you again for the support and opportunity to work with such a great Team.
        </p>
        
        <p className="mb-4">With Regards</p>
        <p>Yours Sincerely</p>
      </div>
      
      <div className="mt-16">
        <p className="text-right">Employee Signature</p>
      </div>
    </div>
  );
}