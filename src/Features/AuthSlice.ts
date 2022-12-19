import { createSlice } from '@reduxjs/toolkit';

import { saveToLocalStorage } from './APILogic/saveToLocalStorage';

interface AuthState {
    hasSID: boolean;
    sid?: string;
}

const getInitialState = (): AuthState => {
    const storedSID = localStorage.getItem("SID");
    if(storedSID === null){
        return {
            hasSID: false
        };
    } else {
        return {
            hasSID: true,
            sid: storedSID
        };
    }
};

const initialState: AuthState = getInitialState();

export const APISlice = createSlice({
    name: "Auth",
    initialState: initialState,
    reducers: {
        addNewAPI: (state, action) => {},
        saveLocalStorage: (state, action) => {},
    },
});

export const {addNewAPI, saveLocalStorage } = APISlice.actions;

export default APISlice.reducer;