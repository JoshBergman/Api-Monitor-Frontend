import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    hasSID: boolean;
    sid?: string;
}

const getInitialState = (): AuthState => {
    const storedSID = localStorage.getItem("SID");

    if(storedSID === null){
    //if no SID is stored
        return {
            hasSID: false
        };
    } else {
    //case when SID was saved in local storage
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
        logOut: (state) => {
            localStorage.removeItem("SID");
            state.hasSID = false;
            state.sid = '';
        },
        logIn: (state, action) => {
            const newSID = action.payload;

            localStorage.setItem("SID", newSID);
            state.hasSID = true;
            state.sid = newSID;
        }
    },
});

export const {logOut, logIn} = APISlice.actions;

export default APISlice.reducer;