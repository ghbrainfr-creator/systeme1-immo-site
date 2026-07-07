/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./guides/*.html",
    "./adn-agent/*.html",
    "./mockup/*.html",
    "./assets/checklist-loi-source.html"
  ],
  theme: {
    extend: {
      colors: {
        navy: { 950:'#070B14', 900:'#0B1020', 800:'#0F1523', 700:'#161E31', 600:'#1E2638' },
        cool: { 50:'#F5F7FB', 200:'#E4E7EC', 400:'#98A2B3', 500:'#64748B' },
        accent: { blue:'#5BA3E8', blueDark:'#3B8DE0' },
        success: '#52C77A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Geist"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace','SFMono-Regular','Menlo','monospace'],
      },
    }
  },
  plugins: [],
}