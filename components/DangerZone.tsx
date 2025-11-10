import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as nwColors from "tailwindcss/colors";

const DangerZone = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  const todos = useQuery(api.todos.getTodos);

  const totalTodos = todos ? todos.length : 0;

  const handleAppReset = () => {
    Alert.alert(
      "Reset App",
      "⚠️ This will delete ALL your todos and preferences permanemtly. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              AsyncStorage.getItem("darkMode").then(async (value) => {
                if (value) {
                  setIsDarkMode(false);
                  await AsyncStorage.setItem("darkMode", JSON.stringify(false));
                }
              });

              if (totalTodos > 0) {
                const result = await clearAllTodos();

                Alert.alert(
                  "App Reset",
                  `Successfully deleted ${result.deletedCount} todo${result.deletedCount > 1 ? "s" : ""}. Your app has been fully reset.`
                );
              } else {
                Alert.alert(
                  "App Reset",
                  "No todos found, so only the preferences was cleared. Your app has been fully reset."
                );
              }
            } catch (error) {
              console.log("Error deleting all todos", error);
              Alert.alert("Error", "Failed to reset the app");
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleAppReset}>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-5">
          <LinearGradient
            colors={[nwColors.red[500], nwColors.red[600]]}
            style={{ borderRadius: 10, padding: 13 }}>
            <Ionicons name="trash" size={25} color={"#fff"} />
          </LinearGradient>
          <Text className="text-red-500 text-[21px] font-bold">Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={25} color={nwColors.slate[400]} />
      </View>
    </TouchableOpacity>
  );
};

export default DangerZone;
