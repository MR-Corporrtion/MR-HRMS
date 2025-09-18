import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Card, CardContent, Typography, CardActions } from '@mui/material';
import axios from 'axios';
import { apiBaseURL } from '@/config/route.config';

// Define the SalaryData type with index signature
interface SalaryData {
  empid: string;
  companyid: string;
  basic_pay: string;
  employers_contribution_to_PF: string;
  other: string;
  performance_linked_incentive: string;
  children_education_allowance: string;
  medical_reimbursement: string;
  uniform_allowance: string;
  conveyence_reimbursement: string;
  prof_persuit_peimbursement: string;
  hra: string;
  leave_travel_allowance: string;
  bonus: string;
  special_allowance: string;
  gratuity: string;
  gpai: string;
  medi_claim: string;
  gross_salary: string;
  registrationFee:string;
  net_salary: string;
  salary_monthly: string;
  salary_lpa: string;
  [key: string]: string;
}

const SalaryCalculation = () => {
  const [open, setOpen] = useState(false);
  const [salaryData, setSalaryData] = useState<SalaryData>({
    empid: '',
    companyid: '',
    basic_pay: '',
    employers_contribution_to_PF: '',
    other:'',
    performance_linked_incentive: '',
    children_education_allowance: '',
    medical_reimbursement: '',
    uniform_allowance: '',
    conveyence_reimbursement: '',
    prof_persuit_peimbursement: '',
    hra: '',
    leave_travel_allowance: '',
    bonus: '',
    special_allowance: '',
    gratuity: '',
    gpai: '',
    medi_claim: '',
    gross_salary: '0',
    registrationFee: '0',
    net_salary: '0',
    salary_monthly: '',
    salary_lpa: '0',
  });

  useEffect(() => {
    if (open) {
      axios.get(`${apiBaseURL}/salary/salary-structures`, { withCredentials: true })
        .then(response => {
          console.log('Fetched Data:', response.data);
          setSalaryData(response.data);
        })
        .catch(error => {
          console.error('Error fetching salary data:', error);
        });
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const numericValue = value === '' ? 0 : Number(value);

    setSalaryData(prevData => {
      const updatedData = {
        ...prevData,
        [id]: value,
      };

      // Calculate gross_salary and net_salary
      const fieldsToSum = [
        'basic_pay',
        'employers_contribution_to_PF',
        'performance_linked_incentive',
        'other',
        'children_education_allowance',
        'medical_reimbursement',
        'uniform_allowance',
        'conveyence_reimbursement',
        'prof_persuit_peimbursement',
        'hra',
        'leave_travel_allowance',
        'bonus',
        'special_allowance'
      ];

      const grossSalary = fieldsToSum.reduce((sum, field) => {
        return sum + (Number(updatedData[field]) || 0);
      }, 0);

      updatedData.gross_salary = grossSalary.toString();
      updatedData.net_salary = (
        grossSalary - 
        (Number(updatedData.gratuity) || 0) - 
        (Number(updatedData.gpai) || 0) - 
        (Number(updatedData.medi_claim) || 0)
      ).toString();

      // Calculate salary_lpa
      const monthlySalary = Number(updatedData.salary_monthly) || 0;
      updatedData.salary_lpa = (monthlySalary * 12).toString();

      return updatedData;
    });
  };

  const handleSave = () => {
    // Log the data being sent
    console.log('Saving Data:', salaryData);

    // Only send fields defined in the model to the backend
    const saveData = { ...salaryData };

    axios.post(`${apiBaseURL}/salary/create`, saveData, { withCredentials: true })
      .then(response => {
        console.log('Save Response:', response.data);
        handleClose();
      })
      .catch(error => {
        console.error('Error saving salary data:', error);
      });
  };

  // Calculate totals
  const totalFixedPayMonthly = [
    'basic_pay',
    'employers_contribution_to_PF',
    'other',
    'performance_linked_incentive',
    'children_education_allowance',
    'medical_reimbursement',
    'uniform_allowance',
    'conveyence_reimbursement',
    'prof_persuit_peimbursement',
    'hra',
    'leave_travel_allowance',
    'bonus',
    'special_allowance'
  ].reduce((sum, field) => sum + (Number(salaryData[field]) || 0), 0);

  const totalFixedPayYearly = totalFixedPayMonthly * 12;

  const totalCostToCompanyMonthly = totalFixedPayMonthly +
    (Number(salaryData.gratuity) || 0) +
    (Number(salaryData.gpai) || 0) +
    (Number(salaryData.medi_claim) || 0);

  const totalCostToCompanyYearly = totalCostToCompanyMonthly * 12;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Salary Calculation Form</h1>

      <Button variant="contained" color="primary" onClick={handleClickOpen} className="mb-8 bg-gradient-to-t from-[#ee7623] to-[#282461]">
        Add Salary
      </Button>

      <div className="mb-8">
        {/* Display Total Fixed Pay and Cost to Company */}
        <div className="my-4 flex gap-4">
          {/* Total Fixed Pay Card */}
          <Card className="w-full md:w-1/2 p-4">
            <CardContent>
              <Typography variant="h6" component="div">
                Total Fixed Pay
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly: ₹{totalFixedPayMonthly.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yearly: ₹{totalFixedPayYearly.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => console.log('Edit Fixed Pay')}>Edit</Button>
            </CardActions>
          </Card>

          {/* Total Cost to Company Card */}
          <Card className="w-full md:w-1/2 p-4">
            <CardContent>
              <Typography variant="h6" component="div">
                Total Cost to Company
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly: ₹{totalCostToCompanyMonthly.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yearly: ₹{totalCostToCompanyYearly.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => console.log('Edit Cost to Company')}>Edit</Button>
            </CardActions>
          </Card>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Enter Salary Details</DialogTitle>
        <DialogContent>
          <form className="space-y-4">
            {/* Section 1: Employee and Company Information */}
            <h2 className="text-xl font-semibold">Employee and Company Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                autoFocus
                margin="dense"
                id="empid"
                label="Employee ID"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.empid}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="companyid"
                label="Company ID"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.companyid}
                onChange={handleInputChange}
              />
            </div>

            {/* Section 2: Basic Pay and PF Contribution */}
            <h2 className="text-xl font-semibold">Basic Pay and PF Contribution</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                margin="dense"
                id="basic_pay"
                label="Basic Pay"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.basic_pay}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="employers_contribution_to_PF"
                label="Employer's Contribution to PF"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.employers_contribution_to_PF}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="esic"
                label="ESIC"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.esic}
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="other"
                label="Other"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.other}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="performance_linked_incentive"
                label="Performance Linked Incentive"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.performance_linked_incentive}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="children_education_allowance"
                label="Children Education Allowance"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.children_education_allowance}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="medical_reimbursement"
                label="Medical Reimbursement"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.medical_reimbursement}
                onChange={handleInputChange}
              />
            </div>

            {/* Section 3: Allowances and Reimbursements */}
            <h2 className="text-xl font-semibold">Allowances and Reimbursements</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                margin="dense"
                id="uniform_allowance"
                label="Uniform Allowance"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.uniform_allowance}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="conveyence_reimbursement"
                label="Conveyence Reimbursement"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.conveyence_reimbursement}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="prof_persuit_peimbursement"
                label="Professional Pursuit Reimbursement"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.prof_persuit_peimbursement}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="hra"
                label="HRA"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.hra}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="leave_travel_allowance"
                label="Leave Travel Allowance"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.leave_travel_allowance}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="bonus"
                label="Bonus"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.bonus}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="special_allowance"
                label="Special Allowance"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.special_allowance}
                onChange={handleInputChange}
              />
            </div>

            {/* Section 4: Additional Benefits */}
            <h2 className="text-xl font-semibold">Additional Benefits</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                margin="dense"
                id="gratuity"
                label="Gratuity"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.gratuity}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="gpai"
                label="GPAI"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.gpai}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="medi_claim"
                label="Medi Claim"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.medi_claim}
                onChange={handleInputChange}
              />
            </div>

            {/* Section 5: Monthly Salary */}
            <h2 className="text-xl font-semibold">Monthly Salary</h2>
            <div className="grid grid-cols-2 gap-4">
              <TextField
                margin="dense"
                id="salary_monthly"
                label="Monthly Salary"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.salary_monthly}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                id="salary_lpa"
                label="Salary LPA"
                type="text"
                fullWidth
                variant="outlined"
                value={salaryData.salary_lpa}
                InputProps={{ readOnly: true }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className=' bg-gradient-to-t from-[#ee7623] to-white'>
            Cancel
          </Button>
          <Button onClick={handleSave} className=' bg-gradient-to-t from-[#ee7623] to-white'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SalaryCalculation;
