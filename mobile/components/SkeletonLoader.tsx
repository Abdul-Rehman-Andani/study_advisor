import { View } from "react-native";

const SkeletonLoader = ({ className = "" }) => (
  <View
    className={`w-44 h-15 bg-gray-200 rounded-[32px] animate-pulse ${className}`}
  />
);

export default SkeletonLoader;
