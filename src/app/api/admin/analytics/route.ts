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

// GET - Fetch analytics data
export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current date and start of month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Count total downloads
    const totalDownloads = await db.analytics.count({
      where: {
        eventType: 'download'
      }
    });

    // Count downloads this month
    const monthlyDownloads = await db.analytics.count({
      where: {
        eventType: 'download',
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    // Count coupon usages
    const couponRedemptions = await db.couponUsage.count();

    // Count certificate verifications
    const certificateVerifications = await db.analytics.count({
      where: {
        eventType: 'certificate_verified'
      }
    });

    // Count active students (students who used coupons in last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const activeStudents = await db.couponUsage.groupBy({
      by: ['studentEmail'],
      where: {
        usedAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get course popularity
    const courseStats = await db.coupon.groupBy({
      by: ['courseId'],
      _count: {
        usages: true
      },
      orderBy: {
        _count: {
          usages: 'desc'
        }
      }
    });

    // Get course details for popular courses
    const popularCourseIds = courseStats.map(stat => stat.courseId);
    const popularCourses = await db.course.findMany({
      where: {
        id: {
          in: popularCourseIds
        }
      },
      select: {
        id: true,
        title: true
      }
    });

    // Combine course stats with course details
    const coursesWithStats = popularCourses.map(course => {
      const stat = courseStats.find(s => s.courseId === course.id);
      return {
        ...course,
        studentCount: stat?._count.usages || 0
      };
    }).sort((a, b) => b.studentCount - a.studentCount);

    return NextResponse.json({
      totalDownloads,
      monthlyDownloads,
      couponRedemptions,
      certificateVerifications,
      activeStudents: activeStudents.length,
      popularCourses: coursesWithStats
    });

  } catch (error) {
    console.error('Fetch analytics error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}