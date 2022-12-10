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

export interface Headers {
    [key: string]: string | number | boolean;
}

export interface APIState {
    APIs: API[];
}

export const APISlice = createSlice({
    name: "API",
    initialState: getLocalStorage(), // './APILogic/getLocalStorage'
    reducers: {
        addNewAPI: (state, action) => { //follow-up with a savelocalstorage call
            state.APIs.push(action.payload); //payload must be a API type
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
        saveLocalStorage: (state, action) => { //follow-up with a savelocalstorage call
            //action payload expects current dark value
            saveToLocalStorage(state, action.payload); // './APILogic/saveToLocalStorage'
        },
    },
});

export const { delAPI, addNewAPI, saveLocalStorage } = APISlice.actions;

export default APISlice.reducer;