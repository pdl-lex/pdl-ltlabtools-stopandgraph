// Graph-specific translations - to be merged with main i18n

import { UILanguage } from './i18n';

export interface GraphTranslations {
  // Panel titles
  graphTitle: string;
  graphSettings: string;
  graphEmpty: string;
  
  // N-gram settings
  windowSize: string;
  windowSizeHelp: string;
  
  // Edge weighting
  edgeWeighting: string;
  weightingUniform: string;
  weightingDistance: string;
  uniformValue: string;
  baseValue: string;
  bonusRange: string;
  bonusValue: string;
  bonusRangeHelp: string;
  
  // Sentence boundaries
  sentenceBoundaries: string;
  sentenceBoundariesHelp: string;
  noPunctuationFound: string;
  
  // Display filters
  displayFilters: string;
  minEdgeWeight: string;
  minNodeFrequency: string;
  showLabels: string;
  
  // Stats
  graphStats: string;
  nodes: string;
  edges: string;
  maxFrequency: string;
  maxWeight: string;
  avgWeight: string;
  
  // Actions
  generateGraph: string;
  resetView: string;
  downloadGraph: string;
  downloadSVG: string;
  downloadJSON: string;
  
  // Tooltips
  nodeTooltip: string;
  edgeTooltip: string;
  
  // View toggle
  showCorpus: string;
  showGraph: string;
}

export const graphTranslations: Record<UILanguage, GraphTranslations> = {
  de: {
    // Panel titles
    graphTitle: 'Wissensgraph',
    graphSettings: 'Graph-Einstellungen',
    graphEmpty: 'Laden Sie einen Text und entfernen Sie Stopwords, um den Graphen zu generieren.',
    
    // N-gram settings
    windowSize: 'Fenstergröße (n)',
    windowSizeHelp: 'Anzahl der Wörter im Kontextfenster',
    
    // Edge weighting
    edgeWeighting: 'Kantengewichtung',
    weightingUniform: 'Einheitlich',
    weightingDistance: 'Distanzbasiert',
    uniformValue: 'Gewicht',
    baseValue: 'Basisgewicht',
    bonusRange: 'Bonus-Distanz',
    bonusValue: 'Bonus-Wert',
    bonusRangeHelp: 'Wörter innerhalb dieser Distanz erhalten Bonusgewicht',
    
    // Sentence boundaries
    sentenceBoundaries: 'Satzgrenzen',
    sentenceBoundariesHelp: 'Bei diesen Zeichen wird das Fenster zurückgesetzt',
    noPunctuationFound: 'Keine Satzzeichen im Text gefunden',
    
    // Display filters
    displayFilters: 'Anzeigefilter',
    minEdgeWeight: 'Min. Kantengewicht',
    minNodeFrequency: 'Min. Worthäufigkeit',
    showLabels: 'Labels anzeigen',
    
    // Stats
    graphStats: 'Statistiken',
    nodes: 'Knoten',
    edges: 'Kanten',
    maxFrequency: 'Max. Häufigkeit',
    maxWeight: 'Max. Gewicht',
    avgWeight: 'Ø Gewicht',
    
    // Actions
    generateGraph: 'Graph generieren',
    resetView: 'Ansicht zurücksetzen',
    downloadGraph: 'Graph speichern',
    downloadSVG: 'Als SVG',
    downloadJSON: 'Als JSON',
    
    // Tooltips
    nodeTooltip: 'Häufigkeit',
    edgeTooltip: 'Gewicht',
    
    // View toggle
    showCorpus: 'Korpus',
    showGraph: 'Graph',
  },
  
  en: {
    // Panel titles
    graphTitle: 'Knowledge Graph',
    graphSettings: 'Graph Settings',
    graphEmpty: 'Load a text and remove stopwords to generate the graph.',
    
    // N-gram settings
    windowSize: 'Window Size (n)',
    windowSizeHelp: 'Number of words in the context window',
    
    // Edge weighting
    edgeWeighting: 'Edge Weighting',
    weightingUniform: 'Uniform',
    weightingDistance: 'Distance-based',
    uniformValue: 'Weight',
    baseValue: 'Base Weight',
    bonusRange: 'Bonus Distance',
    bonusValue: 'Bonus Value',
    bonusRangeHelp: 'Words within this distance receive bonus weight',
    
    // Sentence boundaries
    sentenceBoundaries: 'Sentence Boundaries',
    sentenceBoundariesHelp: 'Window resets at these characters',
    noPunctuationFound: 'No punctuation found in text',
    
    // Display filters
    displayFilters: 'Display Filters',
    minEdgeWeight: 'Min. Edge Weight',
    minNodeFrequency: 'Min. Word Frequency',
    showLabels: 'Show Labels',
    
    // Stats
    graphStats: 'Statistics',
    nodes: 'Nodes',
    edges: 'Edges',
    maxFrequency: 'Max. Frequency',
    maxWeight: 'Max. Weight',
    avgWeight: 'Avg. Weight',
    
    // Actions
    generateGraph: 'Generate Graph',
    resetView: 'Reset View',
    downloadGraph: 'Save Graph',
    downloadSVG: 'As SVG',
    downloadJSON: 'As JSON',
    
    // Tooltips
    nodeTooltip: 'Frequency',
    edgeTooltip: 'Weight',
    
    // View toggle
    showCorpus: 'Corpus',
    showGraph: 'Graph',
  },
};

export const getGraphTranslation = (lang: UILanguage): GraphTranslations => {
  return graphTranslations[lang] || graphTranslations.en;
};
