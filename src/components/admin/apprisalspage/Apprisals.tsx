import {
  Dashboard,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Person,
  CalendarMonth,
  Notifications,
  Assessment,
  Group,
} from "@mui/icons-material"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, John Doe</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
            <Notifications />
          </button>
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
            <CalendarMonth />
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Appraisals"
          value="3"
          change="+2"
          trend="up"
          icon={<Dashboard className="text-blue-500" />}
        />
        <StatCard
          title="Completed Reviews"
          value="12"
          change="+5"
          trend="up"
          icon={<Person className="text-green-500" />}
        />
        <StatCard
          title="Team Performance"
          value="87%"
          change="+2.5%"
          trend="up"
          icon={<TrendingUp className="text-purple-500" />}
        />
        <StatCard
          title="Improvement Areas"
          value="4"
          change="-1"
          trend="down"
          icon={<TrendingDown className="text-orange-500" />}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVert />
          </button>
        </div>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {change}{" "}
          {trend === "up" ? (
            <TrendingUp fontSize="small" className="inline" />
          ) : (
            <TrendingDown fontSize="small" className="inline" />
          )}
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  )
}

interface Activity {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.iconBg}`}>
        {activity.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{activity.title}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
      </div>
      <span className="text-xs text-gray-500">{activity.time}</span>
    </div>
  )
}

const activities = [
  {
    title: "Performance Review Submitted",
    description: "You submitted a review for Sarah Johnson",
    time: "2h ago",
    icon: <Assessment className="text-white" />,
    iconBg: "bg-blue-500",
  },
  {
    title: "New Appraisal Assigned",
    description: "You have a new appraisal to complete for Mike Smith",
    time: "Yesterday",
    icon: <Person className="text-white" />,
    iconBg: "bg-purple-500",
  },
  {
    title: "Team Meeting Scheduled",
    description: "Quarterly performance review meeting scheduled",
    time: "2 days ago",
    icon: <Group className="text-white" />,
    iconBg: "bg-green-500",
  },
  {
    title: "Goal Completed",
    description: "You completed the 'Improve Customer Satisfaction' goal",
    time: "1 week ago",
    icon: <TrendingUp className="text-white" />,
    iconBg: "bg-orange-500",
  },
]

