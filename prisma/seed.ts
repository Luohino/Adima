import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@adima.com' },
    update: {},
    create: {
      email: 'admin@adima.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    }
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample courses
  const courses = [
    {
      title: 'Complete Web Development Bootcamp',
      description: 'Learn modern web development with React, Node.js, and more. Build real-world projects.',
      category: 'Development',
      price: 89.99,
      duration: '40 hours',
      level: 'Beginner',
      adminId: admin.id
    },
    {
      title: 'Digital Marketing Masterclass',
      description: 'Master digital marketing strategies including SEO, social media, and content marketing.',
      category: 'Marketing',
      price: 79.99,
      duration: '25 hours',
      level: 'Intermediate',
      adminId: admin.id
    },
    {
      title: 'Data Science Fundamentals',
      description: 'Introduction to data science, machine learning, and data visualization.',
      category: 'Data Science',
      price: 99.99,
      duration: '35 hours',
      level: 'Beginner',
      adminId: admin.id
    },
    {
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamentals of user interface and user experience design.',
      category: 'Design',
      price: 84.99,
      duration: '30 hours',
      level: 'Intermediate',
      adminId: admin.id
    }
  ];

  for (const courseData of courses) {
    const existingCourse = await prisma.course.findFirst({
      where: { 
        title: courseData.title,
        adminId: courseData.adminId
      }
    });

    let course;
    if (existingCourse) {
      course = existingCourse;
    } else {
      course = await prisma.course.create({
        data: courseData
      });
    }
    console.log('✅ Course created:', course.title);

    // Create sample materials for each course
    const materials = [
      {
        title: 'Course Introduction',
        type: 'document',
        url: 'https://drive.google.com/file/d/1example-intro',
        description: 'Introduction to the course and learning objectives',
        order: 1,
        courseId: course.id
      },
      {
        title: 'Getting Started Guide',
        type: 'document',
        url: 'https://drive.google.com/file/d/1example-guide',
        description: 'Step-by-step guide to get started',
        order: 2,
        courseId: course.id
      },
      {
        title: 'Video Module 1',
        type: 'video',
        url: 'https://drive.google.com/file/d/1example-video1',
        description: 'First video module covering basics',
        order: 3,
        courseId: course.id
      },
      {
        title: 'Resources & Links',
        type: 'link',
        url: 'https://drive.google.com/file/d/1example-resources',
        description: 'Additional resources and helpful links',
        order: 4,
        courseId: course.id
      }
    ];

    for (const materialData of materials) {
      const existingMaterial = await prisma.courseMaterial.findFirst({
        where: { 
          title: materialData.title,
          courseId: materialData.courseId
        }
      });

      if (!existingMaterial) {
        await prisma.courseMaterial.create({
          data: materialData
        });
      }
    }
    console.log('✅ Materials created for:', course.title);

    // Create sample coupons for each course
    const couponCodes = [
      'ADIMA-LEARN2024',
      'ADIMA-STUDENT24',
      'ADIMA-EDUCATE',
      'ADIMA-SKILLS'
    ];

    for (let i = 0; i < couponCodes.length; i++) {
      const coupon = await prisma.coupon.create({
        data: {
          code: `${couponCodes[i]}-${course.title.substring(0, 3).toUpperCase()}`,
          token: `token-${Date.now()}-${i}`,
          courseId: course.id,
          maxUses: 10,
          currentUses: 0,
          isActive: true,
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
          adminId: admin.id
        }
      });
      console.log('✅ Coupon created:', coupon.code);
    }
  }

  // Create sample certificates
  const sampleCertificates = [
    {
      certificateId: 'ADIMA-2024-ABC123',
      studentName: 'John Doe',
      studentEmail: 'john.doe@example.com',
      courseTitle: 'Complete Web Development Bootcamp',
      adminId: admin.id
    },
    {
      certificateId: 'ADIMA-2024-DEF456',
      studentName: 'Jane Smith',
      studentEmail: 'jane.smith@example.com',
      courseTitle: 'Digital Marketing Masterclass',
      adminId: admin.id
    },
    {
      certificateId: 'ADIMA-2024-GHI789',
      studentName: 'Mike Johnson',
      studentEmail: 'mike.johnson@example.com',
      courseTitle: 'Data Science Fundamentals',
      adminId: admin.id
    }
  ];

  for (const certData of sampleCertificates) {
    const course = await prisma.course.findFirst({
      where: { title: certData.courseTitle }
    });

    if (course) {
      const existingCertificate = await prisma.certificate.findUnique({
        where: { certificateId: certData.certificateId }
      });

      if (!existingCertificate) {
        await prisma.certificate.create({
          data: {
            ...certData,
            courseId: course.id
          }
        });
        console.log('✅ Certificate created:', certData.certificateId);
      }
    }
  }

  // Create sample analytics data
  const analyticsEvents = [
    { eventType: 'download', eventData: '{"materialId":"1","materialTitle":"Course Introduction"}' },
    { eventType: 'coupon_used', eventData: '{"couponCode":"ADIMA-LEARN2024-WEB","studentName":"Test Student"}' },
    { eventType: 'certificate_verified', eventData: '{"certificateId":"ADIMA-2024-ABC123"}' },
    { eventType: 'contact_form_submission', eventData: '{"name":"Test User","email":"test@example.com"}' }
  ];

  for (const eventData of analyticsEvents) {
    await prisma.analytics.create({
      data: eventData
    });
  }

  console.log('✅ Sample analytics data created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📋 Login Credentials:');
  console.log('   Email: admin@adima.com');
  console.log('   Password: admin123');
  console.log('');
  console.log('🎫 Sample Coupon Codes:');
  console.log('   ADIMA-LEARN2024-WEB');
  console.log('   ADIMA-STUDENT24-WEB');
  console.log('   ADIMA-EDUCATE-WEB');
  console.log('   ADIMA-SKILLS-WEB');
  console.log('');
  console.log('📜 Sample Certificate IDs:');
  console.log('   ADIMA-2024-ABC123');
  console.log('   ADIMA-2024-DEF456');
  console.log('   ADIMA-2024-GHI789');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });