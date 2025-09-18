// "use client"

// import { useState } from "react"
// import {
//   Assessment,
//   CalendarMonth,
//   CheckCircle,
//   HourglassEmpty,
//   MoreVert,
//   Search,
//   Sort,
//   FilterList,
//   Add,
// } from "@mui/icons-material"
// import NewAppraisalForm from "./new-appraisal-form"

// export default function AppraisalsPage() {
//   const [showNewAppraisalForm, setShowNewAppraisalForm] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterMenuOpen, setFilterMenuOpen] = useState(false)
//   const [sortMenuOpen, setSortMenuOpen] = useState(false)
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [sortBy, setSortBy] = useState("dueDate")

//   const handleOpenNewAppraisalForm = () => {
//     setShowNewAppraisalForm(true)
//   }

//   const handleCloseNewAppraisalForm = () => {
//     setShowNewAppraisalForm(false)
//   }

// interface Appraisal {
//     employee: string;
//     position: string;
//     avatar: string;
//     type: string;
//     period: string;
//     completion: number;
//     status: string;
//     statusColor: string;
// }

// interface Review {
//     employee: string;
//     position: string;
//     avatar: string;
//     type: string;
//     dueDate: string;
//     status: string;
// }

// const handleViewAppraisal = (id: number | string): void => {
//     alert(`View appraisal with ID: ${id}`)
//     // In a real app, you would navigate to the appraisal detail page
// }

// interface ContinueAppraisalHandler {
//     (id: number | string): void;
// }

// const handleContinueAppraisal: ContinueAppraisalHandler = (id) => {
//     alert(`Continue appraisal with ID: ${id}`)
//     // In a real app, you would navigate to the appraisal form with the existing data
// }

//   const filteredAppraisals = appraisals.filter((appraisal) => {
//     // Filter by search query
//     const matchesSearch =
//       appraisal.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       appraisal.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       appraisal.type.toLowerCase().includes(searchQuery.toLowerCase())

//     // Filter by status
//     const matchesStatus = statusFilter === "all" || appraisal.status.toLowerCase() === statusFilter.toLowerCase()

//     return matchesSearch && matchesStatus
//   })

//   // Sort appraisals
//   const sortedAppraisals = [...filteredAppraisals].sort((a, b) => {
//     if (sortBy === "employee") {
//       return a.employee.localeCompare(b.employee)
//     } else if (sortBy === "completion") {
//       return b.completion - a.completion
//     } else if (sortBy === "dueDate") {
//       // This is a simplified sort - in a real app, you'd parse the dates
//       return a.period.localeCompare(b.period)
//     }
//     return 0
//   })

//   return (
//     <div className="space-y-6">
//       <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Appraisals</h1>
//           <p className="text-gray-500">Manage and track employee performance reviews</p>
//         </div>
//         <button
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//           onClick={handleOpenNewAppraisalForm}
//         >
//           <Add fontSize="small" />
//           <span>New Appraisal</span>
//         </button>
//       </header>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search appraisals..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div className="flex gap-2">
//             <div className="relative">
//               <button
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//                 onClick={() => setFilterMenuOpen(!filterMenuOpen)}
//               >
//                 <FilterList fontSize="small" />
//                 <span>Filter</span>
//               </button>

//               {filterMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
//                   <div className="p-2">
//                     <div className="text-sm font-medium text-gray-700 mb-2">Status</div>
//                     <div className="space-y-1">
//                       {["all", "pending", "in progress", "completed"].map((status) => (
//                         <div key={status} className="flex items-center">
//                           <input
//                             type="radio"
//                             id={`status-${status}`}
//                             name="status"
//                             checked={statusFilter === status}
//                             onChange={() => {
//                               setStatusFilter(status)
//                               setFilterMenuOpen(false)
//                             }}
//                             className="h-4 w-4 text-blue-600"
//                           />
//                           <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700 capitalize">
//                             {status === "all" ? "All" : status}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
//                 onClick={() => setSortMenuOpen(!sortMenuOpen)}
//               >
//                 <Sort fontSize="small" />
//                 <span>Sort</span>
//               </button>

//               {sortMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
//                   <div className="p-2">
//                     <div className="text-sm font-medium text-gray-700 mb-2">Sort By</div>
//                     <div className="space-y-1">
//                       {[
//                         { id: "employee", label: "Employee Name" },
//                         { id: "completion", label: "Completion %" },
//                         { id: "dueDate", label: "Due Date" },
//                       ].map((option) => (
//                         <div key={option.id} className="flex items-center">
//                           <input
//                             type="radio"
//                             id={`sort-${option.id}`}
//                             name="sort"
//                             checked={sortBy === option.id}
//                             onChange={() => {
//                               setSortBy(option.id)
//                               setSortMenuOpen(false)
//                             }}
//                             className="h-4 w-4 text-blue-600"
//                           />
//                           <label htmlFor={`sort-${option.id}`} className="ml-2 text-sm text-gray-700">
//                             {option.label}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Appraisal Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {sortedAppraisals.map((appraisal, index) => (
//           <AppraisalCard
//             key={index}
//             appraisal={appraisal}
//             onView={() => handleViewAppraisal(index)}
//             onContinue={() => handleContinueAppraisal(index)}
//           />
//         ))}
//       </div>

//       {/* Upcoming Reviews */}
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold text-gray-800">Upcoming Reviews</h2>
//           <button className="text-gray-500 hover:text-gray-700">
//             <MoreVert />
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//                 <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                 <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                 <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {upcomingReviews.map((review, index) => (
//                 <tr key={index}>
//                   <td className="py-4">
//                     <div className="flex items-center">
//                       <img
//                         src={review.avatar || "/placeholder.svg?height=32&width=32"}
//                         alt={review.employee}
//                         className="w-8 h-8 rounded-full mr-3"
//                       />
//                       <div>
//                         <p className="text-sm font-medium text-gray-800">{review.employee}</p>
//                         <p className="text-xs text-gray-500">{review.position}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <span className="text-sm text-gray-700">{review.type}</span>
//                   </td>
//                   <td className="py-4">
//                     <div className="flex items-center">
//                       <CalendarMonth fontSize="small" className="text-gray-400 mr-2" />
//                       <span className="text-sm text-gray-700">{review.dueDate}</span>
//                     </div>
//                   </td>
//                   <td className="py-4">
//                     <span
//                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                         review.status === "Pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : review.status === "In Progress"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-green-100 text-green-800"
//                       }`}
//                     >
//                       {review.status === "Pending" ? (
//                         <HourglassEmpty fontSize="small" className="mr-1" />
//                       ) : review.status === "In Progress" ? (
//                         <Assessment fontSize="small" className="mr-1" />
//                       ) : (
//                         <CheckCircle fontSize="small" className="mr-1" />
//                       )}
//                       {review.status}
//                     </span>
//                   </td>
//                   <td className="py-4">
//                     <button
//                       className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                       onClick={() => handleViewAppraisal(`upcoming-${index}`)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* New Appraisal Form Modal */}
//       {showNewAppraisalForm && <NewAppraisalForm onClose={handleCloseNewAppraisalForm} />}
//     </div>
//   )
// }

// function AppraisalCard({ appraisal, onView, onContinue }: { appraisal: any; onView: () => void; onContinue: () => void }) {
//   const [menuOpen, setMenuOpen] = useState(false)

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className={`h-2 ${appraisal.statusColor}`}></div>
//       <div className="p-6">
//         <div className="flex justify-between items-start">
//           <div className="flex items-center">
//             <img
//               src={appraisal.avatar || "/placeholder.svg?height=40&width=40"}
//               alt={appraisal.employee}
//               className="w-10 h-10 rounded-full mr-3"
//             />
//             <div>
//               <h3 className="text-lg font-medium text-gray-800">{appraisal.employee}</h3>
//               <p className="text-sm text-gray-500">{appraisal.position}</p>
//             </div>
//           </div>
//           <div className="relative">
//             <button className="text-gray-400 hover:text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
//               <MoreVert />
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false)
//                       onView()
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     View Details
//                   </button>
//                   <button
//                     onClick={() => {
//                       setMenuOpen(false)
//                       // Add functionality here
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Send Reminder
//                   </button>
//                   {appraisal.status !== "Completed" && (
//                     <button
//                       onClick={() => {
//                         setMenuOpen(false)
//                         // Add functionality here
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-4 flex items-center text-sm text-gray-500">
//           <Assessment fontSize="small" className="mr-2" />
//           <span>{appraisal.type}</span>
//         </div>

//         <div className="mt-2 flex items-center text-sm text-gray-500">
//           <CalendarMonth fontSize="small" className="mr-2" />
//           <span>{appraisal.period}</span>
//         </div>

//         <div className="mt-4">
//           <div className="flex justify-between text-sm mb-1">
//             <span className="font-medium">Completion</span>
//             <span className="font-medium">{appraisal.completion}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className={`h-2 rounded-full ${appraisal.statusColor}`}
//               style={{ width: `${appraisal.completion}%` }}
//             ></div>
//           </div>
//         </div>

//         <div className="mt-6 flex justify-between items-center">
//           <span
//             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//               appraisal.status === "Pending"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : appraisal.status === "In Progress"
//                   ? "bg-blue-100 text-blue-800"
//                   : appraisal.status === "Completed"
//                     ? "bg-green-100 text-green-800"
//                     : ""
//             }`}
//           >
//             {appraisal.status}
//           </span>
//           <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" onClick={onContinue}>
//             {appraisal.status === "Completed" ? "View" : "Continue"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const appraisals = [
//   {
//     employee: "Sarah Johnson",
//     position: "UX Designer",
//     avatar: "/placeholder.svg?height=40&width=40",
//     type: "Annual Review",
//     period: "Jan 2023 - Dec 2023",
//     completion: 75,
//     status: "In Progress",
//     statusColor: "bg-blue-500",
//   },
//   {
//     employee: "Mike Smith",
//     position: "Frontend Developer",
//     avatar: "/placeholder.svg?height=40&width=40",
//     type: "Quarterly Review",
//     period: "Apr 2023 - Jun 2023",
//     completion: 30,
//     status: "Pending",
//     statusColor: "bg-yellow-500",
//   },
//   {
//     employee: "Emily Davis",
//     position: "Product Manager",
//     avatar: "/placeholder.svg?height=40&width=40",
//     type: "Annual Review",
//     period: "Jan 2023 - Dec 2023",
//     completion: 100,
//     status: "Completed",
//     statusColor: "bg-green-500",
//   },
//   {
//     employee: "Alex Wilson",
//     position: "Backend Developer",
//     avatar: "/placeholder.svg?height=40&width=40",
//     type: "Quarterly Review",
//     period: "Apr 2023 - Jun 2023",
//     completion: 60,
//     status: "In Progress",
//     statusColor: "bg-blue-500",
//   },
//   {
//     employee: "Jessica Brown",
//     position: "Marketing Specialist",
//     avatar: "/placeholder.svg?height=40&width=40",
//     type: "Annual Review",
//     period: "Jan 2023 - Dec 2023",
//     completion: 0,
//     status: "Pending",
//     statusColor: "bg-yellow-500",
//   },
//   {
//     employee: "David Lee",
//     position: "Data Analyst",
//     avatar: "/placeholder.svg?height=40&width=40",
//     type: "Quarterly Review",
//     period: "Apr 2023 - Jun 2023",
//     completion: 100,
//     status: "Completed",
//     statusColor: "bg-green-500",
//   },
// ]

// const upcomingReviews = [
//   {
//     employee: "Sarah Johnson",
//     position: "UX Designer",
//     avatar: "/placeholder.svg?height=32&width=32",
//     type: "Annual Review",
//     dueDate: "Jun 15, 2023",
//     status: "In Progress",
//   },
//   {
//     employee: "Mike Smith",
//     position: "Frontend Developer",
//     avatar: "/placeholder.svg?height=32&width=32",
//     type: "Quarterly Review",
//     dueDate: "Jun 20, 2023",
//     status: "Pending",
//   },
//   {
//     employee: "Emily Davis",
//     position: "Product Manager",
//     avatar: "/placeholder.svg?height=32&width=32",
//     type: "Annual Review",
//     dueDate: "Jun 25, 2023",
//     status: "Completed",
//   },
//   {
//     employee: "Alex Wilson",
//     position: "Backend Developer",
//     avatar: "/placeholder.svg?height=32&width=32",
//     type: "Quarterly Review",
//     dueDate: "Jun 30, 2023",
//     status: "In Progress",
//   },
// ]



"use client";

import { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import ApprisalMainlayout from "../layouts/admin/ApprisalMainlayout";

const questions = [
  "How well do you think you have performed your job responsibilities?",
  "What key achievements or contributions have you made?",
  "How effectively do you communicate and collaborate with colleagues?",
  "How would you rate your ability to solve problems and make decisions?",
  "How well have you adapted to changes and learned new skills?",
  "How effectively do you manage your time and workload?",
  "Have you taken any leadership initiatives?",
  "What do you consider your biggest strengths and weaknesses?",
  "How satisfied and motivated do you feel in your role?",
  "What goals do you want to achieve before the next review?",
];

export default function SelfAppraisalPage() {
  const [responses, setResponses] = useState(
    questions.map(() => ({ rating: 0, comment: "" }))
  );

  const handleRatingChange = (index: number, rating: number) => {
    const newResponses = [...responses];
    newResponses[index].rating = rating;
    setResponses(newResponses);
  };

  const handleCommentChange = (index: number, comment: string) => {
    const newResponses = [...responses];
    newResponses[index].comment = comment;
    setResponses(newResponses);
  };

  const handleSubmit = () => {
    console.log("Appraisal Submitted:", responses);
    alert("Your self-appraisal has been submitted successfully!");
  };

  return (
    <ApprisalMainlayout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Employee Self-Appraisal
        </h1>

        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 border-b">
            <p className="text-lg font-semibold text-gray-800">{question}</p>

            {/* Star Rating */}
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(index, star)}
                  className="focus:outline-none"
                >
                  {star <= responses[index].rating ? (
                    <Star className="text-yellow-500" />
                  ) : (
                    <StarBorder className="text-gray-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              value={responses[index].comment}
              onChange={(e) => handleCommentChange(index, e.target.value)}
              placeholder="Write your comments here..."
              className="w-full mt-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Self-Appraisal
        </button>
      </div>
    </ApprisalMainlayout>
  );
}
