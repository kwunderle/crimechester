import React from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { GlobalStyles } from "@mui/material";

const globalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      html: {
        fontFamily: "'Nunito', sans-serif",
        fontSize: "calc(.85rem + .9vw)",
        color: "#feefce",
      },
      body: {
        minHeight: "100vh",
        backgroundColor: "black",
      },
      ".App": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      },
      section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      /* New SVG Map Styles */
      ".hotel-group": {
        opacity: 0,
        transition: "opacity 0.3s",
      },
      ".hotel:hover .hotel-group": {
        opacity: 1,
      },
      ".hotel-text": {
        fontSize: "37px",
        fill: "black",
        fontWeight: "bold",
      },
      ".hotel-shape": {
        fill: "rgba(255, 255, 255, 0.5)",
        stroke: "white",
        strokeWidth: 5,
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flexGrow: 1,
        paddingBottom: '1rem',
      },
      '.instructions': {
        fontSize: '0.75rem',
        borderRadius: '0.5rem',
        background: '#000',
        color: '#fff',
        padding: '0.25rem',
        position: 'relative',
        bottom: '-10px',
      },
      '.instructions > svg': {
        marginRight: '0.25rem',
      },
      '.offscreen': {
        position: 'absolute',
        left: '-9999px',
      },
      '.hide': {
        display: 'none',
      },
      '.valid': {
        color: 'limegreen',
        marginLeft: '0.25rem',
      },
      '.invalid': {
        color: 'red',
        marginLeft: '0.25rem',
      },
      '.errmsg': {
        backgroundColor: 'lightpink',
        color: 'firebrick',
        fontWeight: 'bold',
        padding: '0.5rem',
        marginBottom: '0.5rem',
      },
      '.line': {
        display: 'inline-block',
      },
    }}
  />
);

// Create and customize the theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&.styledCard": {
            maxWidth: "100%",
            width: "100%",
            mt: 1,
            padding: 1,
            paddingBottom: 0,
            boxShadow: 3,
            border: "3px solid #feefce",
            borderRadius: "10px",
            backgroundColor: "#292016",
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '&.cardHeader': {
            backgroundColor: "#000",
            color: "#feefce",
            textAlign: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            border: "3px solid #feefce",
            marginBottom: 3,
          },
          '&.columnBox': {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            border: "5px solid #3a4e4e",
            borderRadius: "8px",
            backgroundColor: "#d2b48c",
            color: "#000",
            minHeight: "100%",
          },
          "&.statsBox": {
            color: "#000",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.statsTypography": {
            border: "5px solid #3a4e4e",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginBottom: "5px",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            backgroundColor: "#d2b48c",
            color: "#000",
          },
          "&.statsNumberTypography": {
            border: "5px solid #3a4e4e",
            textAlign: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            backgroundColor: "#d2b48c",
            marginBottom: "5px",
            marginLeft: "3px",
            color: "#000",
          },
          "&.cardSubtitle": {
            border: "5px outset #a6895a",
            textAlign: "center",
            backgroundColor: "#d3ba8f",
            color: "#000",
          },
        },
      },
    },
  },
});

const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export { responsiveDarkTheme as default, globalStyles };