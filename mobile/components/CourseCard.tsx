import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";

const CourseCard = ({ course, onPress }: any) => {
  // Calculate percentage for the progress bar

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/course/${course._id}`);
      }}
      activeOpacity={0.9}
      className="w-full bg-white rounded-3xl p-5 mb-4 border border-[#F4F1F0]"
      style={{
        shadowColor: "#8C6E5E",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3, // For Android
      }}
    >
      {/* Top Row: Icon and Category Tag */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="bg-[#8C6E5E]/10 p-3 rounded-2xl">
          <Ionicons name="journal-outline" size={24} color="#8C6E5E" />
        </View>
        <View className="bg-[#F4F1F0] px-3 py-1 rounded-full">
          <Text className="text-[#8C6E5E] text-[10px] font-bold uppercase tracking-wider">
            {course.category}
          </Text>
        </View>
      </View>

      {/* Course Title */}
      <Text className="text-xl font-bold text-gray-800 mb-1" numberOfLines={2}>
        {course.title}
      </Text>

      <View className="flex-row justify-between items-center ">
        <Text className="text-gray-400 text-xs mb-4">
          {course.lessons} Lessons • Updated Mar 2026
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="trash" color={Colors.primary} size={18} />
        </TouchableOpacity>
      </View>
      {/* Progress Section */}
    </TouchableOpacity>
  );
};

export default CourseCard;
