import { apiBaseURL } from '@/config/route.config';
import React, { useRef } from 'react';

export default function JoiningKitDocument({
  employeeData,
  companyData,
  branchData,
}: {
  employeeData: any;
  companyData: any;
  branchData: any;
}) {
  const documentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (documentRef.current) {
      const printWindow = window.open();
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Joining Kit Document</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 0; 
                  font-family: Arial, sans-serif;
                  background-color: white;
                }
                .page-break { 
                  page-break-after: always; 
                  margin-bottom: 20px;
                }
                .a4-size { 
                  width: 210mm; 
                  min-height: 297mm; 
                  padding: 20px; 
                  border: 1px solid #ccc; 
                  margin: 10px auto; 
                  background: white;
                  box-sizing: border-box;
                }
                @media print {
                  .page-break { 
                    page-break-after: always; 
                    margin-bottom: 0;
                  }
                  .a4-size { 
                    border: none; 
                    margin: 0; 
                    padding: 15px;
                  }
                  @page {
                    margin: 0;
                    size: A4;
                  }
                  body {
                    margin: 0;
                    padding: 0;
                  }
                }
                .underline { text-decoration: underline; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .font-bold { font-weight: bold; }
                .mb-4 { margin-bottom: 16px; }
                .mb-8 { margin-bottom: 32px; }
                .mt-16 { margin-top: 64px; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: 1fr 1fr; }
                .gap-8 { gap: 32px; }
                .gap-4 { gap: 16px; }
                .flex { display: flex; }
                .flex-col { flex-direction: column; }
                .items-center { align-items: center; }
                .justify-center { justify-content: center; }
                .w-24 { width: 96px; }
                .h-24 { height: 96px; }
                .mb-1 { margin-bottom: 4px; }
                .mb-6 { margin-bottom: 24px; }
                .object-contain { object-fit: contain; }
                .w-full { width: 100%; }
                .h-full { height: 100%; }
                .border { border: 1px solid #ccc; }
                .p-1 { padding: 4px; }
                .border-gray-300 { border-color: #d1d5db; }
                .border-2 { border-width: 2px; }
                .mx-auto { margin-left: auto; margin-right: auto; }
                .max-w-\\[210mm\\] { max-width: 210mm; }
                .bg-white { background-color: white; }
                .p-8 { padding: 32px; }
                .text-base { font-size: 16px; }
                .text-xl { font-size: 20px; }
                .text-lg { font-size: 18px; }
                .space-y-1 > * + * { margin-top: 4px; }
                .blank-line { 
                display: inline-block;
                  border-bottom: 1px solid #000; 
                  min-height: 20px; 
                  margin: 5px 0;
                  vertical-align: middle;
                }
              </style>
            </head>
            <body>
              ${documentRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        
        // Wait for images to load before printing
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  };

  return (
    <div>
      {/* Download Button */}
      <div className="text-center mb-4">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download All Pages
        </button>
      </div>

      <div ref={documentRef} className="document-container">
        {/* Warning Letter 1 */}
        <div className="page-break">
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
              <p><strong>Employee ID :- {employeeData?.employeeId || '_________________________'}</strong></p>
              <p><strong>Unit Name :- {branchData?.branchName || companyData?.company_name || '_________________________'}</strong></p>
            </div>
            
            <div className="mb-8">
              <p><strong>Dear Mr./Ms. {employeeData?.fullName || '___________________________'},</strong></p>
              
              <p className="mb-4">
                It is observed/noticed that your performance is very poor and not up
                to the mark; that you are not reaching your targets and completing the
                work within the stipulated time and schedule; that you are not
                adhering to the instructions of your superiors, issued to you from
                time to time. It is also further noticed that you are misusing the
                working hours to using the mobile phones, during the working hours.
                Your above acts cause dislocation to the day-today work. You are aware
                that ours is a time bound organization and the given task shall
                complete as scheduled.
              </p>
              
              <p className="mb-4">
                It clearly shows your indifferent attitude towards your work as well
                as your superiors, which amounts to misconduct and liable for
                disciplinary proceeding.
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
              <div className="text-right mt-12">
                <div className="blank-line w-48 inline-block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Letter 2 */}
        <div className="page-break">
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
              
              <p className="mb-4 text-justify">
                It is observed/noticed that after issued first warning letter to you,
                you not upgrade your work performance neither you want to change
                yourself. In this circumstances company is facing a lots of
                difficulties to maintain the client sevice.
              </p>
              
              <p className="mb-4 text-justify">
                However, you are here by severely warned and advised, in your own
                interest, to be more attentive in your work and complete the given
                task in the given schedule duly following the instructions of your
                superiors and also mend yourself.
              </p>
              
              <p className="mb-4 text-justify">
                In case of any repetition of above act, in future, the management has
                no option except to initiate necessary disciplinary proceedings
                against you.
              </p>
              
              <p>Thanking You</p>
            </div>
            
            <div className="mt-16">
              <p className="text-right">Authorized Signatory</p>
              <div className="text-right mt-12">
                <div className="blank-line w-28 inline-block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Letter 3 */}
        <div className="page-break">
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
              
              <p className="mb-4 text-justify">
                It is observed/noticed that after received second warning letter you
                have not changed your work performance or not adhere the company
                policy which was repeatedly communicate to you.
              </p>
              
              <p className="mb-4 text-justify">
                Management was decided to serve you an third and final warning letter
                to you and after that if your activity will not be changed then
                management will force to terminate your service with immediate effect.
              </p>
              
              <p>Thanking You</p>
            </div>
            
            <div className="mt-16">
              <p className="text-right">Authorized Signatory</p>
              <div className="text-right mt-12">
                <div className="blank-line w-48 inline-block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Resignation Letter Template */}
        <div className="page-break">
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
              <div className="text-right mt-12">
                <div className="blank-line w-48 inline-block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="page-break">
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
        </div>

        {/* Declaration */}
        <div className="page-break">
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
        </div>
      </div>
    </div>
  );
}