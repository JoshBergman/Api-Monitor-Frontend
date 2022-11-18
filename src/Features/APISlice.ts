import { createSlice } from '@reduxjs/toolkit';

interface APIState {
    APIs: {
        type: string;
        settings: {
            endpoint: string;
            method: string;
            title: string;
        }
    }[]

}

const initialState: APIState = {
    APIs: [
        {
        type: "REST",
        settings: {
            endpoint: "https://swapi.dev/api/people/1/",
            method: "GET",
            title: "REST Demo (SWAPI)"
        }
    },
    {
        type: "REST",
        settings: {
            endpoint: "https://swapi.dev/api/vehicles/14/",
            method: "GET",
            title: "Vehicle 14"
        }
    },
    ]
};

export const APISlice = createSlice({
    name: "style",
    initialState: initialState,
    reducers: {
        populateLocalStorage: (state, action) => {

        },
        saveLocalStorage: (state) => {
            state.APIs.forEach((api) => {console.log(Object.keys(api));})
        },
    },
});

export const { populateLocalStorage, saveLocalStorage } = APISlice.actions //export actions

export default APISlice.reducer;