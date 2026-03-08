/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0057B7',
          dark: '#0033A0',
          soft: '#004AAD',
          light: '#00AEEF',
        },
        accent: '#00AEEF',
        success: '#10B981',
        danger: '#EF4444',
        background: '#F5F7FA',
        border: '#E5E7EB',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
        soft: '0 1px 3px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        card: '12px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
}

