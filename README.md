# Interactive Developer Portfolio

A modern, interactive developer portfolio built with Next.js featuring a command-line interface, dark mode, and animated transitions.

## Features

- 🖥️ Interactive Terminal Interface
  - Custom commands (help, ls, whoami, skills, etc.)
  - Command history
  - Real-time feedback

- 🌓 Dark/Light Mode
  - System preference detection
  - Manual toggle
  - Persistent theme state

- 📱 Responsive Design
  - Mobile-friendly layout
  - Grid-based project showcase
  - Adaptive navigation

- 📝 Contact Form
  - Form validation
  - Loading states
  - API integration
  - Error handling

- 🎯 Core Sections
  - About Me
  - Projects Showcase
  - Blog Posts
  - Contact Form

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-portfolio.git
cd interactive-portfolio
```

2. Install dependencies:
```bash
npm install
```


4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Available Terminal Commands

- `help`: Show available commands
- `about`: View about section
- `projects`: View projects section
- `blog`: View blog posts
- `contact`: View contact form
- `theme`: Toggle dark/light mode
- `clear`: Clear terminal
- `ls`: List all sections
- `whoami`: Display developer info
- `skills`: List technical skills

## Customization

### Adding New Commands

To add new commands, modify the `commands` object in `Portfolio.tsx`:

```javascript
const commands = {
  newCommand: {
    description: 'Description of what the command does',
    action: () => {
      // Command logic here
      return ['Output to display in terminal'];
    }
  }
};
```

### Modifying Content

1. **About Section**: Update the content in the `renderContent` function's 'about' case
2. **Projects**: Modify the projects array in the 'projects' case
3. **Blog Posts**: Update the blog posts array in the 'blog' case
4. **Contact Form**: Customize the form fields in the 'contact' case

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform:
- Vercel (recommended)
- Netlify
- AWS
- Digital Ocean

## Contributing

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes
```bash
git commit -m 'Add amazing feature'
```
4. Push to the branch
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Lucide React for the beautiful icons
- Tailwind CSS for the utility-first CSS framework
- Next.js team for the amazing framework

## Contact

Your Name - Aruna

Project Link: [https://github.com/yourusername/interactive-portfolio](https://github.com/yourusername/interactive-portfolio)