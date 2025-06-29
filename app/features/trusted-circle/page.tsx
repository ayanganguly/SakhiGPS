"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Users,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Trash2,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react"

export default function TrustedCirclePage() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Mom",
      phone: "+1 (555) 123-4567",
      email: "mom@email.com",
      relationship: "Family",
      status: "online",
      lastSeen: "now",
      location: "Home",
      isEmergencyContact: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@email.com",
      relationship: "Best Friend",
      status: "online",
      lastSeen: "2 min ago",
      location: "Office",
      isEmergencyContact: true,
    },
    {
      id: 3,
      name: "Emergency Services",
      phone: "911",
      email: "emergency@local.gov",
      relationship: "Emergency",
      status: "available",
      lastSeen: "24/7",
      location: "Always Available",
      isEmergencyContact: true,
    },
    {
      id: 4,
      name: "Alex Chen",
      phone: "+1 (555) 456-7890",
      email: "alex.chen@email.com",
      relationship: "Colleague",
      status: "offline",
      lastSeen: "1 hour ago",
      location: "Unknown",
      isEmergencyContact: false,
    },
  ])

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
  })

  const [isAddingContact, setIsAddingContact] = useState(false)

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: contacts.length + 1,
        ...newContact,
        status: "offline",
        lastSeen: "Just added",
        location: "Unknown",
        isEmergencyContact: false,
      }
      setContacts([...contacts, contact])
      setNewContact({ name: "", phone: "", email: "", relationship: "" })
      setIsAddingContact(false)
    }
  }

  const toggleEmergencyContact = (id: number) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, isEmergencyContact: !contact.isEmergencyContact } : contact,
      ),
    )
  }

  const removeContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400"
      case "offline":
        return "bg-gray-400"
      case "available":
        return "bg-blue-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "offline":
        return "Offline"
      case "available":
        return "Available"
      default:
        return "Unknown"
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
              <Users className="h-6 w-6 text-purple-400" />
              <h1 className="text-xl font-bold text-slate-700">Trusted Circle</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {contacts.filter((c) => c.status === "online").length}
                  </div>
                  <div className="text-sm text-slate-600">Online Now</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {contacts.filter((c) => c.isEmergencyContact).length}
                  </div>
                  <div className="text-sm text-slate-600">Emergency Contacts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{contacts.length}</div>
                  <div className="text-sm text-slate-600">Total Contacts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Contact Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-700">Your Trusted Contacts</h2>
          <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
            <DialogTrigger asChild>
              <Button className="bg-purple-400 hover:bg-purple-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>Add someone to your trusted circle for emergency support</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
                <Input
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
                <Input
                  placeholder="Email Address"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                />
                <Input
                  placeholder="Relationship (e.g., Friend, Family)"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddContact} className="flex-1 bg-purple-400 hover:bg-purple-500">
                    Add Contact
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-700">{contact.name}</h3>
                        {contact.isEmergencyContact && (
                          <Badge className="bg-red-100 text-red-700 text-xs">Emergency</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{contact.relationship}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {contact.phone}
                        </div>
                        {contact.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {contact.email}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {contact.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {contact.lastSeen}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={`${getStatusColor(contact.status)} text-white`}>
                      {getStatusText(contact.status)}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-purple-100">
                  <Button size="sm" variant="outline" className="border-green-200 text-green-600 bg-transparent">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 bg-transparent">
                    <MapPin className="h-4 w-4 mr-1" />
                    Share Location
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={
                      contact.isEmergencyContact ? "border-red-200 text-red-600" : "border-orange-200 text-orange-600"
                    }
                    onClick={() => toggleEmergencyContact(contact.id)}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    {contact.isEmergencyContact ? "Remove Emergency" : "Make Emergency"}
                  </Button>
                  {contact.id !== 3 && ( // Don't allow deleting emergency services
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 bg-transparent"
                      onClick={() => removeContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Actions */}
        <Card className="border-red-100 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Emergency Actions
            </CardTitle>
            <CardDescription>Quick actions to alert your trusted circle in case of emergency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button className="h-16 bg-red-500 hover:bg-red-600 text-white flex-col gap-1">
                <AlertCircle className="h-6 w-6" />
                <span>Send SOS Alert</span>
              </Button>
              <Button className="h-16 bg-orange-500 hover:bg-orange-600 text-white flex-col gap-1">
                <MapPin className="h-6 w-6" />
                <span>Share Live Location</span>
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              These actions will immediately notify all your emergency contacts
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
