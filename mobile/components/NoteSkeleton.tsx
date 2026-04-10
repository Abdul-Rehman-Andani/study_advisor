import React from 'react';
import { View } from "react-native";
import SkeletonLoader from "./SkeletonLoader"; // Assuming it's in the same folder

const NoteSkeleton = () => {
  return (
    <View className="bg-white p-4 mb-4 rounded-3xl flex-row items-center border border-gray-100 shadow-sm">
      {/* 1. File Icon Placeholder (e.g., for PDF/Doc icon) */}
      <SkeletonLoader className="w-14 h-14 rounded-2xl mr-4" />

      {/* 2. Text Content Container */}
      <View className="flex-1 justify-center">
        {/* Title Line */}
        <SkeletonLoader className="w-4/5 h-5 rounded-lg mb-2" />
        {/* Subtitle/Date Line */}
        <SkeletonLoader className="w-2/5 h-3 rounded-md" />
      </View>

      {/* 3. Small Action/Arrow Placeholder */}
      <SkeletonLoader className="w-6 h-6 rounded-full ml-2" />
    </View>
  );
};

export default NoteSkeleton;