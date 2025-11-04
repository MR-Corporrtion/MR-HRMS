import { apiBaseURL } from '@/config/route.config';
import React from 'react';

export default function Declaration({
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
      
      <h2 className="text-xl font-bold text-center mb-6">DECLARATION</h2>
      
      <div className="mb-8">
        <p className="mb-4">
          I hereby declare that I have not paid any commission, placement charges or any other amount whatever to <strong>{companyData?.company_name || 'Utkal Facility Services Pvt. Ltd.'}</strong> to get employment with it or any of its client in any manner whatever.
        </p>
        
        <p className="mb-4">
          The instant declaration is willful and without any pressure, coercion, undue Influence or fraud.
        </p>
      </div>
      
      <div className="mt-16">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p>Employee Signature:</p>
            <div className="blank-line mt-8 w-full"></div>
          </div>
          <div>
            <p>Name of Employee: {employeeData?.fullName}</p>
            <div className="blank-line mt-2 w-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <p>Designation: {employeeData?.designation}</p>
            <div className="blank-line mt-2 w-full"></div>
          </div>
          <div>
            <p>Dated: {employeeData?.hiring_date}</p>
            <div className="blank-line mt-2 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}