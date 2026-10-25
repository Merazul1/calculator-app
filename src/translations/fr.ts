import { TranslationDictionary } from './index';

export const fr: TranslationDictionary = {
  siteName: 'SmartCalcLab',
  tagline: 'Calculatrices Rapides, Gratuites et Précises pour les Finances, la Santé et le Quotidien',
  searchPlaceholder: 'Rechercher une calculatrice (ex: Prêt immobilier, Devises, IMC, Intérêts)...',
  categories: {
    all: 'Tous les Outils',
    finance: 'Finance & Argent',
    health: 'Santé & Forme',
    daily: 'Utilitaires du Quotidien',
  },
  navigation: {
    home: 'Accueil',
    tools: 'Calculatrices',
    about: 'À Propos',
    contact: 'Contact',
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions d\'Utilisation',
    disclaimer: 'Mentions Légales',
  },
  ads: {
    advertisement: 'Publicité',
    sponsoredNotice: 'Les annonces permettent de garder nos outils 100% gratuits',
    adPlaceholder: 'Emplacement Publicitaire Responsif',
  },
  common: {
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    result: 'Résultat du Calcul',
    monthlyPayment: 'Mensualité',
    totalPayment: 'Paiement Total',
    totalInterest: 'Intérêts Totaux',
    amount: 'Montant',
    rate: 'Taux d\'Intérêt Annuel (%)',
    years: 'Durée (Années)',
    months: 'Mois',
    currency: 'Devise',
    copyResult: 'Copier les Résultats',
    copied: 'Copié dans le presse-papiers !',
    share: 'Partager',
    print: 'Imprimer',
    close: 'Fermer',
    backToHome: 'Retour à toutes les calculatrices',
  },
  tools: {
    loan: {
      name: 'Simulateur de Prêt Immobilier et Crédit',
      shortDesc: 'Calculez vos mensualités de crédit immobilier, intérêts totaux et tableau d\'amortissement.',
      category: 'finance',
      seo: {
        title: 'Simulateur de Prêt Immobilier et Crédit en Ligne | Calcul de Mensualités',
        subtitle: 'Estimez vos mensualités de crédit immobilier, assurance emprunteur et plan d\'amortissement.',
        metaDesc: 'Simulateur de prêt immobilier gratuit en ligne. Calculez votre mensualité, le coût des intérêts et votre tableau d\'amortissement en secondes.',
        badge: 'Outil Financier Haute Précision',
        introParagraphs: [
          'Calculer le coût réel de votre prêt avant d\'acheter un bien immobilier est capital pour la gestion de votre budget.',
          'Notre simulateur vous permet de comparer différents taux d\'intérêt et durées pour connaître avec exactitude vos remboursements mensuels.'
        ],
        howItWorksTitle: 'Comment Calculer vos Mensualités',
        howItWorksSteps: [
          { step: '1. Montant du Bien et Apport', desc: 'Indiquez le prix d\'achat et votre apport personnel (20% recommandé).' },
          { step: '2. Taux d\'Intérêt Annuel', desc: 'Saisissez le taux fixe proposé par votre banque ou courtier.' },
          { step: '3. Durée de l\'Emprunt', desc: 'Choisissez la durée de remboursement (15, 20 ou 25 ans).' }
        ],
        formulaTitle: 'Formule d\'Amortissement de Prêt',
        formulaMath: 'Mensualité = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
        formulaExplanation: 'Où P est le montant emprunté net, r est le taux d\'intérêt mensuel et n est le nombre total de mensualités.',
        exampleTitle: 'Exemple Pratique',
        exampleText: 'Pour un emprunt de 200 000 € à 3,8 % sur 20 ans, la mensualité hors assurance est de 1 190,82 €.',
        faqsTitle: 'Questions Fréquentes sur le Crédit Immobilier',
        faqs: [
          { q: 'Qu\'est-ce que le TAEG ?', a: 'Le Taux Annuel Effectif Global inclut le taux nominal ainsi que les frais de dossier et l\'assurance emprunteur.' }
        ],
        tips: [
          'Rembourser par anticipation permet de réduire la durée du prêt et d\'économiser des milliers d\'euros d\'intérêts.'
        ]
      }
    },
    autoloan: {
      name: 'Simulateur de Prêt Auto et Financement Véhicule',
      shortDesc: 'Calculez la mensualité de votre crédit voiture avec apport, reprise et intérêts.',
      category: 'finance',
      seo: {
        title: 'Simulateur de Crédit Auto | Calcul des Mensualités de Prêt Voiture',
        subtitle: 'Estimez les mensualités pour l\'achat d\'un véhicule neuf ou d\'occasion avec apport et reprise.',
        metaDesc: 'Calculateur de prêt auto gratuit. Simulez la mensualité de votre voiture, les intérêts totaux et la durée de remboursement.',
        badge: 'Simulateur Auto',
        introParagraphs: [
          'Financer un véhicule neuf ou d\'occasion représente un engagement budgétaire important. Notre simulateur de prêt auto calcule vos mensualités précises.',
          'Prenez en compte votre apport et la reprise de votre ancien véhicule pour optimiser le financement.'
        ],
        howItWorksTitle: 'Comment Calculer votre Prêt Auto',
        howItWorksSteps: [
          { step: '1. Prix du Véhicule', desc: 'Indiquez le prix d\'achat de l\'automobile.' },
          { step: '2. Apport et Reprise', desc: 'Renseignez l\'apport en espèces et la valeur de reprise de votre ancienne voiture.' },
          { step: '3. Durée et Taux', desc: 'Sélectionnez la durée en mois (36, 48, 60 ou 72 mois) et le taux d\'intérêt.' }
        ],
        formulaTitle: 'Formule de Crédit Automobile',
        formulaMath: 'Mensualité = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
        formulaExplanation: 'Où P est le montant net financé, r est le taux mensuel et n est le nombre de mois.',
        exampleTitle: 'Exemple Concret',
        exampleText: 'Pour un véhicule de 25 000 € avec 5 000 € d\'apport financé à 5,5 % sur 48 mois, la mensualité est de 465,14 €.',
        faqsTitle: 'FAQ Financement Auto',
        faqs: [
          { q: 'Quelle est la durée idéale pour un crédit auto ?', a: 'Une durée de 36 à 48 mois est conseillée afin de ne pas payer trop d\'intérêts par rapport à la décote du véhicule.' }
        ],
        tips: [
          'Comparez l\'offre du concessionnaire avec un prêt personnel auprès de votre banque avant de vous engager.'
        ]
      }
    },
    currency: {
      name: 'Convertisseur de Devises en Direct',
      shortDesc: 'Convertissez instantanément entre devises mondiales avec taux de change en direct.',
      category: 'finance',
      seo: {
        title: 'Convertisseur de Devises en Direct | Taux de Change en Temps Réel',
        subtitle: 'Convertissez Euro, Dollar, Livre Sterling, Franc Suisse et plus de 30 devises mondiales.',
        metaDesc: 'Convertisseur de devises gratuit avec taux de change en direct. Idéal pour les voyages, le shopping international et les transferts d\'argent.',
        badge: 'Taux du Marché en Direct',
        introParagraphs: [
          'Suivre les cours des devises est essentiel pour vos voyages et transactions internationales. Notre convertisseur fournit les taux interbancaires en direct.',
          'Consultez les taux réels sans marges cachées d\'agences bancaires.'
        ],
        howItWorksTitle: 'Comment Convertir des Devises',
        howItWorksSteps: [
          { step: '1. Choisissez la Devise Source', desc: 'Sélectionnez la monnaie d\'origine (ex: EUR, USD, CAD).' },
          { step: '2. Choisissez la Devise Cible', desc: 'Sélectionnez la monnaie que vous souhaitez obtenir.' },
          { step: '3. Saisissez le Montant', desc: 'Entrez n\'importe quelle somme pour voir la conversion instantanée.' }
        ],
        formulaTitle: 'Formule de Conversion',
        formulaMath: 'Valeur Convertie = Montant × (Taux Cible / Taux Source)',
        formulaExplanation: 'Le taux correspond au cours moyen du marché des changes international.',
        exampleTitle: 'Exemple',
        exampleText: '1 000 € convertis en Dollars US au taux de 1 EUR = 1,08 USD équivalent à 1 080 $.',
        faqsTitle: 'FAQ Devises',
        faqs: [
          { q: 'Qu\'est-ce que le taux interbancaire ?', a: 'C\'est le taux réel auquel les banques s\'échangent les devises sur les marchés mondiaux.' }
        ],
        tips: [
          'Privilégiez les paiements par carte bancaire sans frais à l\'étranger plutôt que les bureaux de change d\'aéroports.'
        ]
      }
    },
    bmi: {
      name: 'Calculateur d\'IMC et Poids Idéal',
      shortDesc: 'Calculez votre Indice de Masse Corporelle (IMC) et déterminez votre poids de forme.',
      category: 'health',
      seo: {
        title: 'Calculateur d\'IMC Gratuit | Indice de Masse Corporelle selon l\'OMS',
        subtitle: 'Évaluez votre IMC en système métrique (kg/cm) selon les normes de l\'Organisation Mondiale de la Santé.',
        metaDesc: 'Calculateur d\'IMC gratuit en ligne. Découvrez si vous êtes de corpulence normale, en surpoids ou en insuffisance pondérale.',
        badge: 'Norme Officielle OMS',
        introParagraphs: [
          'L\'Indice de Masse Corporelle (IMC) est l\'outil international de référence pour évaluer la corpulence d\'un adulte.',
          'Obtenez immédiatement votre tranche de corpulence et votre fourchette de poids santé.'
        ],
        howItWorksTitle: 'Comment Calculer son IMC',
        howItWorksSteps: [
          { step: '1. Saisissez votre Poids', desc: 'Entrez votre poids actuel en kilogrammes (kg).' },
          { step: '2. Saisissez votre Taille', desc: 'Entrez votre taille en centimètres (cm).' },
          { step: '3. Consultez le Bilan', desc: 'Découvrez votre catégorie de santé officielle.' }
        ],
        formulaTitle: 'Formule de l\'IMC',
        formulaMath: 'IMC = Poids (kg) / [Taille (m)]²',
        formulaExplanation: 'On divise le poids par la taille au carré en mètres.',
        exampleTitle: 'Exemple',
        exampleText: 'Une personne de 68 kg mesurant 1,72 m a un IMC de 22,98 (Poids normal).',
        faqsTitle: 'FAQ IMC',
        faqs: [
          { q: 'L\'IMC s\'applique-t-il aux sportifs ?', a: 'Non, l\'IMC ne distingue pas la masse musculaire de la masse grasse. Les athlètes peuvent être considérés en surpoids sans excès de graisse.' }
        ],
        tips: [
          'Associez l\'IMC au tour de taille pour une meilleure évaluation des risques cardiovasculaires.'
        ]
      }
    },
    percentage: {
      name: 'Calculateur de Pourcentage et Remise',
      shortDesc: 'Calculez des réductions, augmentations de prix et variations en pourcentage.',
      category: 'daily',
      seo: {
        title: 'Calculateur de Pourcentage en Ligne | Soldes, Remises et Hausses',
        subtitle: 'Résolvez rapidement vos calculs de promotions, TVA et pourcentages d\'évolution.',
        metaDesc: 'Calculateur de pourcentage gratuit. Calculez les remises des soldes, augmentations et pourcentages simples en quelques clics.',
        badge: 'Utilitaire Indispensable',
        introParagraphs: [
          'Calculer des pourcentages est indispensable au quotidien : soldes, pourboires, hausses de salaire et taxes.',
          'Notre outil vous donne le résultat instantané avec l\'explication du calcul.'
        ],
        howItWorksTitle: 'Comment Utiliser le Calculateur',
        howItWorksSteps: [
          { step: '1. Choisissez l\'Opération', desc: 'Sélectionnez le type de calcul à effectuer (remise, hausse, proportion).' },
          { step: '2. Saisissez les Valeurs', desc: 'Entrez les nombres de départ et le pourcentage.' },
          { step: '3. Obtenez le Résultat', desc: 'Consultez la réponse immédiate et la formule appliquée.' }
        ],
        formulaTitle: 'Formule de Base du Pourcentage',
        formulaMath: 'Résultat = (Valeur × Pourcentage) / 100',
        formulaExplanation: 'Multipliez la valeur par le pourcentage puis divisez par cent.',
        exampleTitle: 'Exemple Pratique',
        exampleText: 'Un article à 120 € avec une réduction de 20 % revient à 96 € (économie de 24 €).',
        faqsTitle: 'FAQ Pourcentages',
        faqs: [
          { q: 'Comment calculer une hausse de prix ?', a: 'Multipliez le prix initial par (1 + pourcentage / 100).' }
        ],
        tips: [
          'Pour trouver 10 % rapidement, décalez simplement la virgule d\'un chiffre vers la gauche.'
        ]
      }
    },
    compound: {
      name: 'Calculateur d\'Intérêts Composés',
      shortDesc: 'Simulez l\'effet boule de neige de vos investissements avec versements mensuels.',
      category: 'finance',
      seo: {
        title: 'Calculateur d\'Intérêts Composés | Simulateur d\'Épargne et Bourse',
        subtitle: 'Projetez la croissance de votre patrimoine financier sur le long terme.',
        metaDesc: 'Calculateur d\'intérêts composés gratuit. Simulez vos investissements réguliers, rendements boursiers et indépendance financière.',
        badge: 'Multiplicateur de Capital',
        introParagraphs: [
          'Les intérêts composés génèrent des gains sur les intérêts déjà acquis au fil des ans.',
          'Estimez combien rapportera votre épargne grâce à la régularité de vos investissements.'
        ],
        howItWorksTitle: 'Comment Simuler son Épargne',
        howItWorksSteps: [
          { step: '1. Capital Initial', desc: 'La somme de départ investie.' },
          { step: '2. Versement Mensuel', desc: 'Le montant épargné et investi chaque mois.' },
          { step: '3. Rendement et Durée', desc: 'Le taux de rendement annuel moyen estimé et le nombre d\'années.' }
        ],
        formulaTitle: 'Formule des Intérêts Composés',
        formulaMath: 'A = P × (1 + r)^t + PMT × [((1 + r)^t – 1) / r]',
        formulaExplanation: 'Où A est la valeur future, P le capital initial, r le taux périodique et t la durée.',
        exampleTitle: 'Exemple',
        exampleText: '5 000 € placés au départ avec 200 € par mois à 7 % annuel pendant 20 ans deviennent 122 700 €.',
        faqsTitle: 'FAQ Intérêts Composés',
        faqs: [
          { q: 'Quelle est la règle des 72 ?', a: 'Divisez 72 par votre taux d\'intérêt annuel pour connaître le nombre d\'années nécessaires pour doubler votre capital.' }
        ],
        tips: [
          'Plus vous commencez à investir jeune, plus l\'effet des intérêts composés est spectaculaire.'
        ]
      }
    },
    salary: {
      name: 'Calculateur de Salaire Brut en Net',
      shortDesc: 'Convertissez votre salaire brut en net après cotisations et prélèvements sociaux.',
      category: 'finance',
      seo: {
        title: 'Calculateur Salaire Brut en Net | Simulateur de Rémunération',
        subtitle: 'Estimez votre salaire net mensuel perçu sur votre compte bancaire.',
        metaDesc: 'Calculateur de salaire brut en net gratuit. Calculez votre rémunération nette à partir de votre salaire brut annuel ou mensuel.',
        badge: 'Simulateur de Salaire',
        introParagraphs: [
          'Connaître le salaire net réel avant d\'accepter une offre d\'embauche est primordial.',
          'Notre simulateur déduit les cotisations salariales moyennes pour estimer votre rémunération disponible.'
        ],
        howItWorksTitle: 'Comment Calculer son Salaire Net',
        howItWorksSteps: [
          { step: '1. Indiquez le Salaire Brut', desc: 'Saisissez votre rémunération contractuelle brute.' },
          { step: '2. Taux de Cotisations', desc: 'Ajustez le pourcentage moyen de retenues sociales.' },
          { step: '3. Obtenez le Net', desc: 'Consultez votre revenu net mensuel estimé.' }
        ],
        formulaTitle: 'Calcul du Salaire Net',
        formulaMath: 'Salaire Net = Salaire Brut – Cotisations Salariales',
        formulaExplanation: 'Le montant net correspond au brut diminué des charges sociales obligatoires.',
        exampleTitle: 'Exemple',
        exampleText: 'Pour un salaire brut de 3 000 € avec 22 % de cotisations salariales, le net estimé est de 2 340 €.',
        faqsTitle: 'FAQ Salaire',
        faqs: [
          { q: 'Quelle est la différence entre brut et net ?', a: 'Le brut est le montant avant déductions des cotisations de retraite, sécurité sociale et prévoyance.' }
        ],
        tips: [
          'Établissez toujours votre budget familial sur la base du salaire net perçu.'
        ]
      }
    }
  },
  legal: {
    privacyTitle: 'Politique de Confidentialité',
    privacyLastUpdated: 'Dernière mise à jour : Octobre 2026',
    termsTitle: 'Conditions d\'Utilisation',
    aboutTitle: 'À Propos de SmartCalcLab',
    contactTitle: 'Contactez-Nous et Avis',
    disclaimerTitle: 'Avertissement Légal',
  }
};
