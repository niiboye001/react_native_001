import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TodoType = Doc<"todos">;

const index = () => {
  const { toggleDarkMode, colors, isDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      Alert.alert("error", "Failed to toggle todo.");
    }
  };

  const handleDelete = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      Alert.alert("Error", "Error deleting the todo.");
    }
  };

  const renderTodoItem = ({ item }: { item: TodoType }) => {
    return (
      <View style={[homeStyles.todoItemWrapper]} className="bg-slate-800 py-8 px-4 rounded-3xl">
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(item._id)}
          className="flex-row items-center gap-5 pr-12">
          <View
            className={`flex items-center justify-center ${item.isCompleted ? "bg-green-600 border-2 border-green-700" : "bg-slate-700"} w-12 h-12 rounded-full`}>
            {true && <Ionicons name="checkmark" size={20} color="#fff" />}
          </View>
          <Text
            style={{ color: colors.text }}
            className={`text-2xl font-semibold flex-wrap ${item.isCompleted ? "line-through" : ""}`}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-end gap-8 mt-4">
          <View className="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center">
            <TouchableOpacity activeOpacity={0.8}>
              <Ionicons name="add" size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
          <View className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleDelete(item._id)}>
              <Ionicons name="trash" size={18} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle={`${colors.statusBarStyle}`} />
      <SafeAreaView style={{ backgroundColor: colors.bg }} className="flex-1">
        <Header />

        <TodoInput />

        <FlatList
          className="mt-3"
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
        />

        <TouchableOpacity onPress={toggleDarkMode}></TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default index;
