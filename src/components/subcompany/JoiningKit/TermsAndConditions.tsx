import { apiBaseURL } from '@/config/route.config';
import React from 'react';

export default function TermsAndConditions({
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
      
      <h2 className="text-xl font-bold text-center mb-6">TERMS AND CONDITIONS</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 underline">Leave:</h3>
        <p className="mb-4">
          If employee wants to take leave (except medical urgency), then submit leave application before 7 days. In emergency they inform by telephonic to his senior reporting authority. If someone take leaves without information and leave application, then company will deduct Rs-100/- per days from his current month salary.
        </p>
        
        <h3 className="text-lg font-semibold mb-2 underline">Absconding:</h3>
        <p className="mb-4">
          If an employee absconds from his duty, then company will hold his wages. After that if he/she submit his resign then company will deduct Rs-2500/- from his wages as Full & Final settlement.
        </p>
        
        <h3 className="text-lg font-semibold mb-2 underline">Resignation:</h3>
        <p className="mb-4">
          If an employee wants to resign from his post, then submit resignation letter and complete 1-month notice period. If employees leave without any notice period, then company will hold his salary and mark him as absconder.
        </p>
        
        <h3 className="text-lg font-semibold mb-2 underline">Wages:</h3>
        <p className="mb-4">
          If an employee does not work 7 days within 1<sup>st</sup> to 10<sup>th</sup> of every month, then previous month salary will be hold. After joining in duty and complete 7 days' duty, company will release the hold wages.
        </p>
        
        <h3 className="text-lg font-semibold mb-2 underline">ID Card:</h3>
        <p className="mb-4">
          Company will provide the Plastic ID card freely for 1<sup>st</sup> time. If employees lost/damage his/her ID card or closed his duty before completed one year then after submission of lost Application/Resignation company will provide the Plastic ID card (for lost) and deduct Rs-100/- from his/her current month wages.
        </p>
      </div>
      
      <div className="mt-16">
        <p className="mb-4">Employee Signature: ______________________________</p>
        <p className="mb-4">Date: ______________________________</p>
      </div>
    </div>
  );
}