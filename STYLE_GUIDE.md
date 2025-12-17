# BAdW Visualisierungstools - Style Guide

## Technologie-Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Mantine v8
- **Styling:** Mantine's built-in styling + inline styles

## Farbschema (Evergreen)

```typescript
const colors = {
  // Hauptfarben
  evergreen: '#003835',      // Primär, dunkel
  springLeaves: '#006844',   // Sekundär, mittel
  lightMint: '#b7c8c1',      // Akzent, hell
  
  // Hintergründe
  pageBg: '#f5f7f6',         // Seiten-Hintergrund
  panelBg: '#f8faf9',        // Panel-Header
  
  // Grautöne
  white: '#ffffff',
  black: '#1a1a1a',
  dimmed: '#999999',
  
  // Semantisch
  error: '#c92a2a',          // Für Stopwords/Löschen
};
```

## Mantine Theme-Konfiguration

```typescript
const evergreen: MantineColorsTuple = [
  '#e6f2f1', // 0 - lightest
  '#b7c8c1', // 1 - Light Mint
  '#8aada3', // 2
  '#5d9285', // 3
  '#307767', // 4
  '#006844', // 5 - Spring Leaves
  '#005a3b', // 6
  '#004c32', // 7
  '#003835', // 8 - Evergreen (main)
  '#002a28', // 9 - darkest
];

// primaryColor: 'evergreen'
// defaultRadius: 'sm'
```

## Typografie

- **Schriften:** Noto Sans (UI), Noto Serif (Inhalte/Korpus)
- **Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Serif:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Verwendung:
- **UI-Elemente:** `fontFamily: '"Noto Sans", sans-serif'`
- **Textinhalte/Korpus:** `fontFamily: '"Noto Serif", Georgia, serif'`
- **Überschriften:** Noto Serif, fontWeight 600

## Komponenten-Patterns

### Panel-Struktur
```tsx
<Paper
  shadow="sm"
  style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #b7c8c1',
  }}
>
  {/* Header */}
  <Box
    p="sm"
    style={{
      borderBottom: '1px solid #b7c8c1',
      backgroundColor: '#f8faf9',
    }}
  >
    <Title order={4} style={{ color: '#003835' }}>
      Panel-Titel
    </Title>
  </Box>
  
  {/* Scrollbarer Inhalt */}
  <ScrollArea style={{ flex: 1 }} p="md">
    {/* Inhalt */}
  </ScrollArea>
  
  {/* Optional: Footer */}
  <Box
    p="xs"
    style={{
      borderTop: '1px solid #b7c8c1',
      backgroundColor: '#f8faf9',
    }}
  >
    <Text size="xs" c="dimmed" ta="center">
      Hilfetext
    </Text>
  </Box>
</Paper>
```

### Header mit Gradient
```tsx
<Box
  style={{
    background: 'linear-gradient(135deg, #003835 0%, #006844 100%)',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(183, 200, 193, 0.2)',
  }}
>
  <Title style={{ color: '#fff' }}>Titel</Title>
</Box>
```

### Buttons
- **Primär:** `variant="filled" color="teal"`
- **Sekundär:** `variant="outline" color="teal"`
- **Deaktiviert:** `variant="outline" color="gray" disabled`
- **Subtle:** `variant="subtle" color="gray"`

### Interaktive Elemente
```tsx
// Hover-Effekt für klickbare Wörter
style={{
  cursor: 'pointer',
  transition: 'all 0.15s ease',
}}
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = 'rgba(0, 104, 68, 0.1)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.backgroundColor = 'transparent';
}}
```

## Layout-Patterns

### Hauptlayout
```tsx
<Box style={{ minHeight: '100vh', backgroundColor: '#f5f7f6' }}>
  <Header />
  <Box p="md">
    <Stack gap="md">
      <Instructions />
      <ActionBar />
      <Grid gutter="md">
        <Grid.Col span={7}>{/* Hauptinhalt */}</Grid.Col>
        <Grid.Col span={5}>{/* Seitenleiste */}</Grid.Col>
      </Grid>
    </Stack>
  </Box>
</Box>
```

## Multi-Language (i18n)

Struktur in `src/config/i18n.ts`:
```typescript
export type UILanguage = 'de' | 'en';

export interface Translations {
  appTitle: string;
  // ... weitere Keys
}

export const translations: Record<UILanguage, Translations> = {
  de: { /* ... */ },
  en: { /* ... */ },
};

export const getTranslation = (lang: UILanguage): Translations => {
  return translations[lang] || translations.en;
};
```

## Dateistruktur

```
src/
├── components/     # React-Komponenten
├── config/         # i18n.ts, theme.ts
├── data/           # Statische Daten (z.B. Stopword-Listen)
├── hooks/          # Custom Hooks, State-Management
├── types/          # TypeScript-Definitionen
└── App.tsx         # Haupt-App
```

## Wichtige Mantine v8 Hinweise

- **Textarea autosize:** Keine `minHeight` in styles verwenden, stattdessen `minRows`/`maxRows`
- **Styles-Prop:** Verschachtelte Selektoren wie `'&:focus'` funktionieren nicht immer, besser separate Handler
- **PostCSS:** `postcss-preset-mantine` und `postcss-simple-vars` erforderlich

## Bestehende Komponenten (Stopword-Tool)

1. **Header** - mit Sprachauswahl und Menü
2. **Instructions** - Anleitungstext mit Stats-Badges
3. **CorpusPanel** - Scrollbarer Text mit klickbaren Tokens
4. **WordCloudPanel** - Interaktive Word Cloud
5. **StopwordsPanel** - Liste/Cloud-Toggle für markierte Wörter
6. **ActionBar** - Upload, Download, Standard-Listen
7. **TextInputPanel** - Textarea für Texteingabe
