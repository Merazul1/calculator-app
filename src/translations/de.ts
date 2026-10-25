import { TranslationDictionary } from './index';

export const de: TranslationDictionary = {
  siteName: 'SmartCalcLab',
  tagline: 'Schnelle, Kostenlose und Präzise Rechner für Finanzen, Gesundheit & Alltag',
  searchPlaceholder: 'Rechner suchen (z. B. Baufinanzierung, Währung, BMI, Zinseszins)...',
  categories: {
    all: 'Alle Rechner',
    finance: 'Finanzen & Geld',
    health: 'Gesundheit & Fitness',
    daily: 'Alltag & Nutzen',
  },
  navigation: {
    home: 'Startseite',
    tools: 'Rechner',
    about: 'Über Uns',
    contact: 'Kontakt',
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    disclaimer: 'Haftungsausschluss',
  },
  ads: {
    advertisement: 'Werbung',
    sponsoredNotice: 'Werbung ermöglicht es uns, alle Rechner 100% kostenlos anzubieten',
    adPlaceholder: 'Responsive Werbeeinheit',
  },
  common: {
    calculate: 'Berechnen',
    reset: 'Zurücksetzen',
    result: 'Berechnungsergebnis',
    monthlyPayment: 'Monatliche Rate',
    totalPayment: 'Gesamtrückzahlung',
    totalInterest: 'Gesamtzinsen',
    amount: 'Betrag',
    rate: 'Jahreszinssatz (%)',
    years: 'Laufzeit (Jahre)',
    months: 'Monate',
    currency: 'Währung',
    copyResult: 'Ergebnis kopieren',
    copied: 'In die Zwischenablage kopiert!',
    share: 'Teilen',
    print: 'Drucken',
    close: 'Schließen',
    backToHome: 'Zurück zu allen Rechnern',
  },
  tools: {
    loan: {
      name: 'Baufinanzierungs- & Kreditrechner',
      shortDesc: 'Monatsrate, Zinskosten, Tilgungsplan und Restschuld für Immobilienkredite berechnen.',
      category: 'finance',
      seo: {
        title: 'Baufinanzierungsrechner | Kreditrate & Tilgungsplan Online Berechnen',
        subtitle: 'Kreditrate für Immobilienfinanzierung, Hauskauf und Ratenkredit präzise simulieren.',
        metaDesc: 'Kostenloser Baufinanzierungsrechner. Berechnen Sie Monatsrate, Zinsaufwand und Tilgungsplan für Ihren Immobilienkredit in Sekunden.',
        badge: 'Präziser Finanzrechner',
        introParagraphs: [
          'Die Gesamtkosten einer Immobilienfinanzierung im Voraus zu kennen, ist der wichtigste Schritt beim Hauskauf.',
          'Unser Rechner ermittelt Ihre monatliche Annuitätenrate sowie die Zins- und Tilgungsanteile über die gesamte Laufzeit.'
        ],
        howItWorksTitle: 'So Funktioniert die Kreditberechnung',
        howItWorksSteps: [
          { step: '1. Kaufpreis & Eigenkapital', desc: 'Geben Sie den Immobilienpreis und Ihr eingesetztes Eigenkapital ein.' },
          { step: '2. Sollzins Festlegen', desc: 'Tragen Sie den jährlichen gebundenen Sollzinssatz Ihrer Bank ein.' },
          { step: '3. Zinsbindung & Laufzeit', desc: 'Wählen Sie die Laufzeit in Jahren (z. B. 15, 20 oder 30 Jahre).' }
        ],
        formulaTitle: 'Annuitätenformel',
        formulaMath: 'Monatsrate = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
        formulaExplanation: 'Wobei P der Nettodarlehensbetrag, r der Monatszins und n die Gesamtzahl der Monate ist.',
        exampleTitle: 'Praxisbeispiel',
        exampleText: 'Ein Darlehen von 300.000 € zu 3,5 % Zinsen über 25 Jahre ergibt eine Monatsrate von ca. 1.502 €.',
        faqsTitle: 'Häufige Fragen zur Baufinanzierung',
        faqs: [
          { q: 'Was bedeutet anfängliche Tilgung?', a: 'Die anfängliche Tilgung ist der Prozentsatz der Kreditsumme, der im ersten Jahr getilgt wird (meist 2 % bis 3 %).' }
        ],
        tips: [
          'Nutzen Sie Sondertilgungsrechte, um die Zinslast und Restschuld deutlich schneller abzubauen.'
        ]
      }
    },
    autoloan: {
      name: 'Autokredit- & Fahrzeugfinanzierungsrechner',
      shortDesc: 'Berechnen Sie die monatliche Autokreditrate mit Anzahlung, Inzahlungnahme und Zinsen.',
      category: 'finance',
      seo: {
        title: 'Autokreditrechner | Monatliche Kfz-Finanzierungsrate Berechnen',
        subtitle: 'Berechnen Sie die Monatsrate für Neuwagen und Gebrauchtwagen mit Anzahlung und Zinsen.',
        metaDesc: 'Kostenloser Autokreditrechner. Berechnen Sie monatliche Raten, Gesamtzinsen und Laufzeiten für Ihren Autokauf online.',
        badge: 'Kfz-Rechner',
        introParagraphs: [
          'Der Kauf eines Autos ist oft eine erhebliche finanzielle Ausgabe. Unser Autokreditrechner berechnet Ihre genaue monatliche Rate.',
          'Berücksichtigen Sie Anzahlung und Inzahlungnahme Ihres alten Wagens für optimale Finanzierungskonditionen.'
        ],
        howItWorksTitle: 'So Berechnen Sie den Autokredit',
        howItWorksSteps: [
          { step: '1. Fahrzeugpreis', desc: 'Geben Sie den Kaufpreis des Neu- oder Gebrauchtwagens ein.' },
          { step: '2. Anzahlung & Altwagen', desc: 'Erfassen Sie Ihre Baranzahlung und den Wert des Inzahlungnahme-Fahrzeugs.' },
          { step: '3. Laufzeit & Effektivzins', desc: 'Wählen Sie die Laufzeit in Monaten (36, 48, 60 Monate) und den Zinssatz.' }
        ],
        formulaTitle: 'Formel für Autokreditraten',
        formulaMath: 'Monatsrate = [P × r × (1 + r)^n] / [(1 + r)^n – 1]',
        formulaExplanation: 'P ist der Finanzierungsbetrag, r der monatliche Zins und n die Monate.',
        exampleTitle: 'Beispiel',
        exampleText: 'Ein Fahrzeugpreis von 30.000 € abzüglich 5.000 € Anzahlung bei 5,9 % Zinsen über 48 Monate ergibt 584,20 € pro Monat.',
        faqsTitle: 'FAQ Autokredit',
        faqs: [
          { q: 'Welche Laufzeit ist für ein Auto ideal?', a: 'Experten empfehlen 36 bis 48 Monate, um den Wertverlust des Autos nicht durch Zinsen zu übersteigen.' }
        ],
        tips: [
          'Holen Sie vor dem Gang zum Händler ein unabhängiges Vergleichsangebot Ihrer Hausbank ein.'
        ]
      }
    },
    currency: {
      name: 'Live-Währungsrechner',
      shortDesc: 'Aktuelle Devisenkurse in Echtzeit umrechnen zwischen Euro, Dollar und Weltwährungen.',
      category: 'finance',
      seo: {
        title: 'Währungsrechner Live | Devisenkurse in Echtzeit Umrechnen',
        subtitle: 'Euro, US-Dollar, Schweizer Franken, Britische Pfund und über 30 Währungen sofort umrechnen.',
        metaDesc: 'Kostenloser Live-Währungsrechner. Aktuelle Wechselkurse für Reisen, Auslandsüberweisungen und Online-Shopping in Echtzeit.',
        badge: 'Echtzeit-Wechselkurse',
        introParagraphs: [
          'Wechselkursschwankungen spielen bei Reisen und internationalen Zahlungen eine große Rolle.',
          'Unser Rechner liefert Ihnen stets die aktuellen Mittelkurse ohne versteckte Bankaufschläge.'
        ],
        howItWorksTitle: 'So Rechnen Sie Währungen Um',
        howItWorksSteps: [
          { step: '1. Ausgangswährung Wählen', desc: 'Wählen Sie Ihre Basiswährung (z. B. EUR, USD, CHF).' },
          { step: '2. Zielwährung Wählen', desc: 'Wählen Sie die Währung, in die umgerechnet werden soll.' },
          { step: '3. Betrag Eingeben', desc: 'Geben Sie den gewünschten Betrag ein, um das Ergebnis zu sehen.' }
        ],
        formulaTitle: 'Umrechnungsformel',
        formulaMath: 'Umgerechneter Wert = Betrag × (Zielkurs / Basiskurs)',
        formulaExplanation: 'Der Kurs spiegelt den tatsächlichen Mittelkurs der internationalen Devisenmärkte wider.',
        exampleTitle: 'Beispiel',
        exampleText: '1.000 € entsprechen bei einem Kurs von 1 EUR = 1,08 USD exakt 1.080 USD.',
        faqsTitle: 'FAQ Währungsumrechnung',
        faqs: [
          { q: 'Was ist der Devisenmittelkurs?', a: 'Es ist der faire Mittelpunkt zwischen Ankauf- und Verkaufskurs der Großbanken.' }
        ],
        tips: [
          'Wählen Sie bei Kartenzahlungen im Ausland immer die Abrechnung in Landeswährung, um teure Umrechnungsgebühren zu vermeiden.'
        ]
      }
    },
    bmi: {
      name: 'BMI-Rechner & Idealgewicht',
      shortDesc: 'Body-Mass-Index (BMI) nach WHO-Klassifikation und persönliches Normalgewicht berechnen.',
      category: 'health',
      seo: {
        title: 'BMI Rechner Kostenlos | Body-Mass-Index & Idealgewicht nach WHO',
        subtitle: 'Berechnen Sie Ihren BMI nach Körpergröße und Gewicht mit präziser Gesundheitseinstufung.',
        metaDesc: 'Kostenloser BMI-Rechner online. Prüfen Sie schnell und einfach, ob Sie Normalgewicht, Untergewicht oder Übergewicht haben.',
        badge: 'Offizieller WHO-Standard',
        introParagraphs: [
          'Der Body-Mass-Index (BMI) ist die weltweit anerkannte Maßzahl zur Bewertung des Körpergewichts im Verhältnis zur Größe.',
          'Erfahren Sie sofort Ihre Einstufung und Ihren gesunden Gewichtsbereich.'
        ],
        howItWorksTitle: 'So Funktioniert die BMI-Berechnung',
        howItWorksSteps: [
          { step: '1. Körpergewicht Eingeben', desc: 'Tragen Sie Ihr Gewicht in Kilogramm (kg) ein.' },
          { step: '2. Körpergröße Eingeben', desc: 'Tragen Sie Ihre Größe in Zentimetern (cm) ein.' },
          { step: '3. Ergebnis Ablesen', desc: 'Erhalten Sie Ihre Einstufung nach WHO-Kriterien.' }
        ],
        formulaTitle: 'BMI-Formel',
        formulaMath: 'BMI = Gewicht (kg) / [Größe (m)]²',
        formulaExplanation: 'Das Körpergewicht wird geteilt durch das Quadrat der Körpergröße in Metern.',
        exampleTitle: 'Beispiel',
        exampleText: 'Ein Gewicht von 75 kg bei 180 cm Körpergröße ergibt einen BMI von 23,15 (Normalgewicht).',
        faqsTitle: 'FAQ zum BMI',
        faqs: [
          { q: 'Gilt der BMI auch für Kraftsportler?', a: 'Nein, Muskelgewebe ist dichter als Fettgewebe. Sehr muskulöse Sportler können fälschlicherweise als übergewichtig eingestuft werden.' }
        ],
        tips: [
          'Messen Sie zusätzlich Ihren Taillenumfang zur besseren Einschätzung von Herz-Kreislauf-Risiken.'
        ]
      }
    },
    percentage: {
      name: 'Prozentrechner & Rabattrechner',
      shortDesc: 'Prozentsätze, Rabatte, Mehrwertsteuer und prozentuale Veränderungen einfach berechnen.',
      category: 'daily',
      seo: {
        title: 'Prozentrechner Online | Rabatte, Aufschläge & Prozentwerte Berechnen',
        subtitle: 'Lösen Sie alle Prozentaufgaben für Einkäufe, Preisanpassungen und Steuern blitzschnell.',
        metaDesc: 'Kostenloser Prozentrechner im Internet. Berechnen Sie Rabatte, Preisnachlässe, Zuwächse und Prozentanteile im Handumdrehen.',
        badge: 'Unverzichtbares Alltagstool',
        introParagraphs: [
          'Prozentrechnen begegnet uns täglich: beim Sale, bei Preissteigerungen, Trinkgeldern oder Steuerberechnungen.',
          'Unser Tool liefert Ihnen sofort die richtige Antwort inklusive Rechenweg.'
        ],
        howItWorksTitle: 'Bedienung des Rechners',
        howItWorksSteps: [
          { step: '1. Rechenart Auswählen', desc: 'Wählen Sie zwischen Rabatt, Aufschlag oder Anteil berechnen.' },
          { step: '2. Werte Eingeben', desc: 'Tragen Sie Grundwert und Prozentsatz ein.' },
          { step: '3. Ergebnis Erhalten', desc: 'Sehen Sie das exakte Ergebnis und die Ersparnis.' }
        ],
        formulaTitle: 'Grundformel der Prozentrechnung',
        formulaMath: 'Prozentwert = (Grundwert × Prozentsatz) / 100',
        formulaExplanation: 'Multiplizieren Sie den Grundwert mit dem Prozentsatz und teilen Sie durch 100.',
        exampleTitle: 'Beispiel',
        exampleText: 'Ein Artikel für 80 € mit 25 % Rabatt kostet nach Abzug 60 € (Ersparnis: 20 €).',
        faqsTitle: 'FAQ Prozentrechnen',
        faqs: [
          { q: 'Wie berechnet man 10 % im Kopf?', a: 'Verschieben Sie einfach das Komma um eine Stelle nach links.' }
        ],
        tips: [
          'Kombinierte Rabatte werden nacheinander und nicht addiert berechnet.'
        ]
      }
    },
    compound: {
      name: 'Zinseszinsrechner & Vermögensplaner',
      shortDesc: 'Berechnen Sie den Zinseszinseffekt Ihrer Geldanlage mit monatlichen Sparraten.',
      category: 'finance',
      seo: {
        title: 'Zinseszinsrechner Online | Sparplan, ETF & Zinsertrag Berechnen',
        subtitle: 'Simulieren Sie langfristiges Vermögenswachstum, Sparpläne und finanzielle Freiheit.',
        metaDesc: 'Kostenloser Zinseszinsrechner. Berechnen Sie Zinserträge, monatliche Sparraten und exponentielles Vermögenswachstum online.',
        badge: 'Vermögensaufbau-Tool',
        introParagraphs: [
          'Der Zinseszinseffekt gilt als der mächtigste Hebel beim langfristigen Vermögensaufbau mit Aktien, Fonds und ETFs.',
          'Erfahren Sie, wie schon kleine monatliche Sparbeiträge über Jahrzehnte zu einem stattlichen Vermögen anwachsen.'
        ],
        howItWorksTitle: 'So Planen Sie Ihren Sparplan',
        howItWorksSteps: [
          { step: '1. Anfangskapital', desc: 'Der Betrag, den Sie zu Beginn bereits angelegt haben.' },
          { step: '2. Monatliche Sparrate', desc: 'Wie viel Geld Sie jeden Monat zusätzlich investieren.' },
          { step: '3. Rendite & Anlagehorizont', desc: 'Die erwartete jährliche Rendite und die Laufzeit in Jahren.' }
        ],
        formulaTitle: 'Zinseszinsformel',
        formulaMath: 'Endkapital = K × (1 + p)^t + Sparrate × [((1 + p)^t – 1) / p]',
        formulaExplanation: 'K ist das Anfangskapital, p der Zinssatz und t die Laufzeit in Jahren.',
        exampleTitle: 'Beispiel',
        exampleText: '2.500 € Startguthaben plus 150 € monatlich bei 7 % Rendite über 25 Jahre wachsen auf über 120.000 € an.',
        faqsTitle: 'FAQ Zinseszins',
        faqs: [
          { q: 'Was ist die 72er-Regel?', a: 'Teilen Sie 72 durch die Rendite, um zu wissen, nach wie vielen Jahren sich Ihr Geld verdoppelt (z. B. 72 / 7 % ≈ 10 Jahre).' }
        ],
        tips: [
          'Beginnen Sie so früh wie möglich mit dem Sparen – Zeit ist beim Zinseszins wichtiger als die Sparsumme.'
        ]
      }
    },
    salary: {
      name: 'Brutto-Netto-Rechner',
      shortDesc: 'Schätzen Sie Ihr monatliches Nettoeinkommen nach Abzug von Steuern und Sozialabgaben.',
      category: 'finance',
      seo: {
        title: 'Brutto Netto Rechner | Gehalt & Nettolohn Online Berechnen',
        subtitle: 'Ermitteln Sie Ihren tatsächlichen Auszahlungsbetrag nach Steuern und Abzügen.',
        metaDesc: 'Kostenloser Brutto-Netto-Gehaltsrechner. Berechnen Sie Ihr monatliches Nettogehalt nach Abzug von Lohnsteuer und Sozialabgaben.',
        badge: 'Gehaltsrechner',
        introParagraphs: [
          'Für Ihre monatliche Haushaltsplanung ist nur das Nettoeinkommen entscheidend, das tatsächlich auf Ihrem Girokonto eingeht.',
          'Unser Rechner zeigt Ihnen den Unterschied zwischen Bruttogehalt und realem Nettolohn.'
        ],
        howItWorksTitle: 'So Berechnen Sie Ihr Nettogehalt',
        howItWorksSteps: [
          { step: '1. Bruttogehalt Eingeben', desc: 'Tragen Sie Ihr vertragliches monatliches Bruttogehalt ein.' },
          { step: '2. Abzüge Einstellen', desc: 'Passen Sie den geschätzten Abzugssatz für Steuern und Sozialbeiträge an.' },
          { step: '3. Nettogehalt Erfahren', desc: 'Sehen Sie sofort Ihren geschätzten Auszahlungsbetrag.' }
        ],
        formulaTitle: 'Berechnung des Nettogehalts',
        formulaMath: 'Nettolohn = Bruttolohn – Lohnsteuer – Sozialversicherungsbeiträge',
        formulaExplanation: 'Vom Bruttogehalt werden alle gesetzlichen Abgaben abgezogen.',
        exampleTitle: 'Beispiel',
        exampleText: 'Bei einem Bruttogehalt von 3.500 € und ca. 35 % Gesamtabzügen verbleiben ca. 2.275 € Netto.',
        faqsTitle: 'FAQ zum Gehalt',
        faqs: [
          { q: 'Was gehört zu den gesetzlichen Abzügen?', a: 'Lohnsteuer, Solidaritätszuschlag, Renten-, Kranken-, Pflege- und Arbeitslosenversicherung.' }
        ],
        tips: [
          'Verhandeln Sie Gehaltssprünge immer auf Bruttobasis, aber kalkulieren Sie Ihre Ausgaben stets mit dem Nettobetrag.'
        ]
      }
    }
  },
  legal: {
    privacyTitle: 'Datenschutzerklärung',
    privacyLastUpdated: 'Stand: Oktober 2026',
    termsTitle: 'Nutzungsbedingungen',
    aboutTitle: 'Über SmartCalcLab',
    contactTitle: 'Kontakt & Feedback',
    disclaimerTitle: 'Rechtlicher Haftungsausschluss',
  }
};
