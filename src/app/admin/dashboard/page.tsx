'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  BookOpen, 
  Ticket, 
  Award, 
  TrendingUp, 
  Download, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  Mail,
  LogOut,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  level: string;
  isActive: boolean;
  materials: any[];
}

interface Coupon {
  id: string;
  code: string;
  token: string;
  courseId: string;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  expiresAt: string;
  extendedUntil: string;
  course: Course;
  usages: any[];
}

interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  issueDate: string;
  isValid: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data states
  const [courses, setCourses] = useState<Course[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [analytics, setAnalytics] = useState<any>({});

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    level: ''
  });
  const [couponForm, setCouponForm] = useState({
    courseId: '',
    maxUses: '1',
    expiresAt: ''
  });
  const [certificateForm, setCertificateForm] = useState({
    studentName: '',
    studentEmail: '',
    courseId: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminUser');
    
    if (!token || !adminData) {
      router.push('/admin/login');
      return;
    }

    setAdmin(JSON.parse(adminData));
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [coursesRes, couponsRes, certificatesRes, analyticsRes] = await Promise.all([
        fetch('/api/admin/courses', { headers }),
        fetch('/api/admin/coupons', { headers }),
        fetch('/api/admin/certificates', { headers }),
        fetch('/api/admin/analytics', { headers })
      ]);

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.courses || []);
      }

      if (couponsRes.ok) {
        const couponsData = await couponsRes.json();
        setCoupons(couponsData.coupons || []);
      }

      if (certificatesRes.ok) {
        const certificatesData = await certificatesRes.json();
        setCertificates(certificatesData.certificates || []);
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleCreateCourse = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseForm)
      });

      if (response.ok) {
        toast({
          title: "Course Created",
          description: "New course has been added successfully.",
        });
        setCourseForm({
          title: '',
          description: '',
          category: '',
          price: '',
          duration: '',
          level: ''
        });
        fetchDashboardData();
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateCoupon = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(couponForm)
      });

      if (response.ok) {
        toast({
          title: "Coupon Created",
          description: "New coupon has been generated successfully.",
        });
        setCouponForm({
          courseId: '',
          maxUses: '1',
          expiresAt: ''
        });
        fetchDashboardData();
      } else {
        throw new Error('Failed to create coupon');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create coupon. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateCertificate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(certificateForm)
      });

      if (response.ok) {
        toast({
          title: "Certificate Created",
          description: "New certificate has been issued successfully.",
        });
        setCertificateForm({
          studentName: '',
          studentEmail: '',
          courseId: ''
        });
        fetchDashboardData();
      } else {
        throw new Error('Failed to create certificate');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create certificate. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/adima-logo.png" alt="Adima" className="h-8 w-8" />
                <span className="text-xl font-bold text-red-600">Adima</span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-sm font-medium">{admin.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">
                {courses.filter(c => c.isActive).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coupons.length}</div>
              <p className="text-xs text-muted-foreground">
                {coupons.filter(c => c.isActive).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificates.length}</div>
              <p className="text-xs text-muted-foreground">
                {certificates.filter(c => c.isValid).length} valid
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalDownloads || 0}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {coupons.slice(0, 5).map((coupon) => (
                      <div key={coupon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{coupon.code}</p>
                          <p className="text-sm text-gray-600">{coupon.course.title}</p>
                        </div>
                        <Badge variant={coupon.isActive ? "default" : "secondary"}>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>
                          Add a new course to the platform
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Course Title</Label>
                          <Input
                            id="title"
                            value={courseForm.title}
                            onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={courseForm.description}
                            onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={courseForm.category} onValueChange={(value) => setCourseForm({...courseForm, category: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Development">Development</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="level">Level</Label>
                            <Select value={courseForm.level} onValueChange={(value) => setCourseForm({...courseForm, level: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={courseForm.price}
                              onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                              id="duration"
                              value={courseForm.duration}
                              onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                            />
                          </div>
                        </div>
                        <Button onClick={handleCreateCourse} className="w-full">
                          Create Course
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Generate Coupon
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generate New Coupon</DialogTitle>
                        <DialogDescription>
                          Create a new coupon code for course access
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="courseSelect">Select Course</Label>
                          <Select value={couponForm.courseId} onValueChange={(value) => setCouponForm({...couponForm, courseId: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="maxUses">Max Uses</Label>
                          <Input
                            id="maxUses"
                            type="number"
                            value={couponForm.maxUses}
                            onChange={(e) => setCouponForm({...couponForm, maxUses: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiresAt">Expires At</Label>
                          <Input
                            id="expiresAt"
                            type="date"
                            value={couponForm.expiresAt}
                            onChange={(e) => setCouponForm({...couponForm, expiresAt: e.target.value})}
                          />
                        </div>
                        <Button onClick={handleCreateCoupon} className="w-full">
                          Generate Coupon
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Issue Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Issue New Certificate</DialogTitle>
                        <DialogDescription>
                          Create a certificate for a student
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="studentName">Student Name</Label>
                            <Input
                              id="studentName"
                              value={certificateForm.studentName}
                              onChange={(e) => setCertificateForm({...certificateForm, studentName: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="studentEmail">Student Email</Label>
                            <Input
                              id="studentEmail"
                              type="email"
                              value={certificateForm.studentEmail}
                              onChange={(e) => setCertificateForm({...certificateForm, studentEmail: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="certCourse">Select Course</Label>
                          <Select value={certificateForm.courseId} onValueChange={(value) => setCertificateForm({...certificateForm, courseId: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleCreateCertificate} className="w-full">
                          Issue Certificate
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>
                  Manage all courses on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.level}</Badge>
                          <span className="text-sm text-gray-500">${course.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {course.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coupons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Coupon Management</CardTitle>
                <CardDescription>
                  Manage and monitor coupon usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold font-mono">{coupon.code}</h3>
                          <Badge variant={coupon.isActive ? "default" : "secondary"}>
                            {coupon.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{coupon.course.title}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Uses: {coupon.currentUses}/{coupon.maxUses}</span>
                          <span>Token: {coupon.token}</span>
                          {coupon.expiresAt && (
                            <span>Expires: {new Date(coupon.expiresAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {coupon.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Management</CardTitle>
                <CardDescription>
                  View and manage issued certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{certificate.studentName}</h3>
                          <Badge variant={certificate.isValid ? "default" : "secondary"}>
                            {certificate.isValid ? "Valid" : "Invalid"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{certificate.studentEmail}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Course: {certificate.courseTitle}</span>
                          <span>ID: {certificate.certificateId}</span>
                          <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {certificate.isValid ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Downloads</span>
                      <span className="font-semibold">{analytics.totalDownloads || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Coupon Redemptions</span>
                      <span className="font-semibold">{analytics.couponRedemptions || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Certificate Verifications</span>
                      <span className="font-semibold">{analytics.certificateVerifications || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Active Students</span>
                      <span className="font-semibold">{analytics.activeStudents || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.slice(0, 5).map((course, index) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                          <span>{course.title}</span>
                        </div>
                        <Badge variant="outline">{Math.floor(Math.random() * 100)} students</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}