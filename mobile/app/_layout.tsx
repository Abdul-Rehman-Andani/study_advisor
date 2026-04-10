import { ClerkProvider, ClerkLoaded } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import "../global.css";

// KEEP THIS OUTSIDE - DO NOT REMOVE
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore errors */
});

const queryClient = new QueryClient();

export default function RootLayout(): React.ReactElement {

  useEffect(() => {
    async function prepare() {
      try {
        // Give the native splash screen a moment to actually mount
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the splash screen to go away
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name='(auth)' />
            <Stack.Screen name='(tabs)' />
          </Stack>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}