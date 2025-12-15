# Memory App - Technical Test

A React Native mobile application built with Expo and Supabase for creating and uploading photo memories.

## 🎯 Project Overview

This app demonstrates a simple "Create Memory" feature where users can:
1. Select an image from their device
2. Add a title and description
3. Upload the image to Supabase Storage
4. Save memory metadata to a Supabase database
5. View a success confirmation

## 🏗️ Architecture

### Project Structure

```
memory-app/
├── app/                      # Expo Router screens
│   ├── _layout.tsx          # Root navigation layout
│   ├── index.tsx            # Create Memory screen
│   └── success.tsx          # Success confirmation screen
├── components/              # Reusable UI components
│   ├── ImagePicker.tsx     # Image selection component
│   ├── MemoryForm.tsx      # Form for title/description
│   └── LoadingOverlay.tsx  # Loading state overlay
├── services/               # Business logic layer
│   └── supabase.ts        # Supabase client & API functions
├── types/                 # TypeScript type definitions
│   └── memory.ts         # Memory-related types
├── utils/                # Utility functions
│   └── imageCompression.ts # Image compression logic
├── .env                  # Environment variables (create this!)
├── .env.example         # Environment variables template
└── README.md           # This file
```

### Key Design Decisions

**Component Composition**: Separated concerns into reusable components (`ImagePicker`, `MemoryForm`, `LoadingOverlay`) for better testability and maintainability.

**Service Layer**: Isolated Supabase logic in `services/supabase.ts` to make it easy to test, mock, or swap implementations.

**Image Compression**: Implemented automatic image compression to reduce upload time and storage costs while maintaining quality.

**Error Handling**: Comprehensive error handling at every async operation with user-friendly error messages.

**TypeScript**: Full type safety throughout the application for better developer experience and fewer runtime errors.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)
- Supabase account and project

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd memory-app
npm install
```

### 2. Configure Supabase

Follow the detailed guide in the Supabase dashboard or see the setup steps below:

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for provisioning to complete

#### Get API Credentials
1. Go to Project Settings → API
2. Copy your **Project URL**
3. Copy your **anon public** key

#### Create Database Table
Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Configure RLS Policies
```sql
-- Allow anonymous inserts
CREATE POLICY "Allow anonymous insert"
ON memories FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous selects
CREATE POLICY "Allow anonymous select"
ON memories FOR SELECT
TO anon
USING (true);
```

#### Create Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create a new bucket named `memory-images`
3. Make it **public**
4. Add policies for anonymous upload and access

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the App

```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with Expo Go app on your phone

## 🧪 Testing the App

1. **Launch the app** on your device or simulator
2. **Tap "Tap to select an image"** to choose a photo
3. **Enter a title** (required field)
4. **Enter a description** (optional)
5. **Tap "Upload Memory"**
6. **Wait for upload** (loading overlay will appear)
7. **View success screen** with your uploaded image

### Verify in Supabase
- Check the `memories` table for the new record
- Check the `memory-images` bucket for the uploaded file

## 🔧 Technologies Used

- **Expo** (~54.0) - React Native framework
- **Expo Router** (^6.0) - File-based routing
- **Supabase** (^2.87) - Backend as a Service
- **TypeScript** (~5.9) - Type safety
- **expo-image-picker** - Image selection
- **expo-image-manipulator** - Image compression

## 📝 Code Quality Features

✅ **TypeScript** - Full type safety
✅ **Component Separation** - Reusable, focused components
✅ **Error Handling** - Comprehensive try-catch blocks
✅ **Loading States** - User feedback during async operations
✅ **Form Validation** - Required field validation
✅ **Comments** - Documented complex logic and architecture decisions
✅ **RLS-Friendly** - Uses anon key with proper policies

## 🎨 UI/UX Features

- Clean, modern interface
- Loading states with overlay
- Error messages with alerts
- Image preview before upload
- Success confirmation screen
- Keyboard-aware scrolling

## ⚡ Performance Optimizations

- **Image Compression**: Automatically compresses images to 1200px width at 80% quality
- **Async Operations**: Non-blocking UI during uploads
- **Efficient Rendering**: Proper use of React hooks and state management

## 🔒 Security Considerations

- Environment variables for sensitive credentials
- `.env` excluded from git
- RLS policies on Supabase tables
- Anonymous access limited to insert/select only

## 🚧 Trade-offs & Future Improvements

### Current Limitations (by design for 2-3 hour scope)
- No authentication system
- No memory listing/viewing feature
- No edit/delete functionality
- Basic UI styling (functional over polished)
- No offline support

### Potential Enhancements
- Add user authentication
- Implement memory gallery view
- Add edit/delete capabilities
- Improve UI with animations
- Add offline queue for uploads
- Implement image caching
- Add unit and integration tests
- Add analytics tracking

## 📚 Learning Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Docs](https://reactnative.dev/)

## 🐛 Troubleshooting

### "Missing Supabase credentials" error
- Ensure `.env` file exists in project root
- Verify environment variables are correctly named with `EXPO_PUBLIC_` prefix
- Restart the Expo dev server after creating `.env`

### Image upload fails
- Check Supabase Storage bucket exists and is public
- Verify RLS policies are configured correctly
- Check network connection

### Permission denied for photos
- Grant photo library permissions when prompted
- On iOS: Settings → Privacy → Photos → Expo Go
- On Android: Settings → Apps → Expo Go → Permissions

