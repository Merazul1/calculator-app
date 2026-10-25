import { TranslationDictionary } from './index';

export const pt: TranslationDictionary = {
  siteName: 'SmartCalcLab',
  tagline: 'Calculadoras Rápidas, Gratuitas e Precisas para Finanças, Saúde e Matemática',
  searchPlaceholder: 'Pesquisar calculadoras (ex: Financiamento, Câmbio, IMC, Juros Compostos)...',
  categories: {
    all: 'Todas as Ferramentas',
    finance: 'Finanças e Dinheiro',
    health: 'Saúde e Boa Forma',
    daily: 'Utilidades Diárias',
  },
  navigation: {
    home: 'Início',
    tools: 'Calculadoras',
    about: 'Sobre Nós',
    contact: 'Fale Conosco',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    disclaimer: 'Aviso Legal',
  },
  ads: {
    advertisement: 'Publicidade',
    sponsoredNotice: 'Os anúncios mantêm nossas calculadoras 100% gratuitas para todos',
    adPlaceholder: 'Unidade de Anúncios Responsiva',
  },
  common: {
    calculate: 'Calcular',
    reset: 'Redefinir',
    result: 'Resultado do Cálculo',
    monthlyPayment: 'Parcela Mensal',
    totalPayment: 'Pagamento Total',
    totalInterest: 'Juros Totais',
    amount: 'Valor',
    rate: 'Taxa de Juros Anual (%)',
    years: 'Prazo (Anos)',
    months: 'Meses',
    currency: 'Moeda',
    copyResult: 'Copiar Resultados',
    copied: 'Copiado para a área de transferência!',
    share: 'Compartilhar Ferramenta',
    print: 'Imprimir Relatório',
    close: 'Fechar',
    backToHome: 'Voltar para Todas as Calculadoras',
  },
  tools: {
    loan: {
      name: 'Simulador de Financiamento Imobiliário e Empréstimos',
      shortDesc: 'Calcule parcelas mensais, juros acumulados, amortização e custos de hipoteca.',
      category: 'finance',
      seo: {
        title: 'Simulador de Financiamento Imobiliário e Empréstimo | Calculadora de Parcelas',
        subtitle: 'Simule financiamento de imóveis, crédito pessoal e tabela de amortização SAC e Price.',
        metaDesc: 'Simulador de financiamento imobiliário e empréstimos gratuito. Calcule parcelas mensais, juros totais e amortização em segundos.',
        badge: 'Ferramenta de Alta Precisão',
        introParagraphs: [
          'Conhecer o custo real de um financiamento imobiliário antes de comprar um imóvel é essencial para a sua segurança financeira. Nossa calculadora gratuita estima suas parcelas mensais exatas, juros totais e o custo final do empréstimo.',
          'Compare prazos de 15 a 30 anos e analise como o valor da entrada reduz drasticamente os juros pagos ao banco.'
        ],
        howItWorksTitle: 'Como Calcular seu Financiamento',
        howItWorksSteps: [
          { step: '1. Valor do Imóvel e Entrada', desc: 'Insira o preço do imóvel e o valor que você pretende dar de entrada (mínimo de 20% recomendado).' },
          { step: '2. Taxa de Juros Anual', desc: 'Informe a taxa de juros efetiva anual praticada pelo seu banco.' },
          { step: '3. Prazo em Anos', desc: 'Defina o número de anos para amortizar o financiamento (ex: 20 ou 30 anos).' }
        ],
        formulaTitle: 'Fórmula de Amortização',
        formulaMath: 'Parcela = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
        formulaExplanation: 'Onde P é o valor financiado líquido, r é a taxa de juros mensal e n é o número total de meses.',
        exampleTitle: 'Exemplo Real',
        exampleText: 'Financiando R$ 300.000 com entrada de R$ 60.000 (empréstimo de R$ 240.000) a 9,5% ao ano por 30 anos, a parcela inicial estimada é de R$ 2.018.',
        faqsTitle: 'Perguntas Frequentes sobre Financiamento',
        faqs: [
          { q: 'Qual a diferença entre tabela SAC e Price?', a: 'Na tabela SAC as parcelas começam maiores e vão diminuindo ao longo do tempo. Na tabela Price as parcelas são fixas do início ao fim.' },
          { q: 'Quanto devo dar de entrada?', a: 'A maioria dos bancos exige pelo menos 20% do valor de avaliação do imóvel como entrada.' }
        ],
        tips: [
          'Amortizar o saldo devedor diretamente reduz o prazo total do financiamento e economiza milhares de reais em juros.'
        ]
      }
    },
    autoloan: {
      name: 'Simulador de Financiamento de Veículos',
      shortDesc: 'Calcule a parcela do financiamento do seu carro com entrada, valor de troca e juros.',
      category: 'finance',
      seo: {
        title: 'Simulador de Financiamento de Carro | Calculadora de Parcelas de Veículos',
        subtitle: 'Estime as parcelas mensais de carros novos e seminovos com entrada e taxa de juros.',
        metaDesc: 'Simulador de financiamento de veículos gratuito. Calcule a parcela mensal do seu carro, juros totais e amortização completa.',
        badge: 'Ferramenta Automotiva',
        introParagraphs: [
          'Comprar um carro novo ou usado é uma das maiores despesas recorrentes do orçamento familiar. Nossa calculadora de financiamento veicular calcula com precisão o valor da sua parcela mensal.',
          'Considere o valor de entrada, o seu carro usado na troca e descubra o custo total do financiamento.'
        ],
        howItWorksTitle: 'Como Calcular a Parcela do seu Carro',
        howItWorksSteps: [
          { step: '1. Preço do Veículo', desc: 'Insira o valor negociado do automóvel novo ou usado.' },
          { step: '2. Entrada e Valor de Troca', desc: 'Informe o valor em dinheiro da entrada e quanto seu carro atual vale na troca.' },
          { step: '3. Prazo e Taxa de Juros', desc: 'Escolha o prazo em meses (36, 48 ou 60 meses) e a taxa de juros anual.' }
        ],
        formulaTitle: 'Fórmula de Financiamento Veicular',
        formulaMath: 'Parcela = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
        formulaExplanation: 'Onde P é o valor líquido financiado, r é a taxa mensal de juros e n é o prazo em meses.',
        exampleTitle: 'Exemplo Prático',
        exampleText: 'Um carro de R$ 80.000 com entrada de R$ 20.000 financiado a 1,2% ao mês por 48 meses resulta em parcelas de R$ 1.658.',
        faqsTitle: 'Dúvidas sobre Financiamento Automotivo',
        faqs: [
          { q: 'Qual o melhor prazo para financiar um carro?', a: 'Especialistas recomendam prazos de até 48 meses para evitar que a depreciação do carro supere o saldo da dívida.' },
          { q: 'O que é o Custo Efetivo Total (CET)?', a: 'O CET inclui a taxa de juros nominal mais todas as taxas administrativas e seguros obrigatórios cobrados pelo banco.' }
        ],
        tips: [
          'Tente dar pelo menos 30% a 40% de entrada para conseguir taxas de juros promocionais nas concessionárias.'
        ]
      }
    },
    currency: {
      name: 'Conversor de Moedas em Tempo Real',
      shortDesc: 'Converta entre moedas globais com cotações de mercado atualizadas ao vivo.',
      category: 'finance',
      seo: {
        title: 'Conversor de Moedas ao Vivo | Cotação de Câmbio em Tempo Real',
        subtitle: 'Converta Dólar, Euro, Real, Libra e mais de 30 moedas internacionais instantaneamente.',
        metaDesc: 'Conversor de moedas online com taxas de câmbio atualizadas em tempo real. Ideal para viagens, importações e transferências internacionais.',
        badge: 'Cotação Comercial ao Vivo',
        introParagraphs: [
          'Acompanhar a cotação das moedas é crucial para viagens, remessas e compras no exterior. Nosso conversor fornece taxas de câmbio comerciais em tempo real.',
          'Consulte valores justos de mercado sem tarifas ocultas de casas de câmbio.'
        ],
        howItWorksTitle: 'Como Converter Moedas',
        howItWorksSteps: [
          { step: '1. Selecione a Moeda de Origem', desc: 'Escolha a moeda que você possui (ex: USD, BRL, EUR).' },
          { step: '2. Selecione a Moeda de Destino', desc: 'Escolha a moeda para a qual deseja converter.' },
          { step: '3. Digite o Valor', desc: 'Informe qualquer quantia para ver a conversão imediata.' }
        ],
        formulaTitle: 'Fórmula de Conversão',
        formulaMath: 'Valor Convertido = Quantia × (Taxa de Destino / Taxa de Origem)',
        formulaExplanation: 'A taxa comercial representa o ponto médio real entre compra e venda nos mercados globais.',
        exampleTitle: 'Exemplo de Conversão',
        exampleText: 'Converter US$ 1.000 para Reais com a taxa de 1 USD = 5,40 BRL resulta em R$ 5.400.',
        faqsTitle: 'Perguntas Frequentes sobre Câmbio',
        faqs: [
          { q: 'O que é câmbio comercial vs turismo?', a: 'O câmbio comercial é utilizado em transações financeiras e comércio exterior, enquanto o turismo inclui margens de lucro de casas de câmbio físicas.' }
        ],
        tips: [
          'Evite trocar dinheiro em quiosques de aeroportos onde o spread cambial pode passar de 15%.'
        ]
      }
    },
    bmi: {
      name: 'Calculadora de IMC e Peso Ideal',
      shortDesc: 'Calcule seu Índice de Massa Corporal (IMC) e descubra sua faixa de peso saudável.',
      category: 'health',
      seo: {
        title: 'Calculadora de IMC Online | Índice de Massa Corporal e Peso Saudável',
        subtitle: 'Avalie seu IMC pelo sistema métrico (kg/cm) com base nos padrões oficiais da OMS.',
        metaDesc: 'Calculadora de IMC gratuita. Descubra se você está no peso ideal, abaixo do peso, com sobrepeso ou obesidade segundo a OMS.',
        badge: 'Padrão Oficial da OMS',
        introParagraphs: [
          'O Índice de Massa Corporal (IMC) é o indicador mais utilizado por profissionais de saúde para avaliar a proporção entre peso e altura.',
          'Nossa calculadora indica instantaneamente a sua classificação e a faixa ideal de peso recomendada.'
        ],
        howItWorksTitle: 'Como Calcular seu IMC',
        howItWorksSteps: [
          { step: '1. Informe seu Peso', desc: 'Digite seu peso atual em quilogramas (kg).' },
          { step: '2. Informe sua Altura', desc: 'Digite sua altura em centímetros (cm).' },
          { step: '3. Veja o Diagnóstico', desc: 'Receba a classificação oficial da Organização Mundial da Saúde.' }
        ],
        formulaTitle: 'Fórmula do IMC',
        formulaMath: 'IMC = Peso (kg) / [Altura (m)]²',
        formulaExplanation: 'O peso é dividido pelo quadrado da altura em metros.',
        exampleTitle: 'Exemplo Prático',
        exampleText: 'Uma pessoa de 70 kg e 1,75 m de altura tem um IMC de 22,86, considerado Peso Normal.',
        faqsTitle: 'Perguntas Frequentes sobre IMC',
        faqs: [
          { q: 'O IMC é confiável para atletas?', a: 'O IMC não diferencia massa muscular de gordura. Pessoas muito musculosas podem ser classificadas com sobrepeso mesmo com baixo percentual de gordura.' }
        ],
        tips: [
          'Combine o IMC com a medição da circunferência abdominal para uma avaliação mais precisa da saúde cardiovascular.'
        ]
      }
    },
    percentage: {
      name: 'Calculadora de Porcentagem e Descontos',
      shortDesc: 'Calcule aumentos percentuais, descontos comerciais e diferenças entre valores.',
      category: 'daily',
      seo: {
        title: 'Calculadora de Porcentagem Online | Descontos, Aumentos e Proporções',
        subtitle: 'Resolva cálculos de porcentagem, promoções de compras e taxas em segundos.',
        metaDesc: 'Calculadora de porcentagem gratuita. Calcule descontos de produtos, acréscimos e variações percentuais facilmente.',
        badge: 'Utilidade Essencial',
        introParagraphs: [
          'Calcular porcentagens é uma tarefa diária: descontos na Black Friday, reajustes salariais, gorjetas e impostos.',
          'Nossa ferramenta resolve os tipos mais comuns de cálculos percentuais instantaneamente.'
        ],
        howItWorksTitle: 'Como Usar a Calculadora',
        howItWorksSteps: [
          { step: '1. Escolha a Operação', desc: 'Selecione entre calcular uma porcentagem de um número, desconto ou variação.' },
          { step: '2. Digite os Valores', desc: 'Informe os números base e a porcentagem.' },
          { step: '3. Obtenha o Resultado', desc: 'Veja o valor exato calculado e a fórmula utilizada.' }
        ],
        formulaTitle: 'Fórmula Básica de Porcentagem',
        formulaMath: 'Resultado = (Valor × Porcentagem) / 100',
        formulaExplanation: 'Multiplique o número pelo percentual desejado e divida por 100.',
        exampleTitle: 'Exemplo Prático',
        exampleText: 'Um produto de R$ 250 com 15% de desconto tem economia de R$ 37,50, custando R$ 212,50.',
        faqsTitle: 'Perguntas sobre Porcentagem',
        faqs: [
          { q: 'Como calcular aumento de salário?', a: 'Multiplique o salário atual pela porcentagem de aumento e some ao salário base.' }
        ],
        tips: [
          'Para calcular 10% rapidamente de cabeça, basta mover a vírgula do valor uma casa para a esquerda.'
        ]
      }
    },
    compound: {
      name: 'Calculadora de Juros Compostos',
      shortDesc: 'Simule o crescimento dos seus investimentos com aportes mensais e o poder dos juros compostos.',
      category: 'finance',
      seo: {
        title: 'Calculadora de Juros Compostos | Simulador de Investimentos e Aportes',
        subtitle: 'Projete seu patrimônio futuro, independência financeira e rendimento acumulado.',
        metaDesc: 'Calculadora de juros compostos online gratuita. Simule aportes mensais, rentabilidade de investimentos e evolução patrimonial.',
        badge: 'Multiplicador de Patrimônio',
        introParagraphs: [
          'Os juros compostos são considerados a força mais poderosa dos investimentos a longo prazo. Eles fazem o seu dinheiro render sobre o próprio rendimento anterior.',
          'Descubra quanto tempo levará para atingir sua independência financeira realizando aportes regulares.'
        ],
        howItWorksTitle: 'Como Simular seus Investimentos',
        howItWorksSteps: [
          { step: '1. Aporte Inicial', desc: 'O montante de dinheiro que você já tem para começar a investir.' },
          { step: '2. Aporte Mensal', desc: 'Quanto dinheiro você planeja poupar e investir todo mês.' },
          { step: '3. Taxa de Juros e Prazo', desc: 'A rentabilidade anual esperada da carteira e os anos de aplicação.' }
        ],
        formulaTitle: 'Fórmula de Juros Compostos',
        formulaMath: 'M = P × (1 + i)^t + PMT × [((1 + i)^t – 1) / i]',
        formulaExplanation: 'Onde M é o montante final, P é o valor inicial, i é a taxa de juros periódica, t é o tempo e PMT é o aporte mensal.',
        exampleTitle: 'Exemplo de Longo Prazo',
        exampleText: 'Investindo R$ 10.000 inicialmente mais R$ 500 por mês a 10% ao ano por 20 anos resulta em R$ 431.000 acumulados.',
        faqsTitle: 'Perguntas Frequentes sobre Juros Compostos',
        faqs: [
          { q: 'Qual a diferença entre juros simples e compostos?', a: 'Nos juros simples o rendimento é calculado apenas sobre o capital inicial. Nos compostos, os rendimentos anteriores também rendem juros (juros sobre juros).' }
        ],
        tips: [
          'O fator mais decisivo nos juros compostos não é quanto você ganha, mas sim o tempo em que o dinheiro permanece investido.'
        ]
      }
    },
    salary: {
      name: 'Calculadora de Salário Líquido',
      shortDesc: 'Calcule seu salário líquido em mãos após descontos de impostos e previdência.',
      category: 'finance',
      seo: {
        title: 'Calculadora de Salário Líquido | Simulador de Renda e Descontos',
        subtitle: 'Estime o valor exato do salário a receber após descontos obrigatórios.',
        metaDesc: 'Calculadora de salário líquido gratuita. Saiba exatamente quanto cairá na sua conta bancária após descontos de folha de pagamento.',
        badge: 'Calculadora Trabalhista',
        introParagraphs: [
          'Saber exatamente quanto do salário bruto cai na sua conta corrente após deduções tributárias é fundamental para planejar os gastos familiares.',
          'Nossa calculadora detalha os descontos médios de folha para você entender sua renda disponível real.'
        ],
        howItWorksTitle: 'Como Calcular o Salário Líquido',
        howItWorksSteps: [
          { step: '1. Digite o Salário Bruto', desc: 'Informe o salário contratual antes de quaisquer deduções.' },
          { step: '2. Alíquotas e Descontos', desc: 'Ajuste a porcentagem média de retenção de impostos e previdência.' },
          { step: '3. Veja o Salário Líquido', desc: 'Consulte o valor líquido mensal e a proporção de impostos retidos.' }
        ],
        formulaTitle: 'Cálculo de Salário Líquido',
        formulaMath: 'Salário Líquido = Salário Bruto – Previdência – Impostos – Outras Deduções',
        formulaExplanation: 'Subtrai-se todas as retenções e contribuições legais do salário bruto negociado.',
        exampleTitle: 'Exemplo Real',
        exampleText: 'Para um salário bruto de R$ 5.000 com 20% de deduções totais, o salário líquido a receber é de R$ 4.000.',
        faqsTitle: 'Dúvidas sobre Salário',
        faqs: [
          { q: 'O que é salário bruto?', a: 'É o valor total registrado na carteira de trabalho ou contrato, antes de quaisquer retenções de impostos ou benefícios.' }
        ],
        tips: [
          'Sempre baseie o seu orçamento doméstico no salário líquido que efetivamente cai na sua conta, e nunca no salário bruto.'
        ]
      }
    }
  },
  legal: {
    privacyTitle: 'Política de Privacidade',
    privacyLastUpdated: 'Última atualização: Outubro de 2026',
    termsTitle: 'Termos de Serviço',
    aboutTitle: 'Sobre a SmartCalcLab',
    contactTitle: 'Fale Conosco e Feedback',
    disclaimerTitle: 'Aviso Legal e Isenção de Responsabilidade',
  }
};
