import { configureStore, Store } from "@reduxjs/toolkit";
import repoListReducer, { fetchRepos, RepoListStatus, selectRepoListState } from '../repoListSlice';
import { RootState } from "@/app/store";
import { getRepos, Repo } from "@/app/services/github";

jest.mock('../../../services/github');

describe('repoListSlice', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({ reducer: { repoList: repoListReducer } });
    });

    describe('fetchRepos', () => {
        it('should handle pending state', () => {
            store.dispatch(fetchRepos.pending('', 'testuser'));
            expect(selectRepoListState(store.getState() as RootState)).toEqual({
                repos: [],
                status: RepoListStatus.Loading,
                error: null,
            }
            );
        });

        it('should handle fulfilled state', async () => {
            const mockRepos: Repo[] = [
                {
                    id: 1,
                    name: "repo-one",
                    stargazers_count: 100,
                    language: "TypeScript"
                },
                {
                    id: 2,
                    name: "repo-two",
                    stargazers_count: 50,
                    language: "JavaScript"
                }
            ];
            (getRepos as jest.Mock).mockResolvedValue(mockRepos);

            await store.dispatch(fetchRepos('testuser') as any);
            expect(selectRepoListState(store.getState() as RootState)).toEqual({
                repos: mockRepos,
                status: RepoListStatus.Success,
                error: null,
            });
        });

        it('should handle api error', async () => {
            const errorMessage = 'api error';
            (getRepos as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await store.dispatch(fetchRepos('testuser') as any);
            expect(selectRepoListState(store.getState() as RootState)).toEqual({
                repos: [],
                status: RepoListStatus.Fail,
                error: errorMessage,
            });
        });

        it('should handle unknown error', async () => {
            (getRepos as jest.Mock).mockRejectedValue('Unknown error');

            await store.dispatch(fetchRepos('testuser') as any);
            expect(selectRepoListState(store.getState() as RootState)).toEqual({
                repos: [],
                status: RepoListStatus.Fail,
                error: 'An unknown error occurred',
            });
        });
    });
});