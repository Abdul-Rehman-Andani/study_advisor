import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/expo';
import { getGreeting } from '@/lib/date';

const Index = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 flex-row items-center mt-4 justify-between">
        <View className="flex-row items-center gap-4">
          <Image
            source={{ uri: user?.imageUrl || 'https://i.pravatar.cc/150?img=12' }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            resizeMode="cover"
          />
          <View>
            <Text >
              {getGreeting()} 👋 {"\n"} <Text className='text-xl font-bold '>{user?.firstName || user?.username}</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;