import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: '#3f51b5',
  secondary: '#f50057',
  background: '#f4f6f8',
  white: '#ffffff',
  lightGray: '#f9f9f9',
  borderGray: '#eeeeee',
  cardFooterBg: '#fafafa',
  modalHeaderBg: '#f0f4f8',
  shadowLight: 'rgba(0,0,0,0.05)',

  // Card UI
  cardBg: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  cardBorder: 'rgba(255,255,255,0.8)',
  cardShadow: '0 8px 24px rgba(149, 157, 165, 0.15)',
  cardShadowHover: '0 16px 32px rgba(149, 157, 165, 0.25)',
  cardText: '#1a1a1a',
  cardSubText: '#555',
  avatarText: '#333',
  avatarShadow: '0 4px 14px rgba(0,0,0,0.12)',
  dividerColor: 'rgba(0,0,0,0.08)',

  // Action icon colors
  viewColor: '#11998e',
  viewBg: 'rgba(17, 153, 142, 0.08)',
  viewBgHover: 'rgba(17, 153, 142, 0.2)',
  editColor: '#f5a623',
  editBg: 'rgba(245, 166, 35, 0.08)',
  editBgHover: 'rgba(245, 166, 35, 0.2)',
  deleteColor: '#ff4b2b',
  deleteBg: 'rgba(255, 75, 43, 0.08)',
  deleteBgHover: 'rgba(255, 75, 43, 0.2)',

  // Icon badge backgrounds
  phoneBadgeBg: 'rgba(63, 81, 181, 0.1)',
  emailBadgeBg: 'rgba(245, 0, 87, 0.1)',

  // Card header gradients
  gradients: [
    'linear-gradient(135deg, #3f51b5 0%, #5a55ae 100%)',
    'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ]
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
    },
    custom: {
      ...colors
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
