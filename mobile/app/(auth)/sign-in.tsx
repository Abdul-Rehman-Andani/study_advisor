import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "@/constants/icons";
import { Images } from "@/constants/images";
import useSocialAuth from "@/hooks/useSocialAuth";
import { useAuth } from "@clerk/expo";
import { api } from "@/api/axios"; // plain Axios instance

const SignIn = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();
  const { getToken } = useAuth(); // ✅ token only inside component

  const handleGoogleSignIn = async () => {
    try {
      // 1️⃣ Sign in with Google
      await handleSocialAuth("oauth_google");


      // 3️⃣ Call backend to sync user
     
    } catch (err) {
      console.error("Sign-in / sync failed:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={Images.signInBackground}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View className="flex-1 justify-end px-6 py-6">
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            disabled={loadingStrategy === "oauth_google"}
            className="border-2 border-white py-3 rounded-2xl bg-white/10"
          >
            {loadingStrategy === "oauth_google" ? (
              <ActivityIndicator size="small" color={"black"} />
            ) : (
              <View className="flex-row items-center justify-center gap-4">
                <Image source={Icons.googleIcon} className="w-7 h-7" />
                <Text className="text-lg font-semibold">Continue with Google</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;