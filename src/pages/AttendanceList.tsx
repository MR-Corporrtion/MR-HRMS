import React from 'react'
import Adminlayouts from '../layouts/admin/Adminlayouts'
import SalarySlip from '../components/companysetting/attendance/AttendanceList'

export default function AttendancePages() {
  return (
   <Adminlayouts>
    <SalarySlip/>
   </Adminlayouts>
  )
}
