import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import kalas from "tailwindcss/colors";

type TodoType = Doc<"todos">;

const index = () => {
  const { colors, isDarkMode } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [itemToUpdateId, setItemToUpdateId] = useState<Id<"todos"> | null>(null);
  const [newText, setNewText] = useState("");

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;
  // const slate = kalas.slate[200];

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      Alert.alert("error", "Failed to toggle todo.");
    }
  };

  const handleDelete = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTodo({ id });
        },
      },
    ]);
  };

  const handleEditTodo = (todo: TodoType) => {
    setItemToUpdateId(todo._id);
    setNewText(todo.text);
  };

  const handleSaveEdit = async (todo: TodoType) => {
    if (itemToUpdateId) {
      try {
        await updateTodo({ id: itemToUpdateId, text: newText });
        setItemToUpdateId(null);
        setNewText("");
      } catch (error) {
        console.log("Error updating todo", error);
        Alert.alert("Error", "Error updating todo.");
      }
    }
  };

  const handleCancelEdit = (todo: TodoType) => {
    setItemToUpdateId(null);
    setNewText("");
  };

  const renderTodoItem = ({ item }: { item: TodoType }) => {
    const isEditing = itemToUpdateId === item._id;

    return (
      <View
        style={[homeStyles.todoItemWrapper]}
        className={`${isDarkMode ? "bg-slate-800" : "bg-slate-50 shadow shadow-slate-300"} py-8 px-4 rounded-3xl`}>
        {/* Text and checkbox section */}
        <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(item._id)}
          className="flex-row items-center gap-5 pr-12">
          <View
            className={`flex items-center justify-center ${item.isCompleted ? "bg-green-600 border-2 border-green-600" : `${isDarkMode ? "bg-slate-700" : "bg-slate-300"}`} w-12 h-12 rounded-full`}>
            {true && <Ionicons name="checkmark" size={20} color="#fff" />}
          </View>

          {isEditing ?
            <View className="w-[98%]">
              <TextInput
                autoFocus
                value={newText}
                onChangeText={setNewText}
                placeholder="Edit your todo..."
                className={`border-2 w-[100%] px-3 py-3 rounded-lg text-2xl font-semibold ${isDarkMode ? "text-slate-300 border-slate-500" : "text-slate-500 border-slate-300"} `}
              />
            </View>
          : <Text
              className={`text-2xl font-semibold flex-wrap ${isDarkMode && item.isCompleted && "line-through text-slate-500"} ${isDarkMode && !item.isCompleted && "text-slate-300"} ${!isDarkMode && !item.isCompleted && "text-slate-600"} ${item.isCompleted && "line-through text-slate-400"}`}>
              {item.text}
            </Text>
          }
        </TouchableOpacity>

        {isEditing ?
          <View className="flex flex-row items-center justify-end gap-5 mt-3">
            <View className="flex items-center justify-center w-[90px] h-12 rounded-lg bg-green-600">
              <TouchableOpacity
                onPress={() => handleSaveEdit(item)}
                className="w-[90px] h-12 rounded-lg flex flex-row gap-2 items-center justify-center">
                <Text className="text-[18px] text-white">Save</Text>
                <Ionicons name="checkmark" size={15} color={"#fff"} />
              </TouchableOpacity>
            </View>
            <View className="flex items-center justify-center w-[100px] h-12 rounded-lg bg-slate-600">
              <TouchableOpacity
                onPress={() => handleCancelEdit(item)}
                className="w-[80px] h-12 rounded-lg flex flex-row gap-2 items-center justify-center">
                <Ionicons name="close" size={15} color={"#fff"} />
                <Text className="text-[18px] text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        : <View className="flex flex-row items-center justify-end gap-8 mt-4">
            <View className="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleEditTodo(item)}
                className="w-12 h-12 flex items-center justify-center">
                <Ionicons name="pencil" size={15} color={"#fff"} />
              </TouchableOpacity>
            </View>
            <View className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleDelete(item._id)}
                className="w-12 h-12 flex items-center justify-center">
                <Ionicons name="trash" size={15} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: colors.bg }}
        className={`flex-1 ${isDarkMode ? "bg-[#0f172a]" : "bg-slate-200"}`}>
        <Header />

        <TodoInput />

        <FlatList
          className="mt-3"
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />

        {/* <TouchableOpacity onPress={toggleDarkMode}></TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
};

export default index;
