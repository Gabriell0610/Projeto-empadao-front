import type { Config } from 'tailwindcss'
import { projectColors } from './theme/projectColors'

const config: Config = {
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
}
export default config
