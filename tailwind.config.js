/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a1628',           // Deep navy background
        'dark-panel': '#0f1d35',        // Card background
        'dark-panel-hover': '#152642',  // Card hover state
        'dark-border': '#1a2942',       // Subtle borders
        'accent-blue': '#7dd3fc',       // Bright cyan accent
        'accent-blue-glow': '#38bdf8',  // Glowing blue
        'accent-purple': '#a78bfa',     // Purple accent
        'text-primary': '#f1f5f9',      // Primary text
        'text-secondary': '#94a3b8',    // Secondary text
        'text-muted': '#64748b',        // Muted text
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(125, 211, 252, 0.3)',
        'glow-lg': '0 0 40px rgba(125, 211, 252, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-card': 'linear-gradient(135deg, rgba(15, 29, 53, 0.8), rgba(10, 22, 40, 0.9))',
      },
    },
  },
  plugins: [],
}
