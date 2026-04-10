import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface NoteCardProps {
  title: string;
  fileType?: string; // accepts full URL or extension string
  onPress?: () => void;
}

const NoteCard = ({ title, fileType, onPress }: NoteCardProps) => {

  const getFileIcon = (type?: string) => {
    const lowerType = type?.toLowerCase() ?? "";

    if (lowerType.includes("pdf")) return { name: "document-text", color: "#FF4D4D" };
    if (lowerType.includes("doc")) return { name: "file-tray-full", color: "#2B579A" };
    if (lowerType.includes("ppt")) return { name: "easel", color: "#D24726" };
    if (lowerType.includes("png") || lowerType.includes("jpg") || lowerType.includes("jpeg") || lowerType.includes("image")) {
      return { name: "image", color: "#4CAF50" };
    }

    return { name: "document", color: "#8C6E5E" };
  };

  const getFileLabel = (type?: string) => {
    const lowerType = type?.toLowerCase() ?? "";

    if (lowerType.includes("pdf")) return "PDF";
    if (lowerType.includes("doc")) return "WORD";
    if (lowerType.includes("ppt")) return "POWERPOINT";
    if (lowerType.includes("png") || lowerType.includes("jpg") || lowerType.includes("jpeg")) return "IMAGE";

    return "DOCUMENT";
  };

  const iconData = getFileIcon(fileType);
  const fileLabel = getFileLabel(fileType);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white p-4 mb-3 rounded-2xl flex-row items-center shadow-sm border border-gray-50"
    >
      {/* Icon Container */}
      <View
        className="w-12 h-12 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: `${iconData.color}15` }}
      >
        <Ionicons name={iconData.name as any} size={26} color={iconData.color} />
      </View>

      {/* Text Content */}
      <View className="flex-1">
        <Text numberOfLines={1} className="text-gray-800 font-semibold text-lg">
          {title}
        </Text>
        <Text className="text-gray-400 text-xs uppercase font-medium">
          {fileLabel}
        </Text>
      </View>

      {/* Arrow */}
      <Ionicons name="chevron-forward" size={20} color="#CDCDE0" />
    </TouchableOpacity>
  );
};

export default NoteCard;