import { createContext, useReducer } from "react";
import { TOGGLE_THEME } from "./ActionTypes";
import { themeReducer } from "./reducer/theme.reducer";

const ThemeContext = createContext();

const initVal = {
    theme: 'light'
}

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initVal) 


    const toogle_theme = (val) => {
        let newTheme = val === 'light' ? 'dark' : 'light';
        dispatch({type: TOGGLE_THEME, payload: newTheme});
    }

    return(
        <ThemeContext.Provider
            value={{
                ...state,
                toogle_theme,

            }}
        >
            {children}
        </ThemeContext.Provider>
    )

}

