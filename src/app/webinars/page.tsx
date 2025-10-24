'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Monitor, Lightbulb, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Webinars() {
  const [classCode, setClassCode] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClassCodeSubmit = (webinarTitle: string) => {
    if (!classCode.trim()) {
      toast({
        title: "Class Code Required",
        description: "Please enter the class code to access the webinar.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Webinar Unlocked!",
      description: `Access granted to ${webinarTitle}`,
    });
    setClassCode('');
  };

  const webinars = [
    {
      id: 1,
      day: 1,
      title: "Canva Day 1",
      topic: "Day 2 of 120 Days Advanced Digital Marketing Class",
      date: "20 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training"],
      image: "/webinar-canva.jpg",
      color: "from-orange-500 to-red-500",
      category: "Day 1"
    },
    {
      id: 2,
      day: 2,
      title: "Social Media Marketing",
      topic: "Advanced Instagram & Facebook Marketing Strategies",
      date: "21 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training", "Real Projects"],
      image: "/webinar-social.jpg",
      color: "from-blue-500 to-purple-500",
      category: "Day 2"
    },
    {
      id: 3,
      day: 3,
      title: "Content Creation Mastery",
      topic: "Creating Engaging Content that Converts",
      date: "22 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training", "Templates"],
      image: "/webinar-content.jpg",
      color: "from-green-500 to-teal-500",
      category: "Day 3"
    },
    {
      id: 4,
      day: 4,
      title: "SEO & Website Optimization",
      topic: "Drive Organic Traffic to Your Website",
      date: "23 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training", "SEO Tools"],
      image: "/webinar-seo.jpg",
      color: "from-purple-500 to-pink-500",
      category: "Day 4"
    },
    {
      id: 5,
      day: 5,
      title: "Email Marketing Excellence",
      topic: "Build & Convert with Email Campaigns",
      date: "24 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training", "Email Templates"],
      image: "/webinar-email.jpg",
      color: "from-red-500 to-orange-500",
      category: "Day 5"
    },
    {
      id: 6,
      day: 6,
      title: "Paid Advertising Fundamentals",
      topic: "Google Ads & Facebook Ads for Beginners",
      date: "25 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training", "Ad Templates"],
      image: "/webinar-ads.jpg",
      color: "from-yellow-500 to-orange-500",
      category: "Day 6"
    },
    {
      id: 7,
      day: 7,
      title: "Analytics & Data Tracking",
      topic: "Measure & Optimize Your Marketing Results",
      date: "26 Sep 2025",
      time: "08:00 PM – 09:30 PM",
      mode: "Live on Zoom",
      features: ["Live Training", "Analytics Setup"],
      image: "/webinar-analytics.jpg",
      color: "from-indigo-500 to-blue-500",
      category: "Day 7"
    }
  ];

  const filters = ['All', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  const filteredWebinars = selectedFilter === 'All' 
    ? webinars 
    : webinars.filter(w => w.category === selectedFilter);

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
                <Link href="/webinars" className="text-red-600 font-medium">Webinars</Link>
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
              <Link 
                href="/courses" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/verify-certificate" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Verify Certificate
              </Link>
              <Link 
                href="/contact" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/masterclass" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Masterclass
              </Link>
              <Link 
                href="/webinars" 
                className="block py-2 text-red-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Webinars
              </Link>
              <Link 
                href="/freebies" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Freebies
              </Link>
              <Link 
                href="/books" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Books
              </Link>
              <div className="pt-4 space-y-2 border-t border-gray-200">
                <Link href="/coupon-access" className="block">
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    Access Course
                  </Button>
                </Link>
                <Link href="/admin/login" className="block">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Upcoming <span className="text-red-600">Webinars</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Join live sessions with industry experts and master digital marketing
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-700">
            <div className="flex items-center gap-2">
              <Monitor className="h-6 w-6" />
              <span>Live on Zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              <span>Interactive Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>120 Days Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                variant={selectedFilter === filter ? "default" : "outline"}
                className={selectedFilter === filter 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "border-red-600 text-red-600 hover:bg-red-50"
                }
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebinars.map((webinar) => (
              <Card key={webinar.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0">
                <div className="bg-red-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    📅 {webinar.title}
                  </h3>
                  <p className="text-sm font-medium opacity-90 mb-4">
                    Topic: {webinar.topic}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Date: {webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Time: {webinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>Mode: {webinar.mode}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">💡 Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {webinar.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      Enter Class Code
                    </p>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        placeholder="Enter your class code..."
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        className="w-full"
                      />
                      <Button 
                        onClick={() => handleClassCodeSubmit(webinar.title)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWebinars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No webinars found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Have a Class Code?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Enroll in our 120 Days Advanced Digital Marketing Program to get instant access
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coupon-access">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6">
                Enroll Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-red-600 border-white hover:bg-red-50 px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 text-center bg-white">
        <Link href="/">
          <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50">
            ← Back to Home
          </Button>
        </Link>
      </section>
    </div>
  );
}
