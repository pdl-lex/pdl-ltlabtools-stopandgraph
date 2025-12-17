// UI Language Configuration
// Add new languages by adding a new key with translations

export type UILanguage = 'de' | 'en';

export interface Translations {
  // Header
  appTitle: string;
  languageSelect: string;
  menu: string;
  
  // Instructions
  instructionsTitle: string;
  instructionsText: string;
  
  // Corpus Panel
  corpusTitle: string;
  corpusEmpty: string;
  corpusPlaceholder: string;
  
  // Word Cloud Panel
  wordCloudTitle: string;
  wordCloudEmpty: string;
  wordCloudDescription: string;
  
  // Stopwords Panel
  stopwordsTitle: string;
  stopwordsEmpty: string;
  stopwordsDescription: string;
  viewAsList: string;
  viewAsCloud: string;
  
  // Buttons
  uploadText: string;
  selectCorpus: string;
  loadStandardList: string;
  downloadStopwords: string;
  downloadText: string;
  clearAll: string;
  
  // Language Selection for Stopwords
  stopwordLanguage: string;
  
  // Tooltips & Messages
  clickToMarkStopword: string;
  clickToRestore: string;
  wordCount: string;
  frequency: string;
  
  // Search
  searchPlaceholder: string;
  searchResults: string;
  noSearchResults: string;
  
  // Standard Lists
  standardListGerman: string;
  standardListEnglish: string;
  
  // Placeholder options
  placeholderUnderscore: string;
  placeholderDot: string;
  placeholderDash: string;
  placeholderHidden: string;
  placeholderStyle: string;
  
  // Stats
  totalWords: string;
  uniqueWords: string;
  hiddenWords: string;
}

export const translations: Record<UILanguage, Translations> = {
  de: {
    // Header
    appTitle: 'Visueller Wortausschluss',
    languageSelect: 'Sprache',
    menu: 'Menü',
    
    // Instructions
    instructionsTitle: 'Anleitung',
    instructionsText: 'Laden Sie einen Text hoch oder fügen Sie ihn ein. Klicken Sie auf Wörter im Korpus, um sie als Stopwords zu markieren. Markierte Wörter werden ausgeblendet und erscheinen in der Stopword-Liste. Klicken Sie dort auf ein Wort, um es wiederherzustellen.',
    
    // Corpus Panel
    corpusTitle: 'Korpus',
    corpusEmpty: 'Noch kein Text geladen',
    corpusPlaceholder: 'Text hier einfügen oder Datei hochladen...',
    
    // Word Cloud Panel
    wordCloudTitle: 'Word Cloud',
    wordCloudEmpty: 'Laden Sie einen Text, um die Word Cloud zu sehen',
    wordCloudDescription: 'Anzeige der häufigsten Wörter. Größe entspricht der Häufigkeit. Klicken Sie auf ein Wort, um es auszuschließen.',
    
    // Stopwords Panel
    stopwordsTitle: 'Stopwords',
    stopwordsEmpty: 'Noch keine Stopwords markiert',
    stopwordsDescription: 'Klicken Sie auf ein Wort, um es wiederherzustellen.',
    viewAsList: 'Liste',
    viewAsCloud: 'Cloud',
    
    // Buttons
    uploadText: 'Text hochladen',
    selectCorpus: 'Korpus auswählen',
    loadStandardList: 'Standard-Liste laden',
    downloadStopwords: 'Stopwords speichern',
    downloadText: 'Text speichern',
    clearAll: 'Alles zurücksetzen',
    
    // Language Selection
    stopwordLanguage: 'Stopword-Sprache',
    
    // Tooltips
    clickToMarkStopword: 'Klicken zum Ausschließen',
    clickToRestore: 'Klicken zum Wiederherstellen',
    wordCount: 'Anzahl',
    frequency: 'Häufigkeit',
    
    // Search
    searchPlaceholder: 'Suchen...',
    searchResults: 'Treffer',
    noSearchResults: 'Keine Treffer',
    
    // Standard Lists
    standardListGerman: 'Deutsch',
    standardListEnglish: 'Englisch',
    
    // Placeholder options
    placeholderUnderscore: 'Unterstrich (_)',
    placeholderDot: 'Punkt (·)',
    placeholderDash: 'Strich (—)',
    placeholderHidden: 'Versteckt',
    placeholderStyle: 'Platzhalter-Stil',
    
    // Stats
    totalWords: 'Wörter gesamt',
    uniqueWords: 'Eindeutige Wörter',
    hiddenWords: 'Ausgeblendet',
  },
  
  en: {
    // Header
    appTitle: 'Visual Word Exclusion',
    languageSelect: 'Language',
    menu: 'Menu',
    
    // Instructions
    instructionsTitle: 'Instructions',
    instructionsText: 'Upload or paste a text. Click on words in the corpus to mark them as stopwords. Marked words will be hidden and appear in the stopword list. Click on a word there to restore it.',
    
    // Corpus Panel
    corpusTitle: 'Corpus',
    corpusEmpty: 'No text loaded yet',
    corpusPlaceholder: 'Paste text here or upload a file...',
    
    // Word Cloud Panel
    wordCloudTitle: 'Word Cloud',
    wordCloudEmpty: 'Load a text to see the word cloud',
    wordCloudDescription: 'Display of most frequent words. Size corresponds to frequency. Click a word to exclude it.',
    
    // Stopwords Panel
    stopwordsTitle: 'Stopwords',
    stopwordsEmpty: 'No stopwords marked yet',
    stopwordsDescription: 'Click on a word to restore it.',
    viewAsList: 'List',
    viewAsCloud: 'Cloud',
    
    // Buttons
    uploadText: 'Upload Text',
    selectCorpus: 'Select Corpus',
    loadStandardList: 'Load Standard List',
    downloadStopwords: 'Save Stopwords',
    downloadText: 'Save Text',
    clearAll: 'Reset All',
    
    // Language Selection
    stopwordLanguage: 'Stopword Language',
    
    // Tooltips
    clickToMarkStopword: 'Click to exclude',
    clickToRestore: 'Click to restore',
    wordCount: 'Count',
    frequency: 'Frequency',
    
    // Search
    searchPlaceholder: 'Search...',
    searchResults: 'matches',
    noSearchResults: 'No matches',
    
    // Standard Lists
    standardListGerman: 'German',
    standardListEnglish: 'English',
    
    // Placeholder options
    placeholderUnderscore: 'Underscore (_)',
    placeholderDot: 'Dot (·)',
    placeholderDash: 'Dash (—)',
    placeholderHidden: 'Hidden',
    placeholderStyle: 'Placeholder Style',
    
    // Stats
    totalWords: 'Total words',
    uniqueWords: 'Unique words',
    hiddenWords: 'Hidden',
  },
};

export const getTranslation = (lang: UILanguage): Translations => {
  return translations[lang] || translations.en;
};
