import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { eventType, eventData } = await request.json();

    if (!eventType || !eventData) {
      return NextResponse.json(
        { message: 'Event type and data are required' },
        { status: 400 }
      );
    }

    // Track analytics event
    await db.analytics.create({
      data: {
        eventType,
        eventData: typeof eventData === 'string' ? eventData : JSON.stringify(eventData),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    return NextResponse.json({
      message: 'Event tracked successfully'
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}