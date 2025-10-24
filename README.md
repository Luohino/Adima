# Adima - Premium Educational Platform

A comprehensive educational platform built with Next.js 15, featuring a coupon-based access system, certificate verification, and a powerful admin dashboard.

## 🚀 Features

### 🎓 Student Features
- **Course Access**: Access premium courses through unique coupon codes
- **Certificate Verification**: Public verification system for authenticity
- **Downloadable Materials**: Access course materials and resources
- **Live Webinars**: Join interactive sessions with instructors
- **Responsive Design**: Mobile-first approach for all devices

### 🛠️ Admin Features
- **Dashboard**: Comprehensive admin dashboard with analytics
- **Course Management**: Create, edit, and manage courses
- **Coupon System**: Generate unique one-time-use coupon codes
- **Certificate Management**: Issue and manage certificates
- **Analytics**: Track downloads, usage, and student engagement
- **Google Drive Integration**: Process and manage Drive links automatically

### 🔐 Security Features
- **JWT Authentication**: Secure admin login system
- **Coupon Validation**: Prevents reuse and ensures validity
- **Role-Based Access**: Admin-only access to sensitive features
- **Input Validation**: Comprehensive validation on all inputs

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Lucide React** for icons
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **Prisma ORM** with SQLite
- **JWT** for authentication
- **bcryptjs** for password hashing
- **UUID** for unique identifiers

### Database
- **SQLite** for development
- **Prisma** for database management
- **Relational schema** with proper relationships

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adima-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Default Credentials

### Admin Login
- **Email**: admin@adima.com
- **Password**: admin123

### Sample Coupon Codes
- ADIMA-LEARN2024-COM
- ADIMA-STUDENT24-COM
- ADIMA-EDUCATE-COM
- ADIMA-SKILLS-COM

### Sample Certificate IDs
- ADIMA-2024-ABC123
- ADIMA-2024-DEF456
- ADIMA-2024-GHI789

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and login
│   ├── api/               # API routes
│   │   ├── admin/         # Admin-specific APIs
│   │   ├── coupons/       # Coupon validation
│   │   ├── certificates/  # Certificate verification
│   │   ├── contact/       # Contact form
│   │   └── analytics/     # Analytics tracking
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── courses/           # Courses listing
│   ├── coupon-access/     # Coupon redemption
│   └── verify-certificate/ # Certificate verification
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   ├── db.ts            # Database client
│   ├── drive-utils.ts   # Google Drive utilities
│   └── utils.ts         # General utilities
└── hooks/               # Custom React hooks
```

## 🎯 Core Functionality

### Coupon System
- **Unique Codes**: Each coupon has a unique code and token
- **One-Time Use**: Prevents reuse by tracking student emails
- **Expiration**: Built-in expiration with extension capability
- **Validation**: Comprehensive validation before access

### Certificate Verification
- **Public Access**: Anyone can verify certificates
- **Unique IDs**: Each certificate has a unique ID
- **Validation**: Checks authenticity and validity status
- **Analytics**: Tracks verification attempts

### Admin Dashboard
- **Real-time Stats**: Overview of courses, coupons, and certificates
- **Course Management**: Full CRUD operations for courses
- **Coupon Generation**: Create coupons with custom settings
- **Certificate Issuance**: Issue certificates to students
- **Analytics**: Detailed usage and engagement metrics

### Google Drive Integration
- **Link Processing**: Automatic conversion to direct download links
- **File Type Detection**: Identifies videos, documents, and images
- **Batch Processing**: Handle multiple links at once
- **Validation**: Checks link accessibility

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database
npm run db:seed      # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Design System

### Colors
- **Primary**: Red (#DC2626)
- **Background**: White (#FFFFFF)
- **Text**: Gray (#111827)
- **Accent**: Light Gray (#F9FAFB)

### Typography
- **Font**: Geist Sans (system font stack)
- **Headings**: Bold, responsive sizing
- **Body**: Regular, good readability

### Components
- **Cards**: Consistent padding and shadows
- **Buttons**: Red primary, white secondary
- **Forms**: Clean, accessible design
- **Navigation**: Sticky header with clear hierarchy

## 🔒 Security Considerations

### Authentication
- JWT tokens with expiration
- Password hashing with bcryptjs
- Role-based access control
- Secure admin routes

### Data Validation
- Input sanitization
- Type checking with TypeScript
- Prisma validation rules
- API request validation

### Best Practices
- Environment variables for secrets
- HTTPS in production
- CORS configuration
- Rate limiting (recommended)

## 📊 Analytics & Tracking

### Events Tracked
- Coupon usage
- File downloads
- Certificate verifications
- Contact form submissions
- Page visits

### Metrics Available
- Total downloads
- Active students
- Popular courses
- Coupon redemption rates
- Certificate verification counts

## 🚀 Deployment

### Environment Setup
1. Set production environment variables
2. Configure database connection
3. Set JWT secret
4. Configure CORS settings

### Build Process
```bash
npm run build
npm run start
```

### Recommended Platforms
- **Frontend**: Vercel (recommended for Next.js)
- **Backend**: Render, AWS, or DigitalOcean
- **Database**: PostgreSQL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- **Email**: support@adima.com
- **Documentation**: Check the `/contact` page
- **Issues**: Create an issue in the repository

## 🔄 Future Enhancements

### Planned Features
- [ ] Email notifications for students
- [ ] Advanced analytics dashboard
- [ ] Course progress tracking
- [ ] Student profiles
- [ ] Subscription management
- [ ] Mobile app
- [ ] Video streaming
- [ ] Payment integration
- [ ] Multi-language support
- [ ] API documentation

### Technical Improvements
- [ ] Redis caching
- [ ] CDN integration
- [ ] Load balancing
- [ ] Database optimization
- [ ] Advanced security features
- [ ] Performance monitoring

---

**Built with ❤️ by the Adima Team**