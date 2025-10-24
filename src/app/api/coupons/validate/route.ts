import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { code, studentName, studentEmail } = await request.json();

    if (!code || !studentName || !studentEmail) {
      return NextResponse.json(
        { message: 'Coupon code, student name, and email are required' },
        { status: 400 }
      );
    }

    // Find coupon by code
    const coupon = await db.coupon.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        course: {
          include: {
            materials: true
          }
        },
        usages: true
      }
    });

    if (!coupon) {
      return NextResponse.json(
        { message: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json(
        { message: 'This coupon is no longer active' },
        { status: 400 }
      );
    }

    // Check if coupon has expired
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      // Check if it has been extended
      if (!coupon.extendedUntil || new Date(coupon.extendedUntil) < new Date()) {
        return NextResponse.json(
          { message: 'This coupon has expired' },
          { status: 400 }
        );
      }
    }

    // Check if coupon has reached max uses
    if (coupon.currentUses >= coupon.maxUses) {
      return NextResponse.json(
        { message: 'This coupon has reached its maximum usage limit' },
        { status: 400 }
      );
    }

    // Check if this student has already used this coupon
    const existingUsage = coupon.usages.find(
      usage => usage.studentEmail === studentEmail
    );

    if (existingUsage) {
      return NextResponse.json(
        { message: 'You have already used this coupon' },
        { status: 400 }
      );
    }

    // Record the coupon usage
    await db.couponUsage.create({
      data: {
        couponId: coupon.id,
        studentName,
        studentEmail,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // Update coupon usage count
    await db.coupon.update({
      where: { id: coupon.id },
      data: {
        currentUses: {
          increment: 1
        }
      }
    });

    // Track analytics
    await db.analytics.create({
      data: {
        eventType: 'coupon_used',
        eventData: JSON.stringify({
          couponCode: code,
          studentName,
          studentEmail,
          courseId: coupon.courseId
        }),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // Return course data with materials
    const courseData = {
      id: coupon.course.id,
      title: coupon.course.title,
      description: coupon.course.description,
      category: coupon.course.category,
      level: coupon.course.level,
      duration: coupon.course.duration,
      materials: coupon.course.materials.map(material => ({
        id: material.id,
        title: material.title,
        type: material.type,
        url: material.url,
        description: material.description,
        order: material.order
      })),
      webinars: [] // Can be implemented later
    };

    return NextResponse.json({
      message: 'Coupon validated successfully',
      course: courseData,
      coupon: {
        code: coupon.code,
        maxUses: coupon.maxUses,
        currentUses: coupon.currentUses + 1
      }
    });

  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}