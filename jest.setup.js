import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Link: ({ children }) => children,
}));

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            navigate: jest.fn(),
            dispatch: jest.fn(),
        }),
        useRoute: () => ({
            params: {},
        }),
    };
});

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({}),
}));