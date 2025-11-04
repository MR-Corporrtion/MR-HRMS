import { company, dashboardImg, leads } from "@/src/assets/dashboard";
import { sideBarArrType } from "@/src/types";
export const usersideBarArr: sideBarArrType[] = [
  
  {
      id: 1,
      title: "Dashboard",
      img :dashboardImg,
      path: "./dashboard",
    },
    {
      id: 2,
      title: "Profile",
      img :company,
      path: "./profile",
   
    },
    {
      id: 3,
      title: "MapEmployee",
      img :leads,
      path: "./mapedemployee",
    },
    {
      id: 4,
      title: "Approval Status",
      img :leads,
      path: "./ApprovalDashboard",
    },
]