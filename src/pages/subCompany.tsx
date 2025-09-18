import CompanyPage from "../components/subcompany/company/Companypage";
import SubCompanyPage from "../components/subcompany/company/Companypage";
import AdminLayouts from "../layouts/admin/Adminlayouts";
import MainLayout from "../layouts/superAdmin/Mainlayouts";




const subcompany = () => {
    return (
      <AdminLayouts>
        <CompanyPage />
      </AdminLayouts>
    );
  };
  
  export default subcompany;
  