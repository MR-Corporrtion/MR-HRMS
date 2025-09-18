import DashboardPage from '@/src/components/admin/dashboard/DashboardPage'

import Adminlayouts from '@/src/layouts/admin/Adminlayouts'
import React from 'react'

export default function AdminDashboard() {
  return (
   <Adminlayouts>
    <DashboardPage/>
   </Adminlayouts>
  )
}
