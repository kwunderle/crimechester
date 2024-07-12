import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  
});

const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export default responsiveDarkTheme;