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

          const [employeeResponse, profileResponse, branchResponse] =
            await Promise.all([
              apiClient.get(`/employee/get/${empid}`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              apiClient.get(`/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              apiClient.get("branch/get", {
                params: { branchID },
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);

          setEmployeeData(employeeResponse.data);
          setCompanyData(profileResponse.data?.company);
          setBranches(branchResponse.data?.data);
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
    console.log("📄 Generating PDF...");

    const pdf = new jsPDF("p", "mm", "a4");

    // ✅ Fix: safely convert NodeList to array (prevents TS error)
    const sections = Array.from(document.querySelectorAll(".page-section"));
    let isFirstPage = true;

    for (const [i, section] of sections.entries()) {
      // ✅ Hide overflow for clean PDF capture
      (section as HTMLElement).style.overflow = "hidden";
      (section as HTMLElement).style.pageBreakInside = "avoid";

      // ✅ Capture only the visible section with proper scaling
      const canvas = await html2canvas(section as HTMLElement, {
        scale: 2, // high quality
        useCORS: true,
        scrollY: 0,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgWidth = 210; // A4 width
      const pageHeight = 297; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (!isFirstPage) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      isFirstPage = false;

      console.log(`✅ Added section ${i + 1} to PDF`);
    }

    // ✅ Ensure proper cleanup
    pdf.save(`New_Joinee_Kit_${employeeData?.name || "Employee"}.pdf`);
    console.log("✅ PDF generated successfully with clean pages");
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

        <SubmitForApproval
          employeeId={empid}
          onSubmitted={() =>
            console.log("📩 Approval request submitted successfully for:", empid)
          }
        />
      </div>

      <div id="newJoineeKit">
        {/* ✅ Each page-section corresponds to exactly one A4 page */}
        <div className="page-section">
          <Checklist
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <JoiningForm
            employeeData={employeeData}
            logo={{ src: logo.src }}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <RegistrationFeePage1
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <RegistrationFeePage2
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <OfficeAssets
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <AntiBribery
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <PaymentRecept
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        {/* Separate Document Pages */}
        <div className="page-section">
          <WarningLetter1
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <WarningLetter2
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <WarningLetter3
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <ResignationLetter
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <TermsAndConditions
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>

        <div className="page-section">
          <Declaration
            employeeData={employeeData}
            companyData={companyData}
            branchData={branchData}
          />
        </div>
      </div>
    </div>
  );
}
