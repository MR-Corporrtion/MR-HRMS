// import { complogo } from "@/src/assets/admin/adminicon";
// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useRouter } from "next/router";

// const units = [
//   "",
//   "One",
//   "Two",
//   "Three",
//   "Four",
//   "Five",
//   "Six",
//   "Seven",
//   "Eight",
//   "Nine",
// ];
// const teens = [
//   "Eleven",
//   "Twelve",
//   "Thirteen",
//   "Fourteen",
//   "Fifteen",
//   "Sixteen",
//   "Seventeen",
//   "Eighteen",
//   "Nineteen",
// ];
// const tens = [
//   "",
//   "Ten",
//   "Twenty",
//   "Thirty",
//   "Forty",
//   "Fifty",
//   "Sixty",
//   "Seventy",
//   "Eighty",
//   "Ninety",
// ];
// const thousands = ["", "Thousand", "Lakh", "Crore"];

// interface PayslipData {
//   month: string;
//   year: string;
// }
// function numberToWords(num: number): string {
//   if (num === 0) return "Zero";

//   let words = "";

//   if (Math.floor(num / 10000000) > 0) {
//     words += `${numberToWords(Math.floor(num / 10000000))} Crore `;
//     num %= 10000000;
//   }

//   if (Math.floor(num / 100000) > 0) {
//     words += `${numberToWords(Math.floor(num / 100000))} Lakh `;
//     num %= 100000;
//   }

//   if (Math.floor(num / 1000) > 0) {
//     words += `${numberToWords(Math.floor(num / 1000))} Thousand `;
//     num %= 1000;
//   }

//   if (Math.floor(num / 100) > 0) {
//     words += `${numberToWords(Math.floor(num / 100))} Hundred `;
//     num %= 100;
//   }

//   if (num > 10 && num < 20) {
//     words += teens[num - 11];
//   } else {
//     if (Math.floor(num / 10) > 0) {
//       words += `${tens[Math.floor(num / 10)]} `;
//       num %= 10;
//     }

//     if (num > 0) {
//       words += `${units[num]} `;
//     }
//   }

//   return words.trim();
// }

// const SalarySlip: React.FC<{ resData?: any }> = ({ resData }) => {
//   const [payData, setPayData] = useState<any>([]);
//   const slipRef = useRef<HTMLDivElement>(null);
 
//   const [companyid, setcompanyid] = useState("");
//   const route=useRouter()
//   const {month, year}=route.query
//   console.log(month, year);

//   const fetchPayslipData = async () => {
//     try {
//       const response = await axios.post(
//         `${apiBaseURL}/salary-calculation/dynamic/${resData.empid}`,
//         {
//           month: month,
//           year: year,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setPayData(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching payslip data:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchPayslipData();
//   }, []);

//   const handleDownload = async () => {
//     const element = slipRef.current;
//     if (element) {
//       const canvas = await html2canvas(element);
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210;
//       const pageHeight = 295;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(
//         `${payData?.employee?.empid}_${payData?.attendanceMaster?.month}/${payData?.attendanceMaster?.year}_Payslip.pdf`
//       );
//     }
//   };

//   const formatCurrency = (amount: number | undefined) => {
//     return amount?.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//     });
//   };

//   return (
//     <div
//       className="max-w-4xl mx-auto p-5 bg-white shadow-2xl rounded-lg relative border border-gray-200"
//       ref={slipRef}
//     >
//       <div className="flex items-center mb-4">
//         <span className="mr-2">
//           <img src={complogo.src} alt="Company Logo" className="w-full h-24" />
//         </span>
//         <div className="text-center ml-40">
//           <h1 className="text-3xl font-extrabold text-gray-900">
//             {payData?.company?.compname}
//           </h1>
//           <p className="text-lg font-semibold mt-2 text-gray-600">
//             SALARY SLIP MONTH - {payData?.attendanceMaster?.month}/
//             {payData?.attendanceMaster?.year}
//           </p>
//           <p className="mt-1 text-gray-600">
//             Client Name: {payData?.company?.compname}
//           </p>
//           <p className="text-gray-600">
//             {payData?.employeeProProfile?.location}
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-between  gap-8 mb-2">
//         <div>
//           <p className="text-gray-700">
//             <strong>NAME:</strong> {resData.first_name} {resData.middle_name}{" "}
//             {resData.last_name}
//           </p>
//           <p className="text-gray-700">
//             <strong>UAN NO:</strong> {payData?.employeeProProfile?.uanNumber}
//           </p>
//           <p className="text-gray-700">
//             <strong>EPF NO:</strong> {payData?.employeeProProfile?.uanNumber}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-700">
//             <strong>DAYS:</strong> {payData?.attendanceMaster?.totaldays}
//           </p>
//           <p className="text-gray-700">
//             <strong>ESIC NO:</strong> {payData?.employeeProProfile?.esicNumber}
//           </p>
//         </div>
//       </div>

//       <div className="mb-2">
//         <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b border-gray-300 pb-2">
//           Earnings (A)
//         </h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-300 p-3 text-left">
//                 Description
//               </th>
//               <th className="border border-gray-300 p-3 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-gray-300 p-3">BASIC PAY</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.claculatedBasicPayEvos)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">4DAYS BASIC</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.earnedFourDaysFixed)}
//               </td>
//             </tr>
//             {/* <tr>
//               <td className="border border-gray-300 p-3">EXTRA</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.extra)}
//               </td>
//             </tr> */}
//             <tr>
//               <td className="border border-gray-300 p-3">OT</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(
//                   payData?.calculatedValue?.calculatedEmployeeOTEvos
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">OTHER</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.calculatedOtherEvos)}
//               </td>
//             </tr>
//             <tr className="bg-gray-100">
//               <td className="border border-gray-300 p-3 font-bold">
//                 SALARY EARNED
//               </td>
//               <td className="border border-gray-300 p-3 text-right font-bold">
//                 {formatCurrency(payData?.calculatedValue?.grossSalaryEvos)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-2">
//         <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b border-gray-300 pb-2">
//           Deductions (B)
//         </h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-300 p-3 text-left">
//                 Description
//               </th>
//               <th className="border border-gray-300 p-3 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-gray-300 p-3">REGISTRATION FEE</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.registration)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">EPF</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(
//                   payData?.calculatedValue?.calculatedPFEmployeeContributionEvos
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">ESIC</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(
//                   payData?.calculatedValue?.calculatedEmployeeContributionESIEvos
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">ADVANCE</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.advance)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">PETTY</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.petty)}
//               </td>
//             </tr>
//             {/* <tr>
//               <td className="border border-gray-300 p-3">FOOD AND ROOM</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.food_n_room)}
//               </td>
//             </tr> */}
//             <tr className="bg-gray-100">
//               <td className="border border-gray-300 p-3 font-bold">
//                 TOTAL DEDUCTIONS
//               </td>
//               <td className="border border-gray-300 p-3 text-right font-bold">
//                 {formatCurrency(payData?.calculatedValue?.totalDeductionEvos)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3 font-bold">
//                 NET SALARY (A-B)
//               </td>
//               <td className="border border-gray-300 p-2 text-right font-bold">
//                 {formatCurrency(payData?.calculatedValue?.netPayEvos)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-2">
//         <p className="text-xl text-gray-800">
//           <strong>NET SALARY:</strong>{" "}
//           {formatCurrency(payData?.calculatedValue?.netPayEvos)}(
//           {numberToWords(payData?.calculatedValue?.netPayEvos ?? 0).toUpperCase()}{" "}
//           ONLY).
//         </p>
//         <p className="text-sm text-gray-800 text-center mt-10">
//           <strong>
//             “This is computer generated Salary Slip no signature required.”
//           </strong>
//         </p>
//       </div>
//       <div ref={slipRef} className="relative">
//         {/* Content of the salary slip */}
//       </div>

//       <div className="fixed bottom-4 right-4">
//         <button
//           onClick={handleDownload}
//           className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SalarySlip;


// import { complogo } from "@/src/assets/admin/adminicon";
// import axios from "axios";
// import {apiClient} from "../../../../config/route.config";
// import React, { useEffect, useState, useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useRouter } from "next/router";

// const units = [
//   "",
//   "One",
//   "Two",
//   "Three",
//   "Four",
//   "Five",
//   "Six",
//   "Seven",
//   "Eight",
//   "Nine",
// ];
// const teens = [
//   "Eleven",
//   "Twelve",
//   "Thirteen",
//   "Fourteen",
//   "Fifteen",
//   "Sixteen",
//   "Seventeen",
//   "Eighteen",
//   "Nineteen",
// ];
// const tens = [
//   "",
//   "Ten",
//   "Twenty",
//   "Thirty",
//   "Forty",
//   "Fifty",
//   "Sixty",
//   "Seventy",
//   "Eighty",
//   "Ninety",
// ];
// const thousands = ["", "Thousand", "Lakh", "Crore"];

// interface PayslipData {
//   month: string;
//   year: string;
// }
// function numberToWords(num: number): string {
//   if (num === 0) return "Zero";

//   let words = "";

//   if (Math.floor(num / 10000000) > 0) {
//     words += `${numberToWords(Math.floor(num / 10000000))} Crore `;
//     num %= 10000000;
//   }

//   if (Math.floor(num / 100000) > 0) {
//     words += `${numberToWords(Math.floor(num / 100000))} Lakh `;
//     num %= 100000;
//   }

//   if (Math.floor(num / 1000) > 0) {
//     words += `${numberToWords(Math.floor(num / 1000))} Thousand `;
//     num %= 1000;
//   }

//   if (Math.floor(num / 100) > 0) {
//     words += `${numberToWords(Math.floor(num / 100))} Hundred `;
//     num %= 100;
//   }

//   if (num > 10 && num < 20) {
//     words += teens[num - 11];
//   } else {
//     if (Math.floor(num / 10) > 0) {
//       words += `${tens[Math.floor(num / 10)]} `;
//       num %= 10;
//     }

//     if (num > 0) {
//       words += `${units[num]} `;
//     }
//   }

//   return words.trim();
// }

// const SalarySlip: React.FC<{ resData?: any }> = ({ resData }) => {
//   const [payData, setPayData] = useState<any>([]);
//   const slipRef = useRef<HTMLDivElement>(null);
 
//   const [companyid, setcompanyid] = useState("");
//   const route=useRouter()
//   const {month, year}=route.query
//   console.log(month, year);

//   const fetchPayslipData = async () => {
//     try {
//       const response = await apiClient.post(
//         `/salary-calculation/dynamic/${resData.empid}`,
//         {
//           month: month,
//           year: year,
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       setPayData(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching payslip data:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchPayslipData();
//   }, []);

//   const handleDownload = async () => {
//     const element = slipRef.current;
//     if (element) {
//       const canvas = await html2canvas(element);
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210;
//       const pageHeight = 295;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(
//         `${payData?.employee?.empid}_${payData?.attendanceMaster?.month}/${payData?.attendanceMaster?.year}_Payslip.pdf`
//       );
//     }
//   };

//   const formatCurrency = (amount: number | undefined) => {
//     return amount?.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//     });
//   };

//   return (
//     <div
//       className="max-w-4xl mx-auto p-5 bg-white shadow-2xl rounded-lg relative border border-gray-200"
//       ref={slipRef}
//     >
//       <div className="flex items-center mb-4">
//         <span className="mr-2">
//           <img src={complogo.src} alt="Company Logo" className="w-full h-24" />
//         </span>
//         <div className="text-center ml-40">
//           <h1 className="text-3xl font-extrabold text-gray-900">
//             {payData?.company?.compname}
//           </h1>
//           <p className="text-lg font-semibold mt-2 text-gray-600">
//             SALARY SLIP MONTH - {payData?.attendanceMaster?.month}/
//             {payData?.attendanceMaster?.year}
//           </p>
//           <p className="mt-1 text-gray-600">
//             Client Name: {payData?.company?.compname}
//           </p>
//           <p className="text-gray-600">
//             Address:{payData?.company?.company_address}
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-between  gap-8 mb-2">
//         <div>
//           <p className="text-gray-700">
//             <strong>NAME:</strong> {resData.first_name} {resData.middle_name}{" "}
//             {resData.last_name}
//           </p>
//           <p className="text-gray-700">
//             <strong>UAN NO:</strong> {payData?.employeeProProfile?.uanNumber}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-700">
//             <strong>DAYS:</strong> {payData?.attendanceMaster?.totaldays}
//           </p>
//           <p className="text-gray-700">
//             <strong>ESIC NO:</strong>{payData?.employeeProProfile?.esicNumber} NA
//           </p>
//         </div>
//       </div>

//       <div className="mb-2">
//         <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b border-gray-300 pb-2">
//           Earnings (A)
//         </h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-300 p-3 text-left">
//                 Description
//               </th>
//               <th className="border border-gray-300 p-3 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border border-gray-300 p-3">BASIC PAY</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.basic_pay)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">HRA</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.hra)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3">CONVEYANCE</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.conveyence_reimbursement)}
//               </td>
//             </tr>
//             {/* <tr>
//               <td className="border border-gray-300 p-3">OT</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(
//                   payData?.calculatedValue?.calculatedEmployeeOTEvos
//                 )}
//               </td>
//             </tr> */}
//             <tr>
//               <td className="border border-gray-300 p-3">OTHER</td>
//               <td className="border border-gray-300 p-3 text-right">
//                 {formatCurrency(payData?.calculatedValue?.other)}
//               </td>
//             </tr>
//             <tr className="bg-gray-100">
//               <td className="border border-gray-300 p-3 font-bold">
//                 SALARY EARNED
//               </td>
//               <td className="border border-gray-300 p-3 text-right font-bold">
//                 {formatCurrency(payData?.calculatedValue?.gross_salary)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-2">
//         <h2 className="text-2xl font-semibold mb-3 text-gray-900 border-b border-gray-300 pb-2">
//           Deductions (B)
//         </h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-300 p-3 text-left">
//                 Description
//               </th>
//               <th className="border border-gray-300 p-3 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* <tr>
//               <td className="border border-gray-300 p-3">REGISTRATION FEE</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.registration)}
//               </td>
//             </tr> */}
//             <tr>
//               <td className="border border-gray-300 p-3">EPF</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(
//                   payData?.calculatedValue?.employee_PF_contribution
//                 )}
//               </td>
//             </tr>
//             {/* <tr>
//               <td className="border border-gray-300 p-3">ESIC</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(
//                   payData?.calculatedValue?.calculatedEmployeeContributionESIEvos
//                 )}
//               </td>
//             </tr> */}
//             <tr>
//               <td className="border border-gray-300 p-3">ADVANCE</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.advance_pay)}
//               </td>
//             </tr>
//             {/* <tr>
//               <td className="border border-gray-300 p-3">PETTY</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.petty)}
//               </td>
//             </tr> */}
//             {/* <tr>
//               <td className="border border-gray-300 p-3">FOOD AND ROOM</td>
//               <td className="border border-gray-300 p-2 text-right">
//                 {formatCurrency(payData?.calculatedValue?.food_n_room)}
//               </td>
//             </tr> */}
//             <tr className="bg-gray-100">
//               <td className="border border-gray-300 p-3 font-bold">
//                 TOTAL DEDUCTIONS
//               </td>
//               <td className="border border-gray-300 p-3 text-right font-bold">
//                 {formatCurrency(payData?.calculatedValue?.total_deduction)}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-3 font-bold">
//                 NET SALARY (A-B)
//               </td>
//               <td className="border border-gray-300 p-2 text-right font-bold">
//                 {formatCurrency(payData?.calculatedValue?.net_salary)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-2">
//         <p className="text-xl text-gray-800">
//           <strong>NET SALARY:</strong>{" "}
//           {formatCurrency(payData?.calculatedValue?.net_salary)}(
//           {numberToWords(payData?.calculatedValue?.net_salary ?? 0).toUpperCase()}{" "}
//           ONLY).
//         </p>
//         <p className="text-sm text-gray-800 text-center mt-10">
//           <strong>
//             “This is computer generated Salary Slip no signature required.”
//           </strong>
//         </p>
//       </div>
//       <div ref={slipRef} className="relative">
//         {/* Content of the salary slip */}
//       </div>

//       <div className="fixed bottom-4 right-4">
//         <button
//           onClick={handleDownload}
//           className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//         >
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SalarySlip;



import { complogo, logo, logo_pic } from "@/src/assets/admin/adminicon";
import axios from "axios";
import { apiBaseURL, apiClient } from "../../../../config/route.config";
import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/router";

const units = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];
const teens = [
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "Ten",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];
const thousands = ["", "Thousand", "Lakh", "Crore"];

interface PayslipData {
  month: string;
  year: string;
}
function numberToWords(num: number): string {
  if (num === 0) return "Zero";

  let words = "";

  if (Math.floor(num / 10000000) > 0) {
    words += `${numberToWords(Math.floor(num / 10000000))} Crore `;
    num %= 10000000;
  }

  if (Math.floor(num / 100000) > 0) {
    words += `${numberToWords(Math.floor(num / 100000))} Lakh `;
    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    words += `${numberToWords(Math.floor(num / 1000))} Thousand `;
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    words += `${numberToWords(Math.floor(num / 100))} Hundred `;
    num %= 100;
  }

  if (num > 10 && num < 20) {
    words += teens[num - 11];
  } else {
    if (Math.floor(num / 10) > 0) {
      words += `${tens[Math.floor(num / 10)]} `;
      num %= 10;
    }

    if (num > 0) {
      words += `${units[num]} `;
    }
  }

  return words.trim();
}

const SalarySlip: React.FC<{ resData?: any }> = ({ resData }) => {
  const [payData, setPayData] = useState<any>([]);
  const slipRef = useRef<HTMLDivElement>(null);

  const [companyid, setCompanyid] = useState("");
  const route = useRouter();
  const { month, year } = route.query;
  console.log(month, year);

  const fetchPayslipData = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post(
        `/salary-calculation/dynamic/${resData.empid}`,
        {
          month: month,
          year: year,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setPayData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching payslip data:", error);
    }
  };

  useEffect(() => {
    fetchPayslipData();
  }, []);

  const handleDownload = async () => {
    const element = slipRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `${payData?.employee?.empid}_${payData?.attendanceMaster?.month}/${payData?.attendanceMaster?.year}_Payslip.pdf`
      );
    }
  };

  const formatCurrency = (amount: number | undefined) => {
    return amount?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      ref={slipRef}
    >
      <div className="flex items-center justify-between mb-2">
      {/* <img src={`${apiBaseURL}/photo/${payData?.company?.company_logo}`} alt="Company Logo" className="w-auto h-20 items-start" /> */}
      <img src={logo.src} alt="" className="w-auto h-20 items-start" />
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {payData?.company?.compname}
          </h1>
          <p className="text-lg font-semibold text-gray-600 mb-1">
            SALARY SLIP MONTH - {payData?.attendanceMaster?.month}/
            {payData?.attendanceMaster?.year}
          </p>
          <p className="text-gray-600">
            Client Name: {payData?.company?.compname}
          </p>
          <p className="text-gray-600">
            Address: {payData?.company?.company_address}
          </p>
        </div>
        <div className="w-48 justify-start"></div>
      </div>

      <div className="flex justify-between gap-6 mb-6">
        <div>
          <p className="text-gray-700 text-lg">
            <strong>NAME:</strong> {resData.first_name} {resData.middle_name} {resData.last_name}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>UAN NO:</strong> {payData?.employeeProProfile?.uanNumber}
          </p>
        </div>
        <div>
          <p className="text-gray-700 text-lg">
            <strong>DAYS:</strong> {payData?.attendanceMaster?.totaldays}
          </p>
          <p className="text-gray-700 text-lg">
            <strong>ESIC NO:</strong> {payData?.employeeProProfile?.esicNumber || 'NA'}
          </p>
        </div>
      </div>

      <div className="flex mb-6 space-x-6">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
            Earnings (A)
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3 text-left">Description</th>
                <th className="border border-gray-300 p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">BASIC PAY</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.employeeSalaryStructure?.basic_pay)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">HRA</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.employeeSalaryStructure?.hra)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">CONVEYANCE</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.employeeSalaryStructure?.conveyence_reimbursement)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">OTHER</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.employeeSalaryStructure?.other)}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-3 font-bold">SALARY EARNED</td>
                <td className="border border-gray-300 p-3 text-right font-bold">
                  {formatCurrency(payData?.calculatedValue?.gross_salary)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
            Deductions (B)
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3 text-left">Description</th>
                <th className="border border-gray-300 p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">ESI</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.calculatedValue?.esic)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">EPF</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.calculatedValue?.employee_PF_contribution)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">PROF TAX</td>
                <td className="border border-gray-300 p-3 text-right">
                  {formatCurrency(payData?.calculatedValue?.professional_tax)}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-3 font-bold">TOTAL DEDUCTIONS</td>
                <td className="border border-gray-300 p-3 text-right font-bold">
                  {formatCurrency(payData?.calculatedValue?.total_deduction)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
        <div className="w-1/2 pr-2 mb-6">
          <p className="text-gray-700 text-lg">
            <strong>NET SALARY:</strong> {formatCurrency(payData?.calculatedValue?.net_salary)}
          </p>
          <p className="text-gray-700 text-lg w-full whitespace-nowrap">
            <strong>AMOUNT IN WORDS:</strong> {numberToWords(payData?.calculatedValue?.net_salary || 0)} Only
          </p>
        </div>
      
      <p className="text-gray-700 text-center ">
            <strong>This is an automatically generated document, no signature is required.</strong></p>

      <div className="fixed bottom-4 right-4">
          <button
         onClick={handleDownload}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
           Download PDF
         </button>
      </div> 
    </div>
  );
};

export default SalarySlip;


