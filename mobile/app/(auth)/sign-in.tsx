import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useSocialAuth from "@/hooks/useSocialAuth";

const SignIn = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const handleGoogleSignIn = () => {
    handleSocialAuth("oauth_google");
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={images.signInBackground}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View className="flex-1 justify-end px-6 py-6">
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            disabled={loadingStrategy === "oauth_google"}
            className="flex-row items-center justify-center gap-4 border-2 border-white py-3 rounded-2xl bg-white/10"
          >
            <Image source={icons.googleIcon} className="w-7 h-7" />

            <Text className="text-lg font-semibold text-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;