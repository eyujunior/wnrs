var theme = {
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
            main: '#ee6a67',
            contrastText: '#eeeeee',
        },
        background: {
            default: '#ffffff',
            paper:   '#f6f6f6',
        }
    },
}

export default theme;