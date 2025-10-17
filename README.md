# 🤖 AI Chat Application

Modern, feature-rich AI chat application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features real-time AI conversations, file uploads, speech-to-text, and persistent chat history.

## ✨ Features

### 🔐 Authentication
- User login with mock authentication
- Persistent session management (localStorage)
- Protected routes with automatic redirects
- User profile management

### 💬 Chat Interface
- Real-time AI conversations
- Streaming responses
- Chat history persistence (sessionStorage)

### 📎 File Management
- **Supported Formats:**
    - Images: JPG, PNG, GIF, WebP (max 5MB)
    - Documents: PDF, TXT (max 10MB)
- File preview before sending
- File type and size validation
- Visual file cards with metadata

### 🎤 Speech-to-Text
- Voice input using Web Speech API
- Real-time transcription
- Visual recording indicator

### 👤 Profile Management
- Custom avatar selection
- Edit name and email
- Real-time UI updates across app

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dziekiczan1/ai-chat-app
   cd ai-chat-app

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up environment variables**
    ```bash
    # Add your environment variables here
    GOOGLE_GENERATIVE_AI_API_KEY=your_api_url
    ```

4. **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
   
5. **Open your browser**
    ```bash
    Navigate to http://localhost:3000
    ```

5. **Default Login Credentials**
    ```bash
    Email: test@example.com
    Password: password123
    ```
