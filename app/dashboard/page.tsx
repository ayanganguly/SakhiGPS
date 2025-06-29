"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  MapPin,
  Users,
  Bell,
  Mic,
  Wifi,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import Image from 'next/image';


export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [safetyScore, setSafetyScore] = useState(85)
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const mockAlerts = [
    { id: 1, type: "warning", message: "Construction work reported on Main St", time: "5 min ago" },
    { id: 2, type: "info", message: "Well-lit route available via Park Ave", time: "12 min ago" },
    { id: 3, type: "success", message: "Sarah checked in safely", time: "25 min ago" },
  ]

  const trustedContacts = [
    { name: "Mom", status: "online", lastSeen: "now" },
    { name: "Sarah", status: "online", lastSeen: "2 min ago" },
    { name: "Emergency", status: "available", lastSeen: "24/7" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
  <Image src="/logo.jpg" alt="SakhiGPS Logo" width={70} height={70} />
  <h1 className="text-2xl font-bold text-slate-700">SakhiGPS</h1>
</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-600">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-600">
                <User className="h-5 w-5" />
              </Button>
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Greeting Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-700 mb-2">{getGreeting()}, Emma! 👋</h2>
          <p className="text-slate-600">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            •{" "}
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            className={`h-16 ${isVoiceMode ? "bg-green-400 hover:bg-green-500" : "bg-blue-400 hover:bg-blue-500"} text-white flex-col gap-1`}
            onClick={() => setIsVoiceMode(!isVoiceMode)}
          >
            <Mic className="h-5 w-5" />
            <span className="text-xs">{isVoiceMode ? "Voice On" : "Voice Mode"}</span>
          </Button>
          <Button
            className={`h-16 ${isOfflineMode ? "bg-orange-400 hover:bg-orange-500" : "bg-purple-400 hover:bg-purple-500"} text-white flex-col gap-1`}
            onClick={() => setIsOfflineMode(!isOfflineMode)}
          >
            <Wifi className="h-5 w-5" />
            <span className="text-xs">{isOfflineMode ? "Offline" : "Go Offline"}</span>
          </Button>
          <Link href="/features/safe-routes">
            <Button className="h-16 w-full bg-pink-400 hover:bg-pink-500 text-white flex-col gap-1">
              <Navigation className="h-5 w-5" />
              <span className="text-xs">Navigate</span>
            </Button>
          </Link>
          <Button className="h-16 bg-red-400 hover:bg-red-500 text-white flex-col gap-1">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs">SOS</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Map Section */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  Live Map & Safe Routes
                </CardTitle>
                <CardDescription>Current location and recommended safe routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="text-center z-10">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                    <p className="text-sm text-slate-600 mb-4">You are here</p>
                    <Link href="/features/safe-routes">
                      <Button className="bg-blue-400 hover:bg-blue-500 text-white">Generate Safe Route</Button>
                    </Link>
                  </div>
                  {/* Mock route lines */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-green-400 rounded transform rotate-45 opacity-60"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-1 bg-yellow-400 rounded transform -rotate-12 opacity-60"></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Well-lit route available
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    High foot traffic
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Safety Score */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Shield className="h-5 w-5 text-green-400" />
                  Current Area Safety Score
                </CardTitle>
                <CardDescription>Based on lighting, crowd density, and incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{safetyScore}/100</span>
                    <Badge className="bg-green-100 text-green-700">Very Safe</Badge>
                  </div>
                  <Progress value={safetyScore} className="h-3" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">92%</div>
                      <div className="text-slate-500">Lighting</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">78%</div>
                      <div className="text-slate-500">Crowd Density</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">85%</div>
                      <div className="text-slate-500">Low Incidents</div>
                    </div>
                  </div>
                  <Link href="/features/safety-score">
                    <Button variant="outline" className="w-full border-green-200 text-green-600 bg-transparent">
                      View Detailed Analysis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Trusted Circle */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Users className="h-5 w-5 text-purple-400" />
                  Trusted Circle
                </CardTitle>
                <CardDescription>Your emergency contacts and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trustedContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            contact.status === "online" ? "bg-green-400" : "bg-blue-400"
                          }`}
                        ></div>
                        <span className="font-medium text-slate-700">{contact.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">{contact.lastSeen}</span>
                    </div>
                  ))}
                </div>
                <Link href="/features/trusted-circle">
                  <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-600 bg-transparent">
                    Manage Circle
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Smart Alerts */}
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Bell className="h-5 w-5 text-pink-400" />
                  Smart Alerts
                </CardTitle>
                <CardDescription>Recent safety notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAlerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3 p-2 rounded-lg bg-pink-50">
                      <div className="mt-1">
                        {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                        {alert.type === "info" && <Bell className="h-4 w-4 text-blue-500" />}
                        {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">{alert.message}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/features/smart-alerts">
                  <Button variant="outline" className="w-full mt-4 border-pink-200 text-pink-600 bg-transparent">
                    View All Alerts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/features/voice-navigation">
                <Card className="border-green-100 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Mic className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-700">Voice Nav</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/features/offline-mode">
                <Card className="border-orange-100 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Wifi className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-700">Offline Mode</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
