// Stopwords Panel - displays marked stopwords as list or cloud

import { 
  Paper, 
  Title, 
  Text, 
  Box, 
  ScrollArea, 
  Tooltip, 
  Group,
  SegmentedControl,
  Table,
  Badge,
  TextInput,
  ActionIcon,
  Button,
  Menu,
} from '@mantine/core';
import { UILanguage, getTranslation } from '../config/i18n';
import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { StopwordLanguage } from '../data/stopwords';

interface StopwordsPanelProps {
  stopwords: { word: string; count: number }[];
  onWordClick: (word: string) => void;
  viewMode: 'list' | 'cloud';
  setViewMode: (mode: 'list' | 'cloud') => void;
  onLoadStandardList: (language: StopwordLanguage) => void;
  onDownloadStopwords: () => void;
  uiLanguage: UILanguage;
}

export const StopwordsPanel = ({
  stopwords,
  onWordClick,
  viewMode,
  setViewMode,
  onLoadStandardList,
  onDownloadStopwords,
  uiLanguage,
}: StopwordsPanelProps) => {
  const t = getTranslation(uiLanguage);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const matchRefs = useRef<Map<number, HTMLElement>>(new Map());
  
  // Filter and find matching stopwords
  const { filteredStopwords, matchingIndices } = useMemo(() => {
    const sorted = [...stopwords].sort((a, b) => a.word.localeCompare(b.word));
    
    if (!searchQuery.trim()) {
      return { filteredStopwords: sorted, matchingIndices: [] as number[] };
    }
    
    const query = searchQuery.toLowerCase();
    const indices: number[] = [];
    sorted.forEach((item, index) => {
      if (item.word.toLowerCase().includes(query)) {
        indices.push(index);
      }
    });
    
    return { filteredStopwords: sorted, matchingIndices: indices };
  }, [stopwords, searchQuery]);
  
  // Reset match index when search changes
  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [searchQuery]);
  
  // Scroll to current match
  useEffect(() => {
    if (matchingIndices.length > 0 && matchRefs.current.has(matchingIndices[currentMatchIndex])) {
      const element = matchRefs.current.get(matchingIndices[currentMatchIndex]);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentMatchIndex, matchingIndices]);
  
  const goToNextMatch = useCallback(() => {
    if (matchingIndices.length > 0) {
      setCurrentMatchIndex((prev) => (prev + 1) % matchingIndices.length);
    }
  }, [matchingIndices.length]);
  
  const goToPrevMatch = useCallback(() => {
    if (matchingIndices.length > 0) {
      setCurrentMatchIndex((prev) => (prev - 1 + matchingIndices.length) % matchingIndices.length);
    }
  }, [matchingIndices.length]);
  
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        goToPrevMatch();
      } else {
        goToNextMatch();
      }
    }
  }, [goToNextMatch, goToPrevMatch]);
  
  // Cloud view rendering
  const cloudView = useMemo(() => {
    if (filteredStopwords.length === 0) return null;
    
    matchRefs.current.clear();
    
    const maxCount = Math.max(...filteredStopwords.map(w => w.count), 1);
    const minCount = Math.min(...filteredStopwords.filter(w => w.count > 0).map(w => w.count), 1);
    const range = maxCount - minCount || 1;
    
    return filteredStopwords.map((item, index) => {
      const normalizedCount = item.count > 0 
        ? (item.count - minCount) / range 
        : 0;
      const fontSize = 0.7 + normalizedCount * 1;
      const opacity = item.count > 0 ? 0.7 + normalizedCount * 0.3 : 0.5;
      
      const isMatch = matchingIndices.includes(index);
      const isCurrentMatch = isMatch && matchingIndices[currentMatchIndex] === index;
      
      return (
        <Tooltip
          key={`${item.word}-${index}`}
          label={`${item.word}: ${item.count}× - ${t.clickToRestore}`}
          position="top"
          withArrow
        >
          <span
            ref={isMatch ? (el) => { if (el) matchRefs.current.set(index, el); } : undefined}
            onClick={() => onWordClick(item.word.toLowerCase())}
            style={{
              fontSize: `${fontSize}rem`,
              color: isCurrentMatch ? '#006844' : '#c92a2a',
              opacity: isCurrentMatch ? 1 : opacity,
              cursor: 'pointer',
              padding: '0.15em 0.3em',
              display: 'inline-block',
              transition: 'all 0.15s ease',
              textDecoration: isCurrentMatch ? 'none' : 'line-through',
              textDecorationColor: 'rgba(201, 42, 42, 0.4)',
              backgroundColor: isCurrentMatch 
                ? 'rgba(0, 104, 68, 0.2)' 
                : isMatch 
                  ? 'rgba(0, 104, 68, 0.1)' 
                  : 'transparent',
              borderRadius: '3px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'none';
              e.currentTarget.style.color = '#006844';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = isCurrentMatch ? 'none' : 'line-through';
              e.currentTarget.style.color = isCurrentMatch ? '#006844' : '#c92a2a';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {item.word}
          </span>
        </Tooltip>
      );
    });
  }, [filteredStopwords, matchingIndices, currentMatchIndex, onWordClick, t]);
  
  // List view rendering
  const listView = useMemo(() => {
    if (filteredStopwords.length === 0) return null;
    
    matchRefs.current.clear();
    
    return (
      <Table 
        striped 
        highlightOnHover
        style={{ fontSize: '0.85rem' }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Word</Table.Th>
            <Table.Th style={{ width: 80, textAlign: 'right' }}>{t.frequency}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredStopwords.map((item, index) => {
            const isMatch = matchingIndices.includes(index);
            const isCurrentMatch = isMatch && matchingIndices[currentMatchIndex] === index;
            
            return (
              <Table.Tr 
                key={`${item.word}-${index}`}
                ref={isMatch ? (el) => { if (el) matchRefs.current.set(index, el); } : undefined}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: isCurrentMatch 
                    ? 'rgba(0, 104, 68, 0.15)' 
                    : isMatch 
                      ? 'rgba(0, 104, 68, 0.05)' 
                      : undefined,
                }}
                onClick={() => onWordClick(item.word.toLowerCase())}
              >
                <Table.Td>
                  <Text 
                    size="sm" 
                    style={{ 
                      color: isCurrentMatch ? '#006844' : '#c92a2a',
                      textDecoration: isCurrentMatch ? 'none' : 'line-through',
                      textDecorationColor: 'rgba(201, 42, 42, 0.4)',
                      fontWeight: isCurrentMatch ? 600 : 400,
                    }}
                  >
                    {item.word}
                  </Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'right' }}>
                  <Badge 
                    size="sm" 
                    variant="light" 
                    color={item.count > 0 ? 'gray' : 'red'}
                  >
                    {item.count}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    );
  }, [filteredStopwords, matchingIndices, currentMatchIndex, onWordClick, t]);
  
  return (
    <Paper
      shadow="sm"
      radius="md"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #b7c8c1',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        p="sm"
        style={{
          borderBottom: '1px solid #b7c8c1',
          backgroundColor: '#f8faf9',
          borderRadius: 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
        }}
      >
        <Group justify="space-between" align="center" mb="xs">
          <Group gap="xs">
            <Title order={4} style={{ color: '#003835' }}>
              {t.stopwordsTitle}
            </Title>
            {stopwords.length > 0 && (
              <Badge size="sm" variant="filled" color="red">
                {stopwords.length}
              </Badge>
            )}
          </Group>
          
          {/* Action buttons */}
          <Group gap="xs">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button 
                  variant="subtle" 
                  color="teal" 
                  size="xs"
                  leftSection={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                  }
                >
                  {t.loadStandardList}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{t.stopwordLanguage}</Menu.Label>
                <Menu.Item onClick={() => onLoadStandardList('de')}>
                  🇩🇪 {t.standardListGerman}
                </Menu.Item>
                <Menu.Item onClick={() => onLoadStandardList('en')}>
                  🇬🇧 {t.standardListEnglish}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            
            <Button 
              variant="subtle" 
              color="gray" 
              size="xs"
              disabled={stopwords.length === 0}
              onClick={onDownloadStopwords}
              leftSection={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              }
            >
              {t.downloadStopwords}
            </Button>
          </Group>
        </Group>
        
        {/* Search and view toggle row */}
        <Group gap="sm">
          {/* Search field */}
          <TextInput
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            onKeyDown={handleSearchKeyDown}
            size="xs"
            style={{ flex: 1 }}
            rightSection={
              matchingIndices.length > 0 ? (
                <Badge size="xs" variant="light" color="teal">
                  {currentMatchIndex + 1}/{matchingIndices.length}
                </Badge>
              ) : searchQuery ? (
                <Badge size="xs" variant="light" color="gray">0</Badge>
              ) : null
            }
            rightSectionWidth={60}
            leftSection={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            }
          />
          
          {/* Navigation arrows */}
          <Group gap={4}>
            <ActionIcon 
              variant="subtle" 
              color="teal" 
              size="sm"
              disabled={matchingIndices.length === 0}
              onClick={goToPrevMatch}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </ActionIcon>
            <ActionIcon 
              variant="subtle" 
              color="teal" 
              size="sm"
              disabled={matchingIndices.length === 0}
              onClick={goToNextMatch}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </ActionIcon>
          </Group>
          
          {/* View mode toggle */}
          <SegmentedControl
            size="xs"
            value={viewMode}
            onChange={(value) => setViewMode(value as 'list' | 'cloud')}
            data={[
              { label: t.viewAsList, value: 'list' },
              { label: t.viewAsCloud, value: 'cloud' },
            ]}
          />
        </Group>
      </Box>
      
      {/* Content */}
      <ScrollArea 
        style={{ flex: 1 }}
        p={viewMode === 'cloud' ? 'md' : 0}
        type="auto"
        offsetScrollbars
      >
        {stopwords.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl" size="sm">
            {t.stopwordsEmpty}
          </Text>
        ) : viewMode === 'cloud' ? (
          <Box style={{ textAlign: 'center', lineHeight: 1.8 }}>
            {cloudView}
          </Box>
        ) : (
          listView
        )}
      </ScrollArea>
    </Paper>
  );
};
