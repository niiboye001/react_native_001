import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const TodoInput = () => {
  const [newTodo, setNewTodo] = useState("");
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if (newTodo) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.log("Error adding todo", error);
        Alert.alert("Error", "Failed to add todo.");
      }
    }
  };

  return (
    <View className="flex-row items-center gap-4 px-6">
      <View className="flex-[4]">
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be added?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <TouchableOpacity onPress={handleAddTodo} disabled={!newTodo.trim()} activeOpacity={0.8} className="flex-1">
        <LinearGradient
          colors={newTodo ? colors.gradients.primary : colors.gradients.muted}
          style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}>
          <Ionicons name="add" size={20} color={"#fff"} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default TodoInput;
