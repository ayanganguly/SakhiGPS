"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  MapPin,
  Settings,
  Volume2,
  VolumeX,
  Smartphone,
} from "lucide-react"

export default function SmartAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      title: "Construction Work Ahead",
      message: "Road construction reported on Main Street. Consider alternative route via Park Avenue.",
      location: "Main St & 5th Ave",
      time: "5 minutes ago",
      severity: "medium",
      isRead: false,
      category: "traffic",
    },
    {
      id: 2,
      type: "info",
      title: "Well-Lit Route Available",
      message: "A safer, well-lit route is available through Central Plaza with high foot traffic.",
      location: "Central Plaza",
      time: "12 minutes ago",
      severity: "low",
      isRead: false,
      category: "route",
    },
    {
      id: 3,
      type: "success",
      title: "Sarah Checked In Safely",
      message: "Your trusted contact Sarah has arrived safely at her destination.",
      location: "Downtown Office",
      time: "25 minutes ago",
      severity: "low",
      isRead: true,
      category: "contact",
    },
    {
      id: 4,
      type: "warning",
      title: "Incident Reported Nearby",
      message: "A minor incident was reported 2 blocks away. Police are on scene. Area is secure.",
      location: "Oak St & 3rd Ave",
      time: "1 hour ago",
      severity: "high",
      isRead: true,
      category: "safety",
    },
    {
      id: 5,
      type: "info",
      title: "Weather Alert",
      message: "Light rain expected in 30 minutes. Consider covered routes or bring an umbrella.",
      location: "Your Area",
      time: "2 hours ago",
      severity: "low",
      isRead: true,
      category: "weather",
    },
  ])

  const [filter, setFilter] = useState("all")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, isRead: true })))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getAlertColor = (type: string, severity: string) => {
    if (severity === "high") return "border-red-200 bg-red-50"
    if (type === "warning") return "border-orange-200 bg-orange-50"
    if (type === "success") return "border-green-200 bg-green-50"
    return "border-blue-200 bg-blue-50"
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-700">High Priority</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-700">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-700">Low</Badge>
      default:
        return null
    }
  }

  const filteredAlerts =
    filter === "all"
      ? alerts
      : filter === "unread"
        ? alerts.filter((alert) => !alert.isRead)
        : alerts.filter((alert) => alert.category === filter)

  const unreadCount = alerts.filter((alert) => !alert.isRead).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-slate-600">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-pink-400" />
              <h1 className="text-xl font-bold text-slate-700">Smart Alerts</h1>
              {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Settings Card */}
        <Card className="border-pink-100 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Settings className="h-5 w-5 text-pink-400" />
              Alert Settings
            </CardTitle>
            <CardDescription>Customize how you receive safety notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-slate-600" />
                  <span className="text-slate-700">Push Notifications</span>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {soundEnabled ? (
                    <Volume2 className="h-5 w-5 text-slate-600" />
                  ) : (
                    <VolumeX className="h-5 w-5 text-slate-600" />
                  )}
                  <span className="text-slate-700">Sound Alerts</span>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-pink-400 hover:bg-pink-500" : "border-pink-200 text-pink-600"}
            >
              All Alerts
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "bg-pink-400 hover:bg-pink-500" : "border-pink-200 text-pink-600"}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filter === "safety" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("safety")}
              className={filter === "safety" ? "bg-pink-400 hover:bg-pink-500" : "border-pink-200 text-pink-600"}
            >
              Safety
            </Button>
            <Button
              variant={filter === "traffic" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("traffic")}
              className={filter === "traffic" ? "bg-pink-400 hover:bg-pink-500" : "border-pink-200 text-pink-600"}
            >
              Traffic
            </Button>
            <Button
              variant={filter === "contact" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("contact")}
              className={filter === "contact" ? "bg-pink-400 hover:bg-pink-500" : "border-pink-200 text-pink-600"}
            >
              Contacts
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="border-pink-200 text-pink-600 bg-transparent"
            >
              Mark All Read
            </Button>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card className="border-pink-100">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-pink-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No Alerts Found</h3>
                <p className="text-slate-500">
                  {filter === "all" ? "You're all caught up! No alerts at the moment." : `No ${filter} alerts found.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`${getAlertColor(alert.type, alert.severity)} ${!alert.isRead ? "ring-2 ring-pink-200" : ""} transition-all hover:shadow-md`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-700 mb-1">{alert.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            {getSeverityBadge(alert.severity)}
                            {!alert.isRead && <Badge className="bg-pink-500 text-white text-xs">New</Badge>}
                          </div>
                        </div>
                        {!alert.isRead && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(alert.id)}
                            className="text-pink-600 hover:bg-pink-100"
                          >
                            Mark Read
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-600 mb-3">{alert.message}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </div>

                  {alert.type === "warning" && alert.category === "traffic" && (
                    <div className="mt-4 pt-4 border-t border-orange-200">
                      <Link href="/features/safe-routes">
                        <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white">
                          Find Alternative Route
                        </Button>
                      </Link>
                    </div>
                  )}

                  {alert.type === "info" && alert.category === "route" && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <Link href="/features/safe-routes">
                        <Button size="sm" className="bg-blue-400 hover:bg-blue-500 text-white">
                          Use This Route
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Emergency Alert Section */}
        <Card className="border-red-200 bg-red-50 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Emergency Alert System
            </CardTitle>
            <CardDescription>Instant notifications for critical safety situations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-red-200">
                <h4 className="font-medium text-slate-700 mb-2">Automatic Rerouting</h4>
                <p className="text-sm text-slate-600">
                  When high-priority alerts are detected, we&apos;ll automatically suggest safer alternative routes.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-red-200">
                <h4 className="font-medium text-slate-700 mb-2">Trusted Circle Notifications</h4>
                <p className="text-sm text-slate-600">
                  Critical alerts are automatically shared with your emergency contacts for added safety.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
