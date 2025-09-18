import Payslippage from '@/src/components/companysetting/attendance/AttendanceList';
import AdminLayouts from '@/src/layouts/admin/Adminlayouts';
import axios from 'axios';
import {apiClient} from "../../../config/route.config";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function PayslipId() {
    const [payData, setPayData] = useState<any>([])

    const fetchPayslipData = async () => {
        try {
          const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
          const response = await apiClient.get(`/employee/getall`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setPayData(response.data.data);
        } catch (error) {
          console.error('Error fetching payslip data:', error);
        }
      };
    
      useEffect(() => {
        fetchPayslipData();
      }, []);
    //   console.log(payData, "payData")

      const {query} =useRouter()
      const resData= payData.find((item:any)=>item?.empid?.toString()===query.payslipId)
      if(!resData) return <h1>loading ....</h1>
  return (
    <div>
      <AdminLayouts>
    <Payslippage resData={resData}/>
      </AdminLayouts>
 
    </div>
  )
}
