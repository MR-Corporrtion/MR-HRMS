import React from 'react'
import AdminLayouts from '../layouts/admin/Adminlayouts';
import BranchManagement from '../components/companysetting/branch/Branchpage';

export default function branch() {
    return (
        <AdminLayouts>
          <BranchManagement />
        </AdminLayouts>
      );
}
