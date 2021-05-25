import baseTheme from  './styles/MUItheme'
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useState } from 'react';
import App from './App'

function ThemeApp() {
  const [MUITheme, setMUITheme] = useState(createMuiTheme(baseTheme)); 
  const fsHandle = useFullScreenHandle();

  const changeColor = (color) => {
    let childColor = color.primary === undefined
      ? { primary: color,
          secondary: color, }
      : color
    setMUITheme(createMuiTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        ...childColor
      }
    }))
  }
  
  return (
      <ThemeProvider theme={MUITheme}>
        <CssBaseline/>
        <FullScreen handle={fsHandle}>
          <App changeColor={changeColor} fsHandle={fsHandle}/>
        </FullScreen>
      </ThemeProvider>
  );
}

export default ThemeApp;
