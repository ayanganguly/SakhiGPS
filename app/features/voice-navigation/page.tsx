"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Mic, MicOff, Volume2, Pause, Settings, User, Baby, Users, Navigation } from "lucide-react"

export default function VoiceNavigationPage() {
  const [isListening, setIsListening] = useState(false)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  const [selectedPersona, setSelectedPersona] = useState("adult")
  const [voiceSpeed, setVoiceSpeed] = useState([1])
  const [volume, setVolume] = useState([80])
  const [currentCommand, setCurrentCommand] = useState("")
  const [isNavigating, setIsNavigating] = useState(false)

  const personas = [
    {
      id: "adult",
      name: "Standard Mode",
      icon: User,
      description: "Normal voice navigation for adults",
      features: ["Standard voice commands", "Regular update frequency", "Technical terms allowed"],
    },
    {
      id: "elder",
      name: "Elder-Friendly Mode",
      icon: Users,
      description: "Simplified navigation for elderly users",
      features: ["Slower speech", "Simplified directions", "Larger text display", "Emergency shortcuts"],
    },
    {
      id: "child",
      name: "Child Mode",
      icon: Baby,
      description: "Safe navigation assistance for children",
      features: ["Simple language", "Frequent check-ins", "Parent notifications", "Safe zone alerts"],
    },
  ]

  const voiceCommands = [
    "Navigate to [destination]",
    "Find safest route",
    "Call emergency contact",
    "Share my location",
    "What's my safety score?",
    "Find well-lit route",
    "Cancel navigation",
    "Repeat last instruction",
  ]

  const mockNavigationSteps = [
    "Head north on Main Street for 200 meters",
    "Turn right onto Park Avenue - well-lit area ahead",
    "Continue straight for 300 meters past the shopping center",
    "Turn left onto Oak Street - high foot traffic area",
    "Your destination will be on the right in 100 meters",
  ]

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isNavigating) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % mockNavigationSteps.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isNavigating])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentCommand("Navigate to downtown library")
        setIsListening(false)
      }, 2000)
    }
  }

  const startNavigation = () => {
    setIsNavigating(true)
    setCurrentStep(0)
  }

  const stopNavigation = () => {
    setIsNavigating(false)
    setCurrentStep(0)
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
              <Mic className="h-6 w-6 text-green-400" />
              <h1 className="text-xl font-bold text-slate-700">Voice Navigation</h1>
              {isVoiceEnabled && <Badge className="bg-green-100 text-green-700">Active</Badge>}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Voice Control Panel */}
          <div className="lg:col-span-1">
            <Card className="border-green-100 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Mic className="h-5 w-5 text-green-400" />
                  Voice Control
                </CardTitle>
                <CardDescription>Hands-free navigation control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Voice Navigation</span>
                  <Switch checked={isVoiceEnabled} onCheckedChange={setIsVoiceEnabled} />
                </div>

                {/* Microphone Button */}
                <div className="text-center">
                  <Button
                    size="lg"
                    className={`w-24 h-24 rounded-full ${
                      isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-400 hover:bg-green-500"
                    } text-white`}
                    onClick={toggleListening}
                    disabled={!isVoiceEnabled}
                  >
                    {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                  </Button>
                  <p className="text-sm text-slate-600 mt-2">{isListening ? "Listening..." : "Tap to speak"}</p>
                </div>

                {/* Current Command */}
                {currentCommand && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium">Last Command:</p>
                    <p className="text-sm text-slate-600">&quot;{currentCommand}&quot;</p>
                  </div>
                )}

                {/* Voice Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Speech Speed: {voiceSpeed[0]}x
                    </label>
                    <Slider
                      value={voiceSpeed}
                      onValueChange={setVoiceSpeed}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Volume: {volume[0]}%</label>
                    <Slider value={volume} onValueChange={setVolume} max={100} step={10} className="w-full" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                    onClick={startNavigation}
                    disabled={isNavigating}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Start Navigation
                  </Button>
                  {isNavigating && (
                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-600 bg-transparent"
                      onClick={stopNavigation}
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Navigation
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Persona Selection */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Users className="h-5 w-5 text-purple-400" />
                  Navigation Persona
                </CardTitle>
                <CardDescription>Choose the navigation style that works best for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {personas.map((persona) => (
                    <div
                      key={persona.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPersona === persona.id
                          ? "border-purple-400 bg-purple-50"
                          : "border-purple-100 hover:border-purple-200"
                      }`}
                      onClick={() => setSelectedPersona(persona.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <persona.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-700 mb-1">{persona.name}</h3>
                          <p className="text-sm text-slate-600 mb-3">{persona.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {persona.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {selectedPersona === persona.id && (
                          <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Display */}
            {isNavigating && (
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <Navigation className="h-5 w-5 text-blue-400" />
                    Active Navigation
                  </CardTitle>
                  <CardDescription>Voice-guided route to downtown library</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Volume2 className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-slate-700">Current Instruction:</span>
                      </div>
                      <p className="text-slate-600 text-lg">{mockNavigationSteps[currentStep]}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">0.8 km</div>
                        <div className="text-sm text-slate-600">Remaining</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">12 min</div>
                        <div className="text-sm text-slate-600">ETA</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">92%</div>
                        <div className="text-sm text-slate-600">Safety Score</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700">Upcoming Steps:</div>
                      {mockNavigationSteps.slice(currentStep + 1, currentStep + 3).map((step, index) => (
                        <div key={index} className="text-sm text-slate-600 pl-4 border-l-2 border-gray-200">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Voice Commands Reference */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Settings className="h-5 w-5 text-green-400" />
                  Voice Commands
                </CardTitle>
                <CardDescription>Available voice commands for hands-free control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {voiceCommands.map((command, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <code className="text-sm text-green-700 font-medium">&quot;{command}&quot;</code>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Speak clearly and wait for the beep before giving commands. The system works
                    best in quiet environments.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Voice Features */}
            <Card className="border-red-100 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Mic className="h-5 w-5 text-red-500" />
                  Emergency Voice Features
                </CardTitle>
                <CardDescription>Special voice commands for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-medium text-slate-700 mb-2">Quick SOS</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      Say &quot;Emergency SOS&quot; to instantly alert your trusted circle
                    </p>
                    <code className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">&quot;Emergency SOS&quot;</code>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-medium text-slate-700 mb-2">Silent Alert</h4>
                    <p className="text-sm text-slate-600 mb-2">Whisper &quot;Help me&quot; to send a silent distress signal</p>
                    <code className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">&quot;Help me&quot;</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
