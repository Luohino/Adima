import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { certificateId } = await request.json();

    if (!certificateId) {
      return NextResponse.json(
        { message: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    // Find certificate by ID
    const certificate = await db.certificate.findUnique({
      where: { certificateId: certificateId.toUpperCase() }
    });

    if (!certificate) {
      return NextResponse.json(
        { message: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Check if certificate is valid
    if (!certificate.isValid) {
      return NextResponse.json(
        { message: 'This certificate has been invalidated' },
        { status: 400 }
      );
    }

    // Track analytics
    await db.analytics.create({
      data: {
        eventType: 'certificate_verified',
        eventData: JSON.stringify({
          certificateId,
          studentName: certificate.studentName,
          courseTitle: certificate.courseTitle
        }),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    return NextResponse.json({
      message: 'Certificate verified successfully',
      certificate: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        studentEmail: certificate.studentEmail,
        courseTitle: certificate.courseTitle,
        issueDate: certificate.issueDate,
        isValid: certificate.isValid
      }
    });

  } catch (error) {
    console.error('Certificate verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}