import { configureStore } from "@reduxjs/toolkit";
import repoListReducer from './repolist/repoListSlice';

export const store = configureStore({
    reducer: {
        repoList: repoListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;