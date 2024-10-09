import { configureStore } from "@reduxjs/toolkit";
import repoListReducer from './features/repolist/repoListSlice';
import repoDetailReducer from './features/repodetail/repoDetailSlice';
export const store = configureStore({
    reducer: {
        repoList: repoListReducer,
        repoDetail: repoDetailReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;