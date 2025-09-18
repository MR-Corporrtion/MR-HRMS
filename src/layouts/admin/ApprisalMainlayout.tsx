import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ApprisalSidebar from "./ApprisalSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appraisal System",
  description: "Employee performance appraisal system",
};

export default function ApprisalMainlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar with Fixed Width */}
      <div className="w-64 min-w-[16rem] bg-white shadow-md">
        <ApprisalSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
