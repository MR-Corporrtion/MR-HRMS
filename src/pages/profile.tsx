import {
    Edit,
    Email,
    Phone,
    LocationOn,
    Work,
    CalendarMonth,
    Star,
    StarBorder,
    TrendingUp,
    Assessment,
  } from "@mui/icons-material"
import AddEmployeeLayOut from "../layouts/admin/AddEmployeeLayOut"
import ApprisalMainlayout from "../layouts/admin/ApprisalMainlayout"
  
  export default function ProfilePage() {
    return (
        <ApprisalMainlayout>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Edit fontSize="small" />
            <span>Edit Profile</span>
          </button>
        </header>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-1">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="px-6 pb-6">
              <div className="flex justify-center -mt-12">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="John Doe"
                  className="w-24 h-24 rounded-full border-4 border-white bg-white"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-500">Product Manager</p>
              </div>
  
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Email className="mr-3 text-gray-400" />
                  <span>john.doe@company.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="mr-3 text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <LocationOn className="mr-3 text-gray-400" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Work className="mr-3 text-gray-400" />
                  <span>5 years at Company</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarMonth className="mr-3 text-gray-400" />
                  <span>Joined Jan 2018</span>
                </div>
              </div>
  
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Product Management", "UX/UI", "Team Leadership", "Agile", "Strategic Planning", "Data Analysis"].map(
                    (skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Performance & Goals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Overall Rating</h3>
                  <div className="mt-2 flex items-center">
                    <div className="flex text-yellow-400">
                      <Star fontSize="small" />
                      <Star fontSize="small" />
                      <Star fontSize="small" />
                      <Star fontSize="small" />
                      <StarBorder fontSize="small" />
                    </div>
                    <span className="ml-2 text-lg font-semibold">4.2/5</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Goals Completed</h3>
                  <div className="mt-2 flex items-center">
                    <TrendingUp className="text-green-500 mr-2" />
                    <span className="text-lg font-semibold">8/10</span>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Last Review</h3>
                  <div className="mt-2 flex items-center">
                    <Assessment className="text-purple-500 mr-2" />
                    <span className="text-lg font-semibold">Jan 15, 2023</span>
                  </div>
                </div>
              </div>
  
              <h3 className="text-md font-semibold text-gray-700 mb-3">Performance Metrics</h3>
              <div className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">{metric.name}</span>
                      <span className="text-sm font-medium text-gray-900">{metric.value}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${metric.color}`}
                        style={{ width: `${(metric.value / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Current Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Goals</h2>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{goal.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          goal.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : goal.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {goal.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            goal.status === "In Progress"
                              ? "bg-blue-500"
                              : goal.status === "Completed"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <CalendarMonth fontSize="small" className="mr-2" />
                      <span>Due {goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Recent Feedback */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Feedback</h2>
              <div className="space-y-4">
                {feedback.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start">
                      <img
                        src={item.avatar || "/placeholder.svg"}
                        alt={item.from}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800">{item.from}</h3>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{item.message}</p>
                        <div className="mt-2 flex text-yellow-400">
                          {[...Array(5)].map((_, i) =>
                            i < item.rating ? <Star key={i} fontSize="small" /> : <StarBorder key={i} fontSize="small" />,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </ApprisalMainlayout>
    )
  }
  
  const performanceMetrics = [
    { name: "Leadership", value: 4.5, color: "bg-blue-500" },
    { name: "Communication", value: 4.2, color: "bg-green-500" },
    { name: "Technical Skills", value: 3.8, color: "bg-yellow-500" },
    { name: "Problem Solving", value: 4.7, color: "bg-purple-500" },
    { name: "Teamwork", value: 4.0, color: "bg-pink-500" },
  ]
  
  const goals = [
    {
      title: "Improve Customer Satisfaction",
      description: "Increase NPS score by 10 points through product improvements",
      status: "In Progress",
      progress: 65,
      dueDate: "Aug 30, 2023",
    },
    {
      title: "Launch New Product Feature",
      description: "Complete development and release of the analytics dashboard",
      status: "Completed",
      progress: 100,
      dueDate: "May 15, 2023",
    },
    {
      title: "Team Training Program",
      description: "Develop and implement training program for new team members",
      status: "Not Started",
      progress: 0,
      dueDate: "Sep 15, 2023",
    },
  ]
  
  const feedback = [
    {
      from: "Jane Smith",
      position: "Team Lead",
      avatar: "/placeholder.svg?height=40&width=40",
      message:
        "John consistently delivers high-quality work and demonstrates excellent leadership skills when managing the product team.",
      rating: 5,
      date: "May 10, 2023",
    },
    {
      from: "Robert Johnson",
      position: "CTO",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Great strategic thinking and problem-solving skills. Could improve on technical documentation.",
      rating: 4,
      date: "Jan 15, 2023",
    },
    {
      from: "Lisa Chen",
      position: "UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "John is very collaborative and receptive to design feedback. Always keeps the user experience in mind.",
      rating: 4,
      date: "Dec 5, 2022",
    },
  ]
  
  