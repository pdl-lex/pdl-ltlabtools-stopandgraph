// Main Application Component

import { useState, useMemo, useCallback } from 'react';
import { MantineProvider, Box, Grid, Stack, SegmentedControl, Group } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from './config/theme';
import { useAppState } from './hooks/useAppState';
import { generateDownloadText } from './hooks/useTokenizer';
import { 
  buildCooccurrenceGraph, 
  filterGraph, 
  getGraphStats,
  detectPunctuation,
} from './hooks/useGraphBuilder';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { CorpusPanel } from './components/CorpusPanel';
import { TextInputPanel } from './components/TextInputPanel';
import { WordCloudPanel } from './components/WordCloudPanel';
import { StopwordsPanel } from './components/StopwordsPanel';
import { GraphSettingsPanel } from './components/GraphSettingsPanel';
import { ForceGraph } from './components/ForceGraph';
import { StopwordLanguage } from './data/stopwords';
import { getGraphTranslation } from './config/i18n-graph';
import { 
  NGramConfig, 
  GraphDisplayConfig, 
  GraphData,
  defaultNGramConfig,
  defaultGraphDisplayConfig,
} from './types/graph';

type ViewMode = 'corpus' | 'graph';

function App() {
  const {
    rawText,
    tokens,
    setRawText,
    stopwords,
    addStopword,
    removeStopword,
    loadStandardStopwords,
    uiLanguage,
    setUILanguage,
    placeholderStyle,
    setPlaceholderStyle,
    stopwordViewMode,
    setStopwordViewMode,
    visibleWordFrequencies,
    stopwordList,
    stats,
    resetAll,
  } = useAppState();
  
  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>('corpus');
  
  // Graph configuration state
  const [ngramConfig, setNgramConfig] = useState<NGramConfig>(defaultNGramConfig);
  const [displayConfig, setDisplayConfig] = useState<GraphDisplayConfig>(defaultGraphDisplayConfig);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  
  // Get graph translations
  const gt = getGraphTranslation(uiLanguage);
  
  // Detect available punctuation in text
  const availablePunctuation = useMemo(() => {
    return detectPunctuation(tokens);
  }, [tokens]);
  
  // Generate graph when requested
  const handleGenerateGraph = useCallback(() => {
    const fullGraph = buildCooccurrenceGraph(tokens, ngramConfig);
    setGraphData(fullGraph);
    setViewMode('graph');
  }, [tokens, ngramConfig]);
  
  // Filter graph based on display config
  const filteredGraph = useMemo(() => {
    return filterGraph(
      graphData,
      displayConfig.minEdgeWeight,
      displayConfig.minNodeFrequency
    );
  }, [graphData, displayConfig.minEdgeWeight, displayConfig.minNodeFrequency]);
  
  // Get graph statistics
  const graphStats = useMemo(() => {
    if (filteredGraph.nodes.length === 0) return null;
    return getGraphStats(filteredGraph);
  }, [filteredGraph]);
  
  // Handle word click in corpus - toggle stopword status
  const handleCorpusWordClick = (word: string) => {
    const normalized = word.toLowerCase();
    if (stopwords.has(normalized)) {
      removeStopword(normalized);
    } else {
      addStopword(normalized);
    }
  };
  
  // Handle word click in word cloud - add to stopwords
  const handleCloudWordClick = (word: string) => {
    addStopword(word);
  };
  
  // Handle word click in stopwords panel - remove from stopwords
  const handleStopwordClick = (word: string) => {
    removeStopword(word);
  };
  
  // Handle file upload
  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setRawText(text);
      // Reset graph when new text is loaded
      setGraphData({ nodes: [], edges: [] });
    };
    reader.readAsText(file);
  };
  
  // Download stopwords as text file
  const handleDownloadStopwords = () => {
    const content = stopwordList
      .map(item => item.word)
      .sort()
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stopwords.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Download cleaned text
  const handleDownloadText = () => {
    const cleanedText = generateDownloadText(tokens);
    
    const blob = new Blob([cleanedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Handle full reset
  const handleReset = () => {
    resetAll();
    setGraphData({ nodes: [], edges: [] });
    setViewMode('corpus');
  };
  
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Box style={{ minHeight: '100vh', backgroundColor: '#f5f7f6' }}>
        {/* Header */}
        <Header
          uiLanguage={uiLanguage}
          setUILanguage={setUILanguage}
          onReset={handleReset}
        />
        
        {/* Main Content */}
        <Box p="md">
          <Stack gap="md">
            {/* Instructions with View Toggle */}
            <Group justify="space-between" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Instructions uiLanguage={uiLanguage} stats={stats} />
              </Box>
              
              {/* View Mode Toggle */}
              {rawText && (
                <SegmentedControl
                  value={viewMode}
                  onChange={(value) => setViewMode(value as ViewMode)}
                  data={[
                    { label: gt.showCorpus, value: 'corpus' },
                    { label: gt.showGraph, value: 'graph' },
                  ]}
                  color="teal"
                />
              )}
            </Group>
            
            {/* Main Content Grid */}
            <Grid gutter="md">
              {/* Left Panel - Corpus or Graph */}
              <Grid.Col span={7}>
                <Box style={{ height: 'calc(100vh - 220px)' }}>
                  {viewMode === 'corpus' ? (
                    rawText ? (
                      <CorpusPanel
                        tokens={tokens}
                        placeholderStyle={placeholderStyle}
                        onPlaceholderStyleChange={setPlaceholderStyle}
                        onWordClick={handleCorpusWordClick}
                        onFileUpload={handleFileUpload}
                        onDownloadText={handleDownloadText}
                        hasText={rawText.length > 0}
                        uiLanguage={uiLanguage}
                      />
                    ) : (
                      <TextInputPanel
                        value={rawText}
                        onChange={setRawText}
                        onFileUpload={handleFileUpload}
                        uiLanguage={uiLanguage}
                      />
                    )
                  ) : (
                    <ForceGraph
                      data={filteredGraph}
                      displayConfig={displayConfig}
                      uiLanguage={uiLanguage}
                    />
                  )}
                </Box>
              </Grid.Col>
              
              {/* Right Panel - depends on view mode */}
              <Grid.Col span={5}>
                <Stack gap="md" style={{ height: 'calc(100vh - 220px)' }}>
                  {viewMode === 'corpus' ? (
                    <>
                      {/* Word Cloud */}
                      <Box style={{ flex: 1, minHeight: 0 }}>
                        <WordCloudPanel
                          words={visibleWordFrequencies}
                          onWordClick={handleCloudWordClick}
                          uiLanguage={uiLanguage}
                        />
                      </Box>
                      
                      {/* Stopwords */}
                      <Box style={{ flex: 1, minHeight: 0 }}>
                        <StopwordsPanel
                          stopwords={stopwordList}
                          onWordClick={handleStopwordClick}
                          viewMode={stopwordViewMode}
                          setViewMode={setStopwordViewMode}
                          onLoadStandardList={(lang: StopwordLanguage) => loadStandardStopwords(lang)}
                          onDownloadStopwords={handleDownloadStopwords}
                          uiLanguage={uiLanguage}
                        />
                      </Box>
                    </>
                  ) : (
                    /* Graph Settings */
                    <Box style={{ height: '100%' }}>
                      <GraphSettingsPanel
                        uiLanguage={uiLanguage}
                        ngramConfig={ngramConfig}
                        displayConfig={displayConfig}
                        availablePunctuation={availablePunctuation}
                        graphStats={graphStats}
                        onNgramConfigChange={setNgramConfig}
                        onDisplayConfigChange={setDisplayConfig}
                        onGenerateGraph={handleGenerateGraph}
                        hasTokens={tokens.length > 0}
                      />
                    </Box>
                  )}
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
