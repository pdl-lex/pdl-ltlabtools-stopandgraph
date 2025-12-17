// Main application state hook

import { useState, useCallback, useMemo } from 'react';
import { Token, PlaceholderStyle } from '../types';
import { tokenizeText, calculateFrequencies } from './useTokenizer';
import { UILanguage } from '../config/i18n';
import { StopwordLanguage, getStandardStopwords } from '../data/stopwords';

export interface UseAppStateReturn {
  // Text state
  rawText: string;
  tokens: Token[];
  setRawText: (text: string) => void;
  
  // Stopword state
  stopwords: Set<string>;
  addStopword: (word: string) => void;
  removeStopword: (word: string) => void;
  clearStopwords: () => void;
  loadStandardStopwords: (language: StopwordLanguage) => void;
  
  // UI state
  uiLanguage: UILanguage;
  setUILanguage: (lang: UILanguage) => void;
  placeholderStyle: PlaceholderStyle;
  setPlaceholderStyle: (style: PlaceholderStyle) => void;
  stopwordViewMode: 'list' | 'cloud';
  setStopwordViewMode: (mode: 'list' | 'cloud') => void;
  
  // Computed values
  wordFrequencies: Map<string, { word: string; count: number; isStopword: boolean }>;
  visibleWordFrequencies: { word: string; count: number }[];
  stopwordList: { word: string; count: number }[];
  stats: {
    totalWords: number;
    uniqueWords: number;
    hiddenWords: number;
  };
  
  // Actions
  resetAll: () => void;
}

export const useAppState = (): UseAppStateReturn => {
  // Core state
  const [rawText, setRawTextInternal] = useState<string>('');
  const [stopwords, setStopwords] = useState<Set<string>>(new Set());
  
  // UI state
  const [uiLanguage, setUILanguage] = useState<UILanguage>('de');
  const [placeholderStyle, setPlaceholderStyle] = useState<PlaceholderStyle>('underscore');
  const [stopwordViewMode, setStopwordViewMode] = useState<'list' | 'cloud'>('list');
  
  // Tokenize text whenever rawText or stopwords change
  const tokens = useMemo(() => {
    if (!rawText) return [];
    return tokenizeText(rawText, stopwords);
  }, [rawText, stopwords]);
  
  // Calculate frequencies
  const wordFrequencies = useMemo(() => {
    return calculateFrequencies(tokens);
  }, [tokens]);
  
  // Get visible (non-stopword) frequencies for word cloud
  const visibleWordFrequencies = useMemo(() => {
    const result: { word: string; count: number }[] = [];
    wordFrequencies.forEach((value, key) => {
      if (!value.isStopword) {
        result.push({ word: value.word, count: value.count });
      }
    });
    return result.sort((a, b) => b.count - a.count);
  }, [wordFrequencies]);
  
  // Get stopword list with frequencies
  const stopwordList = useMemo(() => {
    const result: { word: string; count: number }[] = [];
    wordFrequencies.forEach((value, key) => {
      if (value.isStopword) {
        result.push({ word: value.word, count: value.count });
      }
    });
    // Also add stopwords that aren't in the text
    stopwords.forEach(sw => {
      if (!wordFrequencies.has(sw)) {
        result.push({ word: sw, count: 0 });
      }
    });
    return result.sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
  }, [wordFrequencies, stopwords]);
  
  // Calculate stats
  const stats = useMemo(() => {
    const wordTokens = tokens.filter(t => t.type !== 'whitespace');
    const hiddenTokens = wordTokens.filter(t => t.isStopword);
    return {
      totalWords: wordTokens.length,
      uniqueWords: wordFrequencies.size,
      hiddenWords: hiddenTokens.length,
    };
  }, [tokens, wordFrequencies]);
  
  // Actions
  const setRawText = useCallback((text: string) => {
    setRawTextInternal(text);
  }, []);
  
  const addStopword = useCallback((word: string) => {
    const normalized = word.toLowerCase();
    setStopwords(prev => {
      const next = new Set(prev);
      next.add(normalized);
      return next;
    });
  }, []);
  
  const removeStopword = useCallback((word: string) => {
    const normalized = word.toLowerCase();
    setStopwords(prev => {
      const next = new Set(prev);
      next.delete(normalized);
      return next;
    });
  }, []);
  
  const clearStopwords = useCallback(() => {
    setStopwords(new Set());
  }, []);
  
  const loadStandardStopwords = useCallback((language: StopwordLanguage) => {
    const standardList = getStandardStopwords(language);
    setStopwords(prev => {
      const next = new Set(prev);
      standardList.forEach(word => next.add(word.toLowerCase()));
      return next;
    });
  }, []);
  
  const resetAll = useCallback(() => {
    setRawTextInternal('');
    setStopwords(new Set());
  }, []);
  
  return {
    rawText,
    tokens,
    setRawText,
    stopwords,
    addStopword,
    removeStopword,
    clearStopwords,
    loadStandardStopwords,
    uiLanguage,
    setUILanguage,
    placeholderStyle,
    setPlaceholderStyle,
    stopwordViewMode,
    setStopwordViewMode,
    wordFrequencies,
    visibleWordFrequencies,
    stopwordList,
    stats,
    resetAll,
  };
};
