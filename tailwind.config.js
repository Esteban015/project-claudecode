/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F0F1A',
          secondary: '#1A1A2E',
        },
        accent: {
          primary: '#7C3AED',
          hover: '#6D28D9',
        },
        text: {
          primary: '#E5E7EB',
          muted: '#9CA3AF',
        },
        border: '#2D2B55',
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.text.primary'),
            '--tw-prose-headings': theme('colors.text.primary'),
            '--tw-prose-links': theme('colors.accent.primary'),
            '--tw-prose-code': theme('colors.text.primary'),
            '--tw-prose-quotes': theme('colors.text.muted'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-bullets': theme('colors.accent.primary'),
            '--tw-prose-counters': theme('colors.text.muted'),
            '--tw-prose-captions': theme('colors.text.muted'),
            'a:hover': { color: theme('colors.accent.hover') },
          },
        },
      }),
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
