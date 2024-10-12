import { store } from "@/app/store";
import { render, RenderOptions } from "@testing-library/react-native";
import { Provider } from "react-redux";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}> {children} </Provider>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native'

export { customRender as render };