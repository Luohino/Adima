'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Award, CheckCircle, AlertCircle, Search, Calendar, User, Mail, Building, ExternalLink, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setCertificateData(null);
    setIsVerified(false);

    try {
      const response = await fetch('/api/certificates/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificateId: certificateId.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCertificateData(data.certificate);
        setIsVerified(true);
        toast({
          title: "Certificate Verified!",
          description: "This certificate is authentic and valid.",
        });
      } else {
        setError(data.message || 'Certificate not found');
        toast({
          title: "Verification Failed",
          description: data.message || 'Certificate not found',
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
                <Link href="/verify-certificate" className="text-red-600 font-medium">Verify Certificate</Link>
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
              <Link href="/courses" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/verify-certificate" className="block py-2 text-red-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Verify Certificate</Link>
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Certificate <span className="text-red-600">Verification</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Verify the authenticity of Adima certificates instantly. Enter the certificate ID to confirm its validity.
            </p>
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Verify Certificate</CardTitle>
              <CardDescription>
                Enter the certificate ID to verify its authenticity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="certificateId">Certificate ID</Label>
                  <Input
                    id="certificateId"
                    type="text"
                    placeholder="Enter certificate ID (e.g., ADIMA-2024-XXXX)"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                    className="font-mono"
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
                  {isLoading ? 'Verifying...' : 'Verify Certificate'}
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Where to find Certificate ID:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check the bottom of your certificate document</li>
                  <li>• Look in your confirmation email</li>
                  <li>• Contact support if you can't find it</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Verification Result */}
      {isVerified && certificateData && (
        <section className="py-16 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Certificate <span className="text-green-600">Verified</span>
              </h2>
              <p className="text-lg text-gray-600">
                This certificate is authentic and has been issued by Adima
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Certificate Details
                  <Badge className="bg-green-100 text-green-600">Valid</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Student Name</p>
                        <p className="font-medium">{certificateData.studentName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium">{certificateData.studentEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Certificate ID</p>
                        <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {certificateData.certificateId}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Course Title</p>
                        <p className="font-medium">{certificateData.courseTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Issue Date</p>
                        <p className="font-medium">{formatDate(certificateData.issueDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge className="bg-green-100 text-green-600">Valid</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                This verification confirms that the certificate above was legitimately issued by Adima.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCertificateId('');
                    setCertificateData(null);
                    setIsVerified(false);
                  }}
                >
                  Verify Another Certificate
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Download Verification Report
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Verify <span className="text-red-600">Certificates?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Ensure authenticity and build trust with verified credentials
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Authenticity Check</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instantly verify if a certificate is genuine and issued by Adima
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Employer Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build confidence with employers by providing verifiable credentials
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Quick Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fast and easy verification process available 24/7
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help with Verification?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Our support team is here to assist you with any certificate verification questions
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}