# My Personal Website 🌟

A nostalgic tribute to the golden age of the internet - a modern take on the classic 90s/early 2000s personal website aesthetic, built with modern web technologies.

## 🚀 Features

- 🏠 Retro-styled homepage with animated elements
- 📝 Blog system with dynamic content
- 📖 Interactive guestbook
- ❓ Q&A section
- 🎵 MIDI player
- 💫 Web ring integration
- 👥 Visitor counter
- 🌈 Retro UI elements (marquees, animated text, construction banners)
- 🎨 Classic 90s-inspired design with modern responsiveness

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB with Mongoose
- **Frontend**: React 19
- **Development**:
  - ESLint for code quality
  - Turbopack for fast builds
  - PostCSS for CSS processing
  - Bun for package management

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/my-personal-website.git
   cd my-personal-website
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```
   The site will be available at `http://localhost:3000`

## 🏗️ Building for Production

```bash
bun run build
bun start
```

## 📝 Project Structure

- `/app` - Next.js app router and API routes
- `/components` - React components
- `/data` - Static data (web ring sites, songs, site updates)
- `/models` - MongoDB/Mongoose models
- `/public` - Static assets
- `/lib` - Utility functions and helpers

## 🌟 Contributing

Feel free to submit issues and pull requests!

## 📜 License

This project is open source and available under the MIT license.
