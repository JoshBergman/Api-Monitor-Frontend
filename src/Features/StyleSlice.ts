import { createSlice } from '@reduxjs/toolkit';

export interface Style {
    mainBackground: {backgroundColor: string},
    mutedBackground: {backgroundColor: string},
    textColor: {color: string},
    pageBackground: {backgroundColor: string},
}

export interface StyleState {
    styles: Style,
    isDark: boolean;
}
    
const lightStyle: StyleState = {
    styles: {
        mainBackground: {backgroundColor: "#EFEFEF"},
        mutedBackground: {backgroundColor: "#E1E1E1"},
        textColor: {color: "#151313"},
        pageBackground: {backgroundColor: "#D3D3D3"},
    },
    isDark: false
}

const darkStyle: StyleState = {
    styles: {
        mainBackground: {backgroundColor: "#101010"},
        mutedBackground: {backgroundColor: "#101010"},
        textColor: {color: "#BEACA3"},
        pageBackground: {backgroundColor: "#333333"},
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