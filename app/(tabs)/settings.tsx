import DangerZone from "@/components/DangerZone";
import PreferencesItemCard from "@/components/PreferencesItemCard";
import ProgressStatsCard from "@/components/ProgressStatsCard";
import SettingsItemsCard from "@/components/SettingsItemsCard";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as nwColors from "tailwindcss/colors";

const Settings = () => {
  const { isDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);

  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos ? todos?.filter((f) => f.isCompleted).length : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <>
      <StatusBar barStyle={`dark-content`} />

      <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-[#0f172a]" : "bg-slate-200"}`}>
        <View className="flex flex-row items-center gap-5 py-5 px-7">
          <LinearGradient
            colors={[nwColors.blue[400], nwColors.blue[800]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 17, padding: 14 }}>
            <Ionicons name="settings" size={28} color={"#fff"} />
          </LinearGradient>
          <Text
            className={`${isDarkMode ? "text-slate-100" : "text-slate-700"} text-[40px] font-extrabold`}>
            Settings
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SettingsItemsCard title="Progress Stats">
            <ProgressStatsCard title="Total Todos" value={todos?.length} />
            <ProgressStatsCard title="Completed" value={completedTodos} />
            <ProgressStatsCard title="Active" value={activeTodos} />
          </SettingsItemsCard>

          <SettingsItemsCard title="Preferences">
            <PreferencesItemCard sender="darkmode"></PreferencesItemCard>
            <PreferencesItemCard sender="notification"></PreferencesItemCard>
            <PreferencesItemCard sender="autosync"></PreferencesItemCard>
          </SettingsItemsCard>

          <SettingsItemsCard title="Danger Zone">
            <DangerZone />
          </SettingsItemsCard>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Settings;
