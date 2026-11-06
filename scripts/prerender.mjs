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
    title: 'Salary Calculator – Gross to Net Pay & Take-Home Salary (2026)',
    subtitle: 'Convert between annual salary, monthly pay, and hourly wages to calculate your exact net take-home paycheck after federal, state, and local taxes.',
    metaDesc: 'Free salary calculator to convert hourly, monthly, and annual gross pay to net take-home paycheck after federal income tax, state tax, and pre-tax deductions.',
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
      { q: 'How does an annual to gross calculator work?', a: 'An annual to gross calculator determines your total gross earnings before any taxes or withholdings are deducted. If you earn an hourly rate, multiply the hourly pay by 40 hours per week and 52 weeks (2,080 standard hours) to calculate total annual gross compensation.' },
      { q: 'How do IRS Publication 15-T and Form W-4 determine income tax withholding?', a: 'IRS Publication 15-T provides federal income tax withholding tables used by payroll departments. Your withholding depends on filing status, dependents, and additional withholdings declared on your Form W-4, which determines how much federal income tax is deducted from your gross pay each pay period.' },
      { q: 'What is the difference between bi-weekly and semi-monthly pay periods?', a: 'Bi-weekly pay occurs every two weeks, resulting in 26 pay periods per year (with two months having three paychecks). Semi-monthly pay occurs twice per month (typically on the 15th and last day of the month), totaling 24 pay periods per year. Divide your annual salary by 26 for bi-weekly gross pay, or by 24 for semi-monthly pay.' },
      { q: 'What is the difference between pre-tax and post-tax contributions?', a: 'Pre-tax contributions (such as traditional 401k retirement plans, HSA, FSA, and health insurance premiums) reduce your gross taxable income before federal and state income taxes are calculated. Post-tax contributions (such as Roth 401k or Roth IRA) are deducted after taxes, allowing tax-free withdrawals in retirement.' },
      { q: 'How does self-employment tax differ from standard W-2 payroll withholding?', a: 'W-2 employees split FICA taxes with their employer (paying 6.2% for Social Security and 1.45% for Medicare, total 7.65%). Self-employed individuals pay the full 15.3% self-employment tax (SECA), though half of this amount is deductible when calculating federal adjusted gross income.' },
      { q: 'What are court-ordered wage garnishments?', a: 'Wage garnishment is a legal procedure where an employer is required to withhold a portion of an employee’s gross earnings for payment of a debt, such as child support, back taxes, or defaulted student loans, under Title III of the Consumer Credit Protection Act.' },
      { q: 'How do you convert hourly wage to gross annual salary?', a: 'Multiply your hourly rate by 2,080 (40 hours/week × 52 weeks). For example, $30/hour × 2,080 hours = $62,400 gross annual salary. For part-time workers, multiply your specific weekly hours by 52.' },
      { q: 'What is the difference between gross pay and net pay?', a: 'Gross pay is the total amount earned before any deductions or withholdings. Net pay (take-home pay) is the remaining amount deposited into your bank account after all taxes, benefits, and garnishments.' }
    ],
    tips: [
      'Maxing out pre-tax retirement accounts (like 401k or employer pension) lowers your taxable income bracket and reduces current-year federal income tax.',
      'Review your Form W-4 with your employer periodically, especially after life events like marriage or having a child, to prevent under-withholding or excessive tax refunds.'
    ]
  },
  {
    key: 'loan',
    name: 'Mortgage Cost Estimator & Loan Calculator',
    shortDesc: 'Compute monthly mortgage payments, down payment, property taxes, insurance, and amortization schedule.',
    title: 'Mortgage Cost Estimator & Calculator (with Taxes & Insurance)',
    subtitle: 'Accurately compute monthly mortgage payments, calculate down payment savings, property taxes, homeowners insurance, and analyze your principal vs interest chart.',
    metaDesc: 'Free mortgage cost estimator to compute monthly home payments with taxes, insurance, down payment, interest rates, and full amortization schedule.',
    badge: 'High Precision Mortgage Tool',
    introParagraphs: [
      'Estimating your total monthly homeownership cost is the most critical step before shopping for real estate or negotiating a home loan. Our free Mortgage Cost Estimator and Loan Calculator allows you to compute your exact monthly mortgage payment, factoring in principal, interest, property taxes, homeowners insurance (hazard insurance), and private mortgage insurance (PMI).',
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
      { q: 'How is the down payment for a house calculated?', a: 'The down payment is calculated as: Down Payment = Home Price × Down Payment Percentage. For a $350,000 home, a 20% down payment equals $70,000, which lowers your borrowing amount to $280,000 and eliminates private mortgage insurance (PMI).' },
      { q: 'What is the difference between a 15-year and a 30-year mortgage?', a: 'A 30-year mortgage has lower monthly payments spread across 360 months, making it easier to qualify. A 15-year mortgage has higher monthly payments but lower interest rates and typically saves over 60% in lifetime interest charges.' }
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
      { q: 'Should I choose a 60-month or 72-month auto loan?', a: 'A 60-month (5-year) loan is the recommended benchmark. 72-month and 84-month loans lower your monthly payment but cause you to pay significantly more interest and risk becoming upside-down (owing more than the car is worth).' },
      { q: 'Does a trade-in reduce car sales tax?', a: 'In most US states and countries, the value of your trade-in vehicle is subtracted from the purchase price before sales tax is calculated, saving you hundreds of dollars in taxes.' }
    ],
    tips: [
      'Getting pre-approved by your credit union or bank before visiting a car dealership gives you powerful leverage to beat dealership markup rates.',
      'Aim to put at least 10% to 20% down to prevent negative equity (being upside-down on your auto loan) as the vehicle depreciates.'
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
      'Always choose to be charged in the local currency when paying with a card abroad to avoid Dynamic Currency Conversion fees.'
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
      'While it does not directly measure body fat percentage, it serves as an effective, reliable indicator for health risks related to being underweight or overweight. Our calculator supports both metric measurements (weight in kg and height in cm) and imperial units (lbs, feet, inches).'
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
      { q: 'How do you calculate body mass index with kg and cm?', a: 'To calculate BMI in metric units (kg & cm), convert height from centimeters to meters by dividing by 100, square the result, and divide your weight in kilograms by this number: BMI = Weight (kg) / [Height (cm) / 100]².' },
      { q: 'What does a BMI of 19.34, 21.3, or 23.1 mean?', a: 'A BMI between 18.5 and 24.9 (including scores like 19.34, 21.3, and 23.1) is classified as Normal or Healthy Weight by the World Health Organization (WHO).' },
      { q: 'Is BMI accurate for athletes and bodybuilders?', a: 'Muscular individuals may register as overweight or obese because muscle is denser than fat. In these cases, body fat percentage and waist circumference provide better metrics.' }
    ],
    tips: [
      'Combine your BMI measurement with waist circumference for a more complete cardiovascular risk picture.',
      'Gradual weight adjustments of 0.5 to 1 kg per week are considered sustainable and medically sound.'
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
      { q: 'How do you calculate a 20% tip quickly?', a: 'Move the decimal point one place to the left to find 10%, then double that number to get 20%.' },
      { q: 'What is the difference between percentage and percentage points?', a: 'A change from 10% to 15% is an increase of 5 percentage points, but a 50% relative increase.' }
    ],
    tips: [
      'To quickly add 15% tax, multiply the base price by 1.15.',
      'Discounts do not add up directly: 20% off plus an extra 20% off equals a 36% total discount, not 40%.'
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
      { q: 'What is the Rule of 72?', a: 'Divide 72 by your annual interest rate to find the approximate number of years it takes for your investment to double. At 8%, your money doubles in ~9 years.' },
      { q: 'How does compounding frequency affect returns?', a: 'The more frequently interest is compounded (monthly vs. annually), the slightly higher your effective annual yield (APY).' }
    ],
    tips: [
      'Time in the market is vastly more powerful than timing the market due to compounding curves.',
      'Starting 10 years earlier can more than double your final retirement balance even with smaller contributions.'
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
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Last Updated: October 2026</p>
        <p>Welcome to SmartCalcLab ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. All calculations run strictly in your web browser (client-side).</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">1. Information We Do Not Collect</h2>
        <p>When you use our financial, salary, loan, BMI, or currency calculators, all input numbers, salaries, loan terms, and health data remain strictly within your local browser session. We never transmit, store, or log your calculations on any external server.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">2. Cookies & Advertising</h2>
        <p>We use Google AdSense to serve ads when you visit our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.</p>
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
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem;">Last Updated: October 2026</p>
        <p>By accessing and using SmartCalcLab, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">Use of Calculation Tools</h2>
        <p>Our tools are provided for general educational, illustrative, and informational purposes only. Results do not constitute binding financial, tax, or legal quotes.</p>
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">Intellectual Property</h2>
        <p>All content, branding, algorithmic implementations, and interface designs are the intellectual property of SmartCalcLab.</p>
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
        <p>Our editorial and technical team typically responds within 24 to 48 business hours.</p>
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
        <h2 style="font-size: 1.35rem; font-weight: 700; color: #0f172a; margin: 1.5rem 0 0.5rem;">2. Health & Medical Information</h2>
        <p>Body Mass Index (BMI) calculations provide generalized weight category guidelines based on World Health Organization metrics. BMI does not directly measure body fat percentage or muscle composition and should never substitute professional medical consultation.</p>
      </main>
    `
  }
]

console.log('[prerender] Starting static pre-rendering for all routes...')

// 1. Pre-render Calculator Tools
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

        <section style="margin-bottom: 3rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Explore Related Calculators</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <a href="/salary" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Annual & Hourly Salary</a>
            <a href="/loan" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Mortgage & Personal Loan</a>
            <a href="/autoloan" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Car Loan & Auto Financing</a>
            <a href="/compound" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Compound Interest</a>
            <a href="/currency" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Live Currency Exchange</a>
            <a href="/bmi" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">BMI & Healthy Weight</a>
            <a href="/percentage" style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; text-decoration: none; color: #1e293b; background: #ffffff;">Percentage & Discount</a>
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
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/about" style="color: #64748b; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #64748b; text-decoration: none;">Contact</a>
            <a href="/disclaimer" style="color: #64748b; text-decoration: none;">Disclaimer</a>
          </div>
        </div>
      </footer>
  `

  const rootRegex = /<div id="root">[\s\S]*?<\/div>/
  html = html.replace(rootRegex, `<div id="root">${contentHtml}</div>`)

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
            <a href="/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
            <a href="/terms" style="color: #64748b; text-decoration: none;">Terms of Service</a>
            <a href="/about" style="color: #64748b; text-decoration: none;">About Us</a>
            <a href="/contact" style="color: #64748b; text-decoration: none;">Contact</a>
            <a href="/disclaimer" style="color: #64748b; text-decoration: none;">Disclaimer</a>
          </div>
        </div>
      </footer>
  `

  const rootRegex = /<div id="root">[\s\S]*?<\/div>/
  html = html.replace(rootRegex, `<div id="root">${fullLegalHtml}</div>`)

  const targetDir = path.resolve(distDir, page.key)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  fs.writeFileSync(path.resolve(targetDir, 'index.html'), html, 'utf-8')
  fs.writeFileSync(path.resolve(distDir, `${page.key}.html`), html, 'utf-8')
  console.log(`[prerender] Rendered: /${page.key}`)
}

console.log('[prerender] Complete! Generated static HTML for all 12 routes.')
