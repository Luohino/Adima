import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// Generate certificate ID
function generateCertificateId() {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ADIMA-${year}-${random}`;
}

// GET - Fetch all certificates
export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const certificates = await db.certificate.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ certificates });

  } catch (error) {
    console.error('Fetch certificates error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new certificate
export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { studentName, studentEmail, courseId } = await request.json();

    if (!studentName || !studentEmail || !courseId) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = await db.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    // Generate unique certificate ID
    const certificateId = generateCertificateId();

    const certificate = await db.certificate.create({
      data: {
        certificateId,
        studentName,
        studentEmail,
        courseId,
        courseTitle: course.title,
        adminId: decoded.id
      }
    });

    return NextResponse.json({
      message: 'Certificate created successfully',
      certificate
    });

  } catch (error) {
    console.error('Create certificate error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}