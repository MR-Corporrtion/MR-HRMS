import React from 'react'
import AdminLayouts from '../layouts/admin/Adminlayouts'
import AddEmployeeLayOut from '../layouts/admin/AddEmployeeLayOut'
import SalaryProcess from '../components/admin/employee/addEmployee/SalaryProcess'

export default function salaryProcess() {
    return (
        <AdminLayouts>
          <AddEmployeeLayOut>
            <SalaryProcess/>
          </AddEmployeeLayOut>
        </AdminLayouts>
      )
}
