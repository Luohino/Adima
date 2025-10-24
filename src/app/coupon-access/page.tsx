'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, ExternalLink, CheckCircle, AlertCircle, Lock, Unlock, User, Mail, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function CouponAccessPage() {
  const [couponCode, setCouponCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState('');

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: couponCode,
          studentName,
          studentEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAccessGranted(true);
        setCourseData(data.course);
        toast({
          title: "Access Granted!",
          description: "You now have access to the course materials.",
        });
      } else {
        setError(data.message || 'Invalid coupon code');
        toast({
          title: "Access Denied",
          description: data.message || 'Invalid coupon code',
          variant: "destructive",
        });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast({
        title: "Error",
        description: 'Something went wrong. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (materialId: string, materialTitle: string) => {
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType: 'download',
          eventData: JSON.stringify({
            materialId,
            materialTitle,
            couponCode,
            studentEmail,
          }),
        }),
      });

      if (response.ok) {
        toast({
          title: "Download Started",
          description: `Downloading ${materialTitle}`,
        });
      }
    } catch (err) {
      console.error('Failed to track download:', err);
    }
  };

  if (accessGranted && courseData) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <img src="/adima-logo.png" alt="Adima" className="h-8 w-8" />
                  <span className="text-xl font-bold text-red-600">Adima</span>
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link href="/courses" className="text-gray-700 hover:text-red-600 transition-colors">Courses</Link>
                  <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">About</Link>
                  <Link href="/verify-certificate" className="text-gray-700 hover:text-red-600 transition-colors">Verify Certificate</Link>
                  <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</Link>
                  <Link href="/masterclass" className="text-gray-700 hover:text-red-600 transition-colors">Masterclass</Link>
                  <Link href="/webinars" className="text-gray-700 hover:text-red-600 transition-colors">Webinars</Link>
                  <Link href="/freebies" className="text-gray-700 hover:text-red-600 transition-colors">Freebies</Link>
                  <Link href="/books" className="text-gray-700 hover:text-red-600 transition-colors">Books</Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Access Active
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Success Header */}
        <section className="py-12 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Unlock className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Access <span className="text-green-600">Granted!</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Welcome {studentName}! You now have full access to {courseData.title}.
              </p>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-red-600" />
                      Course Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{courseData.title}</h3>
                      <p className="text-gray-600 text-sm">{courseData.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Category:</span>
                        <Badge variant="secondary">{courseData.category}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level:</span>
                        <Badge variant="outline">{courseData.level}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{courseData.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Access Code:</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{couponCode}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <User className="h-4 w-4 mr-2" />
                        <span>{studentName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{studentEmail}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Materials */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>
                      Download and access all course materials below
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="materials" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="materials">Materials</TabsTrigger>
                        <TabsTrigger value="webinars">Webinars</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="materials" className="space-y-4">
                        {courseData.materials?.map((material: any) => (
                          <Card key={material.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium mb-1">{material.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <Badge variant="outline">{material.type}</Badge>
                                    <span>Order: {material.order}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(material.url, '_blank')}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleDownload(material.id, material.title)}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="webinars" className="space-y-4">
                        {courseData.webinars?.map((webinar: any) => (
                          <Card key={webinar.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium mb-1">{webinar.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{webinar.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4" />
                                    <span>{webinar.date}</span>
                                    <span>{webinar.time}</span>
                                  </div>
                                </div>
                                <Button size="sm">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Join Webinar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/adima-logo.png" alt="Adima" className="h-8 w-8" />
                <span className="text-xl font-bold text-red-600">Adima</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/courses" className="text-gray-700 hover:text-red-600 transition-colors">Courses</Link>
                <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">About</Link>
                <Link href="/verify-certificate" className="text-gray-700 hover:text-red-600 transition-colors">Verify Certificate</Link>
                <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</Link>
                <Link href="/masterclass" className="text-gray-700 hover:text-red-600 transition-colors">Masterclass</Link>
                <Link href="/webinars" className="text-gray-700 hover:text-red-600 transition-colors">Webinars</Link>
                <Link href="/freebies" className="text-gray-700 hover:text-red-600 transition-colors">Freebies</Link>
                <Link href="/books" className="text-gray-700 hover:text-red-600 transition-colors">Books</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/login">
                <Button className="bg-red-600 hover:bg-red-700">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Access Your <span className="text-red-600">Course</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Enter your coupon code to unlock premium course materials and webinars.
            </p>
          </div>
        </div>
      </section>

      {/* Coupon Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Enter Your Coupon Code</CardTitle>
              <CardDescription>
                Provide your details and coupon code to access course materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCouponSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coupon">Coupon Code</Label>
                  <Input
                    id="coupon"
                    type="text"
                    placeholder="Enter your coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="font-mono text-lg"
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Validating...' : 'Access Course'}
                </Button>
              </form>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">How it works:</h3>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. Enter your name and email address</li>
                  <li>2. Input your unique coupon code</li>
                  <li>3. Click "Access Course" to unlock materials</li>
                  <li>4. Download and access all course content</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You Get <span className="text-red-600">Access To</span>
            </h2>
            <p className="text-xl text-gray-600">
              Unlock premium educational content with your coupon
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Premium Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Download high-quality course materials, documents, and resources
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Live Webinars</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join exclusive live sessions with instructors and industry experts
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn verified certificates upon successful course completion
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}