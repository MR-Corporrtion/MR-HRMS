
// import React from 'react';
// import { logo } from "@/src/assets/admin/adminicon";

// const numberToWords = (num: number): string => {
//   const a = [
//       "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
//       "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", 
//       "seventeen", "eighteen", "nineteen",
//   ];
//   const b = [
//       "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
//   ];
//   const toWords = (n: number): string => {
//       if (n < 20) return a[n];
//       if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
//       if (n < 1000)
//           return `${a[Math.floor(n / 100)]} hundred ${
//               n % 100 === 0 ? "" : "and " + toWords(n % 100)
//           }`.trim();
//       if (n < 100000)
//           return `${toWords(Math.floor(n / 1000))} thousand ${
//               n % 1000 === 0 ? "" : toWords(n % 1000)
//           }`.trim();
//       return `${toWords(Math.floor(n / 100000))} lakh ${
//           n % 100000 === 0 ? "" : toWords(n % 100000)
//       }`.trim();
//   };

//   return toWords(num);
// };

// export default function RegistrationFeePage1({ employeeData }: { employeeData: any }) {
//   return (
//     <div
//       className="border border-gray-300 mx-auto bg-white"
//       style={{
//         width: '210mm',
//         height: '297mm',
//         padding: '15mm',
//         boxSizing: 'border-box',
//         fontSize: '10pt',
//         lineHeight: '1.4',
//       }}
//     >
//       <div className="flex flex-col items-center">
//         <div className="flex items-center justify-center w-24 h-24 mb-2">
//           <img src={logo.src || "/placeholder.svg"} alt="Company Logo" className="w-full h-full object-contain" />
//         </div>
//         <p className="text-center text-base font-semibold">
//           UTKAL FACILITY SERVICES PVT. LTD.
//         </p>
//         <p className="text-center text-lg">
//           Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar 751013, Odisha
//         </p>
//       </div>

//       <h2 className="text-lg font-bold mb-4 text-center underline">Employee Declaration for Registration Fee Deduction</h2>

//       <div className="mb-4 text-lg">
//         <p>TO,</p>
//         <p>Human Resource Department</p>
//         <p>UTKAL GROUP OF ORGANIZATION</p>
//         <p>Plot No-HIG-42, Gangadhar Meher Marg,</p>
//         <p>Jayadev Vihar, Bhubaneswar 751013, Odisha</p>
//       </div>

//       <p className="font-semibold mt-4 mb-2 text-lg">Subject: Employee Declaration for Registration Fee Deduction</p>

//       <p className="mb-4 text-lg">Dear Madam/Sir,</p>

//       <div className="space-y-3 text-lg">
//         <p>I,<strong>{employeeData.fullName}</strong> , have joined UTKAL FACILITY SERVICES PVT. LTD. on <strong>{employeeData.hiring_date}</strong> as <strong>{employeeData.designation}</strong>. I am posted at the client site <strong>{employeeData.companyName}</strong>  located at <strong>{employeeData.location}</strong>.</p>

//         <h3 className="font-semibold mt-4 mb-2">1. Compensation:</h3>
//         <p className="mb-2">
//           My total monthly compensation shall be INR Rs. <strong>{employeeData.salary_monthly}</strong>/- <strong>(Rupees {numberToWords(employeeData.salary_monthly)} only)</strong>  after applicable tax deductions. The breakdown is as follows:
//         </p>

//         <table className="w-full border-collapse border border-gray-300 mb-4 text-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">PARTICULARS</th>
//               <th className="border p-2">IN HAND</th>
//               <th className="border p-2">PF</th>
//               <th className="border p-2">ESIC</th>
//               <th className="border p-2">CTC</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border p-2 text-center">{employeeData.in_hand}</td>
//               <td className="border p-2 text-center">{employeeData.net_salary}</td>
//               <td className="border p-2 text-center">{employeeData.employers_contribution_to_PF}</td>
//               <td className="border p-2 text-center">{employeeData.esic}</td>
//               <td className="border p-2 text-center">{employeeData.salary_monthly}</td>
//             </tr>
//           </tbody>
//         </table>

//         <p>
//     2. I am aware that my Registration Fee is Rs. {employeeData.registrationFee}/- 
//     (Rupees {numberToWords(employeeData.registrationFee)} only).
// </p>


//         <p>3. I acknowledge that I have to pay a One-Time Registration Fee to UTKAL FACILITY SERVICES PVT. LTD.</p>

//         <p>4. I hereby consent to pay my Registration Fee in installments due to financial reasons. Initially, I am paying Rs. {employeeData.paidRegistrationFee}/- (Rupees {employeeData.initial_payment_in_words} only).</p>

//         <p>5. I authorize the HR Department to deduct my Registration Fee installments from my monthly salary. The monthly deduction amount will be Rs. {employeeData.balanceRegistrationFee}/-(Rupees {numberToWords(employeeData.balanceRegistrationFee)} only).</p>

//         <p>6. If I will leave my job before the deduction of remaining Registration Fee, UTKAL FACILITY SERVICES PVT. LTD. of Companies has all the rights to deduct my pending amount of Registration as well as I am Authorizing HR Department to deduct my due Registration Amount from my monthly salary at Clearance Time.</p>

//         <p>7. If a new employee is joining at any Client site or Head Office and is doing the duty less than 15 Days and leaving the job due to any reason then the employee is not eligible for monthly salary. The concerned employee cannot claim his monthly Salary for the duty less than 15 Days and UTKAL FACILITY SERVICES PVT. LTD will not process the concerned employee monthly salary.</p>

//         <p>8.Employees will be give Penalty to UFSPL as per the Penalty Policy for the offence mentioned bellow list. Therefore advised employees to avoid the offences mentioned.</p>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { logo } from "@/src/assets/admin/adminicon";
import { apiBaseURL } from '@/config/route.config';
import { companyData } from '@/src/utils/superAdmin/data';

const numberToWords = (num: number): string => {
  const a = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
  ];
  const b = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
  ];

  const toWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
    if (n < 1000)
      return `${a[Math.floor(n / 100)]} hundred ${
        n % 100 === 0 ? "" : "and " + toWords(n % 100)
      }`.trim();
    if (n < 100000)
      return `${toWords(Math.floor(n / 1000))} thousand ${
        n % 1000 === 0 ? "" : toWords(n % 1000)
      }`.trim();
    if (n < 10000000)
      return `${toWords(Math.floor(n / 100000))} lakh ${
        n % 100000 === 0 ? "" : toWords(n % 100000)
      }`.trim();
    if (n < 1000000000)
      return `${toWords(Math.floor(n / 10000000))} crore ${
        n % 10000000 === 0 ? "" : toWords(n % 10000000)
      }`.trim();
    return "Number too large";
  };

  return num === 0 ? "zero" : toWords(num);
};


export default function RegistrationFeePage1({ employeeData,companyData,branchData }: { employeeData: any,companyData:any,branchData: any }) {
  return (
    <div
      className="border border-gray-300 mx-auto bg-white"
      style={{
        width: '210mm',
        height: '297mm',
        padding: '10mm',
        boxSizing: 'border-box',
        fontSize: '13pt',
        lineHeight: '1.3',
      }}
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
        <p className="text-center font-semibold">{companyData?.compname}</p>
        <p className="text-center">Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar 751013, Odisha</p>
      </div>

      <h2 className="text-center font-bold underline mb-2">Employee Declaration for Registration Fee Deduction</h2>

      <div className="mb-2">
        <p>TO,</p>
        <p>Human Resource Department</p>
        <p>{companyData?.compname}</p>
        <p>Plot No-HIG-42, Gangadhar Meher Marg, Jayadev Vihar, Bhubaneswar 751013, Odisha</p>
      </div>

      <p className="font-semibold mb-2">Subject: Employee Declaration for Registration Fee Deduction</p>

      <p className="mb-2">Dear Madam/Sir,</p>

      <div className="text-justify space-y-2">
        <p>
          I, <strong>{employeeData.fullName}</strong>, have joined <strong>{companyData?.compname}</strong>on <strong>{employeeData.hiring_date}</strong> as the Designation <strong>{employeeData.designation}</strong>. I am posted at the client site <strong>{employeeData.companyName}</strong> located at <strong>{employeeData.location}</strong>.
        </p>

        <p>
          My total monthly compensation shall be INR Rs. <strong>{employeeData.salary_monthly}</strong>/- 
          <strong>(Rupees {numberToWords(employeeData.salary_monthly)} only)</strong>, after applicable tax deductions. The breakdown is as follows:
        </p>

        <table className="w-full border-collapse border border-gray-300 mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1 text-center">PARTICULARS</th>
              <th className="border p-1 text-center">IN HAND</th>
              <th className="border p-1 text-center">PF</th>
              <th className="border p-1 text-center">ESIC</th>
              <th className="border p-1 text-center">CTC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1 text-center">{employeeData.in_hand}</td>
              <td className="border p-1 text-center">{employeeData.net_salary}</td>
              <td className="border p-1 text-center">{employeeData.employers_contribution_to_PF}</td>
              <td className="border p-1 text-center">{employeeData.esic}</td>
              <td className="border p-1 text-center">{employeeData.salary_monthly}</td>
            </tr>
          </tbody>
        </table>

        <p>
    2. I am aware that my Registration Fee is Rs. {employeeData.registrationFee}/- 
    (Rupees {numberToWords(employeeData.registrationFee)} only).
</p>


        <p>3. I acknowledge that I have to pay a One-Time Registration Fee to <strong>{companyData?.compname}</strong></p>

        <p>4. I hereby consent to pay my Registration Fee in installments due to financial reasons. Initially, I am paying Rs. {employeeData.paidRegistrationFee}/- (Rupees {employeeData.initial_payment_in_words} only).</p>

        <p>5. I authorize the HR Department to deduct my Registration Fee installments from my monthly salary. The monthly deduction amount will be Rs. {employeeData.balanceRegistrationFee}/-(Rupees {numberToWords(employeeData.balanceRegistrationFee)} only).</p>

        <p>6. If I will leave my job before the deduction of remaining Registration Fee,<strong>{companyData?.compname}</strong> of Companies has all the rights to deduct my pending amount of Registration as well as I am Authorizing HR Department to deduct my due Registration Amount from my monthly salary at Clearance Time.</p>

        <p>7. If a new employee is joining at any Client site or Head Office and is doing the duty less than 15 Days and leaving the job due to any reason then the employee is not eligible for monthly salary. The concerned employee cannot claim his monthly Salary for the duty less than 15 Days and <strong>{companyData?.compname}</strong> will not process the concerned employee monthly salary.</p>

        <p>8.Employees will be give Penalty to UFSPL as per the Penalty Policy for the offence mentioned bellow list. Therefore advised employees to avoid the offences mentioned.</p>
      </div>
    </div>
  );
}
