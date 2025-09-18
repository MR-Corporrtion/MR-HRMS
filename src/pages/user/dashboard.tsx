import DashboardPage from '@/src/components/superAdmin/dashboard/Dashboard'
import UserDashboard from '@/src/components/user/UserDashboard'
import MainLayouts from '@/src/layouts/user/Mainlayouts'

import React from 'react'

export default function Dashboard() {
  return (
    <MainLayouts>
      <UserDashboard/>
    </MainLayouts>
  )
}