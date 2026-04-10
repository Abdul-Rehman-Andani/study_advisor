import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const TabIcon = ({ name, color, size, focused }: { name: any, color: string, size: number, focused: boolean }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      {/* The Dot Indicator */}
      {focused && (
        <View 
          style={{
            position: 'absolute',
            top: -18, // Adjust this to move the dot higher or lower
            width: 30,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: 'white', // Matches your active tint color
          }}
        />
      )}
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};

export default TabIcon;