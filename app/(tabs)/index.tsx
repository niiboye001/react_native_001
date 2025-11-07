import Header from "@/components/Header";
import "@/global.css";
import useTheme from "@/hooks/useTheme";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const { toggleDarkMode, colors } = useTheme();

  return (
    <>
      <StatusBar barStyle={`${colors.statusBarStyle}`} />
      <SafeAreaView className={`flex-1  bg-[${colors.bg}]`}>
        <Header />

        <TouchableOpacity onPress={toggleDarkMode}>
          <Text className={`text-[${colors.text}]`}>Toggle Color</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default index;
