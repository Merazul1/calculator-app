import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const indexHtmlPath = path.resolve(distDir, 'index.html')

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[prerender] dist/index.html not found! Run vite build first.')
  process.exit(1)
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8')

const TOOLS = [
  {
    key: 'salary',
    name: 'Annual to Gross & Net Salary Calculator',
    shortDesc: 'Calculate annual to gross wages, hourly to yearly pay, income tax deductions, and net take-home salary.',
    title: 'US Salary Calculator - Gross to Net Paycheck',
    subtitle: 'Convert between annual salary, monthly pay, and hourly wages to calculate your exact net take-home paycheck after federal, state, and local taxes.',
    metaDesc: 'Free US salary calculator to convert hourly, monthly, and annual pay to net take-home pay after federal and state taxes. Calculate your paycheck now.',
    badge: 'Annual & Gross Wage Converter',
    introParagraphs: [
      'Calculating your net take-home pay from your gross pay is essential when evaluating job offers, planning income growth, or budgeting monthly household expenses against median income benchmarks. Our free Annual to Gross and Net Salary Calculator converts between hourly rate, monthly wage, and annual salary, projecting your spendable paycheck after federal income tax, state income tax, local income tax, and statutory payroll deductions.',
      'Whether your compensation is distributed across 52 weekly pay periods, 26 bi-weekly periods, or 24 semi-monthly pay intervals, this tool gives you an accurate schedule. It factors in non-wage income, pre-tax contributions (such as traditional 401k and health plans), post-tax contributions (like Roth IRAs), standard W-4 information aligned with IRS Publication 15-T withholding methods, self-employment tax (SECA), and potential wages garnishment.'
    ],
    howItWorksTitle: 'How to Calculate Net Take-Home Pay',
    howItWorksSteps: [
      { step: '1. Select Wage Frequency & Gross Pay', desc: 'Specify your annual salary, monthly compensation, or hourly rate across 2,080 annual working hours (or 24 semi-monthly pay periods).' },
      { step: '2. Estimate Federal, State & Local Withholding', desc: 'Apply IRS Publication 15-T withholding guidelines, state income tax brackets, and local taxes to determine your taxable income.' },
      { step: '3. Include Pre-Tax Deductions & Contributions', desc: 'Factor in pre-tax contributions (401k, HSA, health insurance), self-employment tax, or court-ordered wages garnishment to find net take-home pay.' }
    ],
    formulaTitle: 'Net Salary & Paycheck Formula',
    formulaMath: 'Net Pay = Gross Pay - (Federal Income Tax + State Tax + Local Tax + FICA) - (Pre-Tax Deductions + Post-Tax Withholdings)',
    formulaExplanation: 'Gross pay is your total earned compensation before any withholdings. Taxable income equals gross earnings minus allowable pre-tax deductions. Your net take-home pay is the final amount deposited into your bank account after all income tax withholding and benefit deductions.',
    exampleTitle: 'Sample Salary Breakdown ($65,000 Annual Salary)',
    exampleText: 'An annual gross salary of $65,000 equals $5,416.67 per month, $2,500.00 semi-monthly (24 pay periods), or $31.25/hour. Subtracting 14% federal income tax ($9,100), 5% state income tax ($3,250), 7.65% FICA ($4,972.50), and $200/mo in pre-tax retirement contributions ($2,400) leaves an estimated net annual take-home pay of $45,277.50, or $3,773.13 per month.',
    faqsTitle: 'Salary, Paycheck & Tax Withholding FAQs',
    faqs: [
      {
        q: 'How do you convert annual salary to hourly rate using the 120,000 / 52 / 40 formula?',
        a: 'To calculate your hourly rate from an annual salary, divide your annual gross wages by 52 weeks and then by 40 hours per week (or divide directly by 2,080 standard annual working hours). For example: $120,000 / 52 / 40 = $57.69 per hour. Similarly, a $75,000 annual salary equals $36.06 per hour.'
      },
      {
        q: 'How do you calculate gross salary to net take-home pay?',
        a: 'To find your net take-home pay, subtract all statutory deductions from your gross earnings: Net Pay = Gross Pay - (Federal Income Tax + State Tax + Local Tax + 7.65% FICA) - Pre-tax & Post-tax Deductions. Pre-tax contributions such as traditional 401(k), HSA, and health insurance reduce your taxable gross income before income taxes are calculated.'
      },
      {
        q: 'What is the difference between bi-weekly (26 pay periods) and semi-monthly (24 pay periods)?',
        a: 'Bi-weekly pay occurs every other week, resulting in 26 pay periods per year (with two months having three paychecks). Semi-monthly pay occurs twice per month (typically on the 15th and last day of the month), totaling 24 pay periods per year. Divide your annual salary by 26 for bi-weekly gross pay, or by 24 for semi-monthly pay.'
      },
      {
        q: 'How do IRS Publication 15-T and Form W-4 determine income tax withholding?',
        a: 'IRS Publication 15-T provides the federal income tax withholding tables used by employer payroll departments. Your exact withholding depends on filing status, dependents, and additional withholding amounts specified on your Form W-4, which sets the portion of federal income tax deducted each pay cycle.'
      },
      {
        q: 'What are statutory FICA deductions on your paycheck?',
        a: 'FICA (Federal Insurance Contributions Act) is a mandatory federal payroll deduction split equally between employee and employer. Employees contribute 6.2% for Social Security (up to the statutory wage ceiling) and 1.45% for Medicare (with no wage ceiling), totaling a 7.65% statutory deduction from gross earnings.'
      },
      {
        q: 'What is the difference between pre-tax and post-tax payroll contributions?',
        a: 'Pre-tax deductions (such as traditional 401k retirement plans, HSA, FSA, and health insurance premiums) reduce your taxable gross earnings before federal and state income taxes are assessed. Post-tax contributions (such as Roth 401k or Roth IRA) are deducted after taxes, allowing tax-free qualified withdrawals in retirement.'
      }
    ],
    tips: [
      'Maxing out pre-tax retirement accounts (like 401k or employer pension) lowers your taxable income bracket and reduces current-year federal income tax.',
      'Review your Form W-4 with your employer periodically, especially after life events like marriage or having a child, to prevent under-withholding or excessive tax refunds.'
    ]
  },
  {
    key: 'loan',
    name: 'Loan Calculator & Mortgage Payment Estimator',
    shortDesc: 'Compute monthly loan and mortgage payments, down payment, property taxes, insurance, and amortization schedule.',
    title: 'Loan Calculator - Mortgage & Payment Estimator',
    subtitle: 'Accurately compute monthly loan and mortgage payments, calculate down payment savings, property taxes, homeowners insurance, and analyze your principal vs interest chart.',
    metaDesc: 'Free loan calculator to compute monthly mortgage and loan payments with taxes, insurance, down payment, interest rates, and full amortization schedule.',
    badge: 'High Precision Loan & Mortgage Tool',
    introParagraphs: [
      'Estimating your total monthly homeownership cost is the most critical step before shopping for real estate or negotiating a home loan. Our free Loan Calculator and Mortgage Payment Estimator allows you to compute your exact monthly mortgage payment, factoring in principal, interest, property taxes, homeowners insurance (hazard insurance), and private mortgage insurance (PMI).',
      'Whether you are computing down payment options for a first-time home purchase, evaluating a 15-year vs. 30-year fixed loan, or calculating amortization payoff schedules, this comprehensive simulator gives you full financial clarity.'
    ],
    howItWorksTitle: 'How to Compute Your Mortgage & Loan Payment',
    howItWorksSteps: [
      { step: '1. Enter Home Value & Down Payment', desc: 'Specify the home purchase price and your planned down payment ($ or %). A 20% down payment eliminates PMI costs.' },
      { step: '2. Set Interest Rate & Loan Term', desc: 'Input the annual mortgage interest rate (e.g., 6.5%) and select a 15-year, 20-year, or 30-year term.' },
      { step: '3. Include Taxes & Insurance (PITI)', desc: 'Include estimated annual property taxes, homeowners hazard insurance, and HOA fees to calculate your total monthly payment.' }
    ],
    formulaTitle: 'Mortgage Payment & Amortization Formula',
    formulaMath: 'M = P × [r(1 + r)^n] / [(1 + r)^n - 1] + (Taxes / 12) + (Insurance / 12)',
    formulaExplanation: 'Where M is total monthly payment, P is the principal loan amount (Home Price minus Down Payment), r is the monthly interest rate (Annual rate / 12 / 100), and n is the total number of monthly payments (Years × 12).',
    exampleTitle: 'Real-World Mortgage Calculation Example',
    exampleText: 'Buying a $400,000 home with a 20% down payment ($80,000) leaves a $320,000 loan. At a 6.5% interest rate over a 30-year term, the monthly Principal & Interest payment is $2,022.62. Adding $400/mo in property taxes and $100/mo in homeowners insurance brings the total monthly mortgage cost to $2,522.62.',
    faqsTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      { q: 'How do you compute mortgage payments with taxes and insurance?', a: 'To compute your total monthly mortgage payment (PITI), calculate your monthly Principal and Interest using the standard amortization formula, then add 1/12th of your estimated annual property taxes and 1/12th of your annual homeowners insurance premium.' },
      { q: 'How is interest calculated on a home loan?', a: 'Mortgage interest is calculated monthly on the remaining unpaid loan balance. Multiply the remaining principal by your annual interest rate, then divide by 12. As you pay down principal each month, the interest portion of each subsequent payment decreases.' },
      { q: 'How is the down payment for a house calculated?', a: 'The down payment is calculated as: Down Payment = Home Price × Down Payment Percentage. For a $350,000 home, a 20% down payment equals $70,000, which lowers your borrowing amount to $280,000 and eliminates private mortgage insurance (PMI).' }
    ],
    tips: [
      'Putting at least 20% down on a home purchase exempts you from paying Private Mortgage Insurance (PMI), saving $100 to $250 each month.',
      'Making one extra monthly mortgage payment each year can shave 4 to 6 years off a 30-year fixed mortgage and save tens of thousands in interest.'
    ]
  },
  {
    key: 'autoloan',
    name: 'Auto Loan & Car Payment Calculator',
    shortDesc: 'Calculate monthly car payments, trade-in value, down payment, sales tax, and loan amortization.',
    title: 'Auto Loan Calculator | Car Payment & Interest Estimator with Trade-in & Tax',
    subtitle: 'Estimate monthly car financing payments, trade-in credit, sales tax, APR, and total loan interest.',
    metaDesc: 'Free auto loan calculator and car payment estimator. Compute monthly car financing payments, trade-in value, down payment, sales tax, and amortization.',
    badge: 'High Precision Auto Tool',
    introParagraphs: [
      'Financing a new or used vehicle is one of the most common and significant recurring monthly expenses. Our free Auto Loan and Car Payment Calculator computes your exact monthly car loan payment, accounting for vehicle purchase price, cash down payment, trade-in allowance, state/local sales tax, and dealership loan APR.',
      'Whether you are negotiating at the dealership or shopping for private bank pre-approvals, this tool provides complete clarity with full payment amortization schedules.'
    ],
    howItWorksTitle: 'How to Calculate Your Car Payment',
    howItWorksSteps: [
      { step: '1. Enter Vehicle Price & Trade-In', desc: 'Specify the negotiated car price and any trade-in value or down payment cash you are contributing.' },
      { step: '2. Input Sales Tax Rate', desc: 'Add your local auto sales tax percentage to accurately finance registration and purchase taxes.' },
      { step: '3. Select Loan Term & Interest Rate', desc: 'Choose standard auto loan terms (36, 48, 60, or 72 months) and the APR quoted by your bank or dealership.' }
    ],
    formulaTitle: 'Auto Loan Amortization Formula',
    formulaMath: 'Monthly Payment = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
    formulaExplanation: 'Where P is the Net Financed Amount (Vehicle Price – Down Payment – Trade-In + Sales Tax), r is the monthly interest rate (APR / 12 / 100), and n is the total number of months (e.g. 60 months for a 5-year loan).',
    exampleTitle: 'Real-World Auto Loan Example',
    exampleText: 'Buying a $35,000 car with a $5,000 down payment, a $4,000 trade-in credit, and 7% sales tax ($2,450) leaves an amount financed of $28,450. At a 6.5% APR over 60 months (5 years), the monthly payment is $556.76 with total interest of $4,955.60.',
    faqsTitle: 'Auto Loan FAQs',
    faqs: [
      { q: 'What is a good auto loan interest rate (APR)?', a: 'Auto loan APRs vary by credit score. Borrowers with excellent credit (750+) typically qualify for 5% to 7% on new cars, while used car loans or lower credit scores can range from 8% to 14%+.' },
      { q: 'Should I choose a 60-month or 72-month auto loan?', a: 'A 60-month (5-year) loan is the recommended benchmark. 72-month and 84-month loans lower your monthly payment but cause you to pay significantly more interest and risk becoming upside-down.' }
    ],
    tips: [
      'Getting pre-approved by your credit union or bank before visiting a car dealership gives you powerful leverage to beat dealership markup rates.',
      'Aim to put at least 10% to 20% down to prevent negative equity as the vehicle depreciates.'
    ]
  },
  {
    key: 'currency',
    name: 'Live Currency Converter',
    shortDesc: 'Convert between world currencies with live market rates and fee estimates.',
    title: 'Live Currency Exchange Rate Converter | Real-Time Rates',
    subtitle: 'Instantly convert USD, EUR, GBP, MXN, INR, SAR, and 30+ global currencies.',
    metaDesc: 'Convert global currencies instantly with live updated exchange rates. Free tool for travelers, international business, and remittances.',
    badge: 'High Demand Utility',
    introParagraphs: [
      'Currency fluctuations impact everything from international travel and e-commerce shopping to overseas wire transfers and business invoices.',
      'Our live currency converter provides mid-market benchmark rates across major fiat currencies, allowing you to quickly verify fair exchange prices before making trades or international transfers.'
    ],
    howItWorksTitle: 'How to Convert Currencies',
    howItWorksSteps: [
      { step: '1. Select Source Currency', desc: 'Choose the currency you currently hold (e.g., USD, EUR, MXN).' },
      { step: '2. Select Target Currency', desc: 'Choose the currency you want to receive or evaluate.' },
      { step: '3. Enter the Amount', desc: 'Type any quantity to see the instant live converted value.' }
    ],
    formulaTitle: 'Exchange Calculation Formula',
    formulaMath: 'Converted Value = Amount × (Target Rate / Base Rate)',
    formulaExplanation: 'The mid-market rate represents the exact midpoint between the buy and sell prices in global financial markets.',
    exampleTitle: 'Example Conversion',
    exampleText: 'Converting $1,000 USD to Euros at an exchange rate of 1 USD = 0.92 EUR yields €920.00 EUR.',
    faqsTitle: 'Currency Conversion FAQs',
    faqs: [
      { q: 'What is the mid-market rate?', a: 'The mid-market rate is the real exchange rate without commercial markups added by banks or retail airport kiosks.' },
      { q: 'Why do bank transfer rates differ?', a: 'Banks usually add a 2% to 4% markup spread on top of the real exchange rate as a hidden fee.' }
    ],
    tips: [
      'Avoid airport currency kiosks where conversion markups can exceed 10% to 15%.',
      'Always choose to be charged in the local currency when paying with a card abroad.'
    ]
  },
  {
    key: 'bmi',
    name: 'BMI Calculator (Body Mass Index kg & cm)',
    shortDesc: 'Calculate Body Mass Index (BMI) in kg & cm, check WHO healthy weight charts, and ideal body weight.',
    title: 'Body Mass Index (BMI) Calculator (kg & cm) | WHO Chart',
    subtitle: 'Accurately calculate BMI using metric (cm & kg) or imperial units. Check WHO health categories and ideal weight ranges.',
    metaDesc: 'Free Body Mass Index (BMI) calculator for kg and cm. Instant metric BMI calculation, WHO category classification, and healthy weight range.',
    badge: 'WHO Metric Standards',
    introParagraphs: [
      'Body Mass Index (BMI) is a recognized screening benchmark used by physicians and public health organizations worldwide to assess whether a person has a healthy body weight for their height.',
      'While it does not directly measure body fat percentage, it serves as an effective, reliable indicator for health risks related to being underweight or overweight.'
    ],
    howItWorksTitle: 'How BMI is Determined',
    howItWorksSteps: [
      { step: '1. Choose Unit System', desc: 'Select Metric (centimeters & kilograms) or Imperial (feet/inches & pounds).' },
      { step: '2. Input Height & Weight', desc: 'Enter accurate measurements taken without shoes or heavy clothing.' },
      { step: '3. View Category & Advice', desc: 'See your exact BMI score along with World Health Organization (WHO) category brackets.' }
    ],
    formulaTitle: 'World Health Organization (WHO) Formula',
    formulaMath: 'Metric: BMI = weight (kg) / [height (m)]² | Imperial: BMI = 703 × weight (lbs) / [height (in)]²',
    formulaExplanation: 'Underweight: < 18.5 | Normal weight: 18.5 – 24.9 | Overweight: 25 – 29.9 | Obese: 30 or greater.',
    exampleTitle: 'Sample BMI Computation',
    exampleText: 'An adult standing 175 cm tall (1.75 m) and weighing 70 kg has a BMI of: 70 / (1.75 × 1.75) = 22.86, placing them squarely in the healthy Normal Weight range.',
    faqsTitle: 'BMI FAQs & Limitations',
    faqs: [
      { q: 'How do you calculate body mass index with kg and cm?', a: 'To calculate BMI in metric units (kg & cm), convert height from centimeters to meters by dividing by 100, square the result, and divide your weight in kilograms by this number: BMI = Weight (kg) / [Height (cm) / 100]².' }
    ],
    tips: [
      'Combine your BMI measurement with waist circumference for a more complete cardiovascular risk picture.'
    ]
  },
  {
    key: 'percentage',
    name: 'Percentage & Discount Calculator',
    shortDesc: 'Calculate percentage changes, find X% of Y, and compute sales discounts with tax.',
    title: 'Online Percentage & Discount Calculator | 3-in-1 Math Tool',
    subtitle: 'Effortlessly solve percentage increases, shopping sale discounts, and proportions.',
    metaDesc: 'Free 3-in-1 percentage calculator: calculate percentage of a number, percentage difference/change, and final discount prices with sales tax.',
    badge: 'Daily Math Utility',
    introParagraphs: [
      'Percentages are an everyday math necessity, whether you are calculating a discount on retail clothes, computing sales tax, figuring out a restaurant tip, or evaluating year-over-year revenue growth.',
      'Our fast calculator solves common percentage questions in one click without complicated mental arithmetic.'
    ],
    howItWorksTitle: 'Quick Percentage Modes',
    howItWorksSteps: [
      { step: 'Mode 1: X% of Y', desc: 'Find what a specific percentage of any number equals (e.g. 15% tip on $80).' },
      { step: 'Mode 2: Percentage Increase / Decrease', desc: 'Determine the percent change between an initial value and a new value.' },
      { step: 'Mode 3: Retail Discount & Tax', desc: 'Enter original price, discount percentage, and local sales tax to see final checkout total.' }
    ],
    formulaTitle: 'Fundamental Percentage Formula',
    formulaMath: 'Percentage Value = (Percentage / 100) × Base Number',
    formulaExplanation: 'Percentage Change = [(New Value - Original Value) / Original Value] × 100%',
    exampleTitle: 'Everyday Discount Example',
    exampleText: 'A jacket priced at $120 with a 30% discount saves you $36.00, yielding a sale price of $84.00. With 8% sales tax, the final price is $90.72.',
    faqsTitle: 'Percentage FAQs',
    faqs: [
      { q: 'How do you calculate a 20% tip quickly?', a: 'Move the decimal point one place to the left to find 10%, then double that number to get 20%.' }
    ],
    tips: [
      'To quickly add 15% tax, multiply the base price by 1.15.'
    ]
  },
  {
    key: 'compound',
    name: 'Compound Interest Calculator',
    shortDesc: 'See how your investments and savings grow over time with compounding returns.',
    title: 'Compound Interest Calculator – Savings & Investment Growth',
    subtitle: 'Simulate the power of compounding interest, regular contributions, and annual growth.',
    metaDesc: 'Free compound interest calculator. Calculate future investment value, interest earned, and wealth accumulation with monthly or annual contributions.',
    badge: 'Wealth & Investment Tool',
    introParagraphs: [
      'Albert Einstein famously called compound interest the eighth wonder of the world: "He who understands it, earns it; he who doesn\'t, pays it."',
      'By reinvesting the earnings your money generates, your balance grows exponentially over decades. Our tool visualizes this compounding snowball effect to help you plan retirement and savings milestones.'
    ],
    howItWorksTitle: 'How to Project Your Wealth Growth',
    howItWorksSteps: [
      { step: '1. Initial Deposit', desc: 'The starting balance you currently have in your investment portfolio or savings account.' },
      { step: '2. Monthly Contribution', desc: 'The recurring amount you plan to deposit every month.' },
      { step: '3. Estimated Annual Return & Horizon', desc: 'Your projected annual return rate (e.g. 7-10% for stock index funds) and investment years.' }
    ],
    formulaTitle: 'Compound Interest Mathematical Formula',
    formulaMath: 'A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]',
    formulaExplanation: 'Where P is Principal, r is annual interest rate (decimal), n is compounding frequency per year, t is time in years, and PMT is periodic payment.',
    exampleTitle: 'The Power of 30-Year Compounding',
    exampleText: 'Starting with $5,000 and contributing $300 every month at an 8% annual return over 30 years grows to $456,864. Your personal out-of-pocket contributions total $113,000, while earned interest contributes $343,864!',
    faqsTitle: 'Compound Interest FAQs',
    faqs: [
      { q: 'What is the Rule of 72?', a: 'Divide 72 by your annual interest rate to find the approximate number of years it takes for your investment to double. At 8%, your money doubles in ~9 years.' }
    ],
    tips: [
      'Time in the market is vastly more powerful than timing the market due to compounding curves.'
    ]
  }
]

const LEGAL_PAGES = [
  {
    key: 'privacy',
    title: 'Privacy Policy & Cookie Disclosures | SmartCalcLab',
    desc: 'SmartCalcLab privacy policy detailing our strict zero-data-retention commitment, GDPR, CCPA, and Google AdSense cookie compliance.',
    content: `
      <main style="max-width: 900px; margin: 2.5rem auto; padding: 2rem; font-family: system-ui, sans-serif; line-height: 1.7; color: #1e293b; background: #ffffff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Privacy Policy</h1>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Last Updated: November 2026</p>
        <p>Welcome to SmartCalcLab ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. All calculations run strictly in your web browser (client-side).</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">1. Information We Do Not Collect</h2>
        <p>When you use our financial, salary, loan, BMI, or currency calculators, all input numbers, salaries, loan terms, and health data remain strictly within your local browser session. We never transmit, store, or log your calculations on any external server.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">2. Cookies & Advertising</h2>
        <p>We use Google AdSense to serve ads when you visit our website. Google, as a third-party vendor, uses cookies to serve ads on our site.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">3. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@smartcalclab.com.</p>
      </main>
    `
  },
  {
    key: 'terms',
    title: 'Terms of Service | SmartCalcLab',
    desc: 'Terms and conditions governing the use of SmartCalcLab free online calculators and financial utility services.',
    content: `
      <main style="max-width: 900px; margin: 2.5rem auto; padding: 2rem; font-family: system-ui, sans-serif; line-height: 1.7; color: #1e293b; background: #ffffff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Terms of Service</h1>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Last Updated: November 2026</p>
        <p>By accessing and using SmartCalcLab, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">Use of Calculation Tools</h2>
        <p>Our tools are provided for general educational, illustrative, and informational purposes only. Results do not constitute binding financial, tax, or legal quotes.</p>
      </main>
    `
  },
  {
    key: 'about',
    title: 'About SmartCalcLab & Our Editorial Team',
    desc: 'Learn about the SmartCalcLab engineering and financial analysis team, our mission, verified calculation standards, and editorial integrity.',
    content: `
      <main style="max-width: 900px; margin: 2.5rem auto; padding: 2rem; font-family: system-ui, sans-serif; line-height: 1.7; color: #1e293b; background: #ffffff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">About SmartCalcLab</h1>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Empowering Global Decisions with Free, Accurate Tools</p>
        <p>SmartCalcLab was founded to solve a pervasive problem on the modern web: online calculators were slow, cluttered with intrusive popups, and frequently inaccurate or out of date.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">Our Three Foundational Pillars</h2>
        <p><strong>1. Instant Client-Side Computation:</strong> All calculations execute in under 10 milliseconds directly inside the user's web browser with zero server delay.</p>
        <p><strong>2. Absolute Privacy:</strong> We never log, transmit, or monetize your private financial inputs, loan amounts, or medical numbers.</p>
        <p><strong>3. Rigorous Editorial Standards:</strong> Our formulas are cross-referenced against official publications from the Consumer Financial Protection Bureau (CFPB), Internal Revenue Service (IRS), and World Health Organization (WHO).</p>
      </main>
    `
  },
  {
    key: 'contact',
    title: 'Contact Us & Editorial Support | SmartCalcLab',
    desc: 'Get in touch with the SmartCalcLab engineering and editorial support team. We welcome formula feedback, corrections, and tool suggestions.',
    content: `
      <main style="max-width: 900px; margin: 2.5rem auto; padding: 2rem; font-family: system-ui, sans-serif; line-height: 1.7; color: #1e293b; background: #ffffff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Contact SmartCalcLab</h1>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">We value your feedback, corrections, and inquiries.</p>
        <p>If you notice any formula discrepancies, have suggestions for new calculators, or wish to inquire about partnerships, please reach out to our team:</p>
        <p style="font-size: 1.125rem; font-weight: 600; color: #2563eb; margin: 1.5rem 0;">Email: support@smartcalclab.com</p>
      </main>
    `
  },
  {
    key: 'disclaimer',
    title: 'Legal, Financial & Medical Disclaimer | SmartCalcLab',
    desc: 'Important legal notices and disclaimers regarding the financial and health calculation tools on SmartCalcLab.',
    content: `
      <main style="max-width: 900px; margin: 2.5rem auto; padding: 2rem; font-family: system-ui, sans-serif; line-height: 1.7; color: #1e293b; background: #ffffff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Legal, Financial & Medical Disclaimer</h1>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Important User Disclosures</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">1. Financial & Tax Information</h2>
        <p>The calculations and estimates provided by SmartCalcLab are for educational and illustrative purposes only. They do not constitute certified financial planning, tax advice, or mortgage qualification from a licensed financial advisor or accountant.</p>
      </main>
    `
  }
]

const GUIDES = [
  {
    slug: 'mortgage-amortization-piti-guide',
    title: 'Understanding Mortgage Amortization & PITI (Principal, Interest, Taxes & Insurance) — Complete 2026 Guide',
    subtitle: 'A comprehensive breakdown of how monthly home payments are calculated, the role of escrow accounts, PMI thresholds, and how amortization shifts over 30 years.',
    category: 'Mortgage & Loans',
    readTime: '9 min read',
    publishedDate: 'November 2026',
    author: 'SmartCalcLab Financial Analysis Team',
    reviewedBy: 'CFPB & Federal Reserve Benchmark Guidelines',
    toolPath: '/loan',
    toolName: 'Loan Calculator & Mortgage Payment Estimator',
    summary: 'Master the four components of a monthly mortgage payment (PITI), understand the mathematical curve of amortization schedules, and learn five actionable strategies to save tens of thousands in lifetime interest charges.',
    paragraphs: [
      'When purchasing residential real estate, many first-time homebuyers mistakenly focus solely on the principal and interest quoted by their lender. In reality, your actual monthly housing expense consists of four distinct pillars known in the banking industry as PITI: Principal, Interest, Property Taxes, and Homeowners Insurance.',
      'Principal is the actual capital amount you borrow to buy the home. Interest is the lender’s fee for loaning you that capital, calculated as an Annual Percentage Rate (APR). Property taxes are assessed by your municipal county or local government to fund schools, roads, and emergency infrastructure. Finally, hazard insurance protects the property against fire, windstorms, and catastrophic damage.',
      'Amortization describes the process of gradually paying off a long-term debt through equal, scheduled monthly installments. Under the standard French amortization system used across the US, UK, and Europe, your monthly payment amount remains fixed throughout the loan term, but the internal distribution between principal and interest shifts dramatically.',
      'During the first 5 to 10 years of a 30-year fixed loan, roughly 70% to 80% of your monthly payment goes directly toward interest, while only a small fraction pays down your actual loan principal balance. As the principal balance slowly decreases over time, the monthly interest charge shrinks, allowing a larger portion of each subsequent payment to chip away at the principal balance.',
      'If your cash down payment is less than 20% of the home purchase price, conventional lenders will require you to purchase Private Mortgage Insurance (PMI). PMI does not protect you—it protects the lender in case you default on the loan. PMI premiums typically cost between 0.3% and 1.5% of your original loan amount annually, adding $100 to $300 to your monthly mortgage payment.'
    ]
  },
  {
    slug: 'gross-vs-net-salary-guide',
    title: 'Gross Pay vs. Net Pay: Complete 2026 Paycheck & Tax Withholding Breakdown',
    subtitle: 'How statutory withholdings, IRS Publication 15-T, standard deductions, and pre-tax 401(k) contributions affect your spendable income.',
    category: 'Salary & Taxes',
    readTime: '8 min read',
    publishedDate: 'November 2026',
    author: 'SmartCalcLab Payroll & Tax Analysis Team',
    reviewedBy: 'IRS Publication 15-T & Statutory Withholding Guidelines',
    toolPath: '/salary',
    toolName: 'Annual to Gross & Net Salary Calculator',
    summary: 'Demystify your paystub by exploring the mathematical journey from gross wages to net take-home pay, statutory FICA contributions, progressive federal tax brackets, and pre-tax retirement advantages.',
    paragraphs: [
      'When negotiating compensation or accepting a job offer, employers state salary figures in gross terms—for example, $75,000 annually or $36.06 per hour. However, your actual spendable deposit on payday is your net take-home pay.',
      'Gross pay is the total compensation earned before any deductions are subtracted. Net pay is the final amount deposited into your checking account after mandatory federal income taxes, state taxes, municipal payroll taxes, statutory FICA contributions, and voluntary employer benefit deductions.',
      'In the United States and most developed economies, tax systems are progressive: income is taxed in marginal tiers where higher income bands pay progressively higher tax rates rather than your entire income being taxed at the top bracket.',
      'FICA (Federal Insurance Contributions Act) is a mandatory payroll tax split equally between employee and employer. Employees contribute 6.2% for Social Security (up to the annual wage cap) and 1.45% for Medicare with no wage cap, totaling 7.65% in statutory contributions.',
      'Pre-tax deductions (such as traditional 401k or 403b contributions, Health Savings Accounts (HSA), and employer-sponsored health insurance premiums) are subtracted from your gross earnings BEFORE income taxes are computed. This lowers your taxable income bracket, saving you significant tax dollars each pay period.'
    ]
  },
  {
    slug: 'auto-loan-financing-guide',
    title: 'How Car Financing & Auto Loan APR Works: A Complete Buyer\'s Guide',
    subtitle: 'Understand dealership APR, simple interest vs. add-on interest, how trade-in values reduce sales tax, and the danger of 72 to 84-month loan terms.',
    category: 'Auto Financing',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    author: 'SmartCalcLab Consumer Automotive Finance Team',
    reviewedBy: 'Consumer Financial Protection Bureau (CFPB) Guidelines',
    toolPath: '/autoloan',
    toolName: 'Auto Loan & Car Payment Calculator',
    summary: 'Learn how vehicle interest rates are calculated, how trade-in credits save you on sales tax, and how to avoid being upside-down on your auto loan with the 20/4/10 rule.',
    paragraphs: [
      'Financing a motor vehicle involves borrowing a specific sum of money from a commercial bank, credit union, or captive dealership finance arm. The amount you finance is determined by: Vehicle Purchase Price minus Cash Down Payment minus Trade-In Allowance plus Sales Tax, Documentation Fees, and Registration.',
      'Unlike consumer mortgages which compound monthly, most auto loans operate under a simple interest amortization model. Interest accrues daily based on the remaining unpaid loan balance, meaning making payments earlier in your billing cycle reduces total interest accrued over the lifespan of the loan.',
      'In most US states and international jurisdictions, trading in your existing vehicle at the dealership provides a significant tax benefit. The agreed trade-in value is subtracted from the new car’s purchase price BEFORE state and local sales taxes are assessed.',
      'Financial advisors widely recommend the 20/4/10 rule: put down at least 20%, finance for no longer than 4 years (48 months), and keep total vehicle expenses under 10% of your gross monthly income.'
    ]
  },
  {
    slug: 'compound-interest-wealth-guide',
    title: 'Simple vs. Compound Interest: The Mathematical Blueprint for Exponential Wealth',
    subtitle: 'How compounding frequency, recurring monthly deposits, and the Rule of 72 turn modest savings into substantial wealth.',
    category: 'Investing & Wealth',
    readTime: '8 min read',
    publishedDate: 'November 2026',
    author: 'SmartCalcLab Wealth & Investment Editorial Team',
    reviewedBy: 'FINRA & Federal Reserve Educational Benchmarks',
    toolPath: '/compound',
    toolName: 'Compound Interest Calculator',
    summary: 'Discover the exponential mechanics of compounding interest, understand how compounding frequencies dictate yields, and see real-world scenarios showing the immense cost of waiting.',
    paragraphs: [
      'Simple interest is calculated exclusively on your original principal balance. If you deposit $10,000 at a 5% simple annual rate, you earn $500 every single year regardless of how long the money sits in the account.',
      'Compound interest, on the other hand, is interest earned on top of previously earned interest. In year one, your $10,000 earns $500. In year two, your interest is calculated on $10,500, generating $525. Over decades, this creates an exponential hockey-stick growth curve where your earned interest begins generating more income than your original contributions.',
      'The Rule of 72 is an intuitive shortcut used by investors to determine approximately how many years it will take for an investment to double at a given annual rate of return. Simply divide 72 by your expected annual return percentage.'
    ]
  },
  {
    slug: 'bmi-body-composition-guide',
    title: 'Body Mass Index (BMI) Explained: WHO Standards, Formulas & Health Limitations',
    subtitle: 'How BMI is calculated in metric (kg/cm) and imperial units, optimal health ranges, and why athletes need to look beyond the scale.',
    category: 'Health & Nutrition',
    readTime: '7 min read',
    publishedDate: 'November 2026',
    author: 'SmartCalcLab Health Science Editorial Team',
    reviewedBy: 'World Health Organization (WHO) Guidelines',
    toolPath: '/bmi',
    toolName: 'BMI & Body Health Calculator',
    summary: 'A clinical exploration of Body Mass Index as a population screening tool, official WHO classification categories, mathematical formulas, and complementary metrics like waist-to-height ratio.',
    paragraphs: [
      'Body Mass Index (BMI) is an epidemiological screening metric developed in the 19th century by Belgian mathematician Adolphe Quetelet. It provides a standardized method for classifying whether an adult has a healthy body weight in proportion to their height.',
      'The World Health Organization (WHO) and National Institutes of Health (NIH) establish four core adult weight classifications: Underweight (< 18.5), Normal Weight (18.5 - 24.9), Overweight (25.0 - 29.9), and Obese (30.0 or greater).',
      'BMI calculates weight relative to height, but it cannot differentiate between skeletal muscle mass, bone density, and visceral adipose tissue. Healthcare providers recommend pairing BMI measurements with waist-to-height ratio for an accurate health evaluation.'
    ]
  },
  {
    slug: 'currency-exchange-bank-fees-guide',
    title: 'Foreign Exchange Rates & Hidden Bank Fees: How Mid-Market Rates Work',
    subtitle: 'The truth behind zero-commission currency exchanges, how banks calculate the bid-ask spread, and how to save money on international transfers.',
    category: 'Currency & Global Trade',
    readTime: '6 min read',
    publishedDate: 'November 2026',
    author: 'SmartCalcLab International Finance Team',
    reviewedBy: 'Interbank Forex & Financial Consumer Standards',
    toolPath: '/currency',
    toolName: 'Live Currency Converter',
    summary: 'Understand the difference between the real interbank mid-market exchange rate and retail markups, learn how to spot hidden transaction fees, and avoid the Dynamic Currency Conversion (DCC) trap.',
    paragraphs: [
      'The mid-market exchange rate (also known as the interbank rate or spot rate) is the exact midpoint between global buy (bid) and sell (ask) rates across international currency markets. It represents the purest, fairest price of a currency before retail markups are added.',
      'Many airport currency booths and retail banks advertise "0% Commission" or "Fee-Free Transfers." In reality, they embed their profit margin directly into an unfavorable exchange rate spread, adding a hidden 5% to 10% markup.',
      'When paying with a credit or debit card abroad, always choose to be charged in the LOCAL CURRENCY rather than USD to avoid predatory Dynamic Currency Conversion (DCC) markup spreads.'
    ]
  }
]

function replaceRoot(html, innerContent) {
  const rootStart = html.indexOf('<div id="root">')
  const bodyEnd = html.lastIndexOf('</body>')
  if (rootStart !== -1 && bodyEnd !== -1) {
    const lastDiv = html.lastIndexOf('</div>', bodyEnd)
    if (lastDiv !== -1 && lastDiv > rootStart) {
      return html.slice(0, rootStart) + `<div id="root">${innerContent}</div>` + html.slice(lastDiv + 6)
    }
  }
  return html
}

console.log('[prerender] Starting static pre-rendering...')

// 1. Pre-render Calculator Tools (UNTOUCHED AND PRESERVED)
for (const tool of TOOLS) {
  let html = template

  html = html.replace(/<title>.*?<\/title>/, `<title>${tool.title} | SmartCalcLab</title>`)
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${tool.title} | SmartCalcLab" />`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${tool.metaDesc}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://smartcalclab.com/${tool.key}" />`)

  const contentHtml = `
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="font-weight: 800; font-size: 1.35rem; color: #2563eb; text-decoration: none;">SmartCalcLab</a>
          <nav style="display: flex; gap: 1.25rem; font-size: 0.875rem; flex-wrap: wrap;">
            <a href="/salary" style="color: #475569; text-decoration: none; font-weight: 500;">Salary</a>
            <a href="/loan" style="color: #475569; text-decoration: none; font-weight: 500;">Mortgage & Loan</a>
            <a href="/autoloan" style="color: #475569; text-decoration: none; font-weight: 500;">Auto Loan</a>
            <a href="/currency" style="color: #475569; text-decoration: none; font-weight: 500;">Currency</a>
            <a href="/bmi" style="color: #475569; text-decoration: none; font-weight: 500;">BMI</a>
            <a href="/compound" style="color: #475569; text-decoration: none; font-weight: 500;">Compound</a>
            <a href="/percentage" style="color: #475569; text-decoration: none; font-weight: 500;">Percentage</a>
            <a href="/guides" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Guides</a>
          </nav>
        </div>
      </header>

      <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b;">
        <nav aria-label="Breadcrumb" style="font-size: 0.8125rem; color: #64748b; margin-bottom: 1.5rem;">
          <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; <span>Calculators</span> &gt; <strong>${tool.name}</strong>
        </nav>

        <div style="padding: 0.875rem 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-size: 0.8125rem; color: #475569; margin-bottom: 2rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span>🛡️ <strong>Editorial Verification:</strong> Reviewed by SmartCalcLab Financial & Health Analysis Team</span>
          <span>Standards: <strong>CFPB / WHO / IRS Benchmarks (2026)</strong></span>
        </div>

        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">${tool.title}</h1>
        <p style="font-size: 1.125rem; color: #475569; margin-bottom: 2rem;">${tool.subtitle}</p>

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: inline-block; padding: 0.25rem 0.75rem; background: #eff6ff; color: #2563eb; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem;">
            ${tool.badge}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">${tool.name}</h2>
          <p style="font-size: 0.9375rem; color: #64748b; margin-bottom: 1.5rem;">${tool.shortDesc}</p>
          <div style="padding: 1.5rem; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 0.5rem; text-align: center; color: #64748b; font-size: 0.875rem;">
            Interactive calculation engine initialized. Enter values to view real-time computations, graphs, and schedules.
          </div>
        </section>

        <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Comprehensive Educational Guide & Analysis</h2>
          ${tool.introParagraphs.map(p => `<p style="margin-bottom: 1rem; font-size: 1rem; color: #334155; line-height: 1.7;">${p}</p>`).join('')}
        </article>

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 1.25rem;">${tool.howItWorksTitle}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            ${tool.howItWorksSteps.map((s, idx) => `
              <div style="padding: 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: #2563eb; text-transform: uppercase; margin-bottom: 0.35rem;">Step 0${idx + 1}</div>
                <h4 style="font-weight: 600; font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">${s.step}</h4>
                <p style="font-size: 0.875rem; color: #475569; line-height: 1.5;">${s.desc}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-size: 0.75rem; font-weight: 700; color: #4f46e5; text-transform: uppercase; margin-bottom: 0.35rem;">Mathematical Calculation</div>
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">${tool.formulaTitle}</h3>
            <div style="background: #0f172a; color: #fde047; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; padding: 1rem; border-radius: 0.5rem; font-size: 0.875rem; margin-bottom: 1rem; word-break: break-all;">
              ${tool.formulaMath}
            </div>
            <p style="font-size: 0.875rem; color: #475569; line-height: 1.5;">${tool.formulaExplanation}</p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-size: 0.75rem; font-weight: 700; color: #059669; text-transform: uppercase; margin-bottom: 0.35rem;">Real-World Scenario</div>
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">${tool.exampleTitle}</h3>
            <p style="font-size: 0.875rem; color: #475569; line-height: 1.6;">${tool.exampleText}</p>
          </div>
        </section>

        ${tool.tips && tool.tips.length ? `
        <section style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 1rem; padding: 1.75rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.125rem; font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Actionable Practical Tips</h3>
          <ul style="padding-left: 1.25rem; font-size: 0.875rem; color: #166534; line-height: 1.6;">
            ${tool.tips.map(tip => `<li style="margin-bottom: 0.5rem;">${tip}</li>`).join('')}
          </ul>
        </section>
        ` : ''}

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.375rem; font-weight: 700; color: #0f172a; margin-bottom: 1.5rem;">${tool.faqsTitle}</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${tool.faqs.map(f => `
              <div style="border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem; background: #f8fafc;">
                <h4 style="font-weight: 600; font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">${f.q}</h4>
                <p style="font-size: 0.875rem; color: #475569; line-height: 1.6;">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </section>

        ${tool.key === 'salary' ? `
        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-size: 0.75rem; font-weight: 700; color: #2563eb; text-transform: uppercase; margin-bottom: 0.35rem;">Salary Benchmarks &amp; Conversion</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">Annual Salary to Hourly, Monthly &amp; Bi-Weekly Pay Chart (2026)</h3>
          <p style="font-size: 0.875rem; color: #475569; margin-bottom: 1.25rem; line-height: 1.5;">
            Standard full-time employment assumes 2,080 annual working hours (52 weeks × 40 hours per week). Compare common gross earnings benchmarks across pay frequencies:
          </p>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem; text-align: left;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #334155;">
                  <th style="padding: 0.75rem 1rem; font-weight: 700;">Annual Gross</th>
                  <th style="padding: 0.75rem 1rem; font-weight: 700;">Monthly Pay (12x)</th>
                  <th style="padding: 0.75rem 1rem; font-weight: 700;">Bi-Weekly Pay (26x)</th>
                  <th style="padding: 0.75rem 1rem; font-weight: 700;">Hourly Rate (2,080 hrs)</th>
                </tr>
              </thead>
              <tbody style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #1e293b;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 0.75rem 1rem; font-weight: 700;">$35,000</td><td style="padding: 0.75rem 1rem;">$2,916.67</td><td style="padding: 0.75rem 1rem;">$1,346.15</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 700;">$16.83/hr</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;"><td style="padding: 0.75rem 1rem; font-weight: 700;">$50,000</td><td style="padding: 0.75rem 1rem;">$4,166.67</td><td style="padding: 0.75rem 1rem;">$1,923.08</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 700;">$24.04/hr</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 0.75rem 1rem; font-weight: 700;">$65,000</td><td style="padding: 0.75rem 1rem;">$5,416.67</td><td style="padding: 0.75rem 1rem;">$2,500.00</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 700;">$31.25/hr</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9; background: #fafafa;"><td style="padding: 0.75rem 1rem; font-weight: 700;">$75,000</td><td style="padding: 0.75rem 1rem;">$6,250.00</td><td style="padding: 0.75rem 1rem;">$2,884.62</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 700;">$36.06/hr</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 0.75rem 1rem; font-weight: 700;">$100,000</td><td style="padding: 0.75rem 1rem;">$8,333.33</td><td style="padding: 0.75rem 1rem;">$3,846.15</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 700;">$48.08/hr</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9; background: #eff6ff;"><td style="padding: 0.75rem 1rem; font-weight: 800; color: #1e40af;">$120,000 <span style="font-size: 0.65rem; background: #dbeafe; color: #1e40af; padding: 0.15rem 0.4rem; border-radius: 9999px; font-family: system-ui;">120000/52/40</span></td><td style="padding: 0.75rem 1rem; font-weight: 600;">$10,000.00</td><td style="padding: 0.75rem 1rem; font-weight: 600;">$4,615.38</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 800;">$57.69/hr</td></tr>
                <tr style="background: #fafafa;"><td style="padding: 0.75rem 1rem; font-weight: 700;">$150,000</td><td style="padding: 0.75rem 1rem;">$12,500.00</td><td style="padding: 0.75rem 1rem;">$5,769.23</td><td style="padding: 0.75rem 1rem; color: #059669; font-weight: 700;">$72.12/hr</td></tr>
              </tbody>
            </table>
          </div>
          <div style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div style="font-size: 0.875rem; color: #166534;">
              <strong>Looking for deep tax guidance?</strong> Read our full breakdown on federal tax brackets and FICA withholding.
            </div>
            <a href="/guides/gross-vs-net-salary-guide" style="font-size: 0.8125rem; font-weight: 700; color: #15803d; text-decoration: none;">
              Read 2026 Salary &amp; Tax Guide &rarr;
            </a>
          </div>
          <div style="margin-top: 0.75rem; padding: 1rem 1.25rem; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
            <div style="font-size: 0.875rem; color: #1e40af;">
              <strong>Buying a home or planning a mortgage?</strong> Estimate your maximum loan approval based on your net paycheck.
            </div>
            <a href="/loan" style="font-size: 0.8125rem; font-weight: 700; color: #2563eb; text-decoration: none;">
              Calculate Mortgage &amp; Loan &rarr;
            </a>
          </div>
        </section>
        ` : ''}

        <section style="margin-bottom: 3rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Explore Related Calculators & Educational Guides</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <a href="/salary" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Annual & Hourly Salary</a>
            <a href="/loan" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Mortgage & Personal Loan</a>
            <a href="/autoloan" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Car Loan & Auto Financing</a>
            <a href="/compound" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Compound Interest</a>
            <a href="/guides" style="padding: 1rem; border: 1px solid #c7d2fe; border-radius: 0.5rem; text-decoration: none; color: #3730a3; background: #eef2ff; font-weight: 600;">Explore All Educational Guides &rarr;</a>
          </div>
        </section>
      </main>

      <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-sm text-slate-500">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <strong style="color: #0f172a;">SmartCalcLab</strong> — 100% Free Financial, Health & Daily Multi-Calculators.
            <p style="font-size: 0.75rem; margin-top: 0.35rem;">© 2026 SmartCalcLab. All calculations execute client-side with zero data tracking.</p>
          </div>
          <div style="display: flex; gap: 1.25rem; font-size: 0.8125rem;">
            <a href="/guides" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Guides</a>
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/about" style="color: #64748b; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #64748b; text-decoration: none;">Contact</a>
            <a href="/disclaimer" style="color: #64748b; text-decoration: none;">Disclaimer</a>
          </div>
        </div>
      </footer>
  `

  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://smartcalclab.com/#website',
        'url': 'https://smartcalclab.com/',
        'name': 'SmartCalcLab'
      },
      {
        '@type': 'WebApplication',
        '@id': `https://smartcalclab.com/${tool.key}#webapp`,
        'name': `${tool.title} | SmartCalcLab`,
        'url': `https://smartcalclab.com/${tool.key}`,
        'applicationCategory': tool.key === 'bmi' ? 'HealthApplication' : 'FinanceApplication',
        'operatingSystem': 'All',
        'description': tool.metaDesc,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://smartcalclab.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': tool.name,
            'item': `https://smartcalclab.com/${tool.key}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': tool.faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      }
    ]
  }

  const jsonLdRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/
  html = html.replace(jsonLdRegex, `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n    </script>`)

  html = replaceRoot(html, contentHtml)

  const targetDir = path.resolve(distDir, tool.key)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  fs.writeFileSync(path.resolve(targetDir, 'index.html'), html, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, `${tool.key}.html`), html, 'utf-8')
  console.log(`[prerender] Rendered: /${tool.key}`)
}

// 2. Pre-render Legal Pages
for (const page of LEGAL_PAGES) {
  let html = template
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${page.title}" />`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.desc}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://smartcalclab.com/${page.key}" />`)

  const fullLegalHtml = `
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="font-weight: 800; font-size: 1.35rem; color: #2563eb; text-decoration: none;">SmartCalcLab</a>
          <nav style="display: flex; gap: 1.25rem; font-size: 0.875rem; flex-wrap: wrap;">
            <a href="/salary" style="color: #475569; text-decoration: none; font-weight: 500;">Salary</a>
            <a href="/loan" style="color: #475569; text-decoration: none; font-weight: 500;">Mortgage & Loan</a>
            <a href="/autoloan" style="color: #475569; text-decoration: none; font-weight: 500;">Auto Loan</a>
            <a href="/currency" style="color: #475569; text-decoration: none; font-weight: 500;">Currency</a>
            <a href="/bmi" style="color: #475569; text-decoration: none; font-weight: 500;">BMI</a>
            <a href="/compound" style="color: #475569; text-decoration: none; font-weight: 500;">Compound</a>
            <a href="/percentage" style="color: #475569; text-decoration: none; font-weight: 500;">Percentage</a>
            <a href="/guides" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Guides</a>
          </nav>
        </div>
      </header>
      ${page.content}
      <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-sm text-slate-500">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <strong style="color: #0f172a;">SmartCalcLab</strong> — 100% Free Financial, Health & Daily Multi-Calculators.
            <p style="font-size: 0.75rem; margin-top: 0.35rem;">© 2026 SmartCalcLab. All calculations execute client-side with zero data tracking.</p>
          </div>
          <div style="display: flex; gap: 1.25rem; font-size: 0.8125rem;">
            <a href="/guides" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Guides</a>
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/about" style="color: #64748b; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #64748b; text-decoration: none;">Contact</a>
            <a href="/disclaimer" style="color: #64748b; text-decoration: none;">Disclaimer</a>
          </div>
        </div>
      </footer>
  `

  html = replaceRoot(html, fullLegalHtml)

  const targetDir = path.resolve(distDir, page.key)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  fs.writeFileSync(path.resolve(targetDir, 'index.html'), html, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, `${page.key}.html`), html, 'utf-8')
  console.log(`[prerender] Rendered: /${page.key}`)
}

// 3. Pre-render Guides Hub (/guides)
{
  let html = template
  const hubTitle = 'Financial, Mortgage & Health Educational Guides | SmartCalcLab'
  const hubDesc = 'In-depth financial calculation guides, mortgage amortization schedules, take-home pay tax withholdings, and health metrics published by SmartCalcLab.'
  
  html = html.replace(/<title>.*?<\/title>/, `<title>${hubTitle}</title>`)
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${hubTitle}" />`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${hubDesc}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://smartcalclab.com/guides" />`)

  const hubHtml = `
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="font-weight: 800; font-size: 1.35rem; color: #2563eb; text-decoration: none;">SmartCalcLab</a>
          <nav style="display: flex; gap: 1.25rem; font-size: 0.875rem; flex-wrap: wrap;">
            <a href="/salary" style="color: #475569; text-decoration: none; font-weight: 500;">Salary</a>
            <a href="/loan" style="color: #475569; text-decoration: none; font-weight: 500;">Mortgage & Loan</a>
            <a href="/autoloan" style="color: #475569; text-decoration: none; font-weight: 500;">Auto Loan</a>
            <a href="/currency" style="color: #475569; text-decoration: none; font-weight: 500;">Currency</a>
            <a href="/bmi" style="color: #475569; text-decoration: none; font-weight: 500;">BMI</a>
            <a href="/compound" style="color: #475569; text-decoration: none; font-weight: 500;">Compound</a>
            <a href="/percentage" style="color: #475569; text-decoration: none; font-weight: 500;">Percentage</a>
            <a href="/guides" style="color: #2563eb; text-decoration: none; font-weight: 700;">Guides</a>
          </nav>
        </div>
      </header>

      <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; line-height: 1.6; color: #1e293b;">
        <nav aria-label="Breadcrumb" style="font-size: 0.8125rem; color: #64748b; margin-bottom: 1.5rem;">
          <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; <strong>Educational Guides</strong>
        </nav>

        <section style="background: linear-gradient(135deg, #1e40af, #3730a3); color: #ffffff; padding: 2.5rem; border-radius: 1.25rem; margin-bottom: 2.5rem;">
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; background: rgba(255,255,255,0.15); padding: 0.25rem 0.75rem; border-radius: 9999px;">
            Educational Learning Hub
          </span>
          <h1 style="font-size: 2.25rem; font-weight: 800; margin: 1rem 0 0.5rem; line-height: 1.2;">
            Financial &amp; Health Calculation Guides
          </h1>
          <p style="font-size: 1.05rem; opacity: 0.9; max-width: 800px; margin: 0;">
            Original educational guides, mathematical breakdowns, and statutory benchmark analysis published by the SmartCalcLab editorial team.
          </p>
        </section>

        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.75rem; margin-bottom: 3rem;">
          ${GUIDES.map(g => `
            <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 9999px;">${g.category}</span>
                  <span style="font-size: 0.75rem; color: #64748b;">${g.readTime}</span>
                </div>
                <h2 style="font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem; line-height: 1.35;">
                  <a href="/guides/${g.slug}" style="color: #0f172a; text-decoration: none;">${g.title}</a>
                </h2>
                <p style="font-size: 0.875rem; color: #475569; line-height: 1.5; margin-bottom: 1.25rem;">
                  ${g.summary}
                </p>
              </div>
              <div style="border-top: 1px solid #f1f5f9; padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <a href="/guides/${g.slug}" style="color: #2563eb; font-weight: 600; font-size: 0.8125rem; text-decoration: none;">Read Complete Guide &rarr;</a>
                <span style="font-size: 0.75rem; color: #94a3b8;">${g.publishedDate}</span>
              </div>
            </article>
          `).join('')}
        </section>
      </main>

      <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-sm text-slate-500">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <strong style="color: #0f172a;">SmartCalcLab</strong> — 100% Free Financial, Health & Daily Multi-Calculators.
            <p style="font-size: 0.75rem; margin-top: 0.35rem;">© 2026 SmartCalcLab. All calculations execute client-side with zero data tracking.</p>
          </div>
          <div style="display: flex; gap: 1.25rem; font-size: 0.8125rem;">
            <a href="/guides" style="color: #2563eb; text-decoration: none; font-weight: 600;">Guides</a>
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/about" style="color: #64748b; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #64748b; text-decoration: none;">Contact</a>
            <a href="/disclaimer" style="color: #64748b; text-decoration: none;">Disclaimer</a>
          </div>
        </div>
      </footer>
  `

  html = replaceRoot(html, hubHtml)

  const targetDir = path.resolve(distDir, 'guides')
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  fs.writeFileSync(path.resolve(targetDir, 'index.html'), html, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, 'guides.html'), html, 'utf-8')
  console.log('[prerender] Rendered: /guides Hub')
}

// 4. Pre-render Individual Guides (/guides/:slug)
for (const guide of GUIDES) {
  let html = template
  const canonicalUrl = `https://smartcalclab.com/guides/${guide.slug}`
  
  html = html.replace(/<title>.*?<\/title>/, `<title>${guide.title} | SmartCalcLab</title>`)
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${guide.title} | SmartCalcLab" />`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${guide.summary}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)

  const guideHtml = `
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="font-weight: 800; font-size: 1.35rem; color: #2563eb; text-decoration: none;">SmartCalcLab</a>
          <nav style="display: flex; gap: 1.25rem; font-size: 0.875rem; flex-wrap: wrap;">
            <a href="/salary" style="color: #475569; text-decoration: none; font-weight: 500;">Salary</a>
            <a href="/loan" style="color: #475569; text-decoration: none; font-weight: 500;">Mortgage & Loan</a>
            <a href="/autoloan" style="color: #475569; text-decoration: none; font-weight: 500;">Auto Loan</a>
            <a href="/currency" style="color: #475569; text-decoration: none; font-weight: 500;">Currency</a>
            <a href="/bmi" style="color: #475569; text-decoration: none; font-weight: 500;">BMI</a>
            <a href="/compound" style="color: #475569; text-decoration: none; font-weight: 500;">Compound</a>
            <a href="/percentage" style="color: #475569; text-decoration: none; font-weight: 500;">Percentage</a>
            <a href="/guides" style="color: #2563eb; text-decoration: none; font-weight: 700;">Guides</a>
          </nav>
        </div>
      </header>

      <main style="max-width: 900px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, sans-serif; line-height: 1.7; color: #1e293b;">
        <nav aria-label="Breadcrumb" style="font-size: 0.8125rem; color: #64748b; margin-bottom: 1.5rem;">
          <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; 
          <a href="/guides" style="color: #2563eb; text-decoration: none;">Guides</a> &gt; 
          <strong>${guide.title}</strong>
        </nav>

        <header style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1.25rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.8125rem;">
            <span style="font-weight: 700; color: #2563eb; background: #eff6ff; padding: 0.25rem 0.75rem; border-radius: 9999px;">${guide.category}</span>
            <span style="color: #64748b;">${guide.readTime} • Updated ${guide.publishedDate}</span>
          </div>

          <h1 style="font-size: 2.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.75rem; line-height: 1.25;">
            ${guide.title}
          </h1>
          <p style="font-size: 1.1rem; color: #475569; margin-bottom: 1.5rem; line-height: 1.6;">
            ${guide.subtitle}
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 0.875rem 1.25rem; font-size: 0.8125rem; color: #475569; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <span>🛡️ <strong>Editorial Byline:</strong> ${guide.author}</span>
            <span>Reviewed Standards: <strong>${guide.reviewedBy}</strong></span>
          </div>
        </header>

        <!-- High-Impact Interactive Calculator Callout (Internal Link Booster) -->
        <div style="background: linear-gradient(135deg, #2563eb, #4338ca); color: #ffffff; border-radius: 1rem; padding: 1.5rem 2rem; margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #bfdbfe; margin-bottom: 0.25rem;">Interactive Tool Available</div>
            <h2 style="font-size: 1.15rem; font-weight: 700; margin: 0; color: #ffffff;">Calculate your exact numbers with our free ${guide.toolName}</h2>
          </div>
          <a href="${guide.toolPath}" style="background: #ffffff; color: #1e40af; font-weight: 700; font-size: 0.875rem; padding: 0.65rem 1.25rem; border-radius: 0.75rem; text-decoration: none; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            Open Free Calculator &rarr;
          </a>
        </div>

        <!-- Article Body Content -->
        <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1.25rem; padding: 2.5rem; margin-bottom: 2.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          ${guide.paragraphs.map(p => `<p style="font-size: 1.05rem; color: #334155; line-height: 1.8; margin-bottom: 1.5rem;">${p}</p>`).join('')}
        </article>

        <!-- Return to Guides -->
        <div style="text-align: center; margin-bottom: 3rem;">
          <a href="/guides" style="display: inline-block; padding: 0.75rem 1.5rem; border: 1px solid #cbd5e1; border-radius: 0.75rem; color: #475569; font-weight: 600; text-decoration: none; font-size: 0.875rem;">
            &larr; Back to All Educational Guides
          </a>
        </div>
      </main>

      <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-sm text-slate-500">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <strong style="color: #0f172a;">SmartCalcLab</strong> — 100% Free Financial, Health & Daily Multi-Calculators.
            <p style="font-size: 0.75rem; margin-top: 0.35rem;">© 2026 SmartCalcLab. All calculations execute client-side with zero data tracking.</p>
          </div>
          <div style="display: flex; gap: 1.25rem; font-size: 0.8125rem;">
            <a href="/guides" style="color: #2563eb; text-decoration: none; font-weight: 600;">Guides</a>
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/about" style="color: #64748b; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #64748b; text-decoration: none;">Contact</a>
            <a href="/disclaimer" style="color: #64748b; text-decoration: none;">Disclaimer</a>
          </div>
        </div>
      </footer>
  `

  html = replaceRoot(html, guideHtml)

  const guideDir = path.resolve(distDir, 'guides', guide.slug)
  if (!fs.existsSync(guideDir)) {
    fs.mkdirSync(guideDir, { recursive: true })
  }
  fs.writeFileSync(path.resolve(guideDir, 'index.html'), html, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, 'guides', `${guide.slug}.html`), html, 'utf-8')
  console.log(`[prerender] Rendered Guide: /guides/${guide.slug}`)
}

// 5. Pre-render Multilingual Search Landing Pages (?lang=es, ?lang=ar, ?lang=pt)
const MULTILINGUAL_PAGES = [
  {
    toolKey: 'loan',
    lang: 'es',
    dir: 'ltr',
    canonical: 'https://smartcalclab.com/loan?lang=es',
    title: 'Calculadora de Préstamos e Hipotecas Online | SmartCalcLab',
    metaDesc: 'Calculadora de préstamos y simulador de hipoteca gratis. Calcula tu cuota mensual, amortización e intereses totales en segundos.',
    name: 'Calculadora de Préstamos e Hipotecas',
    subtitle: 'Simula préstamos personales, hipotecas y créditos bancarios con cuota mensual exacta en España y Latinoamérica.',
    badge: 'Alta Rentabilidad Financiera',
    shortDesc: 'Calcula tu cuota mensual, intereses acumulados y cuadro de amortización completo.',
    introParagraphs: [
      'Conocer el coste real de un crédito bancario antes de firmar es fundamental para proteger tu salud financiera. Ya sea que busques comprar una vivienda mediante hipoteca o financiar un coche o proyecto personal, esta herramienta calcula al instante la cuota mensual (sistema francés de amortización).',
      'Compara diferentes tipos de interés y plazos para descubrir exactamente cuánto pagarás al banco en concepto de intereses.'
    ],
    howItWorksTitle: 'Cómo Calcular la Cuota de tu Préstamo',
    howItWorksSteps: [
      { step: '1. Introduce el Capital', desc: 'La cantidad exacta de dinero que necesitas solicitar a la entidad bancaria.' },
      { step: '2. Indica el Tipo de Interés Anual (TIN/TAE)', desc: 'El porcentaje que cobrará el banco cada año por prestarte el dinero.' },
      { step: '3. Elige el Plazo de Devolución', desc: 'El número de años o meses para pagar el préstamo. A mayor plazo, menor cuota mensual pero mayores intereses totales.' }
    ],
    formulaTitle: 'Fórmula de Amortización Francesa',
    formulaMath: 'Cuota = [C × i × (1 + i)^n] / [(1 + i)^n - 1]',
    formulaExplanation: 'Donde C es el Capital prestado, i es el tipo de interés mensual (TIN anual / 12 / 100) y n es el número total de mensualidades.',
    exampleTitle: 'Ejemplo Práctico',
    exampleText: 'Para una hipoteca de 150.000 € a un interés fijo del 3,25% a 25 años (300 meses), la cuota mensual será de 731,43 €. Los intereses totales ascenderán a 69.429 €, con un coste total final de 219.429 €.',
    faqsTitle: 'Preguntas Frecuentes sobre Préstamos',
    faqs: [
      { q: '¿Qué diferencia hay entre TIN y TAE?', a: 'El TIN es el Tipo de Interés Nominal puro. La TAE (Tasa Anual Equivalente) incluye además comisiones bancarias, gastos y seguros asociados, reflejando el coste real global.' },
      { q: '¿Conviene amortizar cuota o amortizar plazo?', a: 'Amortizar plazo ahorra muchos más intereses bancarios a lo largo de la vida del préstamo, mientras que amortizar cuota da más desahogo financiero cada mes.' }
    ],
    tips: [
      'Los expertos recomiendan que la cuota de tu hipoteca o préstamo no supere el 30%-35% de tus ingresos netos mensuales.',
      'Revisa si tu banco aplica comisiones por amortización anticipada parcial o total.'
    ]
  },
  {
    toolKey: 'compound',
    lang: 'es',
    dir: 'ltr',
    canonical: 'https://smartcalclab.com/compound?lang=es',
    title: 'Calculadora de Interés Compuesto | Inversión y Ahorro | SmartCalcLab',
    metaDesc: 'Calculadora de interés compuesto gratis. Simula la rentabilidad de tus inversiones y fondos indexados a 5, 10, 20 o 30 años.',
    name: 'Calculadora de Interés Compuesto',
    subtitle: 'Descubre el poder del interés compuesto con aportaciones mensuales y rentabilidad anual.',
    badge: 'Crecimiento Patrimonial',
    shortDesc: 'Proyecta el crecimiento de tus ahorros e inversiones a largo plazo gracias al interés compuesto.',
    introParagraphs: [
      'El interés compuesto es la fuerza financiera que permite hacer crecer el patrimonio con el paso del tiempo. Consiste en reinvertir los beneficios o intereses generados, de modo que en el siguiente periodo se generan intereses sobre los intereses previos.',
      'Esta herramienta te muestra con precisión matemática cómo pequeñas aportaciones mensuales pueden convertirse en sumas millonarias a largo plazo.'
    ],
    howItWorksTitle: 'Cómo Configurar tu Simulación',
    howItWorksSteps: [
      { step: '1. Capital Inicial', desc: 'El dinero con el que comienzas tu cuenta de inversión o depósito.' },
      { step: '2. Aportación Periódica Mensual', desc: 'La cantidad que tienes previsto ahorrar e ingresar cada mes.' },
      { step: '3. Rentabilidad Anual Estimada y Años', desc: 'El rendimiento anual medio previsto (ej. 7%-9% en fondos indexados globales) y el horizonte temporal.' }
    ],
    formulaTitle: 'Ecuación del Interés Compuesto',
    formulaMath: 'A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]',
    formulaExplanation: 'Donde P es el Capital inicial, r es la tasa anual, n es la frecuencia anual de capitalización, t son los años y PMT la aportación mensual.',
    exampleTitle: 'Ejemplo de Inversión a 25 Años',
    exampleText: 'Comenzando con 3.000 € y aportando 200 € al mes con un 8% anual durante 25 años, acumulas 208.570 €. Tu aportación personal es de 63.000 €, ¡y los intereses generados son 145.570 €!',
    faqsTitle: 'Preguntas Frecuentes sobre Interés Compuesto',
    faqs: [
      { q: '¿Qué es la Regla del 72?', a: 'Divide 72 entre la rentabilidad anual esperada para calcular cuántos años tardará tu dinero en duplicarse. Al 8%, tu capital se duplica cada 9 años aproximadamente.' },
      { q: '¿Es mejor aportar mensual o anualmente?', a: 'Aportar mensualmente maximiza la capitalización de intereses, ya que cada aportación empieza a rentar antes.' }
    ],
    tips: [
      'Cuanto antes empieces a invertir, mayor será el efecto multiplicador del interés compuesto sobre tus ahorros.',
      'Reinvertir todos los dividendos acelera el crecimiento exponencial de tu cartera.'
    ]
  },
  {
    toolKey: 'loan',
    lang: 'ar',
    dir: 'rtl',
    canonical: 'https://smartcalclab.com/loan?lang=ar',
    title: 'حاسبة القروض والتمويل العقاري والشخصي | SmartCalcLab',
    metaDesc: 'حاسبة قروض مجانية لحساب القسط الشهري للتمويل الشخصي والعقاري مع جدول السداد والفوائد البنكية بدقة متناهية.',
    name: 'حاسبة القروض والتمويل العقاري',
    subtitle: 'احسب قسطك الشهري بدقة وإجمالي الأرباح وجدول الاستهلاك للتمويل الشخصي والسكني.',
    badge: 'دقة مصرفية عالية',
    shortDesc: 'حساب القسط الشهري وجدول سداد القرض والفوائد البنكية.',
    introParagraphs: [
      'تعتبر حاسبة القروض والتمويل العقاري أداة مصرفية أساسية لمعرفة القسط الشهري وإجمالي الفوائد قبل التوقيع على أي التزام مالي مع البنك.',
      'تعتمد الحاسبة معادلة الاستهلاك التناقصي المعتمدة في كافة البنوك لحساب حصة الفائدة ورأس المال لكل قسط شهري.'
    ],
    howItWorksTitle: 'كيفية حساب القسط الشهري',
    howItWorksSteps: [
      { step: '1. أدخل مبلغ التمويل', desc: 'إجمالي المبلغ الذي ترغب في اقتراضه من البنك.' },
      { step: '2. نسبة الفائدة السنوية', desc: 'النسبة المئوية المحددة من البنك سنوياً.' },
      { step: '3. مدة التمويل بالسنين', desc: 'عدد سنوات السداد المتبقية للقرض.' }
    ],
    formulaTitle: 'معادلة القسط الشهري',
    formulaMath: 'القسط = [المبلغ × الفائدة × (1 + الفائدة)^الشهور] / [(1 + الفائدة)^الشهور - 1]',
    formulaExplanation: 'حساب رياضي بنكي دقيق يضمن لك معرفة صافي الاستقطاع الشهري من الراتب.',
    exampleTitle: 'مثال واقعي',
    exampleText: 'لقرض شخصي بقيمة 100,000 ريال بفائدة 4% لمدة 5 سنوات (60 شهراً)، يكون القسط الشهري 1,841.65 ريال وإجمالي الأرباح 10,499 ريال.',
    faqsTitle: 'الأسئلة الشائعة حول القروض',
    faqs: [
      { q: 'ما هو القسط المتناقص والقسط الثابت؟', a: 'القسط الثابت هو دفع مبلغ متساوٍ كل شهر حتى نهاية المدة، بينما تنخفض حصة الفائدة شهرياً وترتفع حصة الأصل المسدد.' }
    ],
    tips: [
      'احرص دائماً على ألا يتجاوز إجمالي الالتزامات الشهرية 33% من صافي راتبك الشهري.'
    ]
  },
  {
    toolKey: 'bmi',
    lang: 'es',
    dir: 'ltr',
    canonical: 'https://smartcalclab.com/bmi?lang=es',
    title: 'Calculadora de IMC (Índice de Masa Corporal kg y cm) | SmartCalcLab',
    metaDesc: 'Calculadora de IMC en kg y cm según la OMS. Calcula tu Índice de Masa Corporal, peso ideal y clasificación nutricional al instante.',
    name: 'Calculadora de IMC (Índice de Masa Corporal)',
    subtitle: 'Calcula tu IMC en kilos y centímetros según los baremos oficiales de la Organización Mundial de la Salud (OMS).',
    badge: 'Estándar OMS',
    shortDesc: 'Calcula tu Índice de Masa Corporal (IMC) en kg y cm y comprueba tu rango de peso saludable.',
    introParagraphs: [
      'El Índice de Masa Corporal (IMC) es la medida internacional estandarizada por la Organización Mundial de la Salud (OMS) para evaluar si una persona adulta tiene un peso adecuado respecto a su estatura.',
      'Permite detectar situaciones de bajo peso, peso normal, sobrepeso u obesidad para prevenir riesgos cardiovasculares y metabólicos.'
    ],
    howItWorksTitle: 'Cómo se Calcula el IMC',
    howItWorksSteps: [
      { step: '1. Selecciona el Sistema Métrico', desc: 'Introduce tu estatura en centímetros y tu peso en kilogramos.' },
      { step: '2. Pulsa Calcular', desc: 'El sistema aplica la fórmula oficial de la OMS en tiempo real.' },
      { step: '3. Revisa tu Rango', desc: 'Comprueba si estás en Normopeso (18.5 - 24.9), Sobrepeso (25 - 29.9) u Obesidad (> 30).' }
    ],
    formulaTitle: 'Fórmula Oficial de la OMS',
    formulaMath: 'IMC = Peso (kg) / [Altura (m)]²',
    formulaExplanation: 'Se divide el peso en kilogramos entre la estatura en metros elevada al cuadrado.',
    exampleTitle: 'Ejemplo de Cálculo',
    exampleText: 'Para una persona que mide 175 cm (1,75 m) y pesa 70 kg: 70 / (1,75 × 1,75) = 22,86 kg/m², situándose en rango de peso normal saludable.',
    faqsTitle: 'Preguntas Frecuentes sobre el IMC',
    faqs: [
      { q: '¿Qué limitaciones tiene el IMC?', a: 'El IMC no distingue entre masa muscular y grasa corporal. Personas deportistas con mucha masa muscular pueden tener un IMC elevado sin tener exceso de grasa.' }
    ],
    tips: [
      'Combina el valor del IMC con la medida del perímetro de cintura para una valoración cardiovascular más completa.'
    ]
  },
  {
    toolKey: 'salary',
    lang: 'es',
    dir: 'ltr',
    canonical: 'https://smartcalclab.com/salary?lang=es',
    title: 'Calculadora de Sueldo Neto a Bruto | SmartCalcLab',
    metaDesc: 'Calculadora de sueldo bruto a neto. Calcula tu salario neto mensual y anual tras IRPF, Seguridad Social y retenciones en España y Latinoamérica.',
    name: 'Calculadora de Sueldo Bruto a Neto',
    subtitle: 'Calcula tu sueldo neto mensual en 12 o 14 pagas tras aplicar retenciones de IRPF y cotizaciones a la Seguridad Social.',
    badge: 'Cálculo Laboral y Nómina',
    shortDesc: 'Calcula tu sueldo neto a partir del bruto anual o mensual.',
    introParagraphs: [
      'Al negociar una oferta de empleo o revisar tu nómina, las empresas indican el salario en términos brutos anuales. Sin embargo, tu dinero disponible real cada mes es el sueldo neto.',
      'Nuestra calculadora laboral te permite estimar el salario neto en 12 o 14 pagas descontando IRPF y Seguridad Social.'
    ],
    howItWorksTitle: 'Cómo Calcular el Sueldo Neto',
    howItWorksSteps: [
      { step: '1. Introduce tu Salario Bruto Anual', desc: 'Indica la retribución total pactada con tu empresa antes de impuestos.' },
      { step: '2. Selecciona Número de Pagas', desc: 'Elige entre 12 pagas (pagas extras prorrateadas) o 14 pagas anuales.' },
      { step: '3. Revisa tu Nómina Estimada', desc: 'Comprueba el desglose entre IRPF, cotizaciones sociales y tu líquido mensual a percibir.' }
    ],
    formulaTitle: 'Fórmula de Cálculo de Nómina',
    formulaMath: 'Sueldo Neto = Sueldo Bruto - Retención IRPF - Cotizaciones Seguridad Social',
    formulaExplanation: 'El sueldo neto es la cantidad líquida que ingresa la empresa en tu cuenta bancaria cada mes.',
    exampleTitle: 'Ejemplo de Salario Bruto de 30.000 €',
    exampleText: 'Para un salario bruto de 30.000 € con un 15% de IRPF (4.500 €) y 6,35% de Seguridad Social (1.905 €), el sueldo neto anual es de 23.595 €, lo que equivale a 1.966,25 € al mes en 12 pagas (o 1.685,36 € en 14 pagas).',
    faqsTitle: 'Preguntas Frecuentes sobre Salarios',
    faqs: [
      { q: '¿Qué es mejor, 12 o 14 pagas?', a: 'La cantidad total anual es exactamente la misma. En 12 pagas cobras una cantidad fija mensual más alta todo el año, mientras que en 14 pagas recibes dos pagas extraordinarias (verano y Navidad).' }
    ],
    tips: [
      'Revisa tu tipo de retención de IRPF al cambiar de trabajo o tener hijos para evitar sorpresas en la Declaración de la Renta.'
    ]
  },
  {
    toolKey: 'salary',
    lang: 'pt',
    dir: 'ltr',
    canonical: 'https://smartcalclab.com/salary?lang=pt',
    title: 'Calculadora de Salário Líquido | SmartCalcLab',
    metaDesc: 'Calculadora de salário líquido a partir do salário bruto. Calcule descontos de INSS, IRRF e seu salário a receber no Brasil e Portugal.',
    name: 'Calculadora de Salário Líquido',
    subtitle: 'Calcule seu salário líquido mensal após descontos oficiais de INSS e Imposto de Renda (IRRF).',
    badge: 'Cálculo Trabalhista Brasil',
    shortDesc: 'Calcule seu salário líquido a partir do salário bruto.',
    introParagraphs: [
      'Ao receber uma proposta de emprego no Brasil ou Portugal, o valor anunciado costuma ser o salário bruto. Contudo, o montante que realmente cai na sua conta bancária é o salário líquido.',
      'Nossa ferramenta aplica os descontos obrigatórios de INSS e tabela progressiva do IRRF para mostrar o valor líquido exato de cada mês.'
    ],
    howItWorksTitle: 'Como Calcular o Salário Líquido',
    howItWorksSteps: [
      { step: '1. Informe o Salário Bruto', desc: 'Digite o valor total do salário registrado em carteira (CLT).' },
      { step: '2. Desconto do INSS', desc: 'A alíquota progressiva do INSS é deduzida de acordo com as faixas salariais.' },
      { step: '3. Desconto do IRRF', desc: 'O Imposto de Renda é calculado sobre o saldo restante após a dedução do INSS.' }
    ],
    formulaTitle: 'Fórmula do Salário Líquido',
    formulaMath: 'Salário Líquido = Salário Bruto - INSS - IRRF - Outros Descontos',
    formulaExplanation: 'O salário líquido é o valor final depositado pelo empregador.',
    exampleTitle: 'Exemplo de Salário de R$ 5.000,00',
    exampleText: 'Com salário bruto de R$ 5.000,00, descontando INSS e IRRF pela tabela progressiva, o salário líquido a receber fica em aproximadamente R$ 4.120,00.',
    faqsTitle: 'Perguntas Frecuentes sobre Salário',
    faqs: [
      { q: 'O que desconta do salário bruto?', a: 'Os descontos legais obrigatórios são a previdência social (INSS) e o imposto de renda retido na fonte (IRRF), além de eventuais benefícios como vale-transporte e plano de saúde.' }
    ],
    tips: [
      'Planeje seus gastos mensais sempre com base no salário líquido e nunca no salário bruto.'
    ]
  }
]

for (const p of MULTILINGUAL_PAGES) {
  let html = template
  html = html.replace(/<html lang=".*?" dir=".*?">/, `<html lang="${p.lang}" dir="${p.dir}">`)
  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`)
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${p.title}" />`)
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${p.metaDesc}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${p.canonical}" />`)

  const multiContentHtml = `
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-4 px-6">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="/" style="font-weight: 800; font-size: 1.35rem; color: #2563eb; text-decoration: none;">SmartCalcLab</a>
          <nav style="display: flex; gap: 1.25rem; font-size: 0.875rem; flex-wrap: wrap;">
            <a href="/salary" style="color: #475569; text-decoration: none; font-weight: 500;">Salary</a>
            <a href="/loan" style="color: #475569; text-decoration: none; font-weight: 500;">Mortgage & Loan</a>
            <a href="/autoloan" style="color: #475569; text-decoration: none; font-weight: 500;">Auto Loan</a>
            <a href="/currency" style="color: #475569; text-decoration: none; font-weight: 500;">Currency</a>
            <a href="/bmi" style="color: #475569; text-decoration: none; font-weight: 500;">BMI</a>
            <a href="/compound" style="color: #475569; text-decoration: none; font-weight: 500;">Compound</a>
            <a href="/percentage" style="color: #475569; text-decoration: none; font-weight: 500;">Percentage</a>
            <a href="/guides" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Guides</a>
          </nav>
        </div>
      </header>

      <main style="max-width: 1100px; margin: 2rem auto; padding: 0 1rem; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1e293b;" dir="${p.dir}">
        <nav aria-label="Breadcrumb" style="font-size: 0.8125rem; color: #64748b; margin-bottom: 1.5rem;">
          <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; <span>Calculators</span> &gt; <strong>${p.name}</strong>
        </nav>

        <h1 style="font-size: 2.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.2;">${p.title}</h1>
        <p style="font-size: 1.125rem; color: #475569; margin-bottom: 2rem;">${p.subtitle}</p>

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: inline-block; padding: 0.25rem 0.75rem; background: #eff6ff; color: #2563eb; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem;">
            ${p.badge}
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">${p.name}</h2>
          <p style="font-size: 0.9375rem; color: #64748b; margin-bottom: 1.5rem;">${p.shortDesc}</p>
          <div style="padding: 1.5rem; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 0.5rem; text-align: center; color: #64748b; font-size: 0.875rem;">
            Interactive calculation engine initialized.
          </div>
        </section>

        <article style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">${p.name}</h2>
          ${p.introParagraphs.map(para => `<p style="margin-bottom: 1rem; font-size: 1rem; color: #334155; line-height: 1.7;">${para}</p>`).join('')}
        </article>

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 1.25rem;">${p.howItWorksTitle}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            ${p.howItWorksSteps.map((s, idx) => `
              <div style="padding: 1.25rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem;">
                <div style="font-size: 0.75rem; font-weight: 700; color: #2563eb; text-transform: uppercase; margin-bottom: 0.35rem;">Paso 0${idx + 1}</div>
                <h4 style="font-weight: 600; font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">${s.step}</h4>
                <p style="font-size: 0.875rem; color: #475569; line-height: 1.5;">${s.desc}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-size: 0.75rem; font-weight: 700; color: #4f46e5; text-transform: uppercase; margin-bottom: 0.35rem;">Fórmula Matemática</div>
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">${p.formulaTitle}</h3>
            <div style="background: #0f172a; color: #fde047; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; padding: 1rem; border-radius: 0.5rem; font-size: 0.875rem; margin-bottom: 1rem; word-break: break-all;">
              ${p.formulaMath}
            </div>
            <p style="font-size: 0.875rem; color: #475569; line-height: 1.5;">${p.formulaExplanation}</p>
          </div>

          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-size: 0.75rem; font-weight: 700; color: #059669; text-transform: uppercase; margin-bottom: 0.35rem;">Ejemplo Real</div>
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">${p.exampleTitle}</h3>
            <p style="font-size: 0.875rem; color: #475569; line-height: 1.6;">${p.exampleText}</p>
          </div>
        </section>

        <section style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 2rem; margin-bottom: 2.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.375rem; font-weight: 700; color: #0f172a; margin-bottom: 1.5rem;">${p.faqsTitle}</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${p.faqs.map(f => `
              <div style="border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 1.25rem; background: #f8fafc;">
                <h4 style="font-weight: 600; font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">${f.q}</h4>
                <p style="font-size: 0.875rem; color: #475569; line-height: 1.6;">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </main>

      <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-sm text-slate-500">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <strong style="color: #0f172a;">SmartCalcLab</strong> — 100% Free Financial, Health & Daily Multi-Calculators.
            <p style="font-size: 0.75rem; margin-top: 0.35rem;">© 2026 SmartCalcLab.</p>
          </div>
          <div style="display: flex; gap: 1.25rem; font-size: 0.8125rem;">
            <a href="/guides" style="color: #2563eb; text-decoration: none; font-weight: 600;">Guides</a>
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
          </div>
        </div>
      </footer>
  `

  const multiFaqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://smartcalclab.com/#website',
        'url': 'https://smartcalclab.com/',
        'name': 'SmartCalcLab',
        'inLanguage': p.lang
      },
      {
        '@type': 'WebApplication',
        '@id': `${p.canonical}#webapp`,
        'name': p.title,
        'url': p.canonical,
        'inLanguage': p.lang,
        'applicationCategory': p.toolKey === 'bmi' ? 'HealthApplication' : 'FinanceApplication',
        'operatingSystem': 'All',
        'description': p.metaDesc,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://smartcalclab.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': p.name,
            'item': p.canonical
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': p.faqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      }
    ]
  }

  const jsonLdRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/
  html = html.replace(jsonLdRegex, `<script type="application/ld+json">\n${JSON.stringify(multiFaqSchema, null, 2)}\n    </script>`)

  html = replaceRoot(html, multiContentHtml)

  const fileName = `${p.toolKey}-${p.lang}.html`
  fs.writeFileSync(path.resolve(distDir, fileName), html, 'utf-8')
  console.log(`[prerender] Rendered Multilingual HTML: /${fileName} (${p.lang})`)
}

console.log('[prerender] Complete! Generated static HTML for all routes & educational guides.')
