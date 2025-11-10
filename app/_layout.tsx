import "@/global.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const colorSchemes = useColorScheme();

  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        {/* <StatusBar barStyle={colorSchemes === "dark" ? "dark-content" : "light-content"} /> */}

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              statusBarStyle: colorSchemes === "dark" ? "dark" : "light",
            }}
          />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
