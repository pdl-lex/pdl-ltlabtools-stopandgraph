// Instructions Panel Component

import { Paper, Text, Group, Badge, Box } from '@mantine/core';
import { UILanguage, getTranslation } from '../config/i18n';

interface InstructionsProps {
  uiLanguage: UILanguage;
  stats: {
    totalWords: number;
    uniqueWords: number;
    hiddenWords: number;
  };
}

export const Instructions = ({ uiLanguage, stats }: InstructionsProps) => {
  const t = getTranslation(uiLanguage);
  
  return (
    <Paper
      p="md"
      style={{
        backgroundColor: '#f8faf9',
        border: '1px solid #b7c8c1',
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Box style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
            {t.instructionsText}
          </Text>
        </Box>
        
        {stats.totalWords > 0 && (
          <Group gap="xs" wrap="nowrap">
            <Badge 
              variant="light" 
              color="gray"
              size="lg"
              styles={{ label: { fontWeight: 500 } }}
            >
              {t.totalWords}: {stats.totalWords.toLocaleString()}
            </Badge>
            <Badge 
              variant="light" 
              color="teal"
              size="lg"
              styles={{ label: { fontWeight: 500 } }}
            >
              {t.uniqueWords}: {stats.uniqueWords.toLocaleString()}
            </Badge>
            <Badge 
              variant="filled" 
              color="red"
              size="lg"
              styles={{ label: { fontWeight: 500 } }}
            >
              {t.hiddenWords}: {stats.hiddenWords.toLocaleString()}
            </Badge>
          </Group>
        )}
      </Group>
    </Paper>
  );
};
