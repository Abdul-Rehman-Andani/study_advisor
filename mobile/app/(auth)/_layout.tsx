import React from "react";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  // If user already signed in → go to tabs
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;