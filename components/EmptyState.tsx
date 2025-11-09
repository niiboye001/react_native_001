import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

const EmptyState = () => {
  const { isDarkMode } = useTheme();
  const notDark = colors.slate[400];

  return (
    <View className={`flex flex-col gap-2 items-center justify-center pt-[70px]`}>
      <View
        className={`flex items-center justify-center w-[100px] h-[100px] rounded-full ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}`}>
        <Ionicons
          name="clipboard-outline"
          size={60}
          color={`${isDarkMode ? "#475569" : `${notDark}`}`}
        />
      </View>
      <Text
        className={`mt-5 w-full text-4xl text-center font-extrabold ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
        No todos yet!
      </Text>
      <Text
        className={`text-[18px] text-center ${isDarkMode ? "text-slate-600" : "text-slate-500"}`}>
        Add your first todo above to get started.
      </Text>
    </View>
  );
};

export default EmptyState;
