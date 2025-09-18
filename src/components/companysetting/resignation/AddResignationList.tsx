import { useState } from 'react';
import { apiClient } from "../../../../config/route.config"; // Your API client config

interface ExitInterviewFormProps {
  fetchResignations: () => void;
  closeDialog: () => void;
}

const ExitInterviewForm = ({ fetchResignations, closeDialog }: ExitInterviewFormProps) => {
  const [formData, setFormData] = useState({
    empid: '',
    resignation_type: 'voluntary',
    resignation_reason: '',
    reason_for_leaving: '',
    wish_to_rejoin: '',
    job_satisfaction_msg: '',
    job_frustration_msg: '',
    job_policy_msg: '',
    recommend_to_other: '',
    suggestion_for_company: '',
    employee_comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      const response = await apiClient.post('/resignation/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        alert("Resignation submitted successfully!");
        fetchResignations(); // Fetch updated resignation data
        closeDialog(); // Close the dialog
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Error submitting resignation form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employee ID Field */}
      <div>
        <label className="block font-semibold">Employee ID</label>
        <input 
          type="text" 
          name="empid" 
          value={formData.empid} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      {/* Resignation Type Field */}
      <div>
        <label className="block font-semibold">Resignation Type</label>
        <select 
          name="resignation_type" 
          value={formData.resignation_type} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="voluntary">Voluntary</option>
          <option value="involuntary">Involuntary</option>
        </select>
      </div>

      {/* Resignation Reason Field */}
      <div>
        <label className="block font-semibold">Resignation Reason</label>
        <textarea 
          name="resignation_reason" 
          value={formData.resignation_reason} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Reason for Leaving Field */}
      <div>
        <label className="block font-semibold">Reason for Leaving</label>
        <textarea 
          name="reason_for_leaving" 
          value={formData.reason_for_leaving} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Wish to Rejoin Field */}
      <div>
        <label className="block font-semibold">Wish to Rejoin</label>
        <input 
          type="text" 
          name="wish_to_rejoin" 
          value={formData.wish_to_rejoin} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Job Satisfaction Message Field */}
      <div>
        <label className="block font-semibold">Job Satisfaction Message</label>
        <textarea 
          name="job_satisfaction_msg" 
          value={formData.job_satisfaction_msg} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Job Frustration Message Field */}
      <div>
        <label className="block font-semibold">Job Frustration Message</label>
        <textarea 
          name="job_frustration_msg" 
          value={formData.job_frustration_msg} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Job Policy Message Field */}
      <div>
        <label className="block font-semibold">Job Policy Message</label>
        <textarea 
          name="job_policy_msg" 
          value={formData.job_policy_msg} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Recommend to Other Field */}
      <div>
        <label className="block font-semibold">Would you recommend to others?</label>
        <input 
          type="text" 
          name="recommend_to_other" 
          value={formData.recommend_to_other} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Suggestions for Company Field */}
      <div>
        <label className="block font-semibold">Suggestions for the Company</label>
        <textarea 
          name="suggestion_for_company" 
          value={formData.suggestion_for_company} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Employee Comment Field */}
      <div>
        <label className="block font-semibold">Employee Comment</label>
        <textarea 
          name="employee_comment" 
          value={formData.employee_comment} 
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-gradient-to-t from-[#ee7623] to-[#282461] text-white px-4 py-2 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default ExitInterviewForm;
