import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

const TabLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  // If user not signed in → go to auth
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* example screens */}
      <Tabs.Screen name="index" />
    </Tabs>
  );
};

export default TabLayout;