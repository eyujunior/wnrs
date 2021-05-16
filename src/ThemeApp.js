import baseTheme from  './styles/MUItheme'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { useState } from 'react';
import App from './App'

function ThemeApp() {
  const [MUITheme, setMUITheme] = useState(createMuiTheme(baseTheme)); 

  const changeColor = (color) => {
    setMUITheme(createMuiTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        primary: color
      }
    }))
  }
  
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={MUITheme}>
        <App changeColor={changeColor}/>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default ThemeApp;
