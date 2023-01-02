import { createSlice } from '@reduxjs/toolkit';

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
        logOut: (state) => {
            localStorage.removeItem("SID");
            state.hasSID = false;
            state.sid = '';
        },
        deleteAccount: (state) => {
            try {
            localStorage.removeItem("SID");
            state.hasSID = false;
            state.sid = '';
            } catch (err) {
                
            }
        }
    },
});

export const {logOut} = APISlice.actions;

export default APISlice.reducer;