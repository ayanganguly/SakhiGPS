"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Smartphone } from "lucide-react"
import Image from 'next/image';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false)
      setOtpSent(true)
    }, 1000)
  }

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
<div className="flex flex-col items-center justify-center text-center mb-8">
  <Link
    href="/"
    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to Home
  </Link>

  <div className="flex items-center gap-2 mb-2">
    <Image src="/logo.jpg" alt="SakhiGPS Logo" width={70} height={70} />
    <h1 className="text-2xl font-bold text-slate-700">SakhiGPS</h1>
  </div>

  <p className="text-slate-600">Welcome back! Please sign in to continue.</p>
</div>


        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={loginMethod === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setLoginMethod("email")}
                className={loginMethod === "email" ? "bg-blue-400 hover:bg-blue-500" : "border-blue-200 text-blue-600"}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant={loginMethod === "otp" ? "default" : "outline"}
                size="sm"
                onClick={() => setLoginMethod("otp")}
                className={loginMethod === "otp" ? "bg-blue-400 hover:bg-blue-500" : "border-blue-200 text-blue-600"}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                OTP
              </Button>
            </div>
            <div>
              <CardTitle className="text-slate-700">
                {loginMethod === "email" ? "Sign in with Email" : "Sign in with OTP"}
              </CardTitle>
              <CardDescription className="text-slate-600">
                {loginMethod === "email"
                  ? "Enter your email to access your dashboard"
                  : "We'll send you a verification code"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {loginMethod === "email" ? (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpLogin} className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Enter the 6-digit code sent to {phone}</p>
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                        className="border-blue-200 focus:border-blue-400 text-center text-lg tracking-widest"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-blue-200 text-blue-600 bg-transparent"
                      onClick={() => setOtpSent(false)}
                    >
                      Change Phone Number
                    </Button>
                  </form>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
