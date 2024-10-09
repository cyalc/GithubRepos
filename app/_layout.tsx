import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
        options={
          {
            headerTitle: () => <ThemedText type="title">Repos</ThemedText>,
            headerStyle: {
              backgroundColor: useThemeColor({}, 'background'),
            },
            headerTintColor: useThemeColor({}, 'text'),
          }
        }
      />
    </Stack>
  );
}
