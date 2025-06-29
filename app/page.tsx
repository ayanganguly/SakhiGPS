import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MapPin, Users, Bell, Mic, Wifi } from "lucide-react"
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-slate-700">SakhiGPS</h1>
            </div> */}
            <div className="flex items-center gap-2">
  <Image src="/logo.jpg" alt="SakhiGPS Logo" width={70} height={70} />
  <h1 className="text-2xl font-bold text-slate-700">SakhiGPS</h1>
</div>

            <Link href="/login">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-700 mb-6">
            Safety Shouldn&apos;t <span className="text-blue-400">be Optional</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Navigate urban spaces with confidence using AI-powered route planning, real-time safety alerts, and your
            trusted circle of support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-slate-700 mb-12">Comprehensive Safety Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-10 w-10 text-blue-400 mb-2" />
                <CardTitle className="text-slate-700">Safe Route Generator</CardTitle>
                <CardDescription className="text-slate-600">
                  AI-powered routing based on lighting, crowd density, and safety data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">
                  Get personalized route recommendations that prioritize well-lit, populated areas with low incident
                  rates.
                </p>
                <Link href="/features/safe-routes">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 bg-transparent">
                    Explore Routes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-purple-400 mb-2" />
                <CardTitle className="text-slate-700">Trusted Circle</CardTitle>
                <CardDescription className="text-slate-600">
                  Connect with family and friends for emergency support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">
                  Add emergency contacts, share live location, and set up automatic check-ins.
                </p>
                <Link href="/features/trusted-circle">
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 bg-transparent">
                    Manage Contacts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bell className="h-10 w-10 text-pink-400 mb-2" />
                <CardTitle className="text-slate-700">Smart Alerts</CardTitle>
                <CardDescription className="text-slate-600">
                  Real-time notifications about nearby incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">
                  Receive instant alerts about safety concerns and alternative route suggestions.
                </p>
                <Link href="/features/smart-alerts">
                  <Button variant="outline" size="sm" className="border-pink-200 text-pink-600 bg-transparent">
                    View Alerts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mic className="h-10 w-10 text-green-400 mb-2" />
                <CardTitle className="text-slate-700">Voice Navigation</CardTitle>
                <CardDescription className="text-slate-600">Hands-free navigation with persona modes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">
                  Voice-controlled navigation with special modes for different user needs.
                </p>
                <Link href="/features/voice-navigation">
                  <Button variant="outline" size="sm" className="border-green-200 text-green-600 bg-transparent">
                    Try Voice Mode
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wifi className="h-10 w-10 text-orange-400 mb-2" />
                <CardTitle className="text-slate-700">Offline Mode</CardTitle>
                <CardDescription className="text-slate-600">Safety features that work without internet</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">
                  Pre-loaded routes and SMS-based emergency features for offline situations.
                </p>
                <Link href="/features/offline-mode">
                  <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 bg-transparent">
                    Setup Offline
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 text-indigo-400 mb-2" />
                <CardTitle className="text-slate-700">Safety Score</CardTitle>
                <CardDescription className="text-slate-600">Real-time area safety assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">
                  View safety ratings based on lighting, crowd density, and incident reports.
                </p>
                <Link href="/features/safety-score">
                  <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600 bg-transparent">
                    Check Safety
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h3 className="text-3xl font-bold text-slate-700 mb-6">Ready to Feel Safer?</h3>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of women who trust SakhiGPS for their daily navigation needs.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3">
              Start Your Safe Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 border-t border-blue-100 py-8 px-4">
        <div className="container mx-auto text-center">
            <div className="flex items-center gap-2">
  <Image src="/logo.jpg" alt="SakhiGPS Logo" width={70} height={70} />
  <h1 className="text-2xl font-bold text-slate-700">SakhiGPS</h1>
</div>
          <p className="text-slate-500">Empowering women with technology for safer urban navigation</p>
        </div>
      </footer>
    </div>
  )
}
