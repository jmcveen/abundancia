import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════════════
      // "Living Earth" Color Palette
      // Regenerative Nature meets Sacred Luxury
      // ═══════════════════════════════════════════════════════════════════════════
      colors: {
        // Canvas colors - The breathing room
        canvas: {
          DEFAULT: '#FDFBF5',
          subtle: '#F8F5ED',
          muted: '#F0EBE0',
          emphasis: '#E6DFD0',
        },

        // Primary - Deep Forest Green (Regeneration + Authority)
        primary: {
          50: '#f0f7f1',
          100: '#d9ebdc',
          200: '#b3d7ba',
          300: '#82bd8e',
          400: '#529e62',
          500: '#3a8249',
          600: '#2d6838',
          700: '#26562f',
          800: '#1E4528', // Main brand color
          900: '#183920',
          950: '#0c1f12',
        },

        // Accent - Warm Earth / Hempcrete (Warmth + Grounding)
        accent: {
          50: '#faf6f2',
          100: '#f4ebe0',
          200: '#e8d4bf',
          300: '#d9b894',
          400: '#C4956A', // Primary accent - hempcrete
          500: '#B07D4F',
          600: '#9A6840',
          700: '#7E5335',
          800: '#67442D',
          900: '#553928',
          950: '#2E1D14',
        },

        // Secondary - Sacred Gold (Investment + Sacred)
        secondary: {
          50: '#fdfbf0',
          100: '#faf3d8',
          200: '#f3e5ab',
          300: '#ebd375',
          400: '#D4B84A', // Light gold
          500: '#C9A227', // Sacred gold
          600: '#AF8A1F',
          700: '#8E6E1C',
          800: '#74591C',
          900: '#60491C',
          950: '#37280E',
        },

        // Neutral - Warm Gray Scale with green undertone
        neutral: {
          50: '#faf9f6',
          100: '#f3f2ed',
          200: '#e5e3dc',
          300: '#d1cec4',
          400: '#ada89c',
          500: '#918b7e',
          600: '#756f63',
          700: '#5c5850',
          800: '#3D4A33', // Body text
          900: '#1A2E0A', // Primary headings
          950: '#0E1806',
        },

        // Status colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Typography - Same distinctive stack as Transformational Epicenter
      // ═══════════════════════════════════════════════════════════════════════════
      fontFamily: {
        display: ['"Tenor Sans"', 'Georgia', 'serif'],
        heading: ['"Libre Baskerville"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        accent: ['"DM Sans"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.625' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.05' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Container widths
      // ═══════════════════════════════════════════════════════════════════════════
      maxWidth: {
        'container-xs': '320px',
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1440px',
        'container-70vw': '70vw',
      },
      width: {
        'container-70vw': '70vw',
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Border radius - Organic, rounded edges
      // ═══════════════════════════════════════════════════════════════════════════
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Shadows - Warm-tinted with earthy undertones
      // ═══════════════════════════════════════════════════════════════════════════
      boxShadow: {
        'xs': '0 1px 2px rgba(26, 46, 10, 0.04)',
        'sm': '0 2px 4px rgba(26, 46, 10, 0.06)',
        'card': '0 4px 8px -2px rgba(26, 46, 10, 0.08), 0 2px 4px -1px rgba(26, 46, 10, 0.04)',
        'card-hover': '0 12px 24px -4px rgba(26, 46, 10, 0.10), 0 4px 8px -2px rgba(26, 46, 10, 0.04)',
        'lg': '0 12px 24px -4px rgba(26, 46, 10, 0.10), 0 4px 8px -2px rgba(26, 46, 10, 0.04)',
        'xl': '0 20px 40px -8px rgba(26, 46, 10, 0.12), 0 8px 16px -4px rgba(26, 46, 10, 0.06)',
        '2xl': '0 32px 64px -12px rgba(26, 46, 10, 0.16), 0 12px 24px -6px rgba(26, 46, 10, 0.08)',
        'inner-sm': 'inset 0 1px 2px rgba(26, 46, 10, 0.06)',
        'inner': 'inset 0 2px 4px rgba(26, 46, 10, 0.08)',
        'glow-primary': '0 0 24px -4px rgba(30, 69, 40, 0.25)',
        'glow-accent': '0 0 24px -4px rgba(196, 149, 106, 0.25)',
        'glow-gold': '0 0 24px -4px rgba(201, 162, 39, 0.25)',
        'nav': '0 1px 3px rgba(26, 46, 10, 0.08)',
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Animation - Natural, organic timing
      // ═══════════════════════════════════════════════════════════════════════════
      transitionDuration: {
        DEFAULT: '200ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out-expo',
        'slide-up': 'slideUp 0.6s ease-out-expo',
        'slide-down': 'slideDown 0.6s ease-out-expo',
        'slide-in-left': 'slideInLeft 0.6s ease-out-expo',
        'slide-in-right': 'slideInRight 0.6s ease-out-expo',
        'scale-in': 'scaleIn 0.4s ease-out-expo',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Background
      // ═══════════════════════════════════════════════════════════════════════════
      backgroundImage: {
        'gradient-warm-glow': 'radial-gradient(ellipse at 50% 0%, rgba(201, 162, 39, 0.08) 0%, transparent 60%)',
        'gradient-card-shine': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)',
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },

      backdropBlur: {
        nav: '12px',
        'glass': '16px',
      },
    },
  },
  plugins: [],
}

export default config
