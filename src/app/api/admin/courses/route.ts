import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

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

// GET - Fetch all courses
export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const courses = await db.course.findMany({
      include: {
        materials: true,
        coupons: true,
        certificates: true,
        _count: {
          select: {
            coupons: true,
            certificates: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ courses });

  } catch (error) {
    console.error('Fetch courses error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new course
export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, category, price, duration, level } = await request.json();

    if (!title || !description || !category || !price || !duration || !level) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const course = await db.course.create({
      data: {
        title,
        description,
        category,
        price: parseFloat(price),
        duration,
        level,
        adminId: decoded.id
      },
      include: {
        materials: true,
        coupons: true,
        certificates: true
      }
    });

    return NextResponse.json({
      message: 'Course created successfully',
      course
    });

  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}