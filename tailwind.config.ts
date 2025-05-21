/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';
import { projectColors } from './theme/projectColors';

export const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...projectColors,
      },
    },
  },
  plugins: [],
};

export default config;
