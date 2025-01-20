/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx,html}',
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    fontFamily: {
      arialBlack: ['Arial Black', 'Arial', 'sans-serif'],
      dogica: ['Dogica Pixel', 'Arial', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.75rem', '1rem'], // 12px / 16px
      sm: ['0.875rem', '1.125rem'], // 14px / 18px
      base: ['1rem', '1.25rem'], // 16px / 20px
      md: ['1.25rem', '1.5rem'], // 18px / 22px
    },
    colors: {
      baseBlack: '#282739',
      black: '#000',
      white: '#FFF',
      'gray-1': '#ADAEC4',
      'gray-2': '#5D5B67',
      'gray-3': '#2E3F4B',
      'gray-4': '#BFCED9',
      'gray-5': '#99A9B5',
      'gray-6': '#303149',
      'green-1': '#12C512',
      'red-1': '#CE1B25'
    },
    extend: {},
  },
  plugins: [],
};
