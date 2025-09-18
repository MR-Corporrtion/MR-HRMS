'use client'

import { useState, useEffect } from 'react';
import { apiClient } from "../../../../config/route.config";

const SalaryFormulaBuilder = () => {
  const initialSalaryComponents = {
    salary_lpa: 'salary_lpa',
    salary_monthly: 'salary_monthly',
    rate_per_day: 'rate_per_day',
    paidDays: 'paidDays',
    calculatedBasicPayEvos: 'calculatedBasicPayEvos',
    earnedFourDaysFixed: 'earnedFourDaysFixed',
    fixedBasicEvos: 'fixedBasicEvos',
    miscellaneous_charges: 'miscellaneous_charges',
    other: 'other',
    gross_salary: 'gross_salary',
    esic: 'esic',
    canteen: 'canteen',
    registration: 'registration',
    advance: 'advance',
    petty: 'petty',
    fourDaysFixed: 'fourDaysFixed',
    basic_pay: 'basic_pay',
    employers_contribution_to_PF: 'employers_contribution_to_PF',
    performance_linked_incentive: 'performance_linked_incentive',
    children_education_allowance: 'children_education_allowance',
    medical_reimbursement: 'medical_reimbursement',
    uniform_allowance: 'uniform_allowance',
    conveyence_reimbursement: 'conveyence_reimbursement',
    prof_persuit_peimbursement: 'prof_persuit_peimbursement',
    hra: 'hra',
    leave_travel_allowance: 'leave_travel_allowance',
    bonus: 'bonus',
    special_allowance: 'special_allowance',
    gratuity: 'gratuity',
    gpai: 'gpai',
    extra: 'extra',
    food_n_room: 'food_n_room',
    medi_claim: 'medi_claim',
    net_salary: 'net_salary',
  };

  const [formulaField, setFormulaField] = useState<string>('');
  const [companyIdBody, setCompanyIdBody] = useState<string>('');
  const [formulaType, setFormulaType] = useState<string>('salary');
  const [formulas, setFormulas] = useState<any[]>([]);
  const [formulaHead, setFormulaHead] = useState<any[]>([]);

  useEffect(() => {
    getFormulas();
  }, []);

  const isOperator = (char: string) => ['+', '-', '*', '/'].includes(char);

  const handleButtonClick = (value: string) => {
    setFormulaField((prev) => {
      let trimmed = prev.trim();
      if (isOperator(value) && isOperator(trimmed.slice(-1))) {
        trimmed = trimmed.slice(0, -1);
      }
      return `${trimmed} ${value}`.trim();
    });
  };

  const handleDelete = () => {
    setFormulaField((prev) => prev.slice(0, -1).trim());
  };

  const handleClear = () => {
    setFormulaField('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormulaField(e.target.value);
  };

  const getFormulas = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.get('/formula/getall', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
        params: { companyIdBody }
      });
      setFormulas(response.data.data);
    } catch (error) {
      console.error('Error fetching formulas:', error);
      alert('Error fetching formulas');
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.post(
        '/formula/create',
        {
          companyIdBody,
          formula_type: formulaType,
          formulaHead:formulaHead,
          formula_expression: formulaField,
          expression: formulaField,
        },
        {  
          headers: {
          'Authorization': `Bearer ${token}`,
        },
          withCredentials: true 
        }
      );
      alert('Formula created successfully');
      getFormulas();
    } catch (error) {
      console.error('Error creating formula:', error);
      alert('Error creating formula');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.put('/formula/update', 
        {
          companyIdBody,
          formula_type: formulaType,
          formula_expression: formulaField,
          expression: formulaField,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        }
      );
      alert('Formula updated successfully');
      getFormulas();
    } catch (error) {
      console.error('Error updating formula:', error);
      alert('Error updating formula');
    }
  };

  const handleDeleteFormula = async () => {
    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      await apiClient.delete('/formula/delete', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
        data: {
          companyIdBody,
          formula_type: formulaType
        }
      });
      alert('Formula deleted successfully');
      getFormulas();
    } catch (error) {
      console.error('Error deleting formula:', error);
      alert('Error deleting formula');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4">
      <header className="bg-gradient-to-t from-[#ee7623] to-[#282461] p-2 text-white text-lg font-bold text-center rounded-md shadow-md">
        Salary Formula Builder
      </header>
      <main className="flex-1 p-4 overflow-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white p-4 rounded-md shadow-md flex-1">
            {/* <label className="block text-sm font-semibold">Company ID:</label>
            <input
              type="text"
              value={companyIdBody}
              onChange={(e) => setCompanyIdBody(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            /> */}
            <label className="block text-sm font-semibold">Formula Type:</label>
            <input
              type="text"
              value={formulaType}
              onChange={(e) => setFormulaType(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
             <label className="block text-sm font-semibold">Formula Head:</label>
            <input
              type="number"
              value={formulaHead}
              onChange={(e:any) => setFormulaHead(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <h3 className="text-sm font-semibold mb-2">Salary Components</h3>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto h-40 border border-gray-300 rounded-md p-2">
              {Object.entries(initialSalaryComponents).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleButtonClick(value)}
                  className="bg-gray-100 border border-gray-300 rounded-md p-1 hover:bg-gray-200 transition"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md flex-1">
            <h3 className="text-sm font-semibold mb-2">Formula</h3>
            <textarea
              value={formulaField}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md w-full h-24 text-gray-700 bg-gray-50"
              placeholder="Enter or paste formula here"
            />
            <div className="grid grid-cols-4 gap-1 mt-2">
              {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '.', '/', '=', '(', ')'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => handleButtonClick(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-1 rounded-md transition"
                  >
                    {item}
                  </button>
                )
              )}
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white text-lg py-1 rounded-md transition"
              >
                Delete
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-md w-full transition"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md w-full transition"
              >
                Submit
              </button>
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md w-full transition"
              >
                Update
              </button>
              <button
                onClick={handleDeleteFormula}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-md w-full transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Existing Formulas</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr className='bg-gradient-to-t from-[#ee7623] to-[#282461] text-white'>
                  <th className="py-2 px-4 border-b text-left">Company ID</th>
                  <th className="py-2 px-4 border-b text-left">Formula Type</th>
                  <th className="py-2 px-4 border-b text-left">Expression</th>
                </tr>
              </thead>
              <tbody>
                {formulas.map((formula, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{formula.companyid}</td>
                    <td className="py-2 px-4 border-b">{formula.formula_type}</td>
                    <td className="py-2 px-4 border-b">{formula.expression}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalaryFormulaBuilder;

