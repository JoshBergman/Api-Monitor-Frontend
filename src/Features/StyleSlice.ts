import { createSlice } from '@reduxjs/toolkit';

interface Style {
    mainBackground: {backgroundColor: string},
    mutedBackground: {backgroundColor: string},
    textColor: {color: string},
}

interface StyleState {
    styles: Style,
    isDark: boolean;
}

const lightStyle: StyleState = {
    styles: {
        mainBackground: {backgroundColor: "white"},
        mutedBackground: {backgroundColor: "gray"},
        textColor: {color: "black"}
    },
    isDark: false
}

const darkStyle: StyleState = {
    styles: {
        mainBackground: {backgroundColor: "black"},
        mutedBackground: {backgroundColor: "gray"},
        textColor: {color: "white"}
    },
    isDark: true
}

const getDarkSetting = () => {
    const currentDark = localStorage.getItem("DARK");
    switch (currentDark) {
        case "false": return lightStyle;
        case "true": return darkStyle;
        default: return darkStyle;
    }
};

const initialState: StyleState = getDarkSetting();

export const styleSlice = createSlice({
    name: "style",
    initialState: initialState,
    reducers: {
        toggleDark: (state) => {
            if (state.isDark){
                state.styles = lightStyle.styles;
                state.isDark = false;
                localStorage.setItem("DARK", "false");
            } else {
                state.styles = darkStyle.styles;
                state.isDark = true;
                localStorage.setItem("DARK", "true");
            }
        }
    },
});

export const { toggleDark } = styleSlice.actions //export actions

export default styleSlice.reducer;