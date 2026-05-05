"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, Shield, UserIcon, Mail, Calendar, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserEditFormProps {
  userId: string
  returnPath?: string // Made return path configurable for different portals
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  permissions: string[]
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
}

const mockUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    role: "Admin",
    permissions: ["Create Jobs", "View All", "Manage Users"],
    status: "active",
    lastLogin: "2024-01-15 09:30",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    role: "Manager",
    permissions: ["Create Jobs", "View All"],
    status: "active",
    lastLogin: "2024-01-15 08:45",
    createdAt: "2023-08-22",
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Wilson",
    email: "mike.wilson@company.com",
    role: "Driver",
    permissions: ["View Only"],
    status: "active",
    lastLogin: "2024-01-14 16:20",
    createdAt: "2023-09-10",
  },
  {
    id: "4",
    firstName: "Lisa",
    lastName: "Brown",
    email: "lisa.brown@company.com",
    role: "Operator",
    permissions: ["Create Jobs"],
    status: "inactive",
    lastLogin: "2024-01-10 14:15",
    createdAt: "2023-11-05",
  },
]

const availablePermissions = [
  { id: "create_jobs", label: "Create Jobs" },
  { id: "view_all", label: "View All" },
  { id: "manage_users", label: "Manage Users" },
  { id: "manage_finance", label: "Manage Finance" },
  { id: "view_reports", label: "View Reports" },
  { id: "manage_fleet", label: "Manage Fleet" },
]

export function UserEditForm({ userId, returnPath = "/dashboard/users" }: UserEditFormProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "active" as "active" | "inactive",
    permissions: [] as string[],
  })

  useEffect(() => {
    // In a real app, fetch user data from API
    const foundUser = mockUsers.find((u) => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
      setFormData({
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: foundUser.role,
        status: foundUser.status,
        permissions: foundUser.permissions,
      })
    }
  }, [userId])

  const handleSave = () => {
    // In a real app, save to API
    console.log("[v0] Saving user data:", formData)
    router.push(returnPath)
  }

  const handlePermissionToggle = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Update user's personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role and Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role & Status
            </CardTitle>
            <CardDescription>Assign role and account status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Finance Manager">Finance Manager</SelectItem>
                    <SelectItem value="Finance Viewer">Finance Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Select specific permissions for this user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={formData.permissions.includes(permission.label)}
                    onCheckedChange={() => handlePermissionToggle(permission.label)}
                  />
                  <Label htmlFor={permission.id} className="font-normal cursor-pointer">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View account activity details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Account Created
              </span>
              <span className="font-medium">{user.createdAt}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last Login
              </span>
              <span className="font-medium">{user.lastLogin}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button variant="outline" size="lg" onClick={() => router.push(returnPath)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
