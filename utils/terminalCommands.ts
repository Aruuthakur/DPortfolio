import { TerminalCommand } from '../types';

export const createTerminalCommands = (
  setActiveTab: (tab: string) => void,
  setTheme: (theme: 'light' | 'dark') => void,
  clearTerminal: () => void
): Record<string, TerminalCommand> => ({
  help: {
    command: 'help',
    description: 'Show available commands',
    action: () => null,
  },
  about: {
    command: 'about',
    description: 'View about section',
    action: () => setActiveTab('about'),
  },
  projects: {
    command: 'projects',
    description: 'View projects',
    action: () => setActiveTab('projects'),
  },
  blog: {
    command: 'blog',
    description: 'View blog posts',
    action: () => setActiveTab('blog'),
  },
  contact: {
    command: 'contact',
    description: 'View contact form',
    action: () => setActiveTab('contact'),
  },
  theme: {
    command: 'theme',
    description: 'Toggle dark/light mode',
    action: () => setTheme('dark'),
  },
  clear: {
    command: 'clear',
    description: 'Clear terminal',
    action: clearTerminal,
  },
  ls: {
    command: 'ls',
    description: 'List all sections',
    action: () => null,
  },
  whoami: {
    command: 'whoami',
    description: 'Display developer info',
    action: () => null,
  },
  skills: {
    command: 'skills',
    description: 'List technical skills',
    action: () => null,
  },
}); 