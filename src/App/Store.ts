import { configureStore } from '@reduxjs/toolkit';
import styleReducer from '../Features/StyleSlice';
import APIReducer from '../Features/APISlice';

export const store = configureStore({
    reducer: {
        style: styleReducer,
        API: APIReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;