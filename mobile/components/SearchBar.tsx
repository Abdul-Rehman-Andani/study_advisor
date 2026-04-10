import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl mb-6 border border-gray-100 shadow-sm shadow-gray-200">
      <Ionicons name="search-outline" size={20} color="#8C6E5E" />
      <TextInput
        placeholder="Search your courses..."
        className="flex-1 ml-3 text-base text-gray-800"
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );
};

export default SearchBar;
