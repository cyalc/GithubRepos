// This test utility is adapted from the official Redux documentation:
// https://redux.js.org/usage/writing-tests


import { AppStore, RootState, setupStore } from '@/app/store'
import { render, type RenderOptions } from '@testing-library/react-native'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {}
) {
    const {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>{children}</Provider>
    )

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}

export * from '@testing-library/react-native'

export { renderWithProviders as render };