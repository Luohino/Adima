'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, Headphones, MessageCircle, FileText, CheckCircle, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
    {
      question: "How do I access my course with a coupon?",
      answer: "Go to the Coupon Access page, enter your details and coupon code, then click 'Access Course' to unlock your materials."
    },
    {
      question: "How can I verify my certificate?",
      answer: "Visit the Certificate Verification page and enter your certificate ID. The system will instantly confirm its authenticity."
    },
    {
      question: "What if my coupon doesn't work?",
      answer: "Check that you've entered the code correctly and that it hasn't expired. If issues persist, contact support with your coupon details."
    },
    {
      question: "How long do I have access to course materials?",
      answer: "Once you access a course with a valid coupon, you have lifetime access to all materials and updates."
    },
    {
      question: "Can I download course materials for offline use?",
      answer: "Yes, all downloadable materials can be saved for offline access. Webinars are available for replay as well."
    }
  ];

  const supportCategories = [
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Help with platform access, downloads, and technical issues",
      email: "techsupport@adima.com",
      responseTime: "2-4 hours"
    },
    {
      icon: MessageCircle,
      title: "Course Support",
      description: "Questions about course content and materials",
      email: "courses@adima.com",
      responseTime: "24 hours"
    },
    {
      icon: FileText,
      title: "Certificate Issues",
      description: "Problems with certificates or verification",
      email: "certificates@adima.com",
      responseTime: "4-6 hours"
    },
    {
      icon: Mail,
      title: "General Inquiries",
      description: "Other questions and partnership opportunities",
      email: "info@adima.com",
      responseTime: "24-48 hours"
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
                <Link href="/contact" className="text-red-600 font-medium">Contact</Link>
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
              <Link href="/courses" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/verify-certificate" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Verify Certificate</Link>
              <Link href="/contact" className="block py-2 text-red-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Headphones className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact <span className="text-red-600">Support</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're here to help! Get in touch with our support team for any questions or assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <category.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{category.description}</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-red-600">{category.email}</p>
                    <Badge variant="outline" className="text-xs">
                      Response: {category.responseTime}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Your message has been sent successfully! We'll respond within 24 hours.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="course">Course Support</SelectItem>
                          <SelectItem value="certificate">Certificate Issues</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Provide detailed information about your question or issue"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-red-600 hover:bg-red-700" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Office Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-gray-600">123 Education Street<br />Learning City, LC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600">support@adima.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST<br />Weekend: Emergency support only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Support</CardTitle>
                  <CardDescription>
                    For urgent issues with course access or certificate verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="font-medium text-red-800 mb-1">Live Chat</p>
                      <p className="text-sm text-red-600">Available 24/7 for critical issues</p>
                      <Button variant="outline" size="sm" className="mt-2 text-red-600 border-red-600 hover:bg-red-50">
                        Start Live Chat
                      </Button>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-800 mb-1">Priority Email</p>
                      <p className="text-sm text-gray-600">urgent@adima.com</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        Response within 1 hour
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
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
            Still Need Help?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Our support team is ready to assist you with any questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
              <Mail className="mr-2 h-5 w-5" />
              Email Support
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-red-600 border-white hover:bg-red-50 px-8 py-3">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}