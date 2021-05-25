var theme = {
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    minHeight: 'calc(100% + env(safe-area-inset-top))',
                    padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'            
                },
                '.fullscreen-enabled': {
                    background: '#fff'
                }
            },
        },
    },
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
            fontSize: 15,
            lineHeight: 1.2,
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
            main:  '#c10016',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#c10016',
            contrastText: '#ffffff',
        },
        background: {
            default: '#ffffff',
            paper:   '#f6f6f6',
        }
    },
}

export default theme;