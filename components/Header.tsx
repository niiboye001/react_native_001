import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);

  const completedCount = todos ? todos.filter((todo) => todo.isCompleted).length : 0;

  // Get the total number of Todos
  const totalCount = todos ? todos.length : 0;

  // Calculate the percentage of completed Todos
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View className={`px-10 py-10`}>
      <View className="flex flex-row items-center gap-5 justify-items-center">
        <View className="bg-blue-400 rounded-2xl w-[50px] items-center py-3">
          <Ionicons name="flash-outline" size={28} color="#ffffff" />
        </View>

        <View className="flex flex-col">
          <Text style={{ color: colors.text }} className="text-[30px] font-extrabold">
            Today&apos;s Tasks 👀
          </Text>
          <Text style={{ color: colors.text }} className="text-[15px] font-semibold">
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center gap-3 mt-7">
        <View className="bg-slate-300 w-[250px] h-4 rounded-full overflow-hidden">
          <LinearGradient
            className="h-full rounded-full"
            colors={colors.gradients.success}
            style={{ width: `${progressPercentage}%` }}
          />
        </View>
        <Text style={{ color: colors.text }}>{Math.round(progressPercentage)}%</Text>
      </View>
    </View>
  );
};

export default Header;
