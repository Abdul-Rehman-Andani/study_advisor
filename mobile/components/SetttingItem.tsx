import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SkeletonLoader from "./SkeletonLoader";

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  onPress: () => void;
  isLoading?: boolean;
  isLast?: boolean;
}

const SettingsItem = ({ 
  icon, 
  title, 
  value, 
  onPress, 
  isLoading = false, 
  isLast = false 
}: SettingsItemProps) => (
  <TouchableOpacity 
    onPress={onPress}
    disabled={isLoading}
    className={`flex-row items-center justify-between py-5 ${
      !isLast ? 'border-b border-gray-100' : ''
    }`}
  >
    <View className="flex-row items-center flex-1">
      <View className="bg-[#8C6E5E]/10 p-2.5 rounded-2xl mr-4">
        <Ionicons name={icon} size={20} color="#8C6E5E" />
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
          {title}
        </Text>
        
        {isLoading ? (
          /* Adjust width/height based on your specific SkeletonLoader requirements */
          <View className="h-5 w-3/4 overflow-hidden rounded-md">
            <SkeletonLoader />
          </View>
        ) : (
          <Text className="text-gray-800 font-bold text-base">
            {value || "Not specified"}
          </Text>
        )}
      </View>
    </View>

    {!isLoading && (
      <Ionicons name="chevron-forward" size={18} color="#D1D1D1" />
    )}
  </TouchableOpacity>
);

export default SettingsItem;