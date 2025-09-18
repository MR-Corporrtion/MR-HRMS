"use client"

import { useState } from "react"
import {
  Close,
  ArrowBack,
  ArrowForward,
  Check,
  Star,
  StarBorder,
  CalendarMonth,
  Person,
  Description,
  Category,
  Assignment,
} from "@mui/icons-material"

type FormStep = "details" | "self" | "manager" | "goals" | "review"
type UserRole = "employee" | "manager"

interface FormData {
  employeeId: string
  employeeName: string
  managerId: string
  managerName: string
  reviewType: string
  reviewPeriod: string
  dueDate: string
  selfAssessment: {
    achievements: string
    challenges: string
    strengths: string
    improvements: string
    ratings: {
      [key: string]: number
    }
  }
  managerAssessment: {
    performance: string
    strengths: string
    improvements: string
    feedback: string
    ratings: {
      [key: string]: number
    }
  }
  goals: {
    id: string
    title: string
    description: string
    dueDate: string
    category: string
  }[]
}

const initialFormData: FormData = {
  employeeId: "",
  employeeName: "",
  managerId: "",
  managerName: "",
  reviewType: "Annual Review",
  reviewPeriod: "",
  dueDate: "",
  selfAssessment: {
    achievements: "",
    challenges: "",
    strengths: "",
    improvements: "",
    ratings: {
      jobKnowledge: 0,
      workQuality: 0,
      productivity: 0,
      communication: 0,
      teamwork: 0,
    },
  },
  managerAssessment: {
    performance: "",
    strengths: "",
    improvements: "",
    feedback: "",
    ratings: {
      jobKnowledge: 0,
      workQuality: 0,
      productivity: 0,
      communication: 0,
      teamwork: 0,
    },
  },
  goals: [
    {
      id: "1",
      title: "",
      description: "",
      dueDate: "",
      category: "Professional Development",
    },
  ],
}

const ratingCategories = [
  { id: "jobKnowledge", label: "Job Knowledge" },
  { id: "workQuality", label: "Quality of Work" },
  { id: "productivity", label: "Productivity" },
  { id: "communication", label: "Communication" },
  { id: "teamwork", label: "Teamwork" },
]

const goalCategories = [
  "Professional Development",
  "Technical Skills",
  "Leadership",
  "Communication",
  "Project-specific",
  "Business Impact",
]

export default function NewAppraisalForm({
  onClose,
  userRole = "manager",
}: {
  onClose: () => void
  userRole?: UserRole
}) {
  const [currentStep, setCurrentStep] = useState<FormStep>("details")
  const [formData, setFormData] = useState<FormData>(initialFormData)

  // Determine which steps to show based on user role
  const steps: FormStep[] =
    userRole === "manager" ? ["details", "self", "manager", "goals", "review"] : ["details", "self", "goals", "review"]

  const currentStepIndex = steps.indexOf(currentStep)

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex])
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    alert("Appraisal form submitted successfully!")
    onClose()
  }

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...(formData[section as keyof FormData] as object),
        [field]: value,
      },
    })
  }

  const handleNestedInputChange = (section: "selfAssessment" | "managerAssessment", field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    })
  }

  const handleRatingChange = (section: "selfAssessment" | "managerAssessment", category: string, rating: number) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        ratings: {
          ...formData[section].ratings,
          [category]: rating,
        },
      },
    })
  }

  const handleGoalChange = (index: number, field: string, value: string) => {
    const updatedGoals = [...formData.goals]
    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      goals: updatedGoals,
    })
  }

  const addGoal = () => {
    setFormData({
      ...formData,
      goals: [
        ...formData.goals,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          dueDate: "",
          category: "Professional Development",
        },
      ],
    })
  }

  const removeGoal = (index: number) => {
    const updatedGoals = [...formData.goals]
    updatedGoals.splice(index, 1)
    setFormData({
      ...formData,
      goals: updatedGoals,
    })
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStepIndex ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 ${index < currentStepIndex ? "bg-blue-600" : "bg-gray-200"}`}></div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderStepTitle = () => {
    switch (currentStep) {
      case "details":
        return "Appraisal Details"
      case "self":
        return "Self Assessment"
      case "manager":
        return "Manager Assessment"
      case "goals":
        return "Performance Goals"
      case "review":
        return "Review & Submit"
      default:
        return ""
    }
  }

  const renderRatingStars = (section: "selfAssessment" | "managerAssessment", category: string) => {
    const rating = formData[section].ratings[category]
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(section, category, star)}
            className="text-yellow-400 focus:outline-none"
          >
            {star <= rating ? <Star /> : <StarBorder />}
          </button>
        ))}
      </div>
    )
  }

  const renderDetailsStep = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <div className="relative">
              <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.employeeName}
                onChange={(e) => handleInputChange("employeeName", "", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter employee name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
            <div className="relative">
              <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.managerName}
                onChange={(e) => handleInputChange("managerName", "", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter manager name"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Review Type</label>
          <select
            value={formData.reviewType}
            onChange={(e) => handleInputChange("reviewType", "", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Annual Review">Annual Review</option>
            <option value="Quarterly Review">Quarterly Review</option>
            <option value="Mid-Year Review">Mid-Year Review</option>
            <option value="Probation Review">Probation Review</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Review Period</label>
          <div className="relative">
            <CalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={formData.reviewPeriod}
              onChange={(e) => handleInputChange("reviewPeriod", "", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Jan 2023 - Dec 2023"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <div className="relative">
            <CalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", "", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderSelfAssessmentStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Achievements</label>
          <textarea
            value={formData.selfAssessment.achievements}
            onChange={(e) => handleNestedInputChange("selfAssessment", "achievements", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Describe your key achievements during this review period"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Challenges Faced</label>
          <textarea
            value={formData.selfAssessment.challenges}
            onChange={(e) => handleNestedInputChange("selfAssessment", "challenges", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Describe any challenges you faced and how you addressed them"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Strengths</label>
          <textarea
            value={formData.selfAssessment.strengths}
            onChange={(e) => handleNestedInputChange("selfAssessment", "strengths", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="What do you consider to be your key strengths?"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Areas for Improvement</label>
          <textarea
            value={formData.selfAssessment.improvements}
            onChange={(e) => handleNestedInputChange("selfAssessment", "improvements", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="What areas would you like to improve in?"
          ></textarea>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Self Rating</h3>
          <div className="space-y-4">
            {ratingCategories.map((category) => (
              <div key={category.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{category.label}</span>
                {renderRatingStars("selfAssessment", category.id)}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderManagerAssessmentStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Performance Summary</label>
          <textarea
            value={formData.managerAssessment.performance}
            onChange={(e) => handleNestedInputChange("managerAssessment", "performance", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Provide an overall assessment of the employee's performance"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Strengths</label>
          <textarea
            value={formData.managerAssessment.strengths}
            onChange={(e) => handleNestedInputChange("managerAssessment", "strengths", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="What are the employee's key strengths?"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Areas for Improvement</label>
          <textarea
            value={formData.managerAssessment.improvements}
            onChange={(e) => handleNestedInputChange("managerAssessment", "improvements", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="What areas should the employee focus on improving?"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Feedback & Recommendations</label>
          <textarea
            value={formData.managerAssessment.feedback}
            onChange={(e) => handleNestedInputChange("managerAssessment", "feedback", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Provide constructive feedback and recommendations"
          ></textarea>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Manager Rating</h3>
          <div className="space-y-4">
            {ratingCategories.map((category) => (
              <div key={category.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{category.label}</span>
                {renderRatingStars("managerAssessment", category.id)}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderGoalsStep = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-medium text-gray-800">Performance Goals</h3>
          <button
            type="button"
            onClick={addGoal}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Goal
          </button>
        </div>

        <div className="space-y-6">
          {formData.goals.map((goal, index) => (
            <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-medium text-gray-700">Goal {index + 1}</h4>
                {formData.goals.length > 1 && (
                  <button type="button" onClick={() => removeGoal(index)} className="text-red-500 hover:text-red-700">
                    <Close fontSize="small" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                  <div className="relative">
                    <Assignment className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={goal.title}
                      onChange={(e) => handleGoalChange(index, "title", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter goal title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <div className="relative">
                    <Description className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={goal.description}
                      onChange={(e) => handleGoalChange(index, "description", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                      placeholder="Describe the goal and how it will be measured"
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <div className="relative">
                      <Category className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={goal.category}
                        onChange={(e) => handleGoalChange(index, "category", e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {goalCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <div className="relative">
                      <CalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        value={goal.dueDate}
                        onChange={(e) => handleGoalChange(index, "dueDate", e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 text-sm">
            Please review all information before submitting. Once submitted, the appraisal will be sent to the relevant
            parties.
          </p>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-800 mb-2">Appraisal Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Employee:</div>
              <div className="font-medium">{formData.employeeName || "Not specified"}</div>

              <div className="text-gray-500">Manager:</div>
              <div className="font-medium">{formData.managerName || "Not specified"}</div>

              <div className="text-gray-500">Review Type:</div>
              <div className="font-medium">{formData.reviewType}</div>

              <div className="text-gray-500">Review Period:</div>
              <div className="font-medium">{formData.reviewPeriod || "Not specified"}</div>

              <div className="text-gray-500">Due Date:</div>
              <div className="font-medium">{formData.dueDate || "Not specified"}</div>
            </div>
          </div>

          {userRole === "manager" || userRole === "employee" ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">Self Assessment</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Key Achievements:</div>
                  <div className="bg-gray-50 p-2 rounded">{formData.selfAssessment.achievements || "Not provided"}</div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Strengths:</div>
                  <div className="bg-gray-50 p-2 rounded">{formData.selfAssessment.strengths || "Not provided"}</div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Areas for Improvement:</div>
                  <div className="bg-gray-50 p-2 rounded">{formData.selfAssessment.improvements || "Not provided"}</div>
                </div>
              </div>
            </div>
          ) : null}

          {userRole === "manager" && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">Manager Assessment</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Performance Summary:</div>
                  <div className="bg-gray-50 p-2 rounded">
                    {formData.managerAssessment.performance || "Not provided"}
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Key Strengths:</div>
                  <div className="bg-gray-50 p-2 rounded">{formData.managerAssessment.strengths || "Not provided"}</div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Areas for Improvement:</div>
                  <div className="bg-gray-50 p-2 rounded">
                    {formData.managerAssessment.improvements || "Not provided"}
                  </div>
                </div>

                <div>
                  <div className="text-gray-500 mb-1">Feedback & Recommendations:</div>
                  <div className="bg-gray-50 p-2 rounded">{formData.managerAssessment.feedback || "Not provided"}</div>
                </div>
              </div>
            </div>
          )}

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-800 mb-2">Performance Goals</h3>
            {formData.goals.length > 0 ? (
              <div className="space-y-3">
                {formData.goals.map((goal, index) => (
                  <div key={goal.id} className="bg-gray-50 p-2 rounded text-sm">
                    <div className="font-medium">{goal.title || `Goal ${index + 1}`}</div>
                    <div className="text-gray-500 text-xs mt-1">{goal.description || "No description provided"}</div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span>{goal.category}</span>
                      <span>Due: {goal.dueDate || "Not specified"}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No goals have been set.</p>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="confirm"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="confirm" className="ml-2 block text-sm text-gray-700">
            I confirm that all the information provided is accurate and complete.
          </label>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "details":
        return renderDetailsStep()
      case "self":
        return renderSelfAssessmentStep()
      case "manager":
        return renderManagerAssessmentStep()
      case "goals":
        return renderGoalsStep()
      case "review":
        return renderReviewStep()
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{renderStepTitle()}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Close />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 140px)" }}>
          {renderStepIndicator()}
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
              currentStepIndex === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ArrowBack fontSize="small" />
            Back
          </button>

          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
              <ArrowForward fontSize="small" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit
              <Check fontSize="small" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

