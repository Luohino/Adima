'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Monitor, Lightbulb, CheckCircle, Award, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Masterclass() {
  const [certificateName, setCertificateName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCertificateGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to generate the certificate.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Certificate Generated!",
      description: `Your certificate has been generated for ${certificateName}`,
    });
    setCertificateName('');
  };

  const handleClassCodeSubmit = (day: number) => {
    if (!classCode.trim()) {
      toast({
        title: "Class Code Required",
        description: "Please enter the class code to unlock the session.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Class Unlocked!",
      description: `Day ${day} session is now available.`,
    });
    setClassCode('');
  };

  const bootcampDays = [
    {
      day: 1,
      title: "Graphics Designing",
      topic: "Canva Mastery & Social Media",
      date: "13 Oct 2025",
      time: "10:00 AM – 02:00 PM",
      description: "Turn simple designs into steady income. Earn ₹10,000–₹50,000/month with Canva",
      features: [
        "Design posts, eBooks, ads & more – no experience needed",
        "Create ready-to-sell templates & assets",
        "Explore 5 powerful Canva income streams",
        "Freelancing, template selling, brand kits & more"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      day: 2,
      title: "E-Commerce Business Mastery",
      topic: "Build & Launch Your Online Store",
      date: "14 Oct 2025",
      time: "10:00 AM – 02:00 PM",
      description: "Launch your own store in minutes — no tech skills needed",
      features: [
        "Start selling online without any upfront cost",
        "Discover winning, high-demand products fast",
        "Build and customize your store step-by-step",
        "Get organic traffic and real customers"
      ],
      color: "from-blue-500 to-purple-500"
    },
    {
      day: 3,
      title: "Digital Product Mastery",
      topic: "Create & Sell Your Own Digital Products",
      date: "15 Oct 2025",
      time: "10:00 AM – 02:00 PM",
      description: "Build passive income with digital products",
      features: [
        "Create eBooks, courses & toolkits using AI",
        "Explore trending product ideas for 2025",
        "Master pricing, packaging & platforms",
        "Design your first sales page step-by-step"
      ],
      color: "from-green-500 to-teal-500"
    },
    {
      day: 4,
      title: "Artificial Intelligence Mastery",
      topic: "Use AI Tools to Automate and Scale Your Business",
      date: "16 Oct 2025",
      time: "10:00 AM – 02:00 PM",
      description: "Boost income & save time with AI",
      features: [
        "Master ChatGPT, Canva AI, Sora & more",
        "See how freelancers earn ₹50K+/month",
        "Create videos, scripts, ads & eBooks fast",
        "Automate work & earn on autopilot"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      day: 5,
      title: "Freelancing Mastery",
      topic: "Start Your Freelancing Career and Get Global Clients",
      date: "17 Oct 2025",
      time: "10:00 AM – 02:00 PM",
      description: "Turn your skills into online income",
      features: [
        "Start freelancing with zero investment",
        "Create client-winning Fiverr & Upwork profiles",
        "Write gigs & descriptions that sell fast",
        "Earn your first ₹5,000–₹10,000 with freelancing"
      ],
      color: "from-red-500 to-orange-500"
    }
  ];

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
                <Link href="/masterclass" className="text-red-600 font-medium">Masterclass</Link>
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
                className="block py-2 text-red-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Masterclass
              </Link>
              <Link 
                href="/webinars" 
                className="block py-2 text-gray-700 hover:text-red-600 transition-colors"
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
            5-Days 5-Ways of <span className="text-red-600">Earning Bootcamp</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Master 5 High-Income Skills in Just 5 Days
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-700">
            <div className="flex items-center gap-2">
              <Monitor className="h-6 w-6" />
              <span>Live on Zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              <span>Real Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              <span>Certified Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamp Days */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule of 5-Days Bootcamp
            </h2>
            <p className="text-xl text-gray-600">
              Each day focuses on a proven income stream you can start immediately
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bootcampDays.map((day) => (
              <Card key={day.day} className="overflow-hidden hover:shadow-lg transition-shadow border-0">
                <div className="bg-red-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    📅 Day {day.day} – {day.title}
                  </h3>
                  <p className="text-base font-medium opacity-90 mb-4">
                    Topic: {day.topic}
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Date: {day.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Time: {day.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>Mode: Live on Zoom</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    {day.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {day.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">
                      💡 Enter Class Code to Unlock Class:
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter your class code..."
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => handleClassCodeSubmit(day.day)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Unlock
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎓 Generate Your Certificate
            </h2>
            <p className="text-xl text-red-100 mb-2">
              Enter your name to get your personalized certificate instantly
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6">
              <form onSubmit={handleCertificateGenerate} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.target.value)}
                  className="bg-white text-gray-900 text-lg py-6"
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-white text-red-600 hover:bg-gray-100 text-lg py-6"
                >
                  Generate Certificate
                </Button>
              </form>

              <div className="mt-8 p-6 bg-white/20 rounded-lg backdrop-blur">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🏛️ Government Approved Certificate
                </h3>
                <p className="mb-4 text-red-100">
                  Earn your Government-Approved Certificate after successful completion of 
                  5-Days 5-Way of Earning Bootcamp. Showcase your verified skills and boost 
                  your career opportunities.
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-sm opacity-90">Official Digital Certificate • Lifetime Validity</p>
                    <p className="text-3xl font-bold mt-2">₹199 Only</p>
                  </div>
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    Get Your Certificate
                  </Button>
                </div>
                <p className="text-xs mt-4 opacity-75">
                  *Certificate is issued by Adima and recognized under Government-approved digital training initiatives.
                </p>
              </div>
            </CardContent>
          </Card>
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
