import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);

  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google") => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (!createdSessionId || !setActive) {
        Alert.alert("Sign in failed");
        setLoadingStrategy(null);
        return;
      }

      await setActive({ session: createdSessionId });

      setLoadingStrategy(null);
    } catch (error) {
      console.log(error);
      Alert.alert("Google Sign In Failed");
      setLoadingStrategy(null);
    }
  };

  return { loadingStrategy, handleSocialAuth };
};

export default useSocialAuth;