"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Dashboard,
  Assessment,
  Person,
  Group,
  Settings,
  Menu,
  Close,
  BarChart,
  CalendarMonth,
  Logout,
} from "@mui/icons-material"

const menuItems = [
  { name: "Dashboard", icon: Dashboard, path: "/ApprisalsPage" },
  { name: "Appraisals", icon: Assessment, path: "/appraisals" },
  { name: "My Profile", icon: Person, path: "/profile" },
  { name: "Team", icon: Group, path: "/team" },
  { name: "Reports", icon: BarChart, path: "/reports" },
  { name: "Calendar", icon: CalendarMonth, path: "/calendar" },
  { name: "Settings", icon: Settings, path: "/settings" },
]

export default function ApprisalSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside>
      {/* Mobile menu button */}
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md">
        {isOpen ? <Close /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-blue-600">Appraisal System</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      pathname === item.path ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className={`mr-3 ${pathname === item.path ? "text-blue-600" : "text-gray-500"}`} />
                    <span>{item.name}</span>
                    {item.name === "Appraisals" && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <img src="/placeholder.svg?height=40&width=40" alt="User" className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Product Manager</p>
              </div>
              <button className="ml-auto text-gray-500 hover:text-gray-700">
                <Logout fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </aside>
  )
}

