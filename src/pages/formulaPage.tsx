import React from 'react'
import AdminLayouts from '../layouts/admin/Adminlayouts'
import SalaryFormulaBuilder from '../components/admin/formula/Formulapage'

export default function formulaPage() {
  return (
    <AdminLayouts>
        <SalaryFormulaBuilder/>
    </AdminLayouts>
  )
}
