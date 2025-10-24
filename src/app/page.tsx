'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Users, Award, Headphones, ChevronRight, CheckCircle, Star, TrendingUp, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Home() {
  const [email, setEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive our latest updates and course announcements.",
    });
    setEmail('');
  };

  const features = [
    {
      icon: BookOpen,
      title: "Premium Courses",
      description: "Access high-quality educational content crafted by industry experts."
    },
    {
      icon: Users,
      title: "Live Webinars",
      description: "Join interactive sessions with instructors and fellow learners."
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn certificates that validate your skills and boost your career."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it from our dedicated support team."
    }
  ];

  const stats = [
    { label: "Active Students", value: "10,000+" },
    { label: "Courses Available", value: "500+" },
    { label: "Expert Instructors", value: "100+" },
    { label: "Success Rate", value: "95%" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Professional",
      content: "Adima transformed my career. The courses are practical and the certificates are recognized by top employers.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The quality of education and support is exceptional. I've learned more here than in traditional institutions.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Business Owner",
      content: "The coupon system made it easy to access premium content. Highly recommend for anyone looking to upskill.",
      rating: 5
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
      <section className="relative bg-gradient-to-br from-red-50 to-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your
                <span className="text-red-600"> Future</span> with
                <span className="text-red-600"> Adima</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access premium educational content, join live webinars, and earn verified certificates. 
                Your journey to excellence starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/coupon-access">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                    Start Learning
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#courses">
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full max-w-lg mx-auto h-[260px] md:h-[320px] lg:h-[360px] flex items-center justify-center">
              <img 
                src="/adima-logo.png" 
                alt="Adima Education" 
                className="max-h-full w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-red-600">Adima</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-red-600">Students</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Get instant access to premium courses with our coupon system
          </p>
          <Link href="/coupon-access">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with <span className="text-red-600">Adima</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get the latest course updates and exclusive offers
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/adima-logo.png" alt="Adima" className="h-8 w-8" />
                <span className="text-xl font-bold">Adima</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and verified certificates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/verify-certificate" className="hover:text-white transition-colors">Verify Certificate</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/verify-certificate" className="hover:text-white transition-colors">Certificate Verification</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Adima. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}