// Mantine Theme Configuration with Evergreen Color Scheme

import { createTheme, MantineColorsTuple } from '@mantine/core';

// Custom Evergreen color palette
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

export const theme = createTheme({
  // Color scheme
  primaryColor: 'evergreen',
  colors: {
    evergreen,
  },
  
  // Typography
  fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontFamilyMonospace: '"Noto Sans Mono", ui-monospace, monospace',
  headings: {
    fontFamily: '"Noto Serif", Georgia, "Times New Roman", serif',
    fontWeight: '600',
  },
  
  // Radius
  defaultRadius: 'sm',
  
  // Shadows - subtle and professional
  shadows: {
    xs: '0 1px 2px rgba(0, 56, 53, 0.05)',
    sm: '0 1px 3px rgba(0, 56, 53, 0.08)',
    md: '0 4px 6px rgba(0, 56, 53, 0.1)',
    lg: '0 10px 15px rgba(0, 56, 53, 0.1)',
    xl: '0 20px 25px rgba(0, 56, 53, 0.1)',
  },
  
  // Component-specific styles
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
  },
});
