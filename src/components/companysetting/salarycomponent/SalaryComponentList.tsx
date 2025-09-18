import { useState } from 'react';

const SalaryComponentPage = () => {
  // Initial salary components data
  const [salaryComponents, setSalaryComponents] = useState<string[]>([
    'Employee ID',
    'Company ID',
    'Basic Pay',
    "Employer's Contribution to PF",
    'Other',
    'Performance Linked Incentive',
    "Children's Education Allowance",
    'Medical Reimbursement',
    'Uniform Allowance',
    'Conveyance Reimbursement',
    'Professional Pursuit Reimbursement',
    'House Rent Allowance (HRA)',
    'Leave Travel Allowance',
    'Bonus',
    'Special Allowance',
    'Gratuity',
    'Group Personal Accident Insurance (GPAI)',
    'Medi-claim',
    'Gross Salary',
    'Net Salary',
    'Monthly Salary',
    'Salary (LPA)',
  ]);

  // State for managing modal visibility and form values
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComponentName, setNewComponentName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Handle form submission for adding or editing components
  const handleAddOrEditComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComponentName.trim()) {
      if (isEditing && editIndex !== null) {
        // Edit component
        const updatedComponents = [...salaryComponents];
        updatedComponents[editIndex] = newComponentName.trim();
        setSalaryComponents(updatedComponents);
      } else {
        // Add new component
        setSalaryComponents([...salaryComponents, newComponentName.trim()]);
      }
      // Reset form and close modal
      setNewComponentName('');
      setIsEditing(false);
      setEditIndex(null);
      setIsModalOpen(false);
    }
  };

  // Open the edit modal with the selected component
  const handleEdit = (index: number) => {
    setNewComponentName(salaryComponents[index]);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // Delete a component by index
  const handleDelete = (index: number) => {
    const updatedComponents = salaryComponents.filter((_, i) => i !== index);
    setSalaryComponents(updatedComponents);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Salary Components</h2>
          <button 
            onClick={() => { setIsModalOpen(true); setIsEditing(false); setNewComponentName(''); }}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Component
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {salaryComponents.map((componentName, index) => (
            <div 
              key={index} 
              className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                {componentName}
              </h3>
              <div className="flex justify-around">
                <button 
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding or editing salary component */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Salary Component' : 'Add Salary Component'}
              </h3>
              <form onSubmit={handleAddOrEditComponent} className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={newComponentName}
                  onChange={(e) => setNewComponentName(e.target.value)}
                  placeholder="Enter component name"
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); setIsEditing(false); }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    {isEditing ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryComponentPage;
