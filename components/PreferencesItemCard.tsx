import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Switch, Text, View } from "react-native";
import * as nwColors from "tailwindcss/colors";

const PreferencesItemCard = ({ sender = "" }) => {
  const [isAutoSync, setIsAutoSync] = useState<boolean | undefined>(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean | undefined>(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const darkmode = sender === "darkmode";
  const notification = sender === "notification";
  const autosync = sender === "autosync";

  return (
    <View className="flex flex-row items-center justify-between mb-5">
      <View className="flex flex-row gap-5 items-center">
        <LinearGradient
          colors={
            (darkmode && [nwColors.blue[500], nwColors.blue[700]]) ||
            (notification && [nwColors.green[500], nwColors.green[700]]) || [
              nwColors.orange[500],
              nwColors.orange[700],
            ]
          }
          style={{ borderRadius: 10, padding: 13 }}>
          {darkmode && <Ionicons name="moon" size={25} color={"#fff"} />}
          {notification && <Ionicons name="notifications" size={25} color={"#fff"} />}
          {autosync && <Ionicons name="sync" size={25} color={"#fff"} />}
        </LinearGradient>
        <Text
          className={`${isDarkMode ? "text-slate-100" : "text-slate-700"} text-[21px] font-bold`}>
          {darkmode && "Dark Mode"}
          {notification && "Notification"}
          {autosync && "Auto Sync"}
        </Text>
      </View>
      {darkmode && (
        <View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={nwColors.white}
            trackColor={{ false: nwColors.slate[300], true: nwColors.blue[500] }}
            ios_backgroundColor={nwColors.slate[300]}
          />
        </View>
      )}

      {notification && (
        <View>
          <Switch
            value={isNotificationEnabled}
            onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
            thumbColor={nwColors.white}
            trackColor={{ false: nwColors.slate[300], true: nwColors.green[500] }}
            ios_backgroundColor={nwColors.slate[300]}
          />
        </View>
      )}

      {autosync && (
        <View>
          <Switch
            value={isAutoSync}
            onValueChange={() => setIsAutoSync(!isAutoSync)}
            thumbColor={nwColors.white}
            trackColor={{ false: nwColors.slate[300], true: nwColors.orange[500] }}
            ios_backgroundColor={nwColors.slate[300]}
          />
        </View>
      )}
    </View>
  );
};

export default PreferencesItemCard;
