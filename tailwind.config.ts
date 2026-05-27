import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#d98a84'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(38, 30, 25, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
