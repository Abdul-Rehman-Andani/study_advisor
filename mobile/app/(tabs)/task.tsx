import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useTasks } from "@/hooks/tasks/useTask";
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask";
import TaskCard from "@/components/TaskCard";
import TaskSkeleton from "@/components/TaskSkeleton";
import SearchBar from "@/components/SearchBar";

const Task = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // --- INPUT STATES ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const statuses = [
    { label: "Todo", value: "todo" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
  ];

  // --- HOOKS ---
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { data: tasks, isPending: isTasksPending } = useTasks();
  const { mutate: deleteTask } = useDeleteTask();

  // --- DELETE LOGIC ---
  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to remove this sticky note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTask(id, {
              onSuccess: () => {
                // List auto-updates if you used invalidateQueries in the hook
                console.log("Deleted successfully");
              },
              onError: () => {
                Alert.alert("Error", "Could not delete the task.");
              },
            });
          },
        },
      ],
    );
  };

  // --- SAVE LOGIC ---
  const handleSave = () => {
    if (!title) return Alert.alert("Error", "Please enter a task title");

    createTask(
      { title, description, status },
      {
        onSuccess: () => {
          setIsModalVisible(false);
          setTitle("");
          setDescription("");
          setStatus("todo");
          Alert.alert("Success", "Task pinned!");
        },
        onError: (error: any) => {
          Alert.alert(
            "Error",
            error.response?.data?.message || "Failed to create task",
          );
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4">
        {/* HEADER */}
        <View className="flex-row items-center justify-between py-6">
          <View>
            <Text className="text-gray-400 text-sm font-medium">
              My Learning
            </Text>
            <Text className="text-3xl font-bold text-primary">
              Sticky Notes
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
            className="bg-[#8C6E5E] w-12 h-12 rounded-2xl items-center justify-center shadow-lg"
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* TASKS LIST */}
        {isTasksPending ? (
          <TaskSkeleton />
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item: any) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={() => <SearchBar />}
            renderItem={({ item }) => (
              <TaskCard key={item._id} task={item} onPress={() => handleDelete(item._id)} />
            )}
            ListEmptyComponent={() => (
              <View className="items-center justify-center mt-20">
                <Ionicons name="book-outline" size={60} color="#D1D1D1" />
                <Text className="text-gray-400 mt-4">No tasks added yet.</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* CREATE TASK MODAL */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className="absolute inset-0 bg-black/50"
            onPress={() => !isCreating && setIsModalVisible(false)}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="bg-white p-8 rounded-t-[32px] w-full"
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mb-6" />
              <Text className="text-2xl font-bold mb-6 text-gray-900">
                Create New Task
              </Text>

              {/* TITLE */}
              <Text className="text-xs text-gray-500 mb-1 uppercase font-bold ml-1">
                Task Title
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                className="bg-gray-100 p-4 rounded-xl mb-4 text-gray-800"
                placeholder="What needs to be done?"
                editable={!isCreating}
              />

              {/* STATUS */}
              <Text className="text-xs text-gray-500 mb-2 uppercase font-bold ml-1">
                Status
              </Text>
              <View className="flex-row justify-between mb-4">
                {statuses.map((s) => (
                  <TouchableOpacity
                    key={s.value}
                    onPress={() => setStatus(s.value)}
                    className={`flex-1 mx-1 p-3 rounded-xl items-center border ${
                      status === s.value
                        ? "bg-[#8C6E5E] border-[#8C6E5E]"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-[10px] font-bold uppercase ${status === s.value ? "text-white" : "text-gray-400"}`}
                    >
                      {s.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* DESCRIPTION */}
              <Text className="text-xs text-gray-500 mb-1 uppercase font-bold ml-1">
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Add more details..."
                multiline
                className="bg-gray-100 p-4 rounded-xl mb-6 min-h-[100px] text-gray-800"
                textAlignVertical="top"
                editable={!isCreating}
              />

              <TouchableOpacity
                onPress={handleSave}
                disabled={isCreating}
                className={`p-5 rounded-xl items-center ${isCreating ? "bg-gray-400" : "bg-[#8C6E5E]"}`}
              >
                {isCreating ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg">
                    SAVE NOTE
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Task;
