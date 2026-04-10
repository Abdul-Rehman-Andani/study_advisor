import { ActivityIndicator, View, Platform, Text } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import React from "react";

import TabIcon from "@/components/TabIcon";
// Helper component for the Icon with a Dot


const TabLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#121212]">
        <ActivityIndicator size="large" color="#3ABEF9" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgray",
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        tabBarStyle: {
          backgroundColor: Colors.accent,
          borderRadius: 35,
          bottom: 40,
          marginHorizontal: 20,
          position: "absolute",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 20,
          paddingTop: 12,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home-sharp" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Planner",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="calendar-sharp" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="book-sharp" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="task"
        options={{
          title: "Tasks",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="checkmark-circle-sharp" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="person-sharp" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;