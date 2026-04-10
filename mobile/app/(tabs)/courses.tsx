import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseCard from "@/components/CourseCard";
import { Ionicons } from "@expo/vector-icons";
import { useCreateCourse } from "@/hooks/courses/useCreateCourse";
import { useCourses } from "@/hooks/courses/useCourses";
import SkeletonCourseLoading from "@/components/SkeletonCourseLoading";
import SearchBar from "@/components/SearchBar";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourse";

const Courses = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 1. Input States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // 2. Initialize Hook
  const { mutate: createCourse, isPending } = useCreateCourse();
  const { data: courses, isPending: isCoursesPending } = useCourses();
  const { mutate: deleteCourse, isPending: isDeletePending } =
    useDeleteCourse();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Course",
      "If you delete the course all notes associated with this course aslo will be deleted !",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteCourse(id, {
              onSuccess: () => {
                Alert.alert("Course deleted succesfully!");
              },
              onError: (error: any) => {
                Alert.alert(error || "Something went wrong");
              },
            });
          },
        },
      ],
    );
  };

  // 3. Handle Save Logic
  const handleSave = () => {
    if (!title || !category) return alert("Please fill in all fields");

    createCourse(
      { title, category },
      {
        onSuccess: () => {
          setIsModalVisible(false);
          setTitle("");
          setCategory("");
        },
        onError: (error: any) => {
          alert(error.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background px-4">
        {/* HEADER SECTION */}
        <View className="flex-row items-center justify-between py-6">
          <View>
            <Text className="text-gray-400 text-sm font-medium">
              My Learning
            </Text>
            <Text className="text-3xl font-bold text-gray-900">Courses</Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
            className="bg-accent w-12 h-12 rounded-2xl items-center justify-center shadow-lg shadow-[#8C6E5E]/40"
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {isCoursesPending ? (
          new Array(3)
            .fill(null)
            .map((_, index: any) => <SkeletonCourseLoading key={index} />)
        ) : (
          <FlatList
            data={courses}
            keyExtractor={(item: any) => item._id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <>
                <SearchBar />

                <Text className="text-lg font-semibold text-gray-700 mb-4">
                  Active Courses
                </Text>
                
              </>
            )}
            renderItem={({ item }) => (
              <CourseCard
                key={item._id}
                course={item}
                onPress={() => handleDelete(item._id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 70 }}
            ListEmptyComponent={() => (
              <View className="items-center justify-center mt-20">
                <Ionicons name="book-outline" size={60} color="#D1D1D1" />
                <Text className="text-gray-400 mt-4">
                  No courses added yet.
                </Text>
              </View>
            )}
          />
        )}

        {/* COURSES LIST */}
      </View>

      {/* ADD COURSE MODAL */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View className="flex-1">
          <TouchableOpacity
            className="flex-1 justify-end bg-black/50"
            onPress={() => !isPending && setIsModalVisible(false)}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="bg-white p-8 rounded-t-3xl"
          >
            <Text className="text-xl font-bold mb-6">Add New Course</Text>

            <Text className="text-xs text-gray-500 mb-1 ml-1">Course Name</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Data Engineering"
              className="bg-gray-100 p-4 rounded-xl mb-4"
              editable={!isPending}
            />

            <Text className="text-xs text-gray-500 mb-1 ml-1">
              Course Category
            </Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Technology / Business / Science"
              className="bg-gray-100 p-4 rounded-xl mb-6"
              editable={!isPending}
            />

            <TouchableOpacity
              onPress={handleSave}
              disabled={isPending}
              className={`p-4 rounded-xl items-center ${isPending ? "bg-gray-400" : "bg-[#8C6E5E]"}`}
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">Save Course</Text>
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Courses;
