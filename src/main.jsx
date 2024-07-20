import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
});

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);