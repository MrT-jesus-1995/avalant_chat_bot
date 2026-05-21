# 💬 AutomationX Widgets

A lightweight chat widget library for integrating automated chat interfaces into web applications. This project showcases the **Avalant AutomationX Widgets** library with practical examples and a demo server.

## 🎯 Features

- **Chat Widget Components** - Modular chat UI components including:
  - ChatWidget - Main chat interface
  - ChatMessage - Message display
  - ChatBody, ChatHeader, ChatFooter - Layout components
  - ChatBadge - Status indicators
  - MessageIcon, MicrophoneIcon - UI elements

- **Easy Integration** - Simple HTML-based demo with image gallery
- **Server Support** - Node.js server with webhook support for real-time interactions
- **CORS Enabled** - Ready for cross-origin requests

## 📦 Project Structure

```
AutomationX_Widgets/
├── server.js              # Node.js server with webhook support
├── image-gallery.html     # Demo webpage
├── package.json           # Project dependencies
├── images/               # Asset storage
└── New folder/           # Widget library components
    └── avalant-automationx-widgets-0.0.17/
        └── package/      # Pre-built components
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm or yarn

### Installation

```bash
npm install
```

### Run the Server

```bash
node server.js
```

The server will start on `http://localhost:3000`

## 🛠️ Dependencies

- **@avalant/automationx-widgets** (v0.0.17) - Chat widget library
- **showdown** (v2.1.0) - Markdown to HTML converter

## 📝 Usage

Include the widget components in your HTML and customize as needed. Check `image-gallery.html` for implementation examples.

## 🌟 Features Highlights

- Responsive chat interface
- Icon support (messaging, microphone)
- Webhook endpoint for chatbot integration
- CORS support for flexible deployment

---

**Happy chatting! 💬**
