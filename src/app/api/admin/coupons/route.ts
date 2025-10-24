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

// Generate random coupon code
function generateCouponCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'ADIMA-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET - Fetch all coupons
export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const coupons = await db.coupon.findMany({
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        },
        usages: true,
        _count: {
          select: {
            usages: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ coupons });

  } catch (error) {
    console.error('Fetch coupons error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new coupon
export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId, maxUses, expiresAt } = await request.json();

    if (!courseId || !maxUses) {
      return NextResponse.json(
        { message: 'Course ID and max uses are required' },
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

    // Generate unique coupon code and token
    const code = generateCouponCode();
    const token = uuidv4();

    const coupon = await db.coupon.create({
      data: {
        code,
        token,
        courseId,
        maxUses: parseInt(maxUses),
        currentUses: 0,
        isActive: true,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        adminId: decoded.id
      },
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    return NextResponse.json({
      message: 'Coupon created successfully',
      coupon
    });

  } catch (error) {
    console.error('Create coupon error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}