import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import nwColors from "tailwindcss/colors";

const ProgressStatsCard = ({ title = "", value = 0 }) => {
  const { isDarkMode } = useTheme();
  const blueBG = title === "Total Todos";
  const greenBG = title === "Completed";
  const orangeBG = title === "Active";

  return (
    <View
      className={`${blueBG && "bg-blue-400"} ${greenBG && "bg-green-400"} ${orangeBG && "bg-orange-400"} mb-5 flex items-end rounded-l-3xl rounded-r-2xl`}>
      <View
        className={`${isDarkMode ? "bg-slate-900" : "bg-slate-600"} p-10 w-[99.4%] rounded-l-3xl rounded-r-2xl flex flex-row items-center gap-7`}>
        <LinearGradient
          colors={
            (blueBG && [nwColors.blue[500], nwColors.blue[700]]) ||
            (greenBG && [nwColors.green[500], nwColors.green[700]]) || [
              nwColors.orange[500],
              nwColors.orange[700],
            ]
          }
          style={{ borderRadius: 50, padding: 13 }}>
          {title === "Total Todos" && <Ionicons name="list" size={25} color={"#fff"} />}
          {title === "Completed" && (
            <View className="bg-white rounded-full p-1">
              <Ionicons name="checkmark" size={19} color={nwColors.green[400]} />
            </View>
          )}
          {title === "Active" && <Ionicons name="list" size={25} color={nwColors.white} />}
        </LinearGradient>
        <View className="flex flex-col">
          <Text className={`text-slate-100 text-5xl font-extrabold`}>{value}</Text>
          <Text className={`${isDarkMode ? "text-slate-400" : "text-slate-300"} text-[16px]`}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressStatsCard;
