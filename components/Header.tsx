import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const homeStyles = createHomeStyles(colors);

  const completedCount = todos ? todos.filter((todo) => todo.isCompleted).length : 0;

  // Get the total number of Todos
  const totalCount = todos ? todos.length : 0;

  // Calculate the percentage of completed Todos
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name="flash-outline" size={28} color="#ffffff" />
        </LinearGradient>

        <View className="flex flex-col">
          <Text style={{ color: colors.text }} className="text-[40px] font-extrabold">
            Today&apos;s Tasks 👀
          </Text>
          <Text style={{ color: colors.textMuted }} className="text-[15px] font-semibold">
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center gap-3 mt-5">
        <View className="bg-slate-300 w-[86%] h-5 rounded-full overflow-hidden">
          <LinearGradient
            className="h-full rounded-full bg-green-500"
            colors={colors.gradients.success}
            style={[homeStyles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={{ color: colors.textMuted }} className="text-[15px] font-semibold">
          {Math.round(progressPercentage)}%
        </Text>
      </View>
    </View>
  );
};

export default Header;
