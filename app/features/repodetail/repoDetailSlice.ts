import { getSingleRepo, Repo } from "@/app/services/github";
import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RepoDetailState {
    repo: Repo | null;
    status: RepoDetailStatus;
    error: string | null;
}

export enum RepoDetailStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Fail = 'fail'
}

const initialState: RepoDetailState = {
    repo: null,
    status: RepoDetailStatus.Idle,
    error: null,
};

export const fetchSingleRepo = createAsyncThunk<Repo, string>(
    'repoDetail/fetchSingleRepo',
    async (repoId: string, { rejectWithValue }) => {
        try {
            const repo = await getSingleRepo(repoId);
            return repo;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

const repoDetailSlice = createSlice({
    name: 'repoDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleRepo.pending, (state) => {
                state.status = RepoDetailStatus.Loading;
            })
            .addCase(fetchSingleRepo.fulfilled, (state, action) => {
                state.status = RepoDetailStatus.Success;
                state.repo = action.payload;
            })
            .addCase(fetchSingleRepo.rejected, (state, action) => {
                state.status = RepoDetailStatus.Fail;
                state.error = action.payload as string;
            })
    }
})

export const selectRepoDetailState = (state: RootState) => state.repoDetail;

export default repoDetailSlice.reducer;