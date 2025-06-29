"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, MapPin, Navigation, Clock, Lightbulb, Users, AlertTriangle, Route, Star } from "lucide-react"

export default function SafeRoutesPage() {
  const [destination, setDestination] = useState("")
  const [safetyPriority, setSafetyPriority] = useState([80])
  const [showRoutes, setShowRoutes] = useState(false)

  const mockRoutes = [
    {
      id: 1,
      name: "Safest Route",
      duration: "18 min",
      distance: "1.2 km",
      safetyScore: 92,
      lighting: 95,
      crowdDensity: 88,
      incidents: 2,
      description: "Well-lit main streets with high foot traffic",
      waypoints: ["Main St", "Central Plaza", "Park Ave"],
    },
    {
      id: 2,
      name: "Balanced Route",
      duration: "15 min",
      distance: "1.0 km",
      safetyScore: 85,
      lighting: 82,
      crowdDensity: 90,
      incidents: 4,
      description: "Good balance of safety and efficiency",
      waypoints: ["Oak St", "Market Square", "Pine Ave"],
    },
    {
      id: 3,
      name: "Fastest Route",
      duration: "12 min",
      distance: "0.8 km",
      safetyScore: 72,
      lighting: 68,
      crowdDensity: 75,
      incidents: 8,
      description: "Direct route with moderate safety",
      waypoints: ["Side St", "Alley Way", "Back St"],
    },
  ]

  const handleGenerateRoutes = () => {
    setShowRoutes(true)
  }

  const getSafetyColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
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
              <Route className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-bold text-slate-700">Safe Route Generator</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Route Planning Panel */}
          <div className="lg:col-span-1">
            <Card className="border-blue-100 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  Plan Your Route
                </CardTitle>
                <CardDescription>Enter destination and safety preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Current Location</label>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-slate-600">Downtown Plaza</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Destination</label>
                  <Input
                    placeholder="Enter destination address"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Safety Priority: {safetyPriority[0]}%
                  </label>
                  <Slider
                    value={safetyPriority}
                    onValueChange={setSafetyPriority}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Speed</span>
                    <span>Safety</span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateRoutes}
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                  disabled={!destination}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Generate Safe Routes
                </Button>

                {/* Current Conditions */}
                <div className="pt-4 border-t border-blue-100">
                  <h4 className="font-medium text-slate-700 mb-3">Current Conditions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Lightbulb className="h-4 w-4" />
                        Street Lighting
                      </span>
                      <Badge className="bg-green-100 text-green-700">Excellent</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Users className="h-4 w-4" />
                        Foot Traffic
                      </span>
                      <Badge className="bg-blue-100 text-blue-700">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-slate-600">
                        <AlertTriangle className="h-4 w-4" />
                        Recent Incidents
                      </span>
                      <Badge className="bg-green-100 text-green-700">Low</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Routes Display */}
          <div className="lg:col-span-2">
            {!showRoutes ? (
              <Card className="border-blue-100 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Route className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700 mb-2">Ready to Generate Routes</h3>
                  <p className="text-slate-500">Enter your destination to see safe route options</p>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-700">Route Options to &quot;{destination}&quot;</h2>
                  <Badge className="bg-blue-100 text-blue-700">{mockRoutes.length} routes found</Badge>
                </div>

                {mockRoutes.map((route, index) => (
                  <Card key={route.id} className={`border-blue-100 ${index === 0 ? "ring-2 ring-green-200" : ""}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-slate-700">
                          {index === 0 && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                          {route.name}
                        </CardTitle>
                        <Badge className={getSafetyColor(route.safetyScore)}>{route.safetyScore}% Safe</Badge>
                      </div>
                      <CardDescription>{route.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Duration</span>
                          </div>
                          <div className="font-semibold text-slate-700">{route.duration}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">Distance</span>
                          </div>
                          <div className="font-semibold text-slate-700">{route.distance}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">Incidents</span>
                          </div>
                          <div className="font-semibold text-slate-700">{route.incidents}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-slate-600 mb-1">Lighting</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${route.lighting}%` }}
                              ></div>
                            </div>
                            <span className="text-slate-700 font-medium">{route.lighting}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">Crowd Density</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-400 h-2 rounded-full"
                                style={{ width: `${route.crowdDensity}%` }}
                              ></div>
                            </div>
                            <span className="text-slate-700 font-medium">{route.crowdDensity}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">Safety Score</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-400 h-2 rounded-full"
                                style={{ width: `${route.safetyScore}%` }}
                              ></div>
                            </div>
                            <span className="text-slate-700 font-medium">{route.safetyScore}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-slate-600 mb-2">Route Waypoints:</div>
                        <div className="flex flex-wrap gap-2">
                          {route.waypoints.map((waypoint, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700">
                              {waypoint}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/navigation?route=${route.id}&destination=${encodeURIComponent(destination)}`}>
                          <Button className="flex-1 bg-blue-400 hover:bg-blue-500 text-white">
                            <Navigation className="h-4 w-4 mr-2" />
                            Start Navigation
                          </Button>
                        </Link>
                        <Button variant="outline" className="border-blue-200 text-blue-600 bg-transparent">
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
