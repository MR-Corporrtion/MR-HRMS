import React, { useEffect, useState } from 'react';
import Adminheader from './Adminheader';
import AdminSidebar from './Adminsidebar';
import AdminSettingsBar from './AdminsettingSidebar';
import Head from 'next/head';

export default function AdminLayouts({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const savedState = localStorage.getItem('adminSidebarOpen');
    if (savedState !== null) {
      setOpen(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('adminSidebarOpen', JSON.stringify(open));
    }
  }, [open, isClient]);

  if (!isClient) {
    return null; // Optionally, you can render a loader or some fallback UI here
  }
 
  return (
    <>
    <Head>
      <link rel="icon" href="./logo.png"></link> 
    </Head>
   <div className="h-screen flex bg-gray-100 overflow-hidden">
      {open ? 
        <AdminSettingsBar open={open} setOpen={setOpen} />
        :
        <AdminSidebar open={open} setOpen={setOpen} />
      }
      <div className="flex-1 flex flex-col overflow-auto">
        <Adminheader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}