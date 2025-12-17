// Text Input Panel - for pasting text directly

import { Paper, Textarea, Box, Title, Group, Button, FileButton } from '@mantine/core';
import { UILanguage, getTranslation } from '../config/i18n';

interface TextInputPanelProps {
  value: string;
  onChange: (value: string) => void;
  onFileUpload: (file: File | null) => void;
  uiLanguage: UILanguage;
}

export const TextInputPanel = ({
  value,
  onChange,
  onFileUpload,
  uiLanguage,
}: TextInputPanelProps) => {
  const t = getTranslation(uiLanguage);
  
  // Only show if no text loaded yet
  if (value) return null;
  
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
        <Group justify="space-between" align="center">
          <Title order={4} style={{ color: '#003835' }}>
            {t.corpusTitle}
          </Title>
          
          <Group gap="xs">
            <FileButton onChange={onFileUpload} accept=".txt,text/plain">
              {(props) => (
                <Button {...props} variant="subtle" color="teal" size="xs" leftSection={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                }>
                  {t.uploadText}
                </Button>
              )}
            </FileButton>
            
            <Button 
              variant="subtle" 
              color="gray" 
              size="xs" 
              disabled
              leftSection={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
              }
            >
              {t.selectCorpus}
            </Button>
          </Group>
        </Group>
      </Box>
      
      <Box p="md" style={{ flex: 1 }}>
        <Textarea
          placeholder={t.corpusPlaceholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          minRows={20}
          maxRows={30}
          autosize
          styles={{
            root: {
              height: '100%',
            },
            wrapper: {
              height: '100%',
            },
            input: {
              fontFamily: '"Noto Serif", Georgia, serif',
              fontSize: '1rem',
              lineHeight: 1.8,
              border: '1px dashed #b7c8c1',
              backgroundColor: '#fafbfa',
            },
          }}
        />
      </Box>
    </Paper>
  );
};
