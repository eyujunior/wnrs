import { createMuiTheme } from '@material-ui/core/styles';

var theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Helvetica Neue',
            'Helvetica',
            'Arimo',
            'Arial',
            'sans-serif',
        ].join(','),
        fontSize: 12,
        h6: { 
            fontSize: 14,
            fontWeight: 700, 
        },
        body: {
            fontSize: 12,
        },
        button: {
            fontSize: 12,
            fontWeight: 700,
        },
    },
    palette: {
        primary: {
            light: '#fb4d3f',
            main:  '#c10016',
            dark:  '#880000',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#faf1f0',
            main: '#ee6a67',
            dark: '#b7393c',
            contrastText: '#eeeeee',
        },
        background: {
            default: '#ffffff',
            paper:   '#f6f6f6',
        }
    },

})

export default theme;