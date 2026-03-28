# Meetly 🎥

A modern, real-time video conferencing platform built with Next.js and Stream Video SDK. Connect with colleagues, friends, and family through high-quality video calls with scheduling, recording, and personal meeting rooms.

## ✨ Features

- **Instant Meetings** - Start video calls immediately with one click
- **Scheduled Meetings** - Plan and organize meetings in advance
- **Join Meetings** - Enter meetings via invitation links
- **Meeting Recordings** - Access and manage your recorded sessions
- **Personal Room** - Your dedicated meeting space with a permanent link
- **Upcoming & Previous** - Track your meeting history and schedule
- **Real-time Video** - High-quality video calls powered by Stream
- **Secure Authentication** - User management with Clerk
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Stream account ([sign up](https://getstream.io/))
- Clerk account ([sign up](https://clerk.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd meetly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Stream Video
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Configure Stream Dashboard**
   - Create a new app in your [Stream Dashboard](https://dashboard.getstream.io/)
   - Copy your API key to the environment variables

5. **Configure Clerk**
   - Create a new application in your [Clerk Dashboard](https://dashboard.clerk.com/)
   - Copy your publishable and secret keys to the environment variables

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) and sign up for an account.

## 📖 Usage

### Creating a Meeting

1. **Instant Meeting**: Click "New Meeting" to start immediately
2. **Scheduled Meeting**: Click "Schedule Meeting" to set a date and time
3. **Personal Room**: Access your permanent meeting link from the sidebar

### Joining a Meeting

- Click "Join Meeting" and enter the meeting link
- Or navigate directly to the shared meeting URL

### Managing Recordings

- Go to "Recordings" in the sidebar
- View, download, or delete your meeting recordings

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Video**: Stream Video React SDK
- **Authentication**: Clerk
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
meetly/
├── app/                   # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── constants/             # App constants and configuration
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── providers/             # Context providers
├── store/                 # Zustand state management
└── public/                # Static assets
```
