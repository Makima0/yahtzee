/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
  corePlugins: {
    preflight: false // 禁用小程序不兼容的样式重置
  }
}
