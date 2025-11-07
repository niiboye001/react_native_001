import "@/global.css";
import useTheme from "@/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";

const index = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle Color</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
