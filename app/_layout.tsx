import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index"
          options={
            {
              headerTitle: () => <ThemedText>Repositories</ThemedText>,
              headerStyle: {
                backgroundColor: useThemeColor({}, 'background'),
              },
              headerTintColor: useThemeColor({}, 'text'),
            }
          }
        />
        <Stack.Screen name="features/repodetail/RepoDetail"
          options={
            {
              headerTitle: () => <ThemedText>Repository Detail</ThemedText>,
              headerStyle: {
                backgroundColor: useThemeColor({}, 'background'),
              },
              headerTintColor: useThemeColor({}, 'text'),
            }
          }
        />
      </Stack>
    </Provider>
  );
}
