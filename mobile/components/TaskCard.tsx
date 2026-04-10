import { Colors } from "@/constants/colors";
import { Icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";

const colors = [
  "bg-note-mint",
  "bg-note-purple",
  "bg-note-blue",
  "bg-note-peach",
  "bg-note-pink",
];

const rotations = ["-rotate-3", "-rotate-2", "rotate-2", "rotate-3"];

// Just the positions, nothing else changed
const pinPositions = [
     "top-[-20px] left-1/2",
     "top-[-20px] left-1/3",
      "top-[-20px] right-1/3",
      "top-[-20px] right-1/2",
      "top-[-20px] left-5",
      "top-[-20px] right-5",

];

const TaskCard = ({ task, onPress }: any) => {
  const seed = task._id
    ? task._id.charCodeAt(task._id.length - 1)
    : task.title.length;

  const color = colors[seed % colors.length];
  const rotate = rotations[seed % rotations.length];
  
  // Pick the position based on the same seed
  const pinStyle = pinPositions[seed % pinPositions.length];

  return (
    <Pressable className="items-center ">
      <View
        className={`w-[90%] px-5 py-7 rounded-sm mt-10 relative shadow-md ${color} ${rotate}`}
      >
        {/* ONLY THIS LINE CHANGED: Added pinStyle */}
        <Image 
          source={Icons.pinIcon} 
          className={`absolute size-10 ${pinStyle}`} 
        />

        {/* Title */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold mb-4 text-gray-800">
            {task.title}
          </Text>
          <Text className="text-primary uppercase text-sm font-medium italic">
            {task.status}
          </Text>
        </View>

        {/* Description */}
        {task.description && (
          <Text className="text-sm text-gray-600 mb-4" numberOfLines={3}>
            {task.description}
          </Text>
        )}

        <View className="flex-row justify-between items-center">
          {/* Date */}
          <Text className="text-right font-bold italic text-gray-700 text-sm">
            {task.$createdAt
              ? new Date(task.$createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
          </Text>
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="trash" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default TaskCard;