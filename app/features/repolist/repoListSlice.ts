import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRepos, Repo } from "../../services/github";
import { RootState } from "../../store";

interface RepoListState {
    repos: Repo[];
    status: RepoListStatus;
    error: string | null;
}

// TODO: This enum could be made generic in the future to be used across different slices
export enum RepoListStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Fail = 'fail'
}

const initialState: RepoListState = {
    repos: [],
    status: RepoListStatus.Idle,
    error: null,
};

export const fetchRepos = createAsyncThunk<Repo[], string>(
    'repoList/fetchRepos',
    async (username: string, { rejectWithValue }) => {
        try {
            const repos = await getRepos(username);
            return repos;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const repoListSlice = createSlice({
    name: 'repoList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.status = RepoListStatus.Loading;
                state.error = null;
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.status = RepoListStatus.Success;
                state.repos = action.payload;
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.status = RepoListStatus.Fail;
                state.error = action.payload as string;
            })
    }
});

export const selectRepoListState = (state: RootState) => state.repoList;

export default repoListSlice.reducer;