const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const guides = [
  '7-erreurs-vente',
  'vendre-seul-vs-agent',
  'pacte-discretion',
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  for (const slug of guides) {
    const page = await ctx.newPage();
    const file = 'file://' + path.resolve(__dirname, `${slug}.html`);
    await page.goto(file, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: path.resolve(__dirname, `${slug}.pdf`),
      format: 'A4',
      printBackground: true,
      margin: { top: '18mm', right: '14mm', bottom: '18mm', left: '14mm' },
    });
    await page.close();
    console.log(`✓ ${slug}.pdf`);
  }
  await browser.close();
})();
