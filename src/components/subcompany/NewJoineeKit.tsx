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
        setIsLoading(true);
        const branchID = localStorage.getItem("branchID") || sessionStorage.getItem("branchID");
        try {
          const token =
            localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

          const [employeeResponse, profileResponse, branchResponse] = await Promise.all([
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

          console.log("Employee Data:", employeeResponse.data);
          console.log("Company Data:", profileResponse.data?.company);
          console.log("Branch Data:", branchResponse.data?.data);

          setError(null);
        } catch (err) {
          console.error("Error fetching data:", err);
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
    const element = document.getElementById("newJoineeKit");
    if (!element) return;

    const pdf = new jsPDF();
    const children = Array.from(element.children);

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;

      const canvas = await html2canvas(child, {
        useCORS: true,
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("new_joinee_kit.pdf");
  };

  if (isLoading || !employeeData) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Joinee Kit</h1>

      <button
        onClick={handleDownload}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download PDF
      </button>

      <div id="newJoineeKit">
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
        <AntiBribery
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
        <PaymentRecept
          employeeData={employeeData}
          companyData={companyData}
          branchData={branchData}
        />
      </div>
    </div>
  );
}
