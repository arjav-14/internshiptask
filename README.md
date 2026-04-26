# 🎵 Audio Transcription Dashboard

A modern, full-stack Next.js application for audio transcription featuring AI-powered transcription with a beautiful, contemporary UI design.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based admin login system with localStorage
- **🎤 Audio Upload**: Drag-and-drop interface supporting MP3, WAV, M4A formats
- **🤖 AI Transcription**: Google Gemini API integration for accurate transcription
- **📊 Transcript Management**: View, search, and manage all transcriptions
- **🎨 Modern UI**: Glass morphism design with vibrant gradients and animations
- **📱 Responsive Design**: Mobile-first responsive layout
- **💾 Database Storage**: PostgreSQL with Prisma ORM
- **⚡ Real-time Processing**: Fast transcription with loading states

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Custom JWT with localStorage
- **Password Hashing**: bcryptjs
- **AI**: Google Gemini API (gemini-flash-latest)
- **Styling**: Tailwind CSS with modern gradients
- **UI Components**: Custom glass morphism design
- **Icons**: Heroicons
- **Deployment**: Production ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd transcription-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your `.env.local`**:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/transcription_db"
   BETTER_AUTH_SECRET="your-secret-key-here"
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

5. **Set up the database**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🔑 Default Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

### 🎯 First Steps

1. Login with the default credentials
2. Navigate to the dashboard to see transcript history
3. Click "Upload Audio" to transcribe your first audio file
4. Upload an MP3, WAV, or M4A file
5. Wait for AI transcription to complete
6. View and copy your transcribed text

## 📁 Project Structure

```
transcription-dashboard/
├── app/
│   ├── api/                 # API routes
│   │   ├── login/          # Authentication endpoints
│   │   ├── logout/         # Logout endpoint
│   │   ├── upload/         # Audio transcription
│   │   └── transcripts/    # Transcript management
│   ├── dashboard/          # Main dashboard page with stats
│   ├── upload/             # Modern drag-and-drop upload page
│   ├── transcripts/        # Transcript details page
│   ├── login/              # Beautiful login page
│   ├── page.js             # Root redirect to login
│   └── layout.js           # Root layout
├── lib/                    # Utility libraries
│   ├── auth.js            # JWT authentication helpers
│   ├── gemini.js          # Gemini API integration
│   └── prisma.js          # Database client
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Database seeding
├── middleware.js           # Authentication middleware
├── .env                    # Environment variables
└── README.md              # This file
```

## 🌐 API Endpoints

### Authentication
- `POST /api/login` - Admin login with JWT token response
- `POST /api/logout` - Admin logout

### Transcription
- `POST /api/upload` - Upload and transcribe audio files
- `GET /api/transcripts` - Get all transcripts for authenticated admin

## 🗄️ Database Schema

### Admin
- `id`: Unique identifier (UUID)
- `username`: Admin username
- `password`: Hashed password (bcrypt)
- `createdAt`: Account creation timestamp

### Transcript
- `id`: Unique identifier (UUID)
- `text`: Transcribed audio content
- `createdAt`: Transcription timestamp
- `adminId`: Foreign key to admin (UUID)

## 📱 Pages & Features

### `/login`
- 🎨 Modern glass morphism design
- ✅ Form validation and error handling
- 🔄 Automatic redirect to dashboard on success
- 🎯 Demo credentials display

### `/dashboard`
- 📊 Statistics cards with gradient designs
- 📝 Transcript history with hover effects
- 🔍 Search and filter capabilities
- 🎨 Modern UI with glass morphism effects
- 📱 Fully responsive design

### `/upload`
- 🎤 Drag-and-drop file upload interface
- ✨ Real-time file validation
- 🔄 Loading states with animations
- 📊 File size display and formatting
- 🎨 Modern gradient design

### `/transcripts`
- 📄 Full transcript display with formatting
- 📋 Copy text functionality with visual feedback
- 📅 Timestamp and metadata information
- 🎨 Beautiful gradient header design
- 📱 Mobile-optimized layout

## 🔒 Security Features

- 🔐 JWT-based authentication with localStorage
- 🛡️ Password hashing with bcryptjs
- 🚫 Protected API routes with middleware
- ✅ File type validation (audio/* only)
- 📏 File size limits (10MB max)
- 🛡️ SQL injection protection with Prisma
- 🔒 Input sanitization and validation

## 🚀 Deployment

### Railway Deployment

1. **Create Railway Account**: Sign up at [railway.app](https://railway.app)

2. **Connect GitHub Repository**: 
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables**:
   ```
   DATABASE_URL=postgresql://postgres:password@host:port/database
   BETTER_AUTH_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Set Up PostgreSQL**:
   - Add PostgreSQL service in Railway
   - Copy the DATABASE_URL to your app's environment variables

5. **Deploy**:
   - Railway will automatically build and deploy
   - Run the seed script: `npm run db:seed`

6. **Access Your App**: Your app will be available at `https://your-app-name.railway.app`

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure Environment Variables** in Vercel dashboard

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with admin user
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/transcription_db"
BETTER_AUTH_SECRET="your-secret-key-here"
GEMINI_API_KEY="your-gemini-api-key-here"
```

## 🎨 UI Features

### Design System
- **Glass Morphism**: Modern translucent effects
- **Gradient Colors**: Purple-pink-orange color palette
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach
- **Dark Mode Ready**: Color system supports dark themes

### Components
- **Authentication Forms**: Modern login interface
- **Dashboard Cards**: Statistics with gradient designs
- **Upload Interface**: Drag-and-drop with visual feedback
- **Transcript Display**: Formatted text with copy functionality

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**: 
   - Check your DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Gemini API Error**: 
   - Verify your GEMINI_API_KEY is valid
   - Check API quota limits
   - Ensure proper model configuration

3. **Authentication Issues**: 
   - Ensure BETTER_AUTH_SECRET is set
   - Check localStorage for token
   - Verify middleware configuration

4. **File Upload Issues**: 
   - Check file size limits (10MB max)
   - Verify file type (audio/* only)
   - Ensure proper FormData handling

5. **UI Rendering Issues**: 
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify component imports

### Getting Help

- 📋 Check browser console for errors
- 🔍 Verify all environment variables are set correctly
- 🗄️ Ensure database is properly seeded with admin user
- 📧 Check Railway/Vercel logs for deployment issues
- 🔄 Try clearing Next.js cache: `rm -rf .next`

## 📄 License

This project is for demonstration purposes only.

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using Next.js, Tailwind CSS, and Google Gemini API**
