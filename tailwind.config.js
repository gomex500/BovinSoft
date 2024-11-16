module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', // Archivos principales
    './src/**/*.{js,jsx,ts,tsx}', // Todos los archivos en la carpeta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
