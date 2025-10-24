'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Gift, FileText, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Freebies() {
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownload = (title: string) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to download the freebie.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Download Started!",
      description: `Downloading ${title}`,
    });
  };

  const freebies = [
    {
      id: 1,
      title: "Digital Marketing Earning Guide",
      description: "Complete guide to earning through digital marketing",
      image: "/freebie-1.jpg",
      category: "Guide"
    },
    {
      id: 2,
      title: "Top Digital Marketing AI Tools & Resources",
      description: "Essential AI tools for modern marketers",
      image: "/freebie-2.jpg",
      category: "Resources"
    },
    {
      id: 3,
      title: "Interview & Job Preparation Guide",
      description: "Master your next interview with confidence",
      image: "/freebie-3.jpg",
      category: "Career"
    },
    {
      id: 4,
      title: "Top 20 Must-Known Digital Marketing Abbreviation",
      description: "Essential digital marketing terminology",
      image: "/freebie-4.jpg",
      category: "Guide"
    },
    {
      id: 5,
      title: "Short Guide On Digital Marketing",
      description: "Quick start guide for beginners",
      image: "/freebie-5.jpg",
      category: "Guide"
    },
    {
      id: 6,
      title: "Canva Guide",
      description: "Master Canva for professional designs",
      image: "/canva-guide.jpg",
      category: "Design"
    },
    {
      id: 7,
      title: "Important Points in Canva",
      description: "Key features and tips for Canva users",
      image: "/canva-points.jpg",
      category: "Design"
    },
    {
      id: 8,
      title: "Important Elements in Canva",
      description: "Essential Canva elements you need to know",
      image: "/canva-elements.jpg",
      category: "Design"
    },
    {
      id: 9,
      title: "Color Psychology",
      description: "Understanding colors in design and marketing",
      image: "/color-psychology.jpg",
      category: "Design"
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
                <Link href="/masterclass" className="text-gray-700 hover:text-red-600 transition-colors">Masterclass</Link>
                <Link href="/webinars" className="text-gray-700 hover:text-red-600 transition-colors">Webinars</Link>
                <Link href="/freebies" className="text-red-600 font-medium">Freebies</Link>
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
              <Link href="/courses" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/verify-certificate" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Verify Certificate</Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/masterclass" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Masterclass</Link>
              <Link href="/webinars" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Webinars</Link>
              <Link href="/freebies" className="block py-2 text-red-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Freebies</Link>
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
      <section className="relative bg-gradient-to-br from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Free <span className="text-red-600">Resources</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Download our exclusive free guides, templates, and resources to boost your learning
          </p>
        </div>
      </section>

      {/* Freebies Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freebies.map((freebie) => (
              <Card key={freebie.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-red-100">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                      {freebie.category}
                    </span>
                    <span className="text-sm text-green-600 font-medium">+₹0 Only</span>
                  </div>
                  <CardTitle className="text-xl">{freebie.title}</CardTitle>
                  <CardDescription>{freebie.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3"
                  />
                  <Button 
                    onClick={() => handleDownload(freebie.title)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Unlock PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want More Premium Content?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Enroll in our courses to access exclusive materials and live training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coupon-access">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6">
                Access Courses
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
