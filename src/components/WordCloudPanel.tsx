// Word Cloud Panel - displays frequent words with size based on frequency

import { Paper, Title, Text, Box, ScrollArea, Tooltip, Group } from '@mantine/core';
import { UILanguage, getTranslation } from '../config/i18n';
import { useMemo } from 'react';

interface WordCloudPanelProps {
  words: { word: string; count: number }[];
  onWordClick: (word: string) => void;
  uiLanguage: UILanguage;
  maxWords?: number;
}

export const WordCloudPanel = ({
  words,
  onWordClick,
  uiLanguage,
  maxWords = 100,
}: WordCloudPanelProps) => {
  const t = getTranslation(uiLanguage);
  
  // Calculate font sizes based on frequency
  const wordElements = useMemo(() => {
    if (words.length === 0) {
      return null;
    }
    
    const topWords = words.slice(0, maxWords);
    const maxCount = Math.max(...topWords.map(w => w.count));
    const minCount = Math.min(...topWords.map(w => w.count));
    const range = maxCount - minCount || 1;
    
    // Shuffle words for more organic cloud appearance
    const shuffled = [...topWords].sort(() => Math.random() - 0.5);
    
    return shuffled.map((item, index) => {
      // Calculate font size (0.75rem to 2.5rem based on frequency)
      const normalizedCount = (item.count - minCount) / range;
      const fontSize = 0.75 + normalizedCount * 1.75;
      
      // Calculate opacity (0.6 to 1 based on frequency)
      const opacity = 0.6 + normalizedCount * 0.4;
      
      // Alternate colors for visual interest
      const colors = ['#003835', '#006844', '#005a3b', '#004c32'];
      const color = colors[index % colors.length];
      
      return (
        <Tooltip
          key={`${item.word}-${index}`}
          label={`${item.word}: ${item.count}× - ${t.clickToMarkStopword}`}
          position="top"
          withArrow
        >
          <span
            onClick={() => onWordClick(item.word.toLowerCase())}
            style={{
              fontSize: `${fontSize}rem`,
              color,
              opacity,
              cursor: 'pointer',
              padding: '0.2em 0.4em',
              display: 'inline-block',
              transition: 'all 0.15s ease',
              fontWeight: normalizedCount > 0.5 ? 600 : 400,
              lineHeight: 1.2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = String(opacity);
            }}
          >
            {item.word}
          </span>
        </Tooltip>
      );
    });
  }, [words, maxWords, onWordClick, t]);
  
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
      <Box
        p="sm"
        style={{
          borderBottom: '1px solid #b7c8c1',
          backgroundColor: '#f8faf9',
          borderRadius: 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0',
        }}
      >
        <Title order={4} style={{ color: '#003835' }}>
          {t.wordCloudTitle}
        </Title>
      </Box>
      
      <ScrollArea 
        style={{ flex: 1 }}
        p="md"
        type="auto"
        offsetScrollbars
      >
        {words.length === 0 ? (
          <Text c="dimmed" ta="center" py="xl" size="sm">
            {t.wordCloudEmpty}
          </Text>
        ) : (
          <Box
            style={{
              textAlign: 'center',
              lineHeight: 2,
            }}
          >
            {wordElements}
          </Box>
        )}
      </ScrollArea>
      
      {words.length > 0 && (
        <Box
          p="xs"
          style={{
            borderTop: '1px solid #b7c8c1',
            backgroundColor: '#f8faf9',
          }}
        >
          <Text size="xs" c="dimmed" ta="center">
            {t.wordCloudDescription}
          </Text>
        </Box>
      )}
    </Paper>
  );
};
