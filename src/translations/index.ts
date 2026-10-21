import { Language, LanguageInfo, ToolId, ToolSEOData, PageId } from '../types';

export const LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
    region: 'USA & Worldwide'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    flag: '🇪🇸',
    region: 'España & Latinoamérica'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    region: 'الشرق الأوسط والخليج'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    dir: 'ltr',
    flag: '🇮🇳',
    region: 'भारत (India)'
  }
];

export interface TranslationDictionary {
  siteName: string;
  tagline: string;
  searchPlaceholder: string;
  categories: {
    all: string;
    finance: string;
    health: string;
    daily: string;
  };
  navigation: {
    home: string;
    tools: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    disclaimer: string;
  };
  ads: {
    advertisement: string;
    sponsoredNotice: string;
    adPlaceholder: string;
  };
  common: {
    calculate: string;
    reset: string;
    result: string;
    monthlyPayment: string;
    totalPayment: string;
    totalInterest: string;
    amount: string;
    rate: string;
    years: string;
    months: string;
    currency: string;
    copyResult: string;
    copied: string;
    share: string;
    print: string;
    close: string;
    backToHome: string;
  };
  tools: Record<ToolId, {
    name: string;
    shortDesc: string;
    category: 'finance' | 'health' | 'daily';
    seo: ToolSEOData;
  }>;
  legal: {
    privacyTitle: string;
    privacyLastUpdated: string;
    termsTitle: string;
    aboutTitle: string;
    contactTitle: string;
    disclaimerTitle: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    siteName: 'SmartCalcLab',
    tagline: 'Fast, Free & Accurate Calculators for Daily Finance, Health & Math',
    searchPlaceholder: 'Search calculators (e.g., Loan EMI, Currency, BMI)...',
    categories: {
      all: 'All Tools',
      finance: 'Finance & Money',
      health: 'Health & Fitness',
      daily: 'Everyday Utility'
    },
    navigation: {
      home: 'Home',
      tools: 'Calculators',
      about: 'About Us',
      contact: 'Contact Us',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'Disclaimer'
    },
    ads: {
      advertisement: 'Advertisement',
      sponsoredNotice: 'Ads help keep our calculators 100% free for everyone',
      adPlaceholder: 'AdSense Responsive Ad Unit'
    },
    common: {
      calculate: 'Calculate',
      reset: 'Reset',
      result: 'Calculation Result',
      monthlyPayment: 'Monthly Payment',
      totalPayment: 'Total Payment',
      totalInterest: 'Total Interest',
      amount: 'Amount',
      rate: 'Annual Interest Rate (%)',
      years: 'Term (Years)',
      months: 'Months',
      currency: 'Currency',
      copyResult: 'Copy Results',
      copied: 'Copied to clipboard!',
      share: 'Share Tool',
      print: 'Print Breakdown',
      close: 'Close',
      backToHome: 'Back to All Calculators'
    },
    tools: {
      loan: {
        name: 'Loan & EMI Calculator',
        shortDesc: 'Calculate monthly loan payments, total interest, and full amortization schedule.',
        category: 'finance',
        seo: {
          title: 'Free Loan & Mortgage EMI Calculator | Monthly Payment Simulator',
          subtitle: 'Accurately simulate mortgages, auto loans, and personal credit installments with zero hidden fees.',
          metaDesc: 'Free online loan and mortgage EMI calculator. Compute monthly payment, interest rate costs, and total repayment schedule in seconds.',
          badge: 'High Value Finance Tool',
          introParagraphs: [
            'Understanding the true cost of borrowing money is the most critical step before committing to a mortgage, car loan, or personal credit. Our free loan calculator computes your exact monthly installments (EMI), total interest payable, and the total lifetime repayment of any loan.',
            'Whether you are negotiating home financing or evaluating bank offers, this tool gives you instant transparency with complete amortization details.'
          ],
          howItWorksTitle: 'How to Calculate Your Loan Repayment',
          howItWorksSteps: [
            { step: '1. Enter Principal Amount', desc: 'The exact amount of money you want to borrow from the bank or financial institution.' },
            { step: '2. Specify Annual Interest Rate', desc: 'The fixed annual percentage rate (APR) quoted by your lender.' },
            { step: '3. Select Loan Duration', desc: 'The repayment period in years or months. Longer terms lower monthly payments but increase total interest.' }
          ],
          formulaTitle: 'The Amortization Formula',
          formulaMath: 'EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]',
          formulaExplanation: 'Where P is Principal loan amount, r is monthly interest rate (Annual rate / 12 / 100), and n is total number of monthly payments.',
          exampleTitle: 'Real-World Example',
          exampleText: 'Borrowing $250,000 for a mortgage at 6.5% interest over 30 years results in a monthly payment of $1,580.17. Over the full 30-year span, total interest paid equals $318,861.20, for a total payoff of $568,861.20.',
          faqsTitle: 'Frequently Asked Questions (FAQ)',
          faqs: [
            { q: 'What is an EMI?', a: 'EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.' },
            { q: 'Does this calculator include property tax or insurance?', a: 'This tool computes principal and interest. If your loan includes escrow for PMI, taxes, or home insurance, add those monthly fees to the resulting figure.' },
            { q: 'How does paying extra principal help?', a: 'Making additional payments directly towards the principal reduces the compounding base, shortening your loan term and saving thousands in interest.' }
          ],
          tips: [
            'A 15-year mortgage typically saves over 60% in lifetime interest compared to a 30-year mortgage.',
            'Always compare the APR (Annual Percentage Rate) which includes bank closing costs, not just the nominal interest rate.'
          ]
        }
      },
      currency: {
        name: 'Live Currency Converter',
        shortDesc: 'Convert between world currencies with live market rates and fee estimates.',
        category: 'finance',
        seo: {
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
        }
      },
      bmi: {
        name: 'BMI & Body Health Calculator',
        shortDesc: 'Calculate your Body Mass Index (BMI), ideal weight range, and health status.',
        category: 'health',
        seo: {
          title: 'BMI Calculator | Body Mass Index & Ideal Healthy Weight',
          subtitle: 'Calculate your BMI in Metric (cm/kg) or Imperial (ft/in/lbs) with instant health guidance.',
          metaDesc: 'Free online BMI calculator. Check whether you are underweight, normal weight, overweight, or obese based on WHO health standards.',
          badge: 'Everyday Health Essential',
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
            { q: 'Is BMI accurate for athletes and bodybuilders?', a: 'Muscular individuals may register as overweight or obese because muscle is denser than fat. In these cases, body fat percentage and waist circumference provide better metrics.' },
            { q: 'What is a healthy BMI for adults?', a: 'For adult men and women, a healthy BMI falls between 18.5 and 24.9.' }
          ],
          tips: [
            'Combine your BMI measurement with waist circumference for a more complete cardiovascular risk picture.',
            'Gradual weight adjustments of 0.5 to 1 kg per week are considered sustainable and medically sound.'
          ]
        }
      },
      percentage: {
        name: 'Percentage & Discount Calculator',
        shortDesc: 'Calculate percentage changes, find X% of Y, and compute sales discounts with tax.',
        category: 'daily',
        seo: {
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
        }
      },
      compound: {
        name: 'Compound Interest Calculator',
        shortDesc: 'See how your investments and savings grow over time with compounding returns.',
        category: 'finance',
        seo: {
          title: 'Compound Interest Calculator | Investment & Wealth Simulator',
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
      },
      salary: {
        name: 'Salary & Net Pay Calculator',
        shortDesc: 'Estimate take-home pay after income tax, social security, and deductions.',
        category: 'finance',
        seo: {
          title: 'Salary & In-Hand Net Pay Calculator | Gross to Net Paycheck',
          subtitle: 'Calculate your true take-home pay, estimated income tax brackets, and monthly deductions.',
          metaDesc: 'Free salary net pay calculator. Estimate your monthly, bi-weekly, and annual take-home paycheck after tax and standard payroll deductions.',
          badge: 'High Value Workplace Utility',
          introParagraphs: [
            'Negotiating a new job offer or planning your personal monthly budget requires knowing your true in-hand salary, not just the gross headline number.',
            'Taxes, pension contributions, and healthcare deductions can reduce gross pay by 20% to 40%. This tool gives you a clear estimation of your spendable take-home income.'
          ],
          howItWorksTitle: 'Calculating Take-Home Pay',
          howItWorksSteps: [
            { step: '1. Enter Gross Compensation', desc: 'Input your total annual or monthly salary before any deductions.' },
            { step: '2. Specify Estimated Tax Rate', desc: 'Use average income tax rates or standard progressive tax tiers.' },
            { step: '3. Add Social Contributions & Deductions', desc: 'Include employee pension, social security, or insurance withholdings.' }
          ],
          formulaTitle: 'Net Salary Formula',
          formulaMath: 'Net Pay = Gross Salary - (Income Tax + Social Contributions + Other Withholdings)',
          formulaExplanation: 'Take-home pay equals total gross earnings minus all mandatory tax brackets and voluntary retirement contributions.',
          exampleTitle: 'Sample Salary Breakdown',
          exampleText: 'An annual gross salary of $60,000 with an effective 18% tax rate and 7% social security contributions leaves an estimated net annual pay of $45,000, or approximately $3,750 per month in spendable income.',
          faqsTitle: 'Salary & Payroll FAQs',
          faqs: [
            { q: 'What is the difference between gross pay and net pay?', a: 'Gross pay is the total amount earned before any deductions. Net pay (take-home pay) is the remaining amount deposited into your bank account.' },
            { q: 'What are progressive tax brackets?', a: 'Progressive tax means only the income within a specific bracket is taxed at that bracket\'s rate, rather than your entire income.' }
          ],
          tips: [
            'Maxing out pre-tax retirement accounts (like 401k or employer pension) lowers your taxable income bracket.',
            'Review your paycheck paystubs periodically to ensure tax withholding amounts align with year-end tax returns.'
          ]
        }
      }
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      privacyLastUpdated: 'Last Updated: October 2026',
      termsTitle: 'Terms of Service',
      aboutTitle: 'About SmartCalcLab',
      contactTitle: 'Contact Us & Feedback',
      disclaimerTitle: 'Disclaimer & Financial Notice'
    }
  },

  es: {
    siteName: 'SmartCalcLab Español',
    tagline: 'Calculadoras Rápidas, Gratuitas y Precisas para Finanzas, Salud y Matemáticas',
    searchPlaceholder: 'Buscar herramientas (ej. Préstamo, Conversor de divisas, IMC)...',
    categories: {
      all: 'Todas las Herramientas',
      finance: 'Finanzas y Dinero',
      health: 'Salud y Bienestar',
      daily: 'Utilidades Diarias'
    },
    navigation: {
      home: 'Inicio',
      tools: 'Calculadoras',
      about: 'Quiénes Somos',
      contact: 'Contacto',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Uso',
      disclaimer: 'Aviso Legal'
    },
    ads: {
      advertisement: 'Publicidad',
      sponsoredNotice: 'Los anuncios nos permiten mantener todas las herramientas 100% gratuitas',
      adPlaceholder: 'Espacio Publicitario AdSense'
    },
    common: {
      calculate: 'Calcular',
      reset: 'Restablecer',
      result: 'Resultado del Cálculo',
      monthlyPayment: 'Cuota Mensual Estimada',
      totalPayment: 'Total a Pagar',
      totalInterest: 'Intereses Totales',
      amount: 'Importe o Capital',
      rate: 'Tipo de Interés Anual (%)',
      years: 'Plazo (Años)',
      months: 'Meses',
      currency: 'Moneda',
      copyResult: 'Copiar Resultado',
      copied: '¡Copiado al portapapeles!',
      share: 'Compartir',
      print: 'Imprimir',
      close: 'Cerrar',
      backToHome: 'Volver a Todas las Calculadoras'
    },
    tools: {
      loan: {
        name: 'Calculadora de Préstamos e Hipotecas',
        shortDesc: 'Calcula tu cuota mensual, intereses acumulados y cuadro de amortización completo.',
        category: 'finance',
        seo: {
          title: 'Calculadora de Préstamos e Hipotecas Online | Simulador de Cuotas',
          subtitle: 'Simula préstamos personales, hipotecas y créditos bancarios con cuota mensual exacta en España y Latinoamérica.',
          metaDesc: 'Calculadora de préstamos y simulador de hipoteca gratis. Calcula tu cuota mensual, amortización e intereses totales en segundos.',
          badge: 'Alta Rentabilidad Financiera',
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
        }
      },
      currency: {
        name: 'Conversor de Divisas en Tiempo Real',
        shortDesc: 'Convierte divisas mundiales con tipos de cambio actualizados: Euro, Dólar, Pesos y más.',
        category: 'finance',
        seo: {
          title: 'Conversor de Divisas y Monedas Online | Tipo de Cambio Oficial',
          subtitle: 'Calcula conversiones entre Euro (EUR), Dólar (USD), Peso Mexicano (MXN), Peso Colombiano (COP) y más.',
          metaDesc: 'Conversor de divisas gratuito con tipos de cambio en directo. Convierte euros a dólares, pesos mexicanos a dólares y divisas internacionales.',
          badge: 'Utilidad Diaria de Gran Demanda',
          introParagraphs: [
            'Los tipos de cambio entre monedas fluctúan constantemente en los mercados internacionales. Si viajas al extranjero, compras por internet o envías remesas familiares a Latinoamérica o España, nuestro conversor te ofrece la tasa media de mercado real.',
            'Evita comisiones abusivas comprobando siempre el valor oficial antes de cambiar dinero en bancos o casas de cambio.'
          ],
          howItWorksTitle: 'Pasos para Convertir Divisas',
          howItWorksSteps: [
            { step: '1. Selecciona la Moneda Origen', desc: 'La divisa que tienes actualmente (por ejemplo, EUR o USD).' },
            { step: '2. Selecciona la Moneda Destino', desc: 'La divisa a la que deseas convertir (por ejemplo, MXN o ARS).' },
            { step: '3. Introduce el Importe', desc: 'Escribe cualquier valor numérico para ver el cálculo inmediato.' }
          ],
          formulaTitle: 'Fórmula de Conversión Monetaria',
          formulaMath: 'Resultado = Cantidad × (Tasa Destino / Tasa Origen)',
          formulaExplanation: 'Se aplica el tipo medio interbancario de cotización continua.',
          exampleTitle: 'Ejemplo de Conversión',
          exampleText: 'Convertir 500 Dólares estadounidenses (USD) a Pesos Mexicanos (MXN) a una tasa de 1 USD = 18,50 MXN equivale a 9.250,00 MXN.',
          faqsTitle: 'Preguntas Frecuentes sobre Cambio de Moneda',
          faqs: [
            { q: '¿Qué es el tipo de cambio interbancario?', a: 'Es la tasa mayorista a la que los grandes bancos internacionales intercambian divisas entre sí, sin márgenes comerciales.' },
            { q: '¿Por qué las casas de cambio de los aeropuertos son más caras?', a: 'Porque aplican márgenes y diferenciales de cambio de hasta un 15% o 20% para cubrir costes operativos y maximizar beneficios.' }
          ],
          tips: [
            'Cuando viajes al extranjero y pagues con tarjeta, elige siempre pagar en la moneda local del país para que tu banco aplique el cambio oficial.',
            'Compara las tasas de comisiones fijas frente a comisiones porcentuales en envíos de remesas.'
          ]
        }
      },
      bmi: {
        name: 'Calculadora de IMC (Masa Corporal)',
        shortDesc: 'Calcula tu Índice de Masa Corporal, peso saludable ideal y estado nutricional.',
        category: 'health',
        seo: {
          title: 'Calculadora de IMC Online Gratis | Índice de Masa Corporal OMS',
          subtitle: 'Comprueba si tu peso es normal, bajo peso, sobrepeso u obesidad según los estándares de la OMS.',
          metaDesc: 'Calculadora de IMC gratis. Calcula tu índice de masa corporal y peso ideal en centímetros y kilogramos en pocos clics.',
          badge: 'Salud y Bienestar',
          introParagraphs: [
            'El Índice de Masa Corporal (IMC) es el método de referencia avalado por la Organización Mundial de la Salud (OMS) para clasificar el estado nutricional y ponderal en adultos.',
            'Permite detectar de manera rápida y no invasiva situaciones de bajo peso, sobrepeso u obesidad asociadas a riesgos cardiovasculares y metabólicos.'
          ],
          howItWorksTitle: 'Cómo se Evalúa el IMC',
          howItWorksSteps: [
            { step: '1. Selecciona el Sistema de Medidas', desc: 'Métrico (cm y kg) o Imperial (libras y pulgadas).' },
            { step: '2. Introduce tu Estatura y Peso Actual', desc: 'Para mayor precisión, pésate por la mañana en ayunas y sin calzado.' },
            { step: '3. Analiza tu Rango y Recomendaciones', desc: 'Observa tu posición en la escala y consejos para mantener un peso saludable.' }
          ],
          formulaTitle: 'Fórmula Oficial de la OMS',
          formulaMath: 'IMC = Peso (kg) / [Altura (m)]²',
          formulaExplanation: 'Bajo peso: < 18,5 | Peso normal: 18,5 - 24,9 | Sobrepeso: 25 - 29,9 | Obesidad: ≥ 30.',
          exampleTitle: 'Ejemplo de Cálculo de IMC',
          exampleText: 'Una persona de 1,70 m de altura y 68 kg de peso tiene un IMC de: 68 / (1,70 × 1,70) = 23,53 kg/m², lo que corresponde a un peso óptimo y saludable.',
          faqsTitle: 'Preguntas Frecuentes sobre el IMC',
          faqs: [
            { q: '¿El IMC sirve para deportistas o personas musculosas?', a: 'El IMC no distingue entre masa muscular y tejido graso. Por ello, una persona muy musculosa puede registrar falsamente como sobrepeso.' },
            { q: '¿Cuál es el peso ideal para mi altura?', a: 'El rango de peso saludable se sitúa entre el peso correspondiente a un IMC de 18,5 y el de 24,9 para tu altura.' }
          ],
          tips: [
            'Complementa el resultado del IMC con la medición del perímetro abdominal (cintura).',
            'Para mejorar tu salud, prioriza una alimentación equilibrada y al menos 150 minutos de actividad física aeróbica a la semana.'
          ]
        }
      },
      percentage: {
        name: 'Calculadora de Porcentajes y Descuentos',
        shortDesc: 'Calcula porcentajes, variaciones, tanto por ciento y precios rebajados con IVA.',
        category: 'daily',
        seo: {
          title: 'Calculadora de Porcentajes y Rebajas Online | 3 en 1',
          subtitle: 'Resuelve fácilmente qué porcentaje representa una cifra, aumentos, descuentos y cálculo de IVA.',
          metaDesc: 'Calculadora de porcentajes online gratis: calcula tanto por ciento, aumentos y rebajas de compras con impuestos en un instante.',
          badge: 'Utilidad Matemática Práctica',
          introParagraphs: [
            'El cálculo de porcentajes es esencial en la vida cotidiana: calcular el descuento en ropa durante las rebajas, añadir el IVA a una factura comercial, calcular propinas o medir el crecimiento de una empresa.',
            'Con nuestra herramienta puedes resolver cualquier operación porcentual de forma directa y sin errores.'
          ],
          howItWorksTitle: 'Modos de Cálculo Disponibles',
          howItWorksSteps: [
            { step: 'Modo 1: Tanto por Ciento (X% de Y)', desc: 'Calcula qué cantidad representa un porcentaje sobre un número total.' },
            { step: 'Modo 2: Variación Porcentual', desc: 'Descubre qué porcentaje ha aumentado o disminuido un valor respecto al original.' },
            { step: 'Modo 3: Descuentos y Rebajas en Tiendas', desc: 'Introduce el precio original, el porcentaje de descuento y el impuesto local para saber el precio final de caja.' }
          ],
          formulaTitle: 'Fórmula Matemática del Porcentaje',
          formulaMath: 'Valor del Porcentaje = (Porcentaje / 100) × Total',
          formulaExplanation: 'Variación % = [(Valor Final - Valor Inicial) / Valor Inicial] × 100',
          exampleTitle: 'Ejemplo de Rebajas',
          exampleText: 'Un artículo que cuesta 80 € con un 25% de descuento te ahorra 20,00 €. El precio con descuento es de 60,00 €. Con un 21% de IVA, el precio final en caja es de 72,60 €.',
          faqsTitle: 'Preguntas Frecuentes sobre Porcentajes',
          faqs: [
            { q: '¿Cómo calcular el 10% de memoria?', a: 'Basta con mover la coma un lugar hacia la izquierda. El 10% de 350 es 35.' },
            { q: '¿Se pueden sumar dos descuentos del 20%?', a: 'No. Un 20% de descuento seguido de otro 20% adicional equivale a un 36% de descuento total real, no un 40%.' }
          ],
          tips: [
            'Para añadir un 21% de IVA directamente, multiplica el importe base por 1,21.',
            'Para desglosar el IVA de un precio final, divide el importe entre 1,21 en lugar de restar el 21%.'
          ]
        }
      },
      compound: {
        name: 'Calculadora de Interés Compuesto',
        shortDesc: 'Proyecta el crecimiento de tus ahorros e inversiones a largo plazo gracias al interés compuesto.',
        category: 'finance',
        seo: {
          title: 'Calculadora de Interés Compuesto | Simulador de Inversiones y Ahorro',
          subtitle: 'Descubre el poder del interés compuesto con aportaciones mensuales y rentabilidad anual.',
          metaDesc: 'Calculadora de interés compuesto gratis. Simula la rentabilidad de tus inversiones y fondos indexados a 5, 10, 20 o 30 años.',
          badge: 'Crecimiento Patrimonial',
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
          formulaMath: 'VF = C × (1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]',
          formulaExplanation: 'Donde C es el Capital inicial, r es el tipo anual (decimal), n es la frecuencia de capitalización, t son los años y PMT la aportación mensual.',
          exampleTitle: 'Ejemplo de Inversión a 25 Años',
          exampleText: 'Si comienzas con 3.000 € y aportas 250 € al mes con una rentabilidad anual del 8% durante 25 años, habrás aportado de tu bolsillo 78.000 €, pero tu capital total final alcanzará los 254.180 €. ¡Más de 176.000 € en intereses generados!',
          faqsTitle: 'Preguntas Frecuentes sobre Interés Compuesto',
          faqs: [
            { q: '¿Qué es la Regla del 72?', a: 'Es una fórmula mental rápida: divide 72 entre la tasa de interés anual para saber cuántos años tardará tu dinero en duplicarse. Al 8% anual, se duplica cada 9 años.' },
            { q: '¿Por qué es crucial empezar joven?', a: 'Porque la curva del interés compuesto es exponencial: los mayores rendimientos se producen en los últimos años del periodo.' }
          ],
          tips: [
            'La constancia y el tiempo son más determinantes para el éxito que intentar adivinar los momentos de mercado.',
            'Ten en cuenta el efecto de la inflación para estimar el poder adquisitivo real en el futuro.'
          ]
        }
      },
      salary: {
        name: 'Calculadora de Sueldo Neto',
        shortDesc: 'Calcula tu salario neto en mano tras retenciones de IRPF, impuestos y seguridad social.',
        category: 'finance',
        seo: {
          title: 'Calculadora de Sueldo Neto Online | De Salario Bruto a Neto',
          subtitle: 'Calcula tu nómina mensual real y retenciones en España, México y países hispanohablantes.',
          metaDesc: 'Calculadora de sueldo neto online gratis. Averigua cuánto vas a cobrar al mes en 12 o 14 pagas tras aplicar impuestos y deducciones.',
          badge: 'Laboral y Nóminas',
          introParagraphs: [
            'Al negociar una oferta de empleo o un aumento salarial, las empresas siempre expresan las cantidades en Salario Bruto Anual. Sin embargo, lo que realmente ingresa en tu cuenta bancaria es el Sueldo Neto.',
            'Esta calculadora desglosa los tramos de retención de impuestos sobre la renta (IRPF/ISR) y cotizaciones de la seguridad social para mostrarte tu salario mensual líquido.'
          ],
          howItWorksTitle: 'Pasos para Conocer tu Salario Líquido',
          howItWorksSteps: [
            { step: '1. Introduce el Salario Bruto', desc: 'Indica tu salario bruto anual o mensual pactado en el contrato.' },
            { step: '2. Ajusta el Porcentaje de Retención', desc: 'Utiliza el tramo estimado de impuesto sobre la renta según tu nivel salarial y situación familiar.' },
            { step: '3. Selecciona el Número de Pagas', desc: 'Elige si percibes tu retribución en 12 pagas ordinarias o en 14 pagas (con 2 pagas extraordinarias).' }
          ],
          formulaTitle: 'Cálculo de la Nómina Neta',
          formulaMath: 'Sueldo Neto = Salario Bruto - (Impuestos IRPF/ISR + Cotizaciones Seguridad Social)',
          formulaExplanation: 'El sueldo neto mensual resulta de dividir el salario neto anual entre el número de pagas anuales acordadas.',
          exampleTitle: 'Ejemplo de Nómina',
          exampleText: 'Para un sueldo bruto de 30.000 € anuales en 12 pagas, con una retención estimada del 15% de IRPF y 6,35% de Seguridad Social, el sueldo neto anual es de aproximadamente 23.595 €, lo que equivale a 1.966,25 € al mes.',
          faqsTitle: 'Preguntas Frecuentes sobre el Sueldo Neto',
          faqs: [
            { q: '¿Qué son las 14 pagas?', a: 'Significa que cobras 12 mensualidades habituales más dos pagas extras (habitualmente en verano y navidad). La retribución bruta total anual es la misma.' },
            { q: '¿Por qué me retienen más si no tengo hijos?', a: 'Los sistemas fiscales aplican deducciones y mínimos personales y familiares más altos a contribuyentes con hijos o familiares a cargo.' }
          ],
          tips: [
            'Revisa tu nómina cada enero para verificar si la empresa ha ajustado correctamente el tipo de retención para evitar sorpresas en la declaración de la renta.',
            'Los planes de retribución flexible (tarjeta restaurante, guardería, transporte) disfrutan de exenciones fiscales que aumentan tu salario neto.'
          ]
        }
      }
    },
    legal: {
      privacyTitle: 'Política de Privacidad y Cookies',
      privacyLastUpdated: 'Última actualización: Octubre 2026',
      termsTitle: 'Términos y Condiciones de Uso',
      aboutTitle: 'Acerca de SmartCalcLab',
      contactTitle: 'Contacto y Sugerencias',
      disclaimerTitle: 'Descargo de Responsabilidad y Aviso Legal'
    }
  },

  ar: {
    siteName: 'سمارت كالك لاب (SmartCalcLab)',
    tagline: 'حاسبات دقيقة ومجانية للاستخدام اليومي في المال، الصحة، والرياضيات',
    searchPlaceholder: 'ابحث عن حاسبة (مثال: حاسبة القروض، محول العملات، مؤشر كتلة الجسم)...',
    categories: {
      all: 'جميع الأدوات',
      finance: 'المال والتمويل',
      health: 'الصحة والرشاقة',
      daily: 'حاسبات يومية'
    },
    navigation: {
      home: 'الرئيسية',
      tools: 'الحاسبات',
      about: 'من نحن',
      contact: 'اتصل بنا',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      disclaimer: 'إخلاء المسؤولية'
    },
    ads: {
      advertisement: 'إعلان مدعوم',
      sponsoredNotice: 'تساعد الإعلانات في إبقاء كافة الحاسبات مجانية بالكامل للجميع',
      adPlaceholder: 'مساحة إعلانية متجاوبة (Google AdSense)'
    },
    common: {
      calculate: 'احسب الآن',
      reset: 'إعادة تعيين',
      result: 'نتيجة الحساب',
      monthlyPayment: 'القسط الشهري المتوقع',
      totalPayment: 'إجمالي المبلغ المسدد',
      totalInterest: 'إجمالي الفائدة / الأرباح',
      amount: 'مبلغ التمويل / القرض',
      rate: 'نسبة الفائدة السنوية (%)',
      years: 'مدة السداد (بالسنوات)',
      months: 'شهور',
      currency: 'العملة',
      copyResult: 'نسخ النتيجة',
      copied: 'تم النسخ إلى الحافظة!',
      share: 'مشاركة الأداة',
      print: 'طباعة التقرير',
      close: 'إغلاق',
      backToHome: 'العودة لجميع الحاسبات'
    },
    tools: {
      loan: {
        name: 'حاسبة القروض والتمويل العقاري',
        shortDesc: 'احسب القسط الشهري، إجمالي الأرباح، وجدول الاستهلاك للتمويل الشخصي والعقاري.',
        category: 'finance',
        seo: {
          title: 'حاسبة القروض والتمويل العقاري والشخصي | حساب القسط الشهري',
          subtitle: 'حاسبة دقيقة لمعرفة القسط الشهري للتمويل الشخصي والسيارات والتمويل العقاري في الدول العربية.',
          metaDesc: 'حاسبة قروض مجانية لحساب القسط الشهري وإجمالي الفوائد وجدول السداد للتمويل العقاري والشخصي بدقة وسرعة.',
          badge: 'أداة مالية عالية القيمة',
          introParagraphs: [
            'يعد حساب التكلفة الإجمالية للتمويل ومعرفة القسط الشهري بدقة الخطوة الأهم قبل التقدم بطلب قرض شخصي أو تمويل عقاري من البنوك وشركات التمويل.',
            'تتيح لك هذه الحاسبة مقارنة العروض البنكية ونسب الأرباح وفترات السداد لمعرفة صافي الالتزام المالي والتخطيط لميزانيتك الشهرية بكل شفافية.'
          ],
          howItWorksTitle: 'كيفية حساب قسط القرض',
          howItWorksSteps: [
            { step: '1. إدخال مبلغ التمويل', desc: 'قيمة المبلغ الإجمالي الذي ترغب في اقتراضه من البنك.' },
            { step: '2. تحديد النسبة السنوية', desc: 'معدل النسبة السنوي أو هامش الربح الذي يعتمده البنك.' },
            { step: '3. تحديد فترة السداد', desc: 'المدة بالسنوات أو الأشهر. كلما زادت المدة قل القسط الشهري ولكن زاد إجمالي الفائدة.' }
          ],
          formulaTitle: 'معادلة حساب القسط الشهري',
          formulaMath: 'القسط = [المبلغ × النسبة الشهرية × (1 + النسبة)^ن] / [(1 + النسبة)^ن - 1]',
          formulaExplanation: 'حيث تمثل النسبة الشهرية (المعدل السنوي مقسوماً على 12)، و (ن) إجمالي عدد الأقساط الشهرية.',
          exampleTitle: 'مثال واقعي',
          exampleText: 'تمويل شخصي بقيمة 100,000 ريال/درهم بنسبة فائدة 5% لمدة 5 سنوات (60 شهراً) ينتج عنه قسط شهري قدره 1,887.12، ويبلغ إجمالي الفائدة المسددة 13,227.42 على مدار كامل المدة.',
          faqsTitle: 'الأسئلة الشائعة حول حاسبة القروض',
          faqs: [
            { q: 'ما الفرق بين النسبة الثابتة والنسبة المتناقصة؟', a: 'النسبة المتناقصة تحتسب الفائدة فقط على الرصيد المتبقي من القرض، وهي المعيار الأكثر دقة وشفافية مقارنة بالنسبة الثابتة.' },
            { q: 'ما هو الحد الأقصى للاستقطاع الشهري المسموح به؟', a: 'تحدد معظم البنوك المركزية العربية الحد الأقصى لنسبة الاستقطاع بين 33% إلى 50% من إجمالي الدخل الشهري لحماية المقترض.' }
          ],
          tips: [
            'سداد مبالغ إضافية مبكراً يقلل من الرصيد الأساسي ويختصر سنوات طويلة من الفوائد التراكمية.',
            'تأكد دائماً من مراجعة النسبة السنوية الفعلية (APR) التي تشمل الرسوم الإدارية ورسوم التأمين.'
          ]
        }
      },
      currency: {
        name: 'محول العملات والأسعار المباشرة',
        shortDesc: 'تحويل فوري بين العملات العربية والعالمية: دولار، يورو، ريال سعودي، درهم إماراتي، جنيه مصري.',
        category: 'finance',
        seo: {
          title: 'محول العملات المباشر | أسعار الصرف وتحويل العملات لحظياً',
          subtitle: 'تحويل العملات العالمية والخليجية بدقة: ريال، درهم، دينار، جنيه، دولار، ويورو.',
          metaDesc: 'محول عملات مباشر مجاني لمعرفة أسعار صرف العملات الأجنبية والعربية في الوقت الفعلي للمسافرين والتجارة الإلكترونية.',
          badge: 'خدمة يومية واسعة الانتشار',
          introParagraphs: [
            'تتغير أسعار صرف العملات الأجنبية على مدار الساعة في الأسواق العالمية نتيجة العوامل الاقتصادية والتجارية.',
            'يوفر محول العملات لدينا متوسط أسعار السوق الحقيقية لمساعدتك في التحويل الدقيق بين العملات قبل السفر، أو الدفع في المتاجر العالمية، أو تحويل الأموال للمغتربين.'
          ],
          howItWorksTitle: 'خطوات تحويل العملة',
          howItWorksSteps: [
            { step: '1. اختر العملة الأساسية', desc: 'العملة التي تمتلكها وتريد التحويل منها.' },
            { step: '2. اختر العملة المقابلة', desc: 'العملة التي تريد معرفة قيمتها ومعرفة سعر صرفها.' },
            { step: '3. أدخل المبلغ المطلوب', desc: 'اكتب المبلغ لترى التحويل الفوري المباشر.' }
          ],
          formulaTitle: 'معادلة التحويل',
          formulaMath: 'القيمة المحولة = المبلغ × (سعر العملة المستهدفة / سعر العملة المصدر)',
          formulaExplanation: 'تعتمد المعادلة على متوسط سعر الصرف المعياري بين البنوك.',
          exampleTitle: 'مثال على التحويل',
          exampleText: 'تحويل 100 دولار أمريكي (USD) إلى ريال سعودي (SAR) بسعر صرف 1 USD = 3.75 SAR يعادل تماماً 375.00 ريال سعودي.',
          faqsTitle: 'أسئلة شائعة حول تحويل العملات',
          faqs: [
            { q: 'لماذا تختلف أسعار مكاتب الصرافة عن البنوك؟', a: 'تضيف شركات الصرافة والمطارات هوامش ربحية ورسوماً تشغيلية ترفع سعر الشراء أو تخفض سعر البيع.' },
            { q: 'ما هي العملة الأفضل عند الدفع بالبطاقة خارج البلاد؟', a: 'اختر دائماً الدفع بالعملة المحلية للبلد الذي تزوره لتجنب رسوم التحويل الديناميكي المرتفعة.' }
          ],
          tips: [
            'تجنب الصرف في المطارات قدر الإمكان نظراً لوجود فروقات أسعار كبيرة وغير مواتية.',
            'راقب اتجاهات السوق قبل إجراء تحويلات تجارية أو مبالغ كبيرة.'
          ]
        }
      },
      bmi: {
        name: 'حاسبة مؤشر كتلة الجسم (BMI)',
        shortDesc: 'احسب مؤشر كتلة جسمك، واعرف الوزن المثالي، ونسبة السمنة أو النحافة بدقة.',
        category: 'health',
        seo: {
          title: 'حاسبة مؤشر كتلة الجسم (BMI) والوزن المثالي مجاناً | منظمة الصحة العالمية',
          subtitle: 'تحقق مما إذا كان وزنك صحياً أو لديك زيادة وزن أو سمنة وفق المعايير الطبية المعتمدة.',
          metaDesc: 'حاسبة مؤشر كتلة الجسم المجانية. احسب وزنك المثالي ومؤشر السمنة بالسنتيمتر والكيلوجرام بضغطة زر واحدة.',
          badge: 'صحة ورشاقة',
          introParagraphs: [
            'مؤشر كتلة الجسم (BMI) هو الأداة الإحصائية والطبية المعتمدة عالمياً لتقييم تناسق وزن الفرد مع طوله وتحديد فئات النحافة والوزن الطبيعي والزيادة في الوزن.',
            'يساعدك حساب هذا المؤشر في اتخاذ خطوات وقائية مبكرة لتجنب أمراض القلب وضغط الدم والسكري المرتبطة بالسمنة.'
          ],
          howItWorksTitle: 'طريقة قياس كتلة الجسم',
          howItWorksSteps: [
            { step: '1. اختيار وحدة القياس', desc: 'النظام المتري (سم وكجم) أو النظام الإمبراطوري (بوصة ورطل).' },
            { step: '2. إدخال الطول والوزن', desc: 'يُفضل قياس الوزن صباحاً بملابس خفيفة ودون أحذية للحصول على أعلى دقة.' },
            { step: '3. مراجعة النتيجة والتوصيات', desc: 'قارن نتيجتك مع فئات منظمة الصحة العالمية لمعرفة وضعك الصحي.' }
          ],
          formulaTitle: 'معادلة مؤشر كتلة الجسم (WHO)',
          formulaMath: 'مؤشر كتلة الجسم = الوزن (كجم) / [الطول (متر)]²',
          formulaExplanation: 'نحافة: أقل من 18.5 | وزن طبيعي: 18.5 - 24.9 | زيادة وزن: 25 - 29.9 | سمنة: 30 فما فوق.',
          exampleTitle: 'مثال توضيحي',
          exampleText: 'شخص طوله 175 سم (1.75 م) ووزنه 72 كجم يكون مؤشر كتلته: 72 / (1.75 × 1.75) = 23.51، وهو ضمن النطاق الطبيعي والصحي تماماً.',
          faqsTitle: 'أسئلة شائعة حول مؤشر كتلة الجسم',
          faqs: [
            { q: 'هل ينطبق المؤشر على الرياضيين ولاعبي كمال الأجسام؟', a: 'لا، لأن العضلات تزن أكثر من الدهون، وبالتالي قد يُصنف الرياضي خطأً في فئة الوزن الزائد بالرغم من تمتعه بصحة ممتازة ونسبة دهون منخفضة.' },
            { q: 'ما هو الوزن المثالي لطولي؟', a: 'الوزن المثالي هو النطاق الذي يعطيك مؤشر كتلة جسم بين 18.5 و 24.9.' }
          ],
          tips: [
            'يُستحسن قياس محيط الخصر إلى جانب مؤشر كتلة الجسم لتقييم توزيع الدهون الحشوية.',
            'خسارة 0.5 إلى 1 كجم أسبوعياً هي المعدل الصحي الآمن والمستدام طبياً.'
          ]
        }
      },
      percentage: {
        name: 'حاسبة النسبة المئوية والخصم',
        shortDesc: 'حساب النسب المئوية، التخفيضات في المتاجر، الزيادة والنقصان، وضريبة القيمة المضافة.',
        category: 'daily',
        seo: {
          title: 'حاسبة النسبة المئوية والتخفيضات أونلاين | 3 أدوات في حاسبة واحدة',
          subtitle: 'احسب نسبة التخفيض في الأسواق، وحساب قيمة الضريبة، ومقدار الزيادة أو النقصان بسهولة.',
          metaDesc: 'حاسبة النسبة المئوية المجانية. حساب نسبة رقم من رقم آخر، الخصومات التجارية، وحساب ضريبة القيمة المضافة بسرعة.',
          badge: 'أداة حسابية يومية',
          introParagraphs: [
            'تعتبر النسبة المئوية جزءاً لا يتجزأ من حياتنا اليومية، سواء أثناء التسوق لمعرفة السعر الحقيقي بعد التخفيضات والعروض، أو عند حساب ضريبة القيمة المضافة على الفواتير، أو في حساب أرباح الأسهم والمشاريع.',
            'تتيح لك هذه الحاسبة حل جميع المسائل الحسابية بنقرة واحدة ودون الحاجة لعمليات ذهنية معقدة.'
          ],
          howItWorksTitle: 'أوضاع الحساب المتاحة',
          howItWorksSteps: [
            { step: 'الوضع 1: حساب كم يساوي س% من ص', desc: 'لمعرفة مقدار نسبة محددة من أي رقم أو مبلغ مالي.' },
            { step: 'الوضع 2: التغير بالنسبة المئوية', desc: 'لمعرفة نسبة الارتفاع أو الانخفاض بين قيمتين مختلفتين.' },
            { step: 'الوضع 3: حساب التخفيضات والضريبة', desc: 'أدخل السعر الأصلي ونسبة الخصم ونسبة الضريبة لمعرفة السعر النهائي عند الدفع.' }
          ],
          formulaTitle: 'القانون الرياضي للنسبة المئوية',
          formulaMath: 'القيمة = (النسبة / 100) × المبلغ الإجمالي',
          formulaExplanation: 'نسبة التغير = [(القيمة الجديدة - القيمة القديمة) / القيمة القديمة] × 100%',
          exampleTitle: 'مثال على خصومات التسوق',
          exampleText: 'منتج سعره الأصلي 200 ريال عليه تخفيض 30% يوفر لك 60 ريالاً ليصبح السعر بعد الخصم 140 ريالاً. مع إضافة ضريبة القيمة المضافة 15%، يصبح السعر النهائي المطلوب 161.00 ريالاً.',
          faqsTitle: 'أسئلة شائعة حول النسب المئوية',
          faqs: [
            { q: 'كيف أحسب ضريبة القيمة المضافة 15% بسهولة؟', a: 'لحساب الضريبة مباشرة أضف 0.15 مضروباً في السعر الأساسي، أو اضرب السعر في 1.15 لمعرفة السعر الإجمالي شاملاً الضريبة.' },
            { q: 'هل خصم 20% + خصم 20% إضافي يساوي 40%؟', a: 'كلا، الخصم الإضافي يُحسب من السعر المتبقي بعد الخصم الأول، وبالتالي فإن الخصم الإجمالي الفعلي يساوي 36% فقط.' }
          ],
          tips: [
            'لحساب 10% من أي رقم، حرّك الفاصلة العشرية خانة واحدة لليسار.',
            'استخدم هذه الحاسبة أثناء مواسم التخفيضات مثل الجمعة البيضاء لتتأكد من حقيقة العروض.'
          ]
        }
      },
      compound: {
        name: 'حاسبة الفائدة والأرباح المركبة',
        shortDesc: 'محاكاة لنمو الاستثمارات والمدخرات طويلة الأجل بتأثير تراكم الأرباح وإعادة استثمارها.',
        category: 'finance',
        seo: {
          title: 'حاسبة الأرباح والفائدة المركبة | محاكي نمو الاستثمار والمدخرات',
          subtitle: 'اكتشف كيف تتضاعف أموالك بالاستثمار المنتظم والعائد التراكمي على المدى الطويل.',
          metaDesc: 'حاسبة أرباح مركبة مجانية. حساب العائد التراكمي على الأسهم والصناديق الاستثمارية لخطط التقاعد وبناء الثروة.',
          badge: 'تنمية الثروة والتقاعد',
          introParagraphs: [
            'وُصفت الأرباح المركبة بأنها أعظم قوة مالية في العالم، حيث تكمن قوتها في إعادة استثمار الأرباح والعوائد السابقة لتوليد أرباح جديدة فوقها بمرور السنين.',
            'تتيح لك هذه الأداة رسم خطة مالية واضحة للتقاعد أو بناء الأصول من خلال رؤية الأثر الهائل للادخار والاستثمار الشهري المنتظم.'
          ],
          howItWorksTitle: 'كيفية محاكاة الاستثمار التراكمي',
          howItWorksSteps: [
            { step: '1. المبلغ الأولي (رأس المال)', desc: 'المبلغ المتاح لديك للبدء به في محفظتك الاستثمارية أو حساب التوفير.' },
            { step: '2. الإيداع الشهري المستمر', desc: 'المبلغ الإضافي الذي تستقطعه شهرياً من راتبك وتضخه في الاستثمار.' },
            { step: '3. معدل العائد والسنوات', desc: 'العائد السنوي المتوقع (مثلاً 8-10% سنوياً في صناديق المؤشرات) وعدد سنوات الاستثمار.' }
          ],
          formulaTitle: 'المعادلة الرياضية للنمو التراكمي',
          formulaMath: 'القيمة المستقبلية = المبلغ × (1 + العائد)^السنوات + المساهمات التراكمية',
          formulaExplanation: 'تُظهر المعادلة النمو الأسي للأموال كلما زادت فترة الاستثمار.',
          exampleTitle: 'مثال على الاستثمار لـ 20 عاماً',
          exampleText: 'البدء بمبلغ 10,000 ريال وإيداع 1,000 ريال شهرياً بعائد سنوي متوسط 8% لمدة 20 عاماً يجعلك تودع شخصياً 250,000 ريال، بينما تصبح محفظتك الإجمالية أكثر من 635,000 ريال بفضل الأرباح التراكمية!',
          faqsTitle: 'أسئلة شائعة حول الأرباح التراكمية',
          faqs: [
            { q: 'ما هي قاعدة 72 المالية؟', a: 'قاعدة ذهبية سهلة: اقسم الرقم 72 على نسبة العائد السنوي لتعرف بعد كم سنة سيتضاعف رأس مالك تلقائياً. بعائد 8% يتضاعف المال كل 9 سنوات تقريباً.' },
            { q: 'ما هو العامل الأكثر تأثيراً في الأرباح المركبة؟', a: 'الوقت والصبر هما العامل الحاسم، فالسنوات الأخيرة تشهد قفزات ضخمة في النمو تفوق بمراحل السنوات الأولى.' }
          ],
          tips: [
            'البدء في سن مبكرة وبمبالغ صغيرة أفضل بكثير من الانتظار لسنوات من أجل توفير مبالغ ضخمة.',
            'احرص على إعادة استثمار التوزيعات النقدية تلقائياً للاستفادة الكاملة من قوة التراكم.'
          ]
        }
      },
      salary: {
        name: 'حاسبة الراتب الصافي والبدلات',
        shortDesc: 'حساب صافي الراتب المستلم في الحساب البنكي بعد خصم التأمينات الاجتماعية والضرائب.',
        category: 'finance',
        seo: {
          title: 'حاسبة الراتب الصافي والتأمينات الاجتماعية | حساب صافي الأجر الشهري',
          subtitle: 'احسب راتبك المستلم في اليد بعد استقطاعات التأمينات والخصومات والبدلات في السعودية ومصر والخليج.',
          metaDesc: 'حاسبة صافي الراتب مجاناً. حساب الراتب الأساسي والبدلات بعد خصم التأمينات الاجتماعية والضرائب بدقة وسهولة.',
          badge: 'الموارد البشرية والرواتب',
          introParagraphs: [
            'عند مناقشة عرض عمل جديد أو سلم الرواتب، يُذكر عادة الراتب الإجمالي شاملاً البدلات. إلا أن الراتب الفعلي الذي ينزل في حسابك البنكي يخضع لخصم التأمينات الاجتماعية أو الضرائب بحسب الدولة.',
            'تتيح لك هذه الحاسبة تقدير الراتب الصافي بدقة والتخطيط لمصاريفك والتزاماتك المالية الشهرية.'
          ],
          howItWorksTitle: 'كيفية حساب صافي الراتب',
          howItWorksSteps: [
            { step: '1. إدخال الراتب الإجمالي والبدلات', desc: 'مجموع الراتب الأساسي وبدل السكن وبدل النقل.' },
            { step: '2. نسبة خصم التأمينات والتقاعد', desc: 'نسبة الاستقطاع الإلزامي (مثل 9.75% أو 10% للتأمينات الاجتماعية).' },
            { step: '3. الضرائب والخصومات الإضافية', desc: 'إن وجدت ضرائب كسب عمل أو استقطاعات قروض أخرى.' }
          ],
          formulaTitle: 'معادلة صافي الأجر',
          formulaMath: 'الراتب الصافي = الراتب الإجمالي - (استقطاع التأمينات + الضرائب والخصومات)',
          formulaExplanation: 'صافي الراتب هو المبلغ الفعلي القابل للتصرف والمودع في الحساب المصرفي نهاية كل شهر.',
          exampleTitle: 'مثال لحساب الراتب',
          exampleText: 'راتب إجمالي قدره 12,000 ريال، مع خصم تأمينات اجتماعية بنسبة 9.75% من الأساسي وبدل السكن، يترك لك صافي راتب شهري يقارب 10,830 ريال في حسابك.',
          faqsTitle: 'أسئلة شائعة حول الرواتب',
          faqs: [
            { q: 'ما الفرق بين الراتب الأساسي والراتب الإجمالي؟', a: 'الراتب الأساسي هو الأجر المجرد، بينما الإجمالي يشمل البدلات الثابتة كالسكن والنقل وبدلات المعيشة.' },
            { q: 'كيف يؤثر الراتب المسجل بالتأمينات على مكافأة نهاية الخدمة؟', a: 'تُحسب مكافأة نهاية الخدمة والمعاش التقاعدي وفقاً للأجر الخاضع للاشتراك في نظام العمل المعتمد في بلدك.' }
          ],
          tips: [
            'احرص دائماً على أن تكون قيمة الراتب الأساسي وبدل السكن أعلى ما يمكن لضمان تعويضات تقاعد ومكافأة أفضل.',
            'راجع مسير الرواتب بانتظام للتأكد من صحة الخصومات والتأكد من عدم وجود أخطاء حسابية.'
          ]
        }
      }
    },
    legal: {
      privacyTitle: 'سياسة الخصوصية وملفات تعريف الارتباط',
      privacyLastUpdated: 'آخر تحديث: أكتوبر 2026',
      termsTitle: 'شروط وأحكام الخدمة',
      aboutTitle: 'عن موقع SmartCalcLab',
      contactTitle: 'تواصل معنا والدعم الفني',
      disclaimerTitle: 'إخلاء المسؤولية القانونية والمالية'
    }
  },

  hi: {
    siteName: 'स्मार्टकैल्क लैब (SmartCalcLab)',
    tagline: 'दैनिक वित्त, स्वास्थ्य एवं गणित के लिए तेज़, मुफ्त और सटीक कैलकुलेटर',
    searchPlaceholder: 'कैलकुलेटर खोजें (उदा. ईएमआई कैलकुलेटर, मुद्रा परिवर्तक, बीएमआई)...',
    categories: {
      all: 'सभी टूल्स',
      finance: 'वित्त एवं ऋण',
      health: 'स्वास्थ्य एवं फिटनेस',
      daily: 'दैनिक उपयोगी टूल्स'
    },
    navigation: {
      home: 'होम',
      tools: 'कैलकुलेटर',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें',
      privacy: 'गोपनीयता नीति',
      terms: 'उपयोग की शर्तें',
      disclaimer: 'अस्वीकरण (Disclaimer)'
    },
    ads: {
      advertisement: 'विज्ञापन',
      sponsoredNotice: 'विज्ञापन हमारे सभी टूल्स को 100% मुफ्त रखने में मदद करते हैं',
      adPlaceholder: 'गूगल एडसेंस रिस्पॉन्सिव विज्ञापन स्थान'
    },
    common: {
      calculate: 'गणना करें',
      reset: 'रीसेट करें',
      result: 'गणना परिणाम',
      monthlyPayment: 'मासिक किस्त (EMI)',
      totalPayment: 'कुल भुगतान',
      totalInterest: 'कुल ब्याज',
      amount: 'ऋण राशि (मूलधन)',
      rate: 'वार्षिक ब्याज दर (%)',
      years: 'अवधि (वर्ष)',
      months: 'महीने',
      currency: 'मुद्रा',
      copyResult: 'परिणाम कॉपी करें',
      copied: 'क्लिपबोर्ड पर कॉपी किया गया!',
      share: 'शेयर करें',
      print: 'प्रिंट करें',
      close: 'बंद करें',
      backToHome: 'सभी कैलकुलेटर पर वापस जाएं'
    },
    tools: {
      loan: {
        name: 'ऋण एवं ईएमआई कैलकुलेटर (Loan & EMI)',
        shortDesc: 'मासिक ईएमआई, कुल ब्याज और ऋण भुगतान विवरण की सटीक गणना करें।',
        category: 'finance',
        seo: {
          title: 'लोन ईएमआई कैलकुलेटर ऑनलाइन | होम लोन, कार लोन व पर्सनल लोन EMI',
          subtitle: 'होम लोन, पर्सनल लोन और कार लोन की मासिक किस्त और कुल ब्याज की तुरंत गणना करें।',
          metaDesc: 'मुफ्त ऑनलाइन लोन ईएमआई कैलकुलेटर। बैंक से लोन लेने से पहले अपनी मासिक किस्त और ब्याज का हिसाब लगाएं।',
          badge: 'उच्च मूल्य वित्तीय टूल',
          introParagraphs: [
            'होम लोन, पर्सनल लोन या कार लोन लेने से पहले मासिक ईएमआई (EMI) और कुल ब्याज का सही आकलन करना वित्तीय योजना का सबसे महत्वपूर्ण कदम है।',
            'हमारा ऑनलाइन ईएमआई कैलकुलेटर आपको हर महीने देय किस्त, कुल ब्याज और पूरी भुगतान तालिका तुरंत दिखाता है ताकि आप बिना किसी छुपे शुल्क के सही फैसला ले सकें।'
          ],
          howItWorksTitle: 'ईएमआई की गणना कैसे करें',
          howItWorksSteps: [
            { step: '1. ऋण राशि (मूलधन) दर्ज करें', desc: 'वह कुल राशि जो आप बैंक से उधार लेना चाहते हैं।' },
            { step: '2. वार्षिक ब्याज दर दर्ज करें', desc: 'बैंक द्वारा दी गई वार्षिक ब्याज दर प्रतिशत में।' },
            { step: '3. ऋण की अवधि चुनें', desc: 'ऋण चुकाने की कुल अवधि (वर्षों या महीनों में)।' }
          ],
          formulaTitle: 'ईएमआई गणना का सूत्र',
          formulaMath: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]',
          formulaExplanation: 'जहाँ P मूलधन है, r मासिक ब्याज दर (वार्षिक दर / 12 / 100) है, और n कुल महीनों की संख्या है।',
          exampleTitle: 'वास्तविक उदाहरण',
          exampleText: '₹10,00,000 (10 लाख रुपये) का लोन 8.5% वार्षिक ब्याज पर 10 वर्ष (120 महीने) के लिए लेने पर मासिक ईएमआई ₹12,398.57 होगी और कुल ब्याज ₹4,87,828 होगा।',
          faqsTitle: 'ईएमआई से जुड़े सामान्य प्रश्न',
          faqs: [
            { q: 'ईएमआई (EMI) का क्या अर्थ है?', a: 'ईएमआई का पूरा नाम "Equated Monthly Installment" है, जो हर महीने बैंक को दिया जाने वाला तय भुगतान होता है।' },
            { q: 'समय से पहले लोन चुकाने से क्या फायदा होता है?', a: 'प्रिंसिपल प्री-पेमेंट करने से मूलधन कम हो जाता है, जिससे ब्याज में लाखों रुपयों की बचत होती है।' }
          ],
          tips: [
            'हमेशा फिक्स्ड और फ्लोटिंग ब्याज दरों के अंतर को समझकर ही लोन का चुनाव करें।',
            'अपनी मासिक ईएमआई को अपनी कुल इन-हैंड सैलरी के 30-40% से अधिक न रखें।'
          ]
        }
      },
      currency: {
        name: 'लाइव मुद्रा परिवर्तक (Currency Converter)',
        shortDesc: 'डॉलर, यूरो, रुपया (INR), रियाल, दिरहम आदि के लाइव एक्सचेंज रेट देखें।',
        category: 'finance',
        seo: {
          title: 'लाइव करेंसी कनवर्टर ऑनलाइन | मुद्रा विनिमय दर (USD to INR)',
          subtitle: 'डॉलर से रुपया, यूरो से रुपया और दुनिया की सभी मुद्राओं का तुरंत सटीक रूपांतरण करें।',
          metaDesc: 'मुफ्त लाइव मुद्रा परिवर्तक। विदेशी मुद्रा विनिमय दर, डॉलर का आज का भाव और अंतरराष्ट्रीय मुद्राओं का ताजा रेट जानें।',
          badge: 'दैनिक अत्यधिक मांग वाला टूल',
          introParagraphs: [
            'अंतरराष्ट्रीय व्यापार, विदेश यात्रा, विदेश में पढ़ाई और ऑनलाइन खरीदारी के लिए मुद्राओं की सटीक विनिमय दर जानना बेहद आवश्यक है।',
            'हमारा लाइव करेंसी कन्वर्टर आपको वास्तविक बाजार विनिमय दरें दिखाता है ताकि आप बिना किसी अतिरिक्त गुप्त बैंक शुल्क के सटीक मूल्य जान सकें।'
          ],
          howItWorksTitle: 'मुद्रा रूपांतरण कैसे करें',
          howItWorksSteps: [
            { step: '1. मूल मुद्रा चुनें', desc: 'वह मुद्रा जो आपके पास है (उदा. USD या EUR)।' },
            { step: '2. लक्षित मुद्रा चुनें', desc: 'जिस मुद्रा में आप मान जानना चाहते हैं (उदा. INR)।' },
            { step: '3. राशि दर्ज करें', desc: 'तुरंत लाइव एक्सचेंज मूल्य देखने के लिए राशि लिखें।' }
          ],
          formulaTitle: 'मुद्रा रूपांतरण सूत्र',
          formulaMath: 'रूपांतरित मान = राशि × (लक्षित दर / मूल दर)',
          formulaExplanation: 'यह अंतरराष्ट्रीय इंटरबैंक विनिमय दरों पर आधारित होता है।',
          exampleTitle: 'रूपांतरण उदाहरण',
          exampleText: '$100 अमेरिकी डॉलर को भारतीय रुपये में बदलने पर (यदि 1 USD = ₹83.50 हो) कुल ₹8,350.00 प्राप्त होंगे।',
          faqsTitle: 'मुद्रा विनिमय से जुड़े सवाल',
          faqs: [
            { q: 'बैंकों में एक्सचेंज रेट अलग क्यों होता है?', a: 'बैंक और मनी चेंजर अपना मुनाफा (स्प्रेड) और सर्विस टैक्स जोड़ते हैं, इसलिए रिटेल रेट मार्केट रेट से थोड़ा अलग होता है।' },
            { q: 'विदेश में कार्ड से भुगतान करते समय कौन सी करेंसी चुनें?', a: 'हमेशा उस देश की स्थानीय मुद्रा में चार्ज होने का विकल्प चुनें ताकि अनावश्यक डायनामिक करेंसी कन्वर्जन शुल्क से बचा जा सके।' }
          ],
          tips: [
            'हवाई अड्डों पर करेंसी एक्सचेंज काउंटरों से बचें क्योंकि वहाँ 10% से 15% तक ज्यादा कमीशन लिया जाता है।'
          ]
        }
      },
      bmi: {
        name: 'बीएमआई (बॉडी मास इंडेक्स) कैलकुलेटर',
        shortDesc: 'अपनी लंबाई और वजन के अनुसार अपना बीएमआई और स्वस्थ वजन जानें।',
        category: 'health',
        seo: {
          title: 'बीएमआई कैलकुलेटर ऑनलाइन हिंदी में | आदर्श वजन एवं स्वास्थ्य जांच',
          subtitle: 'जानिए आपका वजन सामान्य है, कम है या मोटापा है (डब्ल्यूएचओ मानकों के आधार पर)।',
          metaDesc: 'मुफ्त बीएमआई कैलकुलेटर। अपनी ऊंचाई और वजन के आधार पर अपना बॉडी मास इंडेक्स और सही वजन का पता लगाएं।',
          badge: 'स्वास्थ्य एवं फिटनेस',
          introParagraphs: [
            'बॉडी मास इंडेक्स (BMI) विश्व स्वास्थ्य संगठन (WHO) द्वारा प्रमाणित एक माप है, जिससे यह पता चलता है कि आपकी लंबाई के हिसाब से आपका वजन सही अनुपात में है या नहीं।',
            'यह दिल की बीमारी, ब्लड प्रेशर और डायबिटीज जैसी वजन से जुड़ी समस्याओं से बचने में मदद करता है।'
          ],
          howItWorksTitle: 'बीएमआई मापने का तरीका',
          howItWorksSteps: [
            { step: '1. इकाई चुनें', desc: 'मीट्रिक (सेमी और किग्रा) या इंपीरियल (फीट/इंच और पाउंड)।' },
            { step: '2. लंबाई और वजन दर्ज करें', desc: 'सटीक परिणाम के लिए सुबह खाली पेट सही वजन मापें।' },
            { step: '3. श्रेणी और परामर्श देखें', desc: 'देखें कि आप अंडरवेट, नॉर्मल या ओवरवेट किस श्रेणी में आते हैं।' }
          ],
          formulaTitle: 'डब्ल्यूएचओ (WHO) का मानक सूत्र',
          formulaMath: 'बीएमआई (BMI) = वजन (किग्रा) / [ऊंचाई (मीटर)]²',
          formulaExplanation: 'अंडरवेट: < 18.5 | सामान्य वजन: 18.5 - 24.9 | ओवरवेट: 25 - 29.9 | मोटापा: ≥ 30.',
          exampleTitle: 'गणना का उदाहरण',
          exampleText: '170 सेमी (1.70 मीटर) लंबे और 65 किग्रा वजन वाले व्यक्ति का बीएमआई: 65 / (1.70 × 1.70) = 22.49 होगा, जो बिल्कुल सामान्य और स्वस्थ श्रेणी में है।',
          faqsTitle: 'बीएमआई से जुड़े सामान्य प्रश्न',
          faqs: [
            { q: 'क्या बीएमआई जिम जाने वाले बॉडीबिल्डरों के लिए सही है?', a: 'नहीं, क्योंकि मांसपेशियों का घनत्व वसा से ज्यादा होता है, इसलिए अधिक मसल्स वाले लोग बीएमआई में ओवरवेट दिख सकते हैं।' }
          ],
          tips: [
            'बीएमआई के साथ कमर का घेरा (वेस्ट साइज) मापना भी हृदय स्वास्थ्य के लिए आवश्यक है।'
          ]
        }
      },
      percentage: {
        name: 'प्रतिशत एवं छूट कैलकुलेटर (Percentage & Discount)',
        shortDesc: 'प्रतिशत निकालें, छूट (डिस्काउंट), जीएसटी और प्रतिशत परिवर्तन की तुरंत गणना करें।',
        category: 'daily',
        seo: {
          title: 'प्रतिशत एवं डिस्काउंट कैलकुलेटर ऑनलाइन | गणितीय टूल',
          subtitle: 'किसी संख्या का प्रतिशत, खरीदारी पर डिस्काउंट और जीएसटी के साथ अंतिम मूल्य निकालें।',
          metaDesc: 'मुफ्त प्रतिशत कैलकुलेटर। प्रतिशत कैसे निकालें, छूट और टैक्स के बाद अंतिम मूल्य की तुरंत गणना करें।',
          badge: 'दैनिक गणितीय टूल',
          introParagraphs: [
            'दुकान पर सेल में छूट का हिसाब लगाना हो, बिल पर जीएसटी जोड़ना हो या परीक्षा में आए अंकों का प्रतिशत निकालना हो—प्रतिशत की जरूरत रोज पड़ती है।',
            'हमारा यह 3-इन-1 कैलकुलेटर आपको बिना किसी गलती के सभी गणनाएं सेकंडों में करके देता है।'
          ],
          howItWorksTitle: 'उपलब्ध गणना मोड',
          howItWorksSteps: [
            { step: 'मोड 1: X का Y% निकालना', desc: 'किसी भी संख्या का तय प्रतिशत मूल्य जानें।' },
            { step: 'मोड 2: प्रतिशत वृद्धि या कमी', desc: 'दो संख्याओं के बीच कितने प्रतिशत का बदलाव हुआ यह जानें।' },
            { step: 'मोड 3: डिस्काउंट और टैक्स', desc: 'मूल कीमत पर छूट और जीएसटी लगाकर अंतिम देय राशि निकालें।' }
          ],
          formulaTitle: 'प्रतिशत का सामान्य सूत्र',
          formulaMath: 'प्रतिशत मान = (प्रतिशत / 100) × कुल संख्या',
          formulaExplanation: 'प्रतिशत परिवर्तन = [(नया मान - पुराना मान) / पुराना मान] × 100',
          exampleTitle: 'डिस्काउंट का उदाहरण',
          exampleText: '₹2,500 के कपड़े पर 20% की छूट मिलने से ₹500 की बचत होगी और छूट के बाद कीमत ₹2,000 होगी। यदि 5% जीएसटी लगे, तो अंतिम मूल्य ₹2,100 होगा।',
          faqsTitle: 'प्रतिशत से जुड़े प्रश्न',
          faqs: [
            { q: '10% का तुरंत हिसाब कैसे लगाएं?', a: 'किसी भी संख्या के अंतिम अंक से पहले दशमलव लगा दें, वही उसका 10% होता है। जैसे ₹450 का 10% ₹45 है।' }
          ],
          tips: [
            '18% जीएसटी जोड़ने के लिए मूल कीमत को 1.18 से गुणा कर सकते हैं।'
          ]
        }
      },
      compound: {
        name: 'चक्रवृद्धि ब्याज कैलकुलेटर (Compound Interest)',
        shortDesc: 'म्यूचुअल फंड, एसआईपी और बचत पर चक्रवृद्धि ब्याज और लंबी अवधि का रिटर्न देखें।',
        category: 'finance',
        seo: {
          title: 'चक्रवृद्धि ब्याज कैलकुलेटर ऑनलाइन हिंदी में | एसआईपी और निवेश रिटर्न',
          subtitle: 'चक्रवृद्धि ब्याज (कंपाउंडिंग) की जादुई ताकत से जानें आपका पैसा कितने वर्षों में कितना बढ़ेगा।',
          metaDesc: 'मुफ्त चक्रवृद्धि ब्याज कैलकुलेटर। मासिक बचत, एसआईपी और फिक्स्ड डिपॉजिट पर ब्याज और भविष्य का कुल फंड जानें।',
          badge: 'धन संचय एवं निवेश',
          introParagraphs: [
            'अल्बर्ट आइंस्टीन ने चक्रवृद्धि ब्याज को दुनिया का आठवां अजूबा कहा था। जब आपके कमाए गए ब्याज पर भी ब्याज मिलने लगता है, तो आपकी संपत्ति बहुत तेजी से बढ़ती है।',
            'यह टूल आपको दिखाता है कि छोटी मासिक बचत भी 15 से 25 वर्षों में करोड़ों रुपये का फंड कैसे बना सकती है।'
          ],
          howItWorksTitle: 'निवेश गणना के चरण',
          howItWorksSteps: [
            { step: '1. प्रारंभिक राशि', desc: 'वह रकम जो आप आज निवेश कर रहे हैं।' },
            { step: '2. मासिक योगदान', desc: 'हर महीने बचत या एसआईपी (SIP) के रूप में डाली जाने वाली राशि।' },
            { step: '3. अनुमानित वार्षिक ब्याज और अवधि', desc: 'अपेक्षित वार्षिक रिटर्न (उदा. 12% म्यूचुअल फंड में) और वर्षों की संख्या।' }
          ],
          formulaTitle: 'चक्रवृद्धि ब्याज का सूत्र',
          formulaMath: 'A = P(1 + r/n)^(nt) + PMT योगदान वृद्धि',
          formulaExplanation: 'कंपाउंडिंग की फ्रीक्वेंसी जितनी ज्यादा होगी, रिटर्न उतना ही अधिक होगा।',
          exampleTitle: '20 साल का उदाहरण',
          exampleText: 'यदि आप ₹5,000 प्रति माह 12% वार्षिक रिटर्न पर 20 वर्ष तक जमा करते हैं, तो आपका कुल निवेश ₹12 लाख होगा और कुल फंड लगभग ₹50 लाख बन जाएगा!',
          faqsTitle: 'कंपाउंडिंग से जुड़े प्रश्न',
          faqs: [
            { q: '72 का नियम (Rule of 72) क्या है?', a: '72 को अपनी वार्षिक ब्याज दर से भाग दें। परिणाम यह बताएगा कि आपका पैसा कितने वर्षों में दोगुना हो जाएगा। 12% की दर से पैसा 6 वर्ष में दोगुना होगा।' }
          ],
          tips: [
            'जितनी जल्दी उम्र में निवेश शुरू करेंगे, कंपाउंडिंग का फायदा उतना ही ज्यादा मिलेगा।'
          ]
        }
      },
      salary: {
        name: 'वेतन (इन-हैंड सैलरी) कैलकुलेटर',
        shortDesc: 'सीटीसी (CTC) और ग्रॉस सैलरी से पीएफ, टीडीएस टैक्स कटने के बाद इन-हैंड सैलरी जानें।',
        category: 'finance',
        seo: {
          title: 'इन-हैंड सैलरी कैलकुलेटर ऑनलाइन | ग्रॉस से नेट मासिक वेतन',
          subtitle: 'पीएफ (PF), ईएसआई और इनकम टैक्स (TDS) कटने के बाद खाते में आने वाले नेट वेतन का हिसाब लगाएं।',
          metaDesc: 'मुफ्त सैलरी कैलकुलेटर। अपने सालाना सीटीसी पैकेज से हर महीने हाथ में आने वाले वास्तविक वेतन की गणना करें।',
          badge: 'नौकरी एवं वेतन प्रबंधन',
          introParagraphs: [
            'नौकरी का ऑफर लेटर मिलने पर सीटीसी (CTC) तो बड़ा दिखता है, लेकिन महीने के अंत में खाते में आने वाला इन-हैंड वेतन टैक्स और पीएफ कटने के बाद कम हो जाता है।',
            'हमारा इन-हैंड सैलरी कैलकुलेटर आपको टैक्स और कटौतियों के बाद वास्तविक टेक-होम सैलरी का स्पष्ट हिसाब देता है।'
          ],
          howItWorksTitle: 'सैलरी गणना कैसे करें',
          howItWorksSteps: [
            { step: '1. ग्रॉस सैलरी या सीटीसी दर्ज करें', desc: 'सालाना या मासिक कुल तय वेतन पैकेज।' },
            { step: '2. टैक्स कटौती दर चुनें', desc: 'इनकम टैक्स स्लैब के अनुसार औसत टैक्स प्रतिशत।' },
            { step: '3. पीएफ और अन्य कटौतियां', desc: 'कर्मचारी भविष्य निधि (PF) और अन्य अनिवार्य कटौतियां।' }
          ],
          formulaTitle: 'नेट वेतन सूत्र',
          formulaMath: 'इन-हैंड सैलरी = ग्रॉस वेतन - (इनकम टैक्स टीडीएस + पीएफ कटौती)',
          formulaExplanation: 'यह वह राशि है जो सीधे आपके बैंक खाते में क्रेडिट होती है।',
          exampleTitle: 'सैलरी का उदाहरण',
          exampleText: '₹6,00,000 (6 लाख) के सालाना पैकेज पर लगभग 10% टैक्स व 12% पीएफ कटौती के बाद मासिक इन-हैंड वेतन लगभग ₹40,000 प्राप्त होता है।',
          faqsTitle: 'सैलरी से जुड़े प्रश्न',
          faqs: [
            { q: 'सीटीसी (CTC) और इन-हैंड सैलरी में क्या अंतर है?', a: 'सीटीसी कंपनी द्वारा आप पर खर्च की जाने वाली कुल लागत है जिसमें नियोक्ता का पीएफ और ग्रेच्युटी भी शामिल होती है, जबकि इन-हैंड सैलरी आपको मिलने वाला वास्तविक पैसा है।' }
          ],
          tips: [
            'नई और पुरानी टैक्स व्यवस्था (New vs Old Tax Regime) में तुलना करके कम टैक्स वाला विकल्प चुनें।'
          ]
        }
      }
    },
    legal: {
      privacyTitle: 'गोपनीयता नीति (Privacy Policy)',
      privacyLastUpdated: 'अंतिम अपडेट: अक्टूबर 2026',
      termsTitle: 'नियम एवं शर्तें (Terms of Service)',
      aboutTitle: 'SmartCalcLab के बारे में',
      contactTitle: 'संपर्क करें एवं फीडबैक',
      disclaimerTitle: 'अस्वीकरण एवं कानूनी सूचना'
    }
  }
};
