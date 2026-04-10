import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  useAnimatedStyle 
} from "react-native-reanimated";

const rotations = ["-rotate-3", "-rotate-2", "rotate-2", "rotate-3"];

const SkeletonCard = ({ index }: { index: number }) => {
  const opacity = useSharedValue(0.4);
  const rotate = rotations[index % rotations.length];

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.8, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="items-center">
      <Animated.View
        style={[animatedStyle]}
        className={`w-[90%] px-5 py-7 rounded-sm mt-10 relative bg-gray-200 border border-gray-300 ${rotate}`}
      >
        {/* Fake Pin */}
        <View className="absolute top-2 right-2 w-6 h-6 bg-gray-300 rounded-full" />

        {/* Fake Title & Status */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="w-2/3 h-5 bg-gray-300 rounded-md" />
          <View className="w-12 h-4 bg-gray-300 rounded-md" />
        </View>

        {/* Fake Description Lines */}
        <View className="w-full h-3 bg-gray-300 rounded-md mb-2" />
        <View className="w-full h-3 bg-gray-300 rounded-md mb-6" />

        {/* Fake Footer */}
        <View className="flex-row justify-between items-center">
          <View className="w-20 h-4 bg-gray-300 rounded-md" />
          <View className="w-6 h-6 bg-gray-300 rounded-md" />
        </View>
      </Animated.View>
    </View>
  );
};

const TaskSkeleton = () => {
  return (
    <View className="flex-1">
      {[1, 2, 3].map((key) => (
        <SkeletonCard key={key} index={key} />
      ))}
    </View>
  );
};

export default TaskSkeleton;