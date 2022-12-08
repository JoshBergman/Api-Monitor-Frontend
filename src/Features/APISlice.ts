import { createSlice } from '@reduxjs/toolkit';

import { getLocalStorage } from './APILogic/getLocalStorage';
import { saveToLocalStorage } from './APILogic/saveToLocalStorage';

export interface API {
    type: string;
    settings: settings;
    headers?: Headers;
}

export interface settings {
    endpoint: string;
    method: string;
    title: string;
    body?: string | object;
}

interface Headers {
    [key: string]: string | number | boolean;
}

export interface APIState {
    APIs: API[];
}

export const APISlice = createSlice({
    name: "API",
    initialState: getLocalStorage(), // './APILogic/getLocalStorage'
    reducers: {
        addNewAPI: (state, action) => {
            state.APIs.push(action.payload); //payload must be a APIState object
        },
        delAPI: (state, action) => {
            state.APIs = (
            state.APIs.filter((currAPI) => {
                if(action.payload === currAPI.settings.title){
                    return false;
                } else {
                    return true;
                }
            }));
        },
        saveLocalStorage: (state, action) => {
            saveToLocalStorage(state, action.payload); // './APILogic/saveToLocalStorage'
        },
    },
});

export const { delAPI, addNewAPI, saveLocalStorage } = APISlice.actions //export actions

export default APISlice.reducer;