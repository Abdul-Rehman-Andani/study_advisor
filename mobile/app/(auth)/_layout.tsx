import React from "react";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // 1. If Clerk is still checking the session, show NOTHING.
  // This stops the Sign-In screen from flashing.
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // 2. If already signed in, go straight to tabs
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  // 3. ONLY show the sign-in screens if we are 100% sure they are logged out
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;