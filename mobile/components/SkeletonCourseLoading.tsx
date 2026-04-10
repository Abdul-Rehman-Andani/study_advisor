import { View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  useAnimatedStyle 
} from 'react-native-reanimated';

const SkeletonCourseLoading = () => {
  const opacity = useSharedValue(0.4);

  // Smooth pulsing animation
  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.8, { duration: 1000 }),
      -1, // Infinite
      true // Reverse (pulse in and out)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="p-6 bg-white rounded-[32px] mb-4 border border-gray-100 shadow-sm">
      {/* Top Row: Icon and Status Tag */}
      <View className="flex-row justify-between items-center mb-6">
        <Animated.View 
          style={[animatedStyle]} 
          className="w-16 h-16 bg-gray-200 rounded-2xl" 
        />
        <Animated.View 
          style={[animatedStyle]} 
          className="w-14 h-6 bg-gray-200 rounded-full" 
        />
      </View>

      {/* Title Line */}
      <Animated.View 
        style={[animatedStyle]} 
        className="w-[80%] h-5 bg-gray-200 rounded-lg mb-3" 
      />

      {/* Subtitle/Date Line */}
      <Animated.View 
        style={[animatedStyle]} 
        className="w-[50%] h-4 bg-gray-100 rounded-lg" 
      />

      {/* Footer Detail */}
      <View className="flex-row mt-6 items-center">
        {/* Swapped the brown tint for a clean grey box */}
        <Animated.View 
          style={[animatedStyle]} 
          className="w-8 h-8 bg-gray-200 rounded-xl mr-3" 
        />
        <Animated.View 
          style={[animatedStyle]} 
          className="w-24 h-3 bg-gray-100 rounded-md" 
        />
      </View>
    </View>
  );
};

export default SkeletonCourseLoading;