'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, Users, Star, Filter, Search, Calendar, PlayCircle, Menu, X } from 'lucide-react';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Learn modern web development with React, Node.js, and more. Build real-world projects.",
      category: "Development",
      level: "Beginner",
      duration: "40 hours",
      students: 15420,
      rating: 4.8,
      price: 89.99,
      thumbnail: "/api/placeholder/400/250",
      instructor: "Sarah Johnson",
      isWebinar: false
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      description: "Master digital marketing strategies including SEO, social media, and content marketing.",
      category: "Marketing",
      level: "Intermediate",
      duration: "25 hours",
      students: 8930,
      rating: 4.7,
      price: 79.99,
      thumbnail: "/api/placeholder/400/250",
      instructor: "Michael Chen",
      isWebinar: false
    },
    {
      id: 3,
      title: "Live Workshop: AI in Business",
      description: "Interactive webinar on implementing AI solutions in your business strategy.",
      category: "Business",
      level: "Advanced",
      duration: "3 hours",
      students: 2340,
      rating: 4.9,
      price: 49.99,
      thumbnail: "/api/placeholder/400/250",
      instructor: "Dr. Emily Rodriguez",
      isWebinar: true,
      webinarDate: "2024-02-15",
      webinarTime: "2:00 PM EST"
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      description: "Introduction to data science, machine learning, and data visualization.",
      category: "Data Science",
      level: "Beginner",
      duration: "35 hours",
      students: 12100,
      rating: 4.6,
      price: 99.99,
      thumbnail: "/api/placeholder/400/250",
      instructor: "James Thompson",
      isWebinar: false
    },
    {
      id: 5,
      title: "Live Q&A: Career Development",
      description: "Join industry experts for a live Q&A session on career growth and opportunities.",
      category: "Career",
      level: "All Levels",
      duration: "2 hours",
      students: 3450,
      rating: 4.8,
      price: 29.99,
      thumbnail: "/api/placeholder/400/250",
      instructor: "Multiple Experts",
      isWebinar: true,
      webinarDate: "2024-02-18",
      webinarTime: "6:00 PM EST"
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      description: "Learn the fundamentals of user interface and user experience design.",
      category: "Design",
      level: "Intermediate",
      duration: "30 hours",
      students: 9870,
      rating: 4.7,
      price: 84.99,
      thumbnail: "/api/placeholder/400/250",
      instructor: "Lisa Anderson",
      isWebinar: false
    }
  ];

  const categories = ['all', 'Development', 'Marketing', 'Business', 'Data Science', 'Design', 'Career'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const upcomingWebinars = courses.filter(course => course.isWebinar);

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
                <Link href="/courses" className="text-red-600 font-medium">Courses</Link>
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
              <Link href="/coupon-access" className="hidden sm:block">
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  Access Course
                </Button>
              </Link>
              <Link href="/admin/login" className="hidden sm:block">
                <Button className="bg-red-600 hover:bg-red-700">
                  Admin Login
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <Link href="/courses" className="block py-2 text-red-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/verify-certificate" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Verify Certificate</Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/masterclass" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Masterclass</Link>
              <Link href="/webinars" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Webinars</Link>
              <Link href="/freebies" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Freebies</Link>
              <Link href="/books" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Books</Link>
              <div className="pt-4 space-y-2 border-t border-gray-200">
                <Link href="/coupon-access" className="block">
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">Access Course</Button>
                </Link>
                <Link href="/admin/login" className="block">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Admin Login</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Our <span className="text-red-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover world-class courses and live webinars designed to accelerate your learning and career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/coupon-access">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                  Access with Coupon
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3">
                Browse All Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {upcomingWebinars.length > 0 && (
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Upcoming <span className="text-red-600">Live Webinars</span>
                </h2>
                <p className="text-gray-600">Join interactive sessions with industry experts</p>
              </div>
              <PlayCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="hover:shadow-lg transition-shadow border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-red-100 text-red-600">Live Webinar</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {webinar.webinarDate}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{webinar.title}</CardTitle>
                    <CardDescription>{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Instructor:</span>
                        <span className="font-medium">{webinar.instructor}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{webinar.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{webinar.webinarTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-medium">{webinar.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{webinar.rating}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        Register Now - ${webinar.price}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                All <span className="text-red-600">Courses</span>
              </h2>
              <p className="text-gray-600">{filteredCourses.length} courses available</p>
            </div>
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
          
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow border-0">
                  <CardHeader>
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Instructor:</span>
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="font-medium">{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Students:</span>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="font-medium">{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-red-600">${course.price}</span>
                          <Link href="/coupon-access">
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                              Use Coupon
                            </Button>
                          </Link>
                        </div>
                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Get instant access to all courses with our coupon system
          </p>
          <Link href="/coupon-access">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
              Access Courses with Coupon
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}