export type sideBarArrType={
    id:number
    title:string
    path:string
    img:{
        src:string
        }
   }

   export type adminsideBarArrType = {
    id: number
    title: string
    path: string
    img: {
        src: string

    }

}


export interface SalaryData {
    empid: string;
    companyid: string;
    basicPayMonthly: number;
    basicPayYearly: number;
    pfContributionMonthly: number;
    pfContributionYearly: number;
    educationAllowanceMonthly: number;
    educationAllowanceYearly: number;
    medicalReimbursementMonthly: number;
    medicalReimbursementYearly: number;
    uniformAllowanceMonthly: number;
    uniformAllowanceYearly: number;
    conveyanceReimbursementMonthly: number;
    conveyanceReimbursementYearly: number;
    professionalPursuitReimbursementMonthly: number;
    professionalPursuitReimbursementYearly: number;
    hraMonthly: number;
    hraYearly: number;
    ltaMonthly: number;
    ltaYearly: number;
    bonusMonthly: number;
    bonusYearly: number;
    specialAllowanceMonthly: number;
    specialAllowanceYearly: number;
    gratuityMonthly: number;
    gratuityYearly: number;
    gpaiMonthly: number;
    gpaiYearly: number;
    mediclaimMonthly: number;
    mediclaimYearly: number;
  }

  