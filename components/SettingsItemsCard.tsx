import useTheme from "@/hooks/useTheme";
import { ReactNode } from "react";
import { Text, View } from "react-native";

const SettingsItemsCard = ({ children, title = "" }: { children: ReactNode; title: String }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <View
      className={`${isDarkMode ? "bg-slate-800" : "bg-white"} flex flex-col py-5 px-5 mt-7 mx-7 rounded-2xl`}>
      <Text
        className={`${isDarkMode ? "text-slate-100" : "text-slate-700"} text-[25px] font-bold mt-10 mb-5`}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default SettingsItemsCard;
