# Visueller Wortausschluss / Visual Word Exclusion

Ein interaktives Web-Tool zum visuellen Identifizieren und Verwalten von Stopwords in Texten.

## Features

- **Multi-Language UI**: Deutsch und Englisch
- **Interaktiver Korpus**: Klicken Sie auf Wörter, um sie als Stopwords zu markieren
- **Word Cloud**: Visualisierung der häufigsten Wörter (interaktiv)
- **Stopword-Liste**: Als Liste oder Cloud darstellbar
- **Standard-Listen**: Vorgefertigte deutsche und englische Stopword-Listen
- **Download-Funktionen**: Exportieren Sie Ihre Stopword-Liste oder den bereinigten Text
- **Platzhalter-Optionen**: Verschiedene Darstellungsoptionen für ausgeblendete Wörter

## Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktion bauen
npm run build
```

## Technologie-Stack

- React 19 + TypeScript
- Vite
- Mantine UI Framework
- Noto Sans / Noto Serif Schriften

## Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── Header.tsx      # Kopfzeile mit Sprachauswahl
│   ├── Instructions.tsx # Anleitungstext und Statistiken
│   ├── CorpusPanel.tsx  # Textanzeige mit klickbaren Wörtern
│   ├── WordCloudPanel.tsx # Word Cloud Visualisierung
│   ├── StopwordsPanel.tsx # Stopword-Liste/Cloud
│   ├── ActionBar.tsx    # Aktions-Buttons
│   └── TextInputPanel.tsx # Texteingabe
├── config/
│   ├── i18n.ts         # UI-Übersetzungen (DE/EN)
│   └── theme.ts        # Mantine Theme (Evergreen-Farben)
├── data/
│   └── stopwords.ts    # Standard-Stopword-Listen
├── hooks/
│   ├── useAppState.ts  # Haupt-State-Management
│   └── useTokenizer.ts # Text-Tokenisierung
├── types/
│   └── index.ts        # TypeScript-Definitionen
└── App.tsx             # Haupt-App-Komponente
```

## Farbschema

- Evergreen (Hauptfarbe): #003835
- Spring Leaves: #006844
- Light Mint: #b7c8c1

## Geplante Erweiterungen

- Weitere Dateiformate (DOCX, PDF, XML, CoNLL)
- Lemmatisierung / Flexionsformen
- Korpus-Auswahl aus vordefinierten Quellen
- Import/Export von Stopword-Listen

## Lizenz

MIT
