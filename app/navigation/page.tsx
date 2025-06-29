"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Navigation,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Volume2,
  Pause,
  RotateCcw,
  Phone,
  MessageSquare,
  Shield,
  Lightbulb,
  Users,
  Camera,
  Mic,
} from "lucide-react"

export default function NavigationPage() {
  const searchParams = useSearchParams()
  const routeId = searchParams.get("route")
  const destination = searchParams.get("destination") || "Unknown Destination"

  const [isNavigating, setIsNavigating] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(15)
  const [timeRemaining, setTimeRemaining] = useState(18)
  const [distanceRemaining, setDistanceRemaining] = useState(1.2)

  const navigationSteps = [
    {
      instruction: "Head north on Main Street for 200 meters",
      distance: "200m",
      safetyNote: "Well-lit area with good visibility",
      type: "straight",
    },
    {
      instruction: "Turn right onto Park Avenue",
      distance: "Turn right",
      safetyNote: "High foot traffic area - very safe",
      type: "turn-right",
    },
    {
      instruction: "Continue straight for 300 meters past the shopping center",
      distance: "300m",
      safetyNote: "CCTV coverage available",
      type: "straight",
    },
    {
      instruction: "Turn left onto Oak Street",
      distance: "Turn left",
      safetyNote: "Police patrol route - secure area",
      type: "turn-left",
    },
    {
      instruction: "Your destination will be on the right in 100 meters",
      distance: "100m",
      safetyNote: "Destination area is well-monitored",
      type: "destination",
    },
  ]

  const liveAlerts = [
    {
      id: 1,
      type: "info",
      message: "Good lighting ahead on Park Avenue",
      time: "Just now",
      priority: "low",
    },
    {
      id: 2,
      type: "success",
      message: "High foot traffic detected - safe area",
      time: "1 min ago",
      priority: "low",
    },
  ]

  const safetyMetrics = {
    currentArea: 88,
    lighting: 92,
    crowdDensity: 85,
    cctv: 78,
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isNavigating) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % navigationSteps.length
          // Update progress and time based on step
          setProgress((nextStep + 1) * 20)
          setTimeRemaining(Math.max(1, 18 - nextStep * 4))
          setDistanceRemaining(Math.max(0.1, 1.2 - nextStep * 0.3))
          return nextStep
        })
      }, 8000) // Change step every 8 seconds for demo
    }
    return () => clearInterval(interval)
  }, [isNavigating])

  const handlePauseNavigation = () => {
    setIsNavigating(false)
  }

  const handleResumeNavigation = () => {
    setIsNavigating(true)
  }

  const handleStopNavigation = () => {
    setIsNavigating(false)
    // Could redirect back to routes or dashboard
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "info":
        return <Lightbulb className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/features/safe-routes">
              <Button variant="ghost" size="icon" className="text-slate-600">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Navigation className="h-6 w-6 text-blue-400" />
              <div>
                <h1 className="text-lg font-bold text-slate-700">Navigating to {destination}</h1>
                <p className="text-sm text-slate-500">Route {routeId} - Safest Path</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700">{isNavigating ? "Active" : "Paused"}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Navigation Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Instruction */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  Current Instruction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-400 rounded-full">
                        <Navigation className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">
                          {navigationSteps[currentStep].instruction}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {navigationSteps[currentStep].distance}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-700">{navigationSteps[currentStep].safetyNote}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Progress to destination</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  {/* Trip Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{distanceRemaining.toFixed(1)} km</div>
                      <div className="text-sm text-slate-600">Remaining</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{timeRemaining} min</div>
                      <div className="text-sm text-slate-600">ETA</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{safetyMetrics.currentArea}%</div>
                      <div className="text-sm text-slate-600">Safety Score</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Volume2 className="h-5 w-5 text-green-400" />
                  Navigation Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {isNavigating ? (
                    <Button onClick={handlePauseNavigation} className="bg-orange-400 hover:bg-orange-500 text-white">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button onClick={handleResumeNavigation} className="bg-green-400 hover:bg-green-500 text-white">
                      <Navigation className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  <Button
                    onClick={handleStopNavigation}
                    variant="outline"
                    className="border-red-200 text-red-600 bg-transparent"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-600 bg-transparent">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Voice
                  </Button>
                  <Link href="/features/safe-routes">
                    <Button variant="outline" className="w-full border-purple-200 text-purple-600 bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Reroute
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Steps */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  Upcoming Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {navigationSteps.slice(currentStep + 1, currentStep + 4).map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-xs font-medium text-purple-700">
                        {index + 2}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{step.instruction}</p>
                        <p className="text-xs text-slate-500 mt-1">{step.safetyNote}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Live Safety Metrics */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Shield className="h-5 w-5 text-green-400" />
                  Live Safety Metrics
                </CardTitle>
                <CardDescription>Current area safety indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-slate-700">Lighting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${safetyMetrics.lighting}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{safetyMetrics.lighting}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-slate-700">Crowd Density</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${safetyMetrics.crowdDensity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{safetyMetrics.crowdDensity}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-slate-700">CCTV Coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${safetyMetrics.cctv}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{safetyMetrics.cctv}%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-green-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{safetyMetrics.currentArea}%</div>
                      <div className="text-sm text-slate-600">Overall Safety Score</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Alerts */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  Live Alerts
                </CardTitle>
                <CardDescription>Real-time safety notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveAlerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="mt-1">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{alert.message}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Actions */}
            <Card className="border-red-100 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Emergency Actions
                </CardTitle>
                <CardDescription>Quick emergency options during navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Send SOS Alert
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/features/trusted-circle">
                      <Button variant="outline" className="w-full border-red-200 text-red-600 bg-transparent">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Contact
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-red-200 text-red-600 bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Share Location
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation Options */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Navigation className="h-5 w-5 text-purple-400" />
                  Quick Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/features/safe-routes">
                    <Button variant="outline" className="w-full border-purple-200 text-purple-600 bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Alternative Route
                    </Button>
                  </Link>
                  <Link href="/features/voice-navigation">
                    <Button variant="outline" className="w-full border-green-200 text-green-600 bg-transparent">
                      <Mic className="h-4 w-4 mr-2" />
                      Enable Voice Mode
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 bg-transparent">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
