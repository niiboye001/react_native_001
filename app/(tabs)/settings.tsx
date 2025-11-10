import ProgressStatsCard from "@/components/ProgressStatsCard";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import nwColors from "tailwindcss/colors";

const Settings = () => {
  const { isDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  const completedTodos = todos?.filter((f) => f.isCompleted).length;
  const activeTodos = todos?.filter((f) => !f.isCompleted).length;

  return (
    <>
      <StatusBar barStyle={`dark-content`} />

      <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-[#0f172a]" : "bg-[#f8fafc]"}`}>
        <View className="flex flex-row items-center gap-5 pt-9 px-7">
          <LinearGradient
            colors={[nwColors.blue[400], nwColors.blue[800]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 17, padding: 14 }}>
            <Ionicons name="settings" size={28} color={"#fff"} />
          </LinearGradient>
          <Text
            className={`${isDarkMode ? "text-slate-100" : "bg-[#f8fafc]"} text-[40px] font-extrabold`}>
            Settings
          </Text>
        </View>
        <View
          className={`${isDarkMode ? "bg-slate-800" : "bg-slate-200"} flex flex-col px-5 mt-7 mx-7 rounded-2xl`}>
          <Text
            className={`${isDarkMode ? "text-slate-100" : "text-slate-700"} text-[25px] font-bold mt-10 mb-5`}>
            Progress Stats
          </Text>
          <ProgressStatsCard title="Total Todos" value={todos?.length} />
          <ProgressStatsCard title="Completed" value={completedTodos} />
          <ProgressStatsCard title="Active" value={activeTodos} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Settings;
