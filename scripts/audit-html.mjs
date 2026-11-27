import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const tools = ['loan', 'salary', 'autoloan', 'currency', 'bmi', 'compound', 'percentage'];

console.log('--- AUDITING ALL 7 PRERENDERED HTML FILES ---');
let allPassed = true;

for (const tool of tools) {
  const filePath = path.resolve(distDir, `${tool}.html`);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${filePath}`);
    allPassed = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf-8');

  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';

  const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
  const desc = descMatch ? descMatch[1] : '';

  const canonicalMatch = html.match(/<link rel="canonical" href="(.*?)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';

  const h1Matches = html.match(/<h1[\s\S]*?<\/h1>/gi) || [];
  const h1Text = h1Matches.map(m => m.replace(/<[^>]+>/g, '').trim());

  const cleanText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = cleanText.split(' ').length;

  const hasFaqJsonLd = html.includes('"@type": "FAQPage"') || html.includes('"@type":"FAQPage"');

  console.log(`\nTool: /${tool}`);
  console.log(`  Title (${title.length} chars): ${title}`);
  console.log(`  Desc (${desc.length} chars): ${desc}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  H1 count: ${h1Matches.length} -> ${JSON.stringify(h1Text)}`);
  console.log(`  Visible Word Count: ${wordCount}`);
  console.log(`  FAQ JSON-LD: ${hasFaqJsonLd ? 'YES' : 'NO'}`);

  if (title.length < 40 || title.length > 65) {
    console.warn(`  [WARNING] Title length out of range: ${title.length}`);
  }
  if (desc.length < 120 || desc.length > 165) {
    console.warn(`  [WARNING] Description length out of range: ${desc.length}`);
  }
  if (h1Matches.length !== 1) {
    console.error(`  [ERROR] Page does not have exactly one H1! Count = ${h1Matches.length}`);
    allPassed = false;
  }
  if (wordCount < 1000) {
    console.error(`  [ERROR] Word count is under 1,000 words! Count = ${wordCount}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n✅ ALL 7 CALCULATOR PAGES FULLY PASSED SEO & AD-SENSE STANDARDS!');
} else {
  console.error('\n❌ SOME AUDIT CHECKS FAILED');
  process.exit(1);
}
