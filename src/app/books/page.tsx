'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ShoppingCart, Star, Menu, X, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Books() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBuyNow = (bookTitle: string) => {
    toast({
      title: "Redirecting to purchase",
      description: `Opening purchase page for ${bookTitle}`,
    });
  };

  const books = [
    {
      id: 1,
      title: "MIDDLE CLASS ENTREPRENEUR: A Practical Guide to Business",
      author: "By Mustak Saad (Author)",
      hardcover: "21 May 2025",
      publisher: "Chapewell Publishing, Gurugram",
      isbn10: "9370453547",
      isbn13: "978-9370453548",
      weight: "340 g",
      dimensions: "21.59 x 13.97 x 2.54 cm",
      genericName: "Physical Book",
      price: 499,
      rating: 4.8,
      reviews: 1234,
      image: "/middle-class-entrepreneur.jpg",
      description: "It emphasizes the socially responsible journey of social media entrepreneurs and the business processes. Inside this, you'll find 5 Techniques for success",
      features: [
        "52 posts (approx future entrepreneur)",
        "Proven ways how founders of super 10+ Lic startups",
        "All Lessons to learn future entrepreneur"
      ]
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
                <Link href="/books" className="text-red-600 font-medium">Books</Link>
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
              <Link href="/freebies" className="block py-2 text-gray-700 hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Freebies</Link>
              <Link href="/books" className="block py-2 text-red-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Books</Link>
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
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-red-600">Books</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Discover expert-written books on entrepreneurship and digital marketing
          </p>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid lg:grid-cols-3 gap-8 p-8">
                {/* Book Image */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center aspect-[3/4]">
                    <BookOpen className="h-32 w-32 text-gray-400" />
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({book.reviews} reviews)</span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="lg:col-span-2">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h2>
                    <p className="text-lg text-gray-600 mb-4">{book.author}</p>
                    <Badge className="bg-red-100 text-red-600">Hardcover: {book.hardcover}</Badge>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      📚 About The Book
                    </h3>
                    <p className="text-gray-700 mb-4">{book.description}</p>
                    <ul className="space-y-2">
                      {book.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-red-600 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">📖 Product Details</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-600">Publisher:</span> <span className="font-medium">{book.publisher}</span></div>
                      <div><span className="text-gray-600">ISBN-10:</span> <span className="font-medium">{book.isbn10}</span></div>
                      <div><span className="text-gray-600">ISBN-13:</span> <span className="font-medium">{book.isbn13}</span></div>
                      <div><span className="text-gray-600">Item Weight:</span> <span className="font-medium">{book.weight}</span></div>
                      <div><span className="text-gray-600">Dimensions:</span> <span className="font-medium">{book.dimensions}</span></div>
                      <div><span className="text-gray-600">Generic Name:</span> <span className="font-medium">{book.genericName}</span></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Hardcover at</p>
                      <p className="text-4xl font-bold text-red-600">₹{book.price}</p>
                    </div>
                    <Button 
                      size="lg"
                      onClick={() => handleBuyNow(book.title)}
                      className="bg-red-600 hover:bg-red-700 px-8 py-6"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Proud Readers Section */}
              <div className="border-t p-8 bg-gray-50">
                <h3 className="text-2xl font-bold text-center mb-6">
                  📚 Proud Readers of <span className="text-red-600">Middle Class Entrepreneur</span>
                </h3>
                <div className="flex justify-center gap-4 flex-wrap">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-12 w-12 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Check out our courses and masterclasses for comprehensive learning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6">
                View Courses
              </Button>
            </Link>
            <Link href="/masterclass">
              <Button size="lg" variant="outline" className="bg-white text-red-600 border-white hover:bg-red-50 px-8 py-6">
                Join Masterclass
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
