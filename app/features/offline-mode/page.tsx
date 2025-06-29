"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Wifi,
  WifiOff,
  Download,
  MapPin,
  Phone,
  MessageSquare,
  AlertTriangle,
  Shield,
  HardDrive,
  Navigation,
} from "lucide-react"

export default function OfflineModePage() {
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [storageUsed] = useState(45)

  const offlineRoutes = [
    {
      id: 1,
      name: "Home to Work",
      distance: "2.3 km",
      estimatedTime: "15 min",
      safetyScore: 88,
      lastUpdated: "2 hours ago",
      isDownloaded: true,
    },
    {
      id: 2,
      name: "Home to Gym",
      distance: "1.8 km",
      estimatedTime: "12 min",
      safetyScore: 92,
      lastUpdated: "1 day ago",
      isDownloaded: true,
    },
    {
      id: 3,
      name: "Work to Shopping Center",
      distance: "3.1 km",
      estimatedTime: "20 min",
      safetyScore: 85,
      lastUpdated: "3 hours ago",
      isDownloaded: false,
    },
  ]

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", type: "emergency" },
    { name: "Mom", number: "+1 (555) 123-4567", type: "family" },
    { name: "Sarah", number: "+1 (555) 987-6543", type: "friend" },
    { name: "Local Police", number: "+1 (555) 555-0199", type: "police" },
  ]

  const handleDownloadRoute = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          // Update route as downloaded
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleToggleOfflineMode = () => {
    setIsOfflineMode(!isOfflineMode)
  }

  const sendSMSAlert = (contact: { name: string; number: string; type: string }) => {
    // Simulate SMS sending
    alert(`SMS alert sent to ${contact.name} (${contact.number})`)
  }

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
              {isOfflineMode ? (
                <WifiOff className="h-6 w-6 text-orange-400" />
              ) : (
                <Wifi className="h-6 w-6 text-orange-400" />
              )}
              <h1 className="text-xl font-bold text-slate-700">Offline Mode</h1>
              {isOfflineMode && <Badge className="bg-orange-100 text-orange-700">Offline Active</Badge>}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Offline Control Panel */}
          <div className="lg:col-span-1">
            <Card className="border-orange-100 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <WifiOff className="h-5 w-5 text-orange-400" />
                  Offline Control
                </CardTitle>
                <CardDescription>Manage offline safety features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Offline Mode Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Offline Mode</span>
                  <Switch checked={isOfflineMode} onCheckedChange={handleToggleOfflineMode} />
                </div>

                {/* Connection Status */}
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    {isOfflineMode ? (
                      <WifiOff className="h-4 w-4 text-orange-500" />
                    ) : (
                      <Wifi className="h-4 w-4 text-green-500" />
                    )}
                    <span className="font-medium text-slate-700">
                      {isOfflineMode ? "Offline Mode Active" : "Online"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {isOfflineMode
                      ? "Using cached data and SMS for emergencies"
                      : "Full features available with internet connection"}
                  </p>
                </div>

                {/* Storage Usage */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Storage Used</span>
                    <span className="text-sm text-slate-600">{storageUsed}%</span>
                  </div>
                  <Progress value={storageUsed} className="h-2" />
                  <p className="text-xs text-slate-500 mt-1">{storageUsed}MB of 100MB used for offline data</p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Update Offline Data
                  </Button>
                  <Button variant="outline" className="w-full border-orange-200 text-orange-600 bg-transparent">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Manage Storage
                  </Button>
                </div>

                {/* Emergency Features */}
                <div className="pt-4 border-t border-orange-100">
                  <h4 className="font-medium text-slate-700 mb-3">Emergency Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MessageSquare className="h-4 w-4" />
                      SMS-based SOS alerts
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4" />
                      Cached safe routes
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="h-4 w-4" />
                      Emergency contacts
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Offline Routes */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  Offline Routes
                </CardTitle>
                <CardDescription>Pre-downloaded safe routes available without internet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offlineRoutes.map((route) => (
                    <div key={route.id} className="p-4 border border-blue-100 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-700">{route.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <span>{route.distance}</span>
                            <span>{route.estimatedTime}</span>
                            <Badge className="bg-green-100 text-green-700">{route.safetyScore}% Safe</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {route.isDownloaded ? (
                            <Badge className="bg-blue-100 text-blue-700">Downloaded</Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleDownloadRoute(route.id)}
                              disabled={isDownloading}
                              className="bg-blue-400 hover:bg-blue-500 text-white"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>

                      {isDownloading && route.id === 3 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Downloading...</span>
                            <span>{downloadProgress}%</span>
                          </div>
                          <Progress value={downloadProgress} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Last updated: {route.lastUpdated}</span>
                        {route.isDownloaded && (
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 bg-transparent">
                            <Navigation className="h-3 w-3 mr-1" />
                            Use Route
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SMS Emergency Contacts */}
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <MessageSquare className="h-5 w-5 text-red-400" />
                  SMS Emergency Contacts
                </CardTitle>
                <CardDescription>Send emergency alerts via SMS when offline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-4 border border-red-100 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-700">{contact.name}</h3>
                        <Badge
                          variant="secondary"
                          className={
                            contact.type === "emergency"
                              ? "bg-red-100 text-red-700"
                              : contact.type === "police"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }
                        >
                          {contact.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{contact.number}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => sendSMSAlert(contact)}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Send SOS SMS
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 bg-transparent">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offline Safety Features */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Shield className="h-5 w-5 text-green-400" />
                  Offline Safety Features
                </CardTitle>
                <CardDescription>Safety tools that work without internet connection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-700">Available Offline:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Pre-downloaded safe routes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">SMS emergency alerts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Emergency contact calling</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Basic navigation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Cached safety scores</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-700">Requires Internet:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Real-time safety alerts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Live location sharing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Dynamic route updates</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Voice navigation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-slate-600">Trusted circle status</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency SOS Panel */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Emergency SOS (Offline)
                </CardTitle>
                <CardDescription>Immediate emergency actions available without internet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-16 bg-red-500 hover:bg-red-600 text-white flex-col gap-1">
                    <AlertTriangle className="h-6 w-6" />
                    <span>Send SMS SOS to All</span>
                  </Button>
                  <Button className="h-16 bg-orange-500 hover:bg-orange-600 text-white flex-col gap-1">
                    <Phone className="h-6 w-6" />
                    <span>Call Emergency Services</span>
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border border-red-200">
                  <p className="text-sm text-red-800">
                    <strong>Note:</strong> Emergency SMS will include your last known location and will be sent to all
                    emergency contacts automatically.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
