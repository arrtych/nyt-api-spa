import { CHANGE_THEME } from './../constants';

const lightTheme = {
    backgroundColor: '#faebd7',
    color: '#333',
    article: {
        backgroundColor: '#f8f8f8',
        borderColor: '#d1bf1ca3'
    },
    link: {
        color: '#777'
    },
    menu: {
        backgroundColor: '#f8f8f8',
        borderColor: '#faebd7'
    }
};

const darkTheme = {
    backgroundColor: '#222',
    color: '#fff',
    article: {
        backgroundColor: '#303030',
        borderColor: '#303030'
    },
    link: {
        color: '#777'
    },
    menu: {
        backgroundColor: '#375a7f',
        borderColor: '#375a7f'
    }
};

export default (state = {}, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            const theme = action.payload;
            let themeOptions = lightTheme;
            if(theme === "dark") {
                themeOptions = darkTheme;
            }
            return {
                theme,
                themeOptions
            };
        default:
            return state
    }
}