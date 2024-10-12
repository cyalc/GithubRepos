import { render, screen, waitFor } from '@/utils/test-utils';
import RepoList from '../repolist/RepoList';
import * as githubService from '../../services/github';
import { RepoListStatus } from '../repolist/repoListSlice';

// Mock the github service
jest.mock('../../services/github');

const initialState = {
    repoList: {
        repos: [],
        status: RepoListStatus.Idle,
        error: null,
    },
};


describe('RepoList', () => {
    it('renders loading state and then repo list when successful', async () => {
        const mockRepos = [
            { id: 1, name: 'Repo 1', stargazers_count: 10, language: 'JavaScript' },
            { id: 2, name: 'Repo 2', stargazers_count: 20, language: 'TypeScript' },
        ];

        // Mock the getRepos function
        (githubService.getRepos as jest.Mock).mockResolvedValue(mockRepos);


        render(
            <RepoList />
        );

        // Check for loading state
        expect(screen.getByTestId('activity-indicator')).toBeTruthy();

        // Wait for the repos to load
        await waitFor(() => {
            expect(screen.getByText('Repo 1')).toBeTruthy();
            expect(screen.getByText('Repo 2')).toBeTruthy();
        });
    });

    it('renders error state when API call fails', async () => {
        // Mock the getRepos function to throw an error
        (githubService.getRepos as jest.Mock).mockRejectedValue(new Error('API Error'));


        render(
            <RepoList />
        );

        // Check for loading state initially
        expect(screen.getByTestId('activity-indicator')).toBeTruthy();

        // Wait for the error state
        await waitFor(() => {
            expect(screen.getByText('Error: API Error')).toBeTruthy();
        });
    });

    it('renders empty state when no repos are returned', async () => {
        // Mock the getRepos function to return an empty array
        (githubService.getRepos as jest.Mock).mockResolvedValue([]);


        render(
            <RepoList />
        );

        // Wait for the empty state
        await waitFor(() => {
            expect(screen.getByText('No repositories found.')).toBeTruthy();
        });
    });
});