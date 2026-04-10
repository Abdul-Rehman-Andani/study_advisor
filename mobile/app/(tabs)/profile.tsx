import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, 
  Modal, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import SettingsItem from '@/components/SetttingItem';

// Hooks
import { useEducation } from "@/hooks/education/useEducation"; 
import { useCreateEducation } from "@/hooks/education/useCreateEducation"; 
import { useUpdateEducation } from "@/hooks/education/useUpdateEducation"; 

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  // API Hooks
  const { data: education, isLoading } = useEducation();
  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();

  // State
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [tempInfo, setTempInfo] = useState({ 
    university: "", 
    program: "", 
    semester: "" 
  });

  // Sync data to modal when opened
  useEffect(() => {
    if (isEditModalVisible && education) {
      setTempInfo({
        university: education.university || "",
        program: education.program || "",
        semester: education.semester || ""
      });
    }
  }, [isEditModalVisible, education]);

  const handleSave = () => {
    const action = education ? updateEducation : createEducation;

    action.mutate(tempInfo, {
      onSuccess: () => setIsEditModalVisible(false),
      onError: (error: any) => {
        console.error("Profile Update Failed:", error?.response?.data?.message || error.message);
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} className="px-6">
        
        {/* HEADER */}
        <View className="flex-row justify-between items-center py-6">
          <Text className="text-2xl font-black text-gray-900 ">Profile</Text>
          <TouchableOpacity 
            onPress={() => signOut()} 
            className="bg-red-50 px-5 py-2.5 rounded-2xl"
          >
            <Text className="text-red-500 font-bold">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* AVATAR SECTION */}
        <View className="items-center mb-10 mt-2">
          <Image
            source={{ uri: user?.imageUrl || "https://i.pravatar.cc/150?img=12" }}
            className="w-32 h-32 rounded-full border-4 border-gray-50"
          />
          <Text className="mt-5 text-2xl font-black text-gray-900">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className="text-gray-400 font-medium tracking-wide">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        {/* ACADEMIC SECTION (CourseCard Style) */}
        <Text className="text-gray-400 font-black text-[10px] uppercase tracking-[2px] mb-4 ml-1">
          Education Details
        </Text>

        {education || isLoading ? (
          <View 
            className="w-full bg-white rounded-3xl p-6 mb-8 border border-[#F4F1F0]"
            style={{
              shadowColor: "#8C6E5E",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 3, 
            }}
          >
            {/* Top Row: Visual branding matching CourseCard */}
           
            {/* Content rows */}
            <SettingsItem 
              icon="business-outline" 
              title="Institution" 
              value={education?.university} 
              isLoading={isLoading}
              onPress={() => setIsEditModalVisible(true)}
            />
            <SettingsItem 
              icon="book-outline" 
              title="Major / Program" 
              value={education?.program} 
              isLoading={isLoading}
              onPress={() => setIsEditModalVisible(true)}
            />
            <SettingsItem 
              icon="calendar-outline" 
              title="Current Semester" 
              value={education?.semester} 
              isLoading={isLoading}
              isLast={true}
              onPress={() => setIsEditModalVisible(true)}
            />
          </View>
        ) : (
          /* Empty State (Styled like a placeholder CourseCard) */
          <TouchableOpacity 
            onPress={() => setIsEditModalVisible(true)}
            activeOpacity={0.8}
            className="w-full bg-white rounded-3xl p-10 mb-8 border-2 border-dashed border-[#F4F1F0] items-center"
          >
            <View className="bg-[#8C6E5E]/5 p-4 rounded-full mb-3">
              <Ionicons name="school" size={30} color="#8C6E5E" />
            </View>
            <Text className="text-gray-900 font-bold text-lg">Setup Education</Text>
            <Text className="text-gray-400 text-center text-xs mt-2 px-4">
              Add your university details to unlock personalized study plans.
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* EDIT MODAL */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          className="flex-1"
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => !createEducation.isPending && setIsEditModalVisible(false)} 
            className="flex-1 bg-black/40 justify-end"
          >
            <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-[50px] p-10 pb-16">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-black text-gray-900">Academic Info</Text>
                <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color="#F3F4F6" />
                </TouchableOpacity>
              </View>

              <View>
                <View className="mb-5">
                  <Text className="text-gray-400 font-black text-[10px] uppercase mb-2 ml-2">University Name</Text>
                  <TextInput
                    placeholder="e.g. SZABIST"
                    value={tempInfo.university}
                    onChangeText={(text) => setTempInfo({...tempInfo, university: text})}
                    className="bg-gray-50 p-5 rounded-2xl border border-gray-100 font-bold text-gray-800"
                  />
                </View>

                <View className="mb-5">
                  <Text className="text-gray-400 font-black text-[10px] uppercase mb-2 ml-2">Program / Major</Text>
                  <TextInput
                    placeholder="e.g. BS Computer Science"
                    value={tempInfo.program}
                    onChangeText={(text) => setTempInfo({...tempInfo, program: text})}
                    className="bg-gray-50 p-5 rounded-2xl border border-gray-100 font-bold text-gray-800"
                  />
                </View>

                <View className="mb-8">
                  <Text className="text-gray-400 font-black text-[10px] uppercase mb-2 ml-2">Semester</Text>
                  <TextInput
                    placeholder="e.g. 4th"
                    value={tempInfo.semester}
                    onChangeText={(text) => setTempInfo({...tempInfo, semester: text})}
                    className="bg-gray-50 p-5 rounded-2xl border border-gray-100 font-bold text-gray-800"
                  />
                </View>

                <TouchableOpacity 
                  onPress={handleSave}
                  disabled={createEducation.isPending || updateEducation.isPending}
                  className="bg-[#8C6E5E] py-5 rounded-[25px] items-center shadow-lg shadow-[#8C6E5E]/40"
                >
                  {createEducation.isPending || updateEducation.isPending ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-black text-lg uppercase tracking-widest">
                      {education ? "Update Profile" : "Save Details"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;