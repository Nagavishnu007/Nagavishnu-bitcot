import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import ContactScreen from './page/ContactScreen';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContactScreen />
    </ThemeProvider>
  );
}

export default App;