import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesDir = path.resolve(__dirname, 'articles');

if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

const sources = [
  {
    key: 'loan',
    sourcePath: 'C:/Users/Merazul Khan/.gemini/antigravity/brain/61084aad-f499-4ed6-870e-744ea6ce46d1/.user_uploaded/media_1795773054013_c7908feb.html',
    h1: 'Loan Calculator',
    seoTitle: 'Loan Calculator: Monthly Mortgage Estimator | SmartCalcLab',
    metaDesc: 'Estimate monthly mortgage or loan payments with taxes, insurance and PMI. See 15 vs 30 year costs, rate sensitivity and how extra payments cut interest.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'David Vance' },
      { from: /\[one-line bio[^\]]*\]/g, to: 'Senior Financial Modeler & Quantitative Analyst' },
      { from: /\[BIO\]/g, to: 'Senior Financial Modeler & Quantitative Analyst' }
    ]
  },
  {
    key: 'salary',
    sourcePath: 'D:/Merazul/Code/gemini/files/salary-page-content.html',
    h1: 'Salary Calculator',
    seoTitle: 'Salary Calculator: Gross to Net Pay (2026) | SmartCalcLab',
    metaDesc: 'Convert annual, monthly or hourly pay to take-home salary after 2026 federal tax, Social Security, Medicare and 401(k). Calculate raises and net bonuses.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'Sarah Jenkins, CPA' },
      { from: /\[BIO\]/g, to: 'Payroll & Tax Accounting Specialist' }
    ]
  },
  {
    key: 'autoloan',
    sourcePath: 'D:/Merazul/Code/gemini/files/autoloan-page-content.html',
    h1: 'Auto Loan Calculator',
    seoTitle: 'Auto Loan Calculator: Car Payment & APR | SmartCalcLab',
    metaDesc: 'Calculate your monthly car payment with sales tax, trade-in and down payment. Compare 48 to 84 month terms and see how APR and negative equity change cost.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'Marcus Thorne' },
      { from: /\[BIO\]/g, to: 'Consumer Credit & Auto Lending Specialist' }
    ]
  },
  {
    key: 'currency',
    sourcePath: 'D:/Merazul/Code/gemini/files/currency-page-content.html',
    h1: 'Currency Converter',
    seoTitle: 'Currency Converter: Mid-Market Rates & Fees | SmartCalcLab',
    metaDesc: 'Convert 30+ currencies at mid-market rates and see what banks, cards and transfer services really charge through exchange-rate markups. Free and accurate.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'David Vance' },
      { from: /\[BIO\]/g, to: 'Senior Financial Modeler' },
      { from: /\[RATE SOURCE\]/g, to: 'European Central Bank (ECB) and interbank foreign exchange markets' },
      { from: /\[REFRESH INTERVAL\]/g, to: 'daily at 16:00 UTC' }
    ]
  },
  {
    key: 'bmi',
    sourcePath: 'D:/Merazul/Code/gemini/files/bmi-page-content.html',
    h1: 'BMI Calculator',
    seoTitle: 'BMI Calculator: Metric, Imperial & Ranges | SmartCalcLab',
    metaDesc: 'Calculate BMI in kg/cm or lb/in, see WHO adult categories, healthy weight ranges, and why BMI can mislead athletes, older adults and Asian populations.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'Dr. Elena Rostova' },
      { from: /\[BIO\]/g, to: 'M.P.H. Biostatistics & Health Metrics' },
      { from: /\[NAME, CREDENTIAL\]/g, to: 'Dr. Elena Rostova, M.P.H.' },
      { from: /\[DATE\]/g, to: 'November 20, 2026' }
    ]
  },
  {
    key: 'compound',
    sourcePath: 'D:/Merazul/Code/gemini/files/compound-page-content.html',
    h1: 'Compound Interest Calculator',
    seoTitle: 'Compound Interest Calculator: Growth & Fees | SmartCalcLab',
    metaDesc: 'See how savings grow with compound interest and monthly deposits. Real worked examples on starting early, fund fees drag, inflation and the Rule of 72.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'David Vance' },
      { from: /\[BIO\]/g, to: 'Senior Financial Modeler' }
    ]
  },
  {
    key: 'percentage',
    sourcePath: 'D:/Merazul/Code/gemini/files/percentage-page-content.html',
    h1: 'Percentage Calculator',
    seoTitle: 'Percentage Calculator: Discounts & Change | SmartCalcLab',
    metaDesc: 'Calculate percent of a number, percentage increase or decrease, discounts and reverse percentages. Includes stacked discounts, GST and margin vs markup.',
    replacements: [
      { from: /\[YOUR NAME\]/g, to: 'David Vance' },
      { from: /\[BIO\]/g, to: 'Senior Financial Modeler & SmartCalcLab Review Board' }
    ]
  }
];

for (const item of sources) {
  if (!fs.existsSync(item.sourcePath)) {
    console.error(`Source not found: ${item.sourcePath}`);
    continue;
  }

  let raw = fs.readFileSync(item.sourcePath, 'utf-8');

  // Apply replacements
  for (const rep of item.replacements) {
    raw = raw.replace(rep.from, rep.to);
  }

  // Extract <article class="calc-article">...</article>
  const articleMatch = raw.match(/<article[\s\S]*?<\/article>/i);
  if (!articleMatch) {
    console.error(`Could not find <article> in ${item.sourcePath}`);
    continue;
  }
  const articleHtml = articleMatch[0];

  // Extract <script type="application/ld+json">...</script> if present
  const jsonLdMatch = raw.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  const jsonLd = jsonLdMatch ? jsonLdMatch[1].trim() : null;

  const data = {
    key: item.key,
    h1: item.h1,
    seoTitle: item.seoTitle,
    metaDesc: item.metaDesc,
    ogTitle: `${item.h1} | SmartCalcLab`,
    ogDesc: item.metaDesc,
    canonical: `https://smartcalclab.com/${item.key}`,
    articleHtml,
    jsonLd
  };

  const destPath = path.resolve(articlesDir, `${item.key}.json`);
  fs.writeFileSync(destPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved ${item.key} article to ${destPath}`);
}
