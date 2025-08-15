# LifeAid - Blood Donation Management System

A modern web application built with Next.js to connect blood donors with patients and manage blood donation events efficiently.

## 🩸 Project Overview

LifeAid is a comprehensive blood donation management platform that facilitates the critical connection between blood donors and patients in need. The application streamlines the blood donation process by providing tools for event management, donor registration, blood requests, and real-time coordination between all stakeholders.

## ✨ Key Features

### For Donors & Patients

- **User Registration & Authentication** - Secure account creation with role-based access (donor/patient)
- **Blood Request System** - Patients can request specific blood types with urgency levels
- **Event Discovery** - Browse and attend upcoming blood donation events
- **Interactive Maps** - Location-based event discovery using Leaflet maps
- **Profile Management** - Track donation history and medical information
- **Real-time Updates** - Stay informed about blood availability and events

### For Administrators

- **Event Management** - Create and manage blood donation events with location mapping
- **Patient Registration** - Admin-controlled patient account creation
- **Donor Oversight** - Monitor registered donors and their availability
- **Dashboard Analytics** - Track donations, requests, and system statistics

## 🛠️ Technology Stack

- **Frontend**: React 19, Next.js 15.4.4, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with JWT strategy
- **Maps**: Leaflet with React-Leaflet for interactive mapping
- **UI Components**: Custom components with Lucide React icons
- **Styling**: Tailwind CSS with custom design system

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── events/        # Event management
│   │   ├── patient/       # Patient operations
│   │   └── register/      # User registration
│   ├── admin/             # Admin dashboard
│   ├── user/              # User area (donors/patients)
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Button.jsx
│   ├── InputField.jsx
│   ├── DropDown.jsx
│   ├── NavBar.jsx
│   ├── MapComponent.jsx
│   └── LogoutButton.jsx
├── lib/                   # Utility libraries
│   ├── dbConnect.js       # MongoDB connection
│   └── authOptions.js     # NextAuth configuration
├── models/                # Database schemas
│   ├── User.js            # User model
│   └── Event.js           # Event model
└── middleware.js          # Route protection
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd life-aid
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a [`.env.local`](.env.local) file:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Database Seeding**
   Create an admin user:

   ```bash
   node seed.js
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 User Roles & Authentication

### Donor/Patient Users

- Register with personal and medical information
- Access user dashboard with navigation to home, blood requests, events, and profile
- Protected routes with role-based middleware

### Admin Users

- Complete administrative control
- Access to dashboard with event creation, donor management, and patient registration
- Separate admin interface with enhanced permissions

### Authentication Flow

- JWT-based authentication via [`NextAuth.js`](src/lib/authOptions.js)
- Password hashing with bcryptjs
- Role-based route protection via [`middleware`](src/middleware.js)

## 📊 Database Models

### User Model ([`src/models/User.js`](src/models/User.js))

- Personal information (name, email, phone, city)
- Medical data (blood group, donation history)
- Role management (donor, patient, admin)
- Availability tracking

### Event Model ([`src/models/Event.js`](src/models/Event.js))

- Event details (title, description, date/time)
- Location coordinates for mapping
- Image gallery support
- Attendance tracking

## 🗺️ Interactive Features

### Map Integration

- **Location Selection**: Interactive maps for event location picking using [`MapComponent`](src/components/MapComponent.jsx)
- **Event Discovery**: Geographic visualization of blood donation events
- **Responsive Design**: Mobile-optimized map interactions

### Real-time Updates

- Event attendance tracking
- Blood request management
- User profile synchronization

## 🎨 UI/UX Design

### Design System

- **Color Palette**: Red-themed design reflecting the blood donation context
- **Typography**: Clean, accessible font hierarchy
- **Components**: Modular, reusable UI components
- **Responsive**: Mobile-first design with desktop optimizations

### Navigation

- **Floating Navigation**: [`NavBar`](src/components/NavBar.jsx) with role-based menu items
- **Breadcrumb System**: Clear navigation hierarchy
- **Quick Actions**: Direct access to key features

## 🔧 API Endpoints

- **POST** `/api/register` - User registration
- **POST** `/api/patient` - Patient creation (admin only)
- **GET/POST** `/api/events` - Event management
- **POST** `/api/events/[id]/attendance` - Event attendance tracking
- **GET/POST** `/api/auth/[...nextauth]` - Authentication handling

## 🚦 Middleware & Security

Route protection implemented in [`src/middleware.js`](src/middleware.js):

- Admin routes restricted to admin users
- User routes accessible to donors and patients
- Automatic redirection for unauthorized access
- JWT token validation

## 📱 Responsive Design

- **Mobile-First**: Optimized for smartphones and tablets
- **Desktop Enhancement**: Enhanced features for larger screens
- **Cross-Browser**: Compatible with modern web browsers
- **Accessibility**: WCAG compliance considerations

## 🔮 Future Enhancements

- Real-time notifications
- Blood inventory tracking
- Hospital integration
- Mobile app development
- Advanced analytics dashboard
- Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**LifeAid** - _Connecting lives through the gift of blood_ ❤️
