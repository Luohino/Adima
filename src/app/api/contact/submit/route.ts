import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, category, message } = await request.json();

    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store contact message in analytics (since we don't have a dedicated contact table)
    await db.analytics.create({
      data: {
        eventType: 'contact_form_submission',
        eventData: JSON.stringify({
          name,
          email,
          subject,
          category,
          message,
          timestamp: new Date().toISOString()
        }),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // In a real application, you would also:
    // 1. Send email notification to support team
    // 2. Store in a dedicated contacts table
    // 3. Send confirmation email to the user
    // 4. Create a ticket in your support system

    return NextResponse.json({
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}