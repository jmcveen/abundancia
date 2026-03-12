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
      // "Sacred Luxury" Color Palette
      // Tesla/Apple-inspired — Dark, cinematic, editorial
      // ═══════════════════════════════════════════════════════════════════════════
      colors: {
        // Canvas colors - Light foundation
        canvas: {
          DEFAULT: '#ffffff',
          subtle: '#fafaf8',
          muted: '#f5f4f0',
          emphasis: '#eeeee8',
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
          800: '#1E4528',
          900: '#183920',
          950: '#0c1f12',
        },

        // Accent - Sacred Gold (#ceb78e as the anchor)
        accent: {
          50: '#fdf9f1',
          100: '#f9f0dc',
          200: '#f0deb8',
          300: '#e4c896',
          400: '#ceb78e', // User's preferred gold
          500: '#b9a070',
          600: '#9c8458',
          700: '#7d6a47',
          800: '#65553a',
          900: '#534631',
          950: '#2e2618',
        },

        // Secondary - Cool accent for contrast
        secondary: {
          50: '#fdf9f1',
          100: '#f9f0dc',
          200: '#f0deb8',
          300: '#e4c896',
          400: '#ceb78e',
          500: '#b9a070',
          600: '#9c8458',
          700: '#7d6a47',
          800: '#65553a',
          900: '#534631',
          950: '#2e2618',
        },

        // Neutral - Pure cool grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
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
      // Typography - Luxury stack
      // ═══════════════════════════════════════════════════════════════════════════
      fontFamily: {
        display: ['"Tenor Sans"', 'Georgia', 'serif'],
        heading: ['"Tenor Sans"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['"DM Sans"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.7' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.15' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '0.95' }],
        '9xl': ['8rem', { lineHeight: '0.9' }],
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
      // Border radius
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
      // Shadows - Subtle with warm gold hints
      // ═══════════════════════════════════════════════════════════════════════════
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 40px -8px rgba(0, 0, 0, 0.5)',
        'lg': '0 12px 40px -8px rgba(0, 0, 0, 0.5)',
        'xl': '0 20px 60px -12px rgba(0, 0, 0, 0.6)',
        '2xl': '0 32px 80px -16px rgba(0, 0, 0, 0.7)',
        'inner-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.4)',
        'glow-gold': '0 0 40px -8px rgba(206, 183, 142, 0.15)',
        'glow-primary': '0 0 40px -8px rgba(30, 69, 40, 0.2)',
        'glow-accent': '0 0 40px -8px rgba(206, 183, 142, 0.15)',
        'nav': '0 4px 30px -4px rgba(0, 0, 0, 0.3)',
      },

      // ═══════════════════════════════════════════════════════════════════════════
      // Animation - Smooth, cinematic timing
      // ═══════════════════════════════════════════════════════════════════════════
      transitionDuration: {
        DEFAULT: '300ms',
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
        'fade-in': 'fadeIn 0.8s ease-out-expo',
        'slide-up': 'slideUp 0.8s ease-out-expo',
        'slide-down': 'slideDown 0.8s ease-out-expo',
        'slide-in-left': 'slideInLeft 0.8s ease-out-expo',
        'slide-in-right': 'slideInRight 0.8s ease-out-expo',
        'scale-in': 'scaleIn 0.6s ease-out-expo',
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
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
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
        'gradient-warm-glow': 'radial-gradient(ellipse at 50% 0%, rgba(206, 183, 142, 0.06) 0%, transparent 60%)',
        'gradient-card-shine': 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 60%)',
      },

      backdropBlur: {
        nav: '20px',
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
