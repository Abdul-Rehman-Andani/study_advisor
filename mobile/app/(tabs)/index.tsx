import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";
import { getGreeting } from "@/lib/time";
import { Link, router } from "expo-router";
import { useTotalStats } from "@/hooks/stats/useTotalStats"; 
import { useTodayPlans } from "@/hooks/plans/useTodayPlan"; 
import { useCourses } from "@/hooks/courses/useCourses"; 
import CourseCard from "@/components/CourseCard"; 
import SkeletonLoader from "@/components/SkeletonLoader";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const { user } = useUser();
  const { data: stats, isLoading: statsLoading } = useTotalStats();
  const { data: todayPlans, isLoading: plansLoading } = useTodayPlans();
  const { data: courses, isLoading: coursesLoading } = useCourses();

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView className="flex-1 px-4 bg-background" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View className="flex-row items-center mt-4 justify-between">
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: user?.imageUrl || "https://i.pravatar.cc/150?img=12" }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
              resizeMode="cover"
            />
            <View>
              <Link href={"/profile"}>
                <Text className="text-secondary">{getGreeting()} 👋</Text>
                {"\n"}
                <Text className="text-xl font-bold text-foreground">
                  {user?.firstName || user?.lastName || "User"}
                </Text>
              </Link>
            </View>
          </View>
        </View>

        {/* 1. QUICK STATS SECTION - Matching CourseCard Style */}
        <View className="flex-row items-center justify-between gap-3 mt-8">
          <View className="flex-1 bg-white rounded-3xl p-5 border border-[#F4F1F0] shadow-sm shadow-[#8C6E5E]/10 elevation-3">
            <View className="flex-row justify-between items-center mb-4">
              <View className="bg-[#8C6E5E]/10 p-2.5 rounded-2xl">
                <Ionicons name="journal-outline" size={20} color="#8C6E5E" />
              </View>
            </View>
            <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Courses</Text>
            {statsLoading ? (
              <SkeletonLoader className="w-16 h-8 mt-1" />
            ) : (
              <Text className="text-3xl font-black text-gray-900">{stats?.totalCourses || 0}</Text>
            )}
          </View>
          
          <View className="flex-1 bg-white rounded-3xl p-5 border border-[#F4F1F0] shadow-sm shadow-[#8C6E5E]/10 elevation-3">
            <View className="flex-row justify-between items-center mb-4">
              <View className="bg-[#8C6E5E]/10 p-2.5 rounded-2xl">
                <Ionicons name="list-outline" size={20} color="#8C6E5E" />
              </View>
            </View>
            <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Tasks</Text>
            {statsLoading ? (
              <SkeletonLoader className="w-16 h-8 mt-1" />
            ) : (
              <Text className="text-3xl font-black text-gray-900">{stats?.totalTasks || 0}</Text>
            )}
          </View>
        </View>

        {/* 2. TODAY'S SCHEDULE - Matching CourseCard Style */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-black text-gray-900">Today's Schedule</Text>
            <Text className="text-secondary text-xs font-bold">Upcoming</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            {plansLoading ? (
              [1, 2].map((i) => <SkeletonLoader key={i} className="w-72 h-36 mr-4 rounded-3xl" />)
            ) : todayPlans?.length > 0 ? (
                todayPlans.map((item: any) => (
                  <TouchableOpacity 
                    key={item._id} 
                    activeOpacity={0.9}
                    className="bg-white p-5 mr-4 rounded-3xl border border-[#F4F1F0] shadow-sm shadow-[#8C6E5E]/10 elevation-3" 
                    style={{ width: 280 }}
                  >
                    <View className="flex-row justify-between items-start mb-4">
                      <View className="bg-[#8C6E5E]/10 p-2.5 rounded-2xl">
                        <Ionicons name="calendar-outline" size={20} color="#8C6E5E" />
                      </View>
                      <View className="bg-[#F4F1F0] px-3 py-1 rounded-full">
                        <Text className="text-[#8C6E5E] text-[10px] font-bold uppercase tracking-wider">
                          {formatTime(item.start)}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-xl font-bold text-gray-800 mb-1" numberOfLines={1}>{item.title}</Text>
                    <Text className="text-gray-400 text-xs mb-4" numberOfLines={2}>
                      {item.summary || "No description provided"}
                    </Text>
                  </TouchableOpacity>
                ))
            ) : (
                <View className="w-72 h-32 items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                   <Text className="text-gray-400 font-medium">No plans for today</Text>
                </View>
            )}
          </ScrollView>
        </View>

        {/* 3. YOUR COURSES SECTION - Horizontal Slider */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-black text-gray-900">Your Courses</Text>
            <TouchableOpacity onPress={() => router.push("/courses")}>
              <Text className="text-secondary font-bold text-sm">View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            {coursesLoading ? (
              [1, 2].map((i) => <SkeletonLoader key={i} className="w-64 h-48 mr-4 rounded-3xl" />)
            ) : courses?.length > 0 ? (
              courses.map((item: any) => (
                <View key={item._id} style={{ width: 280, marginRight: 16 }}>
                  <CourseCard course={item} />
                </View>
              ))
            ) : (
              <View style={{ width: 300 }} className="h-40 bg-white border border-dashed border-gray-200 rounded-3xl items-center justify-center">
                <Text className="text-gray-400 font-medium">No courses added yet</Text>
              </View>
            )}
          </ScrollView>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;