"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Shield,
  Lightbulb,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  BarChart3,
  Camera,
} from "lucide-react"

export default function SafetyScorePage() {
  const [currentScore, setCurrentScore] = useState(85)
  const [selectedTimeframe, setSelectedTimeframe] = useState("current")

  const safetyMetrics = {
    lighting: { score: 92, trend: "up", description: "Excellent street lighting coverage" },
    crowdDensity: { score: 78, trend: "stable", description: "Moderate to high foot traffic" },
    incidents: { score: 85, trend: "up", description: "Low recent incident reports" },
    policePresence: { score: 88, trend: "up", description: "Regular patrol coverage" },
    cctv: { score: 75, trend: "stable", description: "Good surveillance coverage" }
  }

  const areaBreakdown = [
    { area: "Downtown Plaza", score: 92, status: "Very Safe", color: "green" },
    { area: "Main Street", score: 88, status: "Safe", color: "green" },
    { area: "Park Avenue", score: 85, status: "Safe", color: "green" },
    { area: "Oak Street", score: 72, status: "Moderate", color: "yellow" },
    { area: "Side Streets", score: 65, status: "Caution", color: "orange" },
    { area: "Industrial Area", score: 45, status: "Avoid", color: "red" }
  ]

  const historicalData = [
    { time: "6 AM", score: 78 },
    { time: "9 AM", score: 85 },
    { time: "12 PM", score: 88 },
    { time: "3 PM", score: 90 },
    { time: "6 PM", score: 85 },
    { time: "9 PM", score: 75 },
    { time: "12 AM", score: 65 }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <div className="h-4 w-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    if (score >= 50) return "text-orange-600 bg-orange-100"
    return "text-red-600 bg-red-100"
  }

  const getAreaColor = (color: string) => {
    switch (color) {
      case 'green': return 'border-green-200 bg-green-50'
      case 'yellow': return 'border-yellow-200 bg-yellow-50'
      case 'orange': return 'border-orange-200 bg-orange-50'
      case 'red': return 'border-red-200 bg-red-50'
      default: return 'border-gray-200 bg-gray-50'
    }
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
              <Shield className="h-6 w-6 text-indigo-400" />
              <h1 className="text-xl font-bold text-slate-700">Safety Score Analysis</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Current Safety Score */}
        <Card className="border-indigo-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Shield className="h-6 w-6 text-indigo-400" />
              Current Area Safety Score
            </CardTitle>
            <CardDescription>
              Real-time safety assessment for your current location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-indigo-600 mb-2">{currentScore}</div>
                <div className="text-lg text-slate-600 mb-4">Overall Safety Score</div>
                <Badge className="bg-green-100 text-green-700 text-lg px-4 py-1">Very Safe</Badge>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-700">Safety Level</span>
                      <span className="text-slate-600">{currentScore}%</span>
                    </div>
                    <Progress value={currentScore} className="h-4" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-600">Downtown Plaza Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-600">Updated 2 min ago</span>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    This area has excellent lighting, high foot traffic, and low incident reports. 
                    It's considered very safe for walking, especially during current hours.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Safety Metrics Breakdown */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Safety Metrics Breakdown
              </CardTitle>
              <CardDescription>
                Detailed analysis of safety factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-slate-700">Street Lighting</div>
                      <div className="text-sm text-slate-600">{safetyMetrics.lighting.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(safetyMetrics.lighting.trend)}
                    <span className="font-bold text-yellow-600">{safetyMetrics.lighting.score}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium text-slate-700">Crowd Density</div>
                      <div className="text-sm text-slate-600">{safetyMetrics.crowdDensity.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(safetyMetrics.crowdDensity.trend)}
                    <span className="font-bold text-blue-600">{safetyMetrics.crowdDensity.score}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium text-slate-700">Incident Reports</div>
                      <div className="text-sm text-slate-600">{safetyMetrics.incidents.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(safetyMetrics.incidents.trend)}
                    <span className="font-bold text-green-600">{safetyMetrics.incidents.score}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium text-slate-700">Police Presence</div>
                      <div className="text-sm text-slate-600">{safetyMetrics.policePresence.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(safetyMetrics.policePresence.trend)}
                    <span className="font-bold text-purple-600">{safetyMetrics.policePresence.score}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-slate-700">CCTV Coverage</div>
                      <div className="text-sm text-slate-600">{safetyMetrics.cctv.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(safetyMetrics.cctv.trend)}
                    <span className="font-bold text-gray-600">{safetyMetrics.cctv.score}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time-based Analysis */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Clock className="h-5 w-5 text-purple-400" />
                Safety Score by Time
              </CardTitle>
              <CardDescription>
                Safety score trends throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicalData.map((data) => (
                  <div
                    key={data.time}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    style={{ borderColor: getScoreColor(data.score).split(' ')[1].replace('bg-', '') }}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-medium text-slate-700">{data.time}</div>
                        <div className="text-sm text-slate-600">
                          Safety score at {data.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(data.score)} px-2 py-1 rounded`}>
                        {data.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Area Breakdown */}
        <Card className="border-pink-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <MapPin className="h-5 w-5 text-pink-400" />
              Area Breakdown
            </CardTitle>
            <CardDescription>
              Safety scores for different areas in the vicinity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {areaBreakdown.map((area) => (
                <div
                  key={area.area}
                  className={`p-4 rounded-lg border ${getAreaColor(area.color)}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-700">{area.area}</div>
                      <div className="text-sm text-slate-600">{area.status}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(area.score)} px-2 py-1 rounded`}>
                        {area.score}%
                      </span>
                    </div>
                  </div>
                  <Progress value={area.score} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}