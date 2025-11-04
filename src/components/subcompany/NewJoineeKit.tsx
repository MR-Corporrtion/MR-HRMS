// components/NewJoineeKit.tsx
"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/config/route.config";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Components
import Checklist from "./JoiningKit/Checklist";
import JoiningForm from "./JoiningKit/JoiningForm";
import RegistrationFeePage1 from "./JoiningKit/RegistrationFee";
import OfficeAssets from "./JoiningKit/OfficeAssets";
import AntiBribery from "./JoiningKit/AntiBribary";
import RegistrationFeePage2 from "./JoiningKit/RegistrationFeePage2";
import PaymentRecept from "./JoiningKit/PaymentRecept";
import SubmitForApproval from "@/src/pages/SubmitForApproval";

// New Separate Document Components
import WarningLetter1 from "./JoiningKit/WarningLetter1";
import WarningLetter2 from "./JoiningKit/WarningLetter2";
import WarningLetter3 from "./JoiningKit/WarningLetter3";
import ResignationLetter from "./JoiningKit/ResignationLetter";
import TermsAndConditions from "./JoiningKit/TermsAndConditions";
import Declaration from "./JoiningKit/Declaration";

// Assets
import { logo } from "@/src/assets/admin/adminicon";
import JoiningKitDocument from "./JoiningKit/Newlyadd";

export default function NewJoineeKit({ empid }: { empid: string }) {
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [branchData, setBranches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (empid) {
      const fetchData = async () => {
        console.log("📌 Fetching data for employeeId:", empid);
        setIsLoading(true);
        const branchID =
          localStorage.getItem("branchID") || sessionStorage.getItem("branchID");
        try {
          const token =
            localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

          console.log("🔑 Using token:", token);

          const [employeeResponse, profileResponse, branchResponse] =
            await Promise.all([
              apiClient.get(`/employee/get/${empid}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }),
              apiClient.get(`/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }),
              apiClient.get("branch/get", {
                params: { branchID },
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }),
            ]);

          setEmployeeData(employeeResponse.data);
          setCompanyData(profileResponse.data?.company);
          setBranches(branchResponse.data?.data);

          console.log("✅ Employee Data:", employeeResponse.data);
          console.log("✅ Company Data:", profileResponse.data?.company);
          console.log("✅ Branch Data:", branchResponse.data?.data);

          setError(null);
        } catch (err) {
          console.error("❌ Error fetching data:", err);
          setError("Failed to fetch employee or branch data");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to fetch data",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [empid]);

const handleDownload = async () => {
  if (typeof window === "undefined") return;

  console.log("📄 Generating optimized PDF...");

  const element = document.getElementById("newJoineeKit");
  if (!element) {
    console.error("⚠️ Element with id 'newJoineeKit' not found");
    return;
  }

  const html2pdf = (await import("html2pdf.js")).default;

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `New_Joinee_Kit_${employeeData?.name || "Employee"}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: {
      scale: 2, // high clarity, still fast
      useCORS: true,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    },
    pagebreak: {
      mode: ["css", "legacy"],
      before: ".page-break",
      after: ".page-break",
      avoid: "tr, td, table",
    },
  };

  // ✅ Small delay ensures DOM fully rendered
  await new Promise((resolve) => setTimeout(resolve, 400));

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .then(() => console.log("✅ PDF generated successfully"));
};



  if (isLoading || !employeeData) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Joinee Kit</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>

        {/* ✅ Request for Approval Button */}
        <SubmitForApproval
          employeeId={empid}
          onSubmitted={() => {
            console.log("📩 Approval request submitted successfully for:", empid);
          }}
        />
      </div>

      <div id="newJoineeKit">
        {/* Existing Components */}
        <Checklist
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        <JoiningForm
          employeeData={employeeData}
          logo={{ src: logo.src }}
          companyData={companyData}
          branchData={branchData}
        />
        <RegistrationFeePage1
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        <RegistrationFeePage2
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        <OfficeAssets
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        <div className="page-break">
        <AntiBribery
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        </div>
        <PaymentRecept
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        
        {/* New Separate Document Components */}
        <div className="page-break">
          <WarningLetter1
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>
        
        <div className="page-break">
          <WarningLetter2
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>
        
        <div className="page-break">
          <WarningLetter3
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>
        
        <div className="page-break">
          <ResignationLetter
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>
        
        <div className="page-break">
          <TermsAndConditions
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>
        
        <div className="page-break">
          <Declaration
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        {/* Original JoiningKitDocument (if you still want to include it) */}
        {/* <JoiningKitDocument
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        /> */}
      </div>
    </div>
  );
}