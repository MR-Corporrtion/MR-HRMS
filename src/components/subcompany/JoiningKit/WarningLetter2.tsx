import { apiBaseURL } from '@/config/route.config';
import React from 'react';

export default function WarningLetter2({
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
        <p><strong>Mr. /Ms. {employeeData?.fullName || '_________________________'}</strong></p>
        <p><strong>S/O :- {employeeData?.relativeName || '_________________________'}</strong></p>
        <p><strong>Designation :- {employeeData?.designation || '_________________________'}</strong></p>
        <p><strong>Employee ID :- {employeeData?.empid || '_________________________'}</strong></p>
        <p><strong>Unit Name :- {branchData?.branchName || companyData?.company_name || '_________________________'}</strong></p>
      </div>
      
      <div className="mb-8">
        <p><strong>Dear Mr./Ms. {employeeData?.fullName || '___________________________'},</strong></p>
        
        <p className="mb-4">
          It is observed/noticed that after issued first warning letter to you,
          you not upgrade your work performance neither you want to change
          yourself. In this circumstances company is facing a lots of
          difficulties to maintain the client sevice.
        </p>
        
        <p className="mb-4">
          However, you are here by severely warned and advised, in your own
          interest, to be more attentive in your work and complete the given
          task in the given schedule duly following the instructions of your
          superiors and also mend yourself.
        </p>
        
        <p className="mb-4">
          In case of any repetition of above act, in future, the management has
          no option except to initiate necessary disciplinary proceedings
          against you.
        </p>
        
        <p>Thanking You</p>
      </div>
      
      <div className="mt-16">
        <p className="text-right">Authorized Signatory</p>
        
      </div>
    </div>
  );
}