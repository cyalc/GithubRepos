import { configureStore, combineReducers } from "@reduxjs/toolkit";
import repoListReducer from './features/repolist/repoListSlice';
import repoDetailReducer from './features/repodetail/repoDetailSlice';

const rootReducer = combineReducers({
    repoList: repoListReducer,
    repoDetail: repoDetailReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']