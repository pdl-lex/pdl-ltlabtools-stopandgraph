// Header Component with title, language selector, and menu

import { 
  Group, 
  Title, 
  Select, 
  Menu, 
  ActionIcon,
  Box,
} from '@mantine/core';
import { UILanguage, getTranslation } from '../config/i18n';

interface HeaderProps {
  uiLanguage: UILanguage;
  setUILanguage: (lang: UILanguage) => void;
  onReset: () => void;
}

export const Header = ({
  uiLanguage,
  setUILanguage,
  onReset,
}: HeaderProps) => {
  const t = getTranslation(uiLanguage);
  
  const languageOptions = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
  ];
  
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #003835 0%, #006844 100%)',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(183, 200, 193, 0.2)',
      }}
    >
      <Group justify="space-between" align="center">
        <Title 
          order={1} 
          style={{ 
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          {t.appTitle}
        </Title>
        
        <Group gap="md">
          {/* UI Language */}
          <Select
            size="sm"
            label={t.languageSelect}
            value={uiLanguage}
            onChange={(value) => setUILanguage(value as UILanguage)}
            data={languageOptions}
            styles={{
              label: { color: '#b7c8c1', fontSize: '0.75rem', marginBottom: 4 },
              input: { 
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(183, 200, 193, 0.3)',
                color: '#fff',
              },
            }}
            w={120}
          />
          
          {/* Menu */}
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon 
                variant="subtle" 
                size="lg"
                style={{ 
                  color: '#b7c8c1',
                  marginTop: '1.25rem',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </ActionIcon>
            </Menu.Target>
            
            <Menu.Dropdown>
              <Menu.Label>{t.menu}</Menu.Label>
              <Menu.Item 
                color="red"
                onClick={onReset}
                leftSection={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                }
              >
                {t.clearAll}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Box>
  );
};
