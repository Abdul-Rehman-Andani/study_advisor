import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Calendar } from "react-native-big-calendar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

// --- CUSTOM HOOKS ---
import { useCreatePlan } from "@/hooks/plans/useCreatePlan";
import { useGetPlans } from "@/hooks/plans/usePlans";

const CalendarScreen = () => {
  // 1. DATA & SYNC STATE
  const { data: plans, isLoading, refetch, isRefetching } = useGetPlans();
  const { mutate: createPlan, isPending: isCreating } = useCreatePlan();

  // 2. CALENDAR NAVIGATION STATE
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalActive, setIsModalActive] = useState(false);

  // 3. FORM STATE
  const [taskTitle, setTaskTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(dayjs().add(1, "hour").toDate());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Memoize events to ensure the calendar only re-renders when data actually changes
  const events = useMemo(() => plans || [], [plans]);

  // 4. LOGIC: CREATE TASK
  const handleCreateTask = () => {
    if (!taskTitle) return alert("Please add a title");

    // Merge the visible calendar date with the picked time
    const finalStart = dayjs(currentDate)
      .hour(dayjs(startTime).hour())
      .minute(dayjs(startTime).minute())
      .toDate();

    const finalEnd = dayjs(currentDate)
      .hour(dayjs(endTime).hour())
      .minute(dayjs(endTime).minute())
      .toDate();

    createPlan(
      {
        title: taskTitle,
        summary: summary,
        start: finalStart,
        end: finalEnd,
      },
      {
        onSuccess: () => {
          setIsModalActive(false);
          setTaskTitle("");
          setSummary("");
        },
        onError: () => alert("Failed to save task. Check backend connection."),
      },
    );
  };

  // 5. NAVIGATION HELPERS
  const goToToday = () => setCurrentDate(new Date());
  const nextDay = () =>
    setCurrentDate(dayjs(currentDate).add(1, "day").toDate());
  const prevDay = () =>
    setCurrentDate(dayjs(currentDate).subtract(1, "day").toDate());

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* APP BAR */}
      <View className="flex-row items-center justify-between py-6 px-5">
        <View>
          <Text className="text-gray-400 text-sm font-medium">My Learning</Text>
          <Text className="text-3xl font-bold text-[#2D2D2D]">Tasks</Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsModalActive(true)}
          activeOpacity={0.7}
          className="bg-[#8C6E5E] w-12 h-12 rounded-2xl items-center justify-center shadow-lg shadow-[#8C6E5E]/40"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* DATE SELECTOR HEADER */}
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-gray-50">
        <View>
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {dayjs(currentDate).format("dddd")}
          </Text>
          <Text className="text-xl font-bold text-gray-800">
            {dayjs(currentDate).format("MMM D, YYYY")}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={prevDay} className="p-2">
            <Ionicons name="chevron-back" size={24} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goToToday}
            className="px-4 py-1.5 bg-gray-100 rounded-full"
          >
            <Text className="text-[10px] font-black text-gray-500">TODAY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextDay} className="p-2">
            <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* TIMELINE CALENDAR WITH REFRESH */}
      <View className="flex-1">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#8C6E5E" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor="#8C6E5E"
                colors={["#8C6E5E"]}
              />
            }
          >
            <Calendar
              events={events}
              height={700} // Fixed height is required inside ScrollView
              mode="day"
              date={currentDate}
              onChangeDate={(date) => {
                if (date instanceof Date) setCurrentDate(date);
              }}
              hourRowHeight={100}
              swipeEnabled={true}
              eventCellStyle={() => ({
                backgroundColor: "#8C6E5E",
                borderRadius: 12,
                padding: 10,
                borderLeftWidth: 5,
                borderLeftColor: "rgba(0,0,0,0.1)",
              })}
              headerContainerStyle={{ height: 0, opacity: 0 }}
            />
          </ScrollView>
        )}
      </View>

      {/* ADD TASK MODAL */}
      <Modal
        visible={isModalActive}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalActive(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsModalActive(false)}
            className="flex-1 bg-black/40 justify-end"
          >
            <TouchableOpacity
              activeOpacity={1}
              className="bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl"
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center mb-8">
                  <Text className="text-2xl font-bold text-gray-900">
                    New Task
                  </Text>
                  <TouchableOpacity onPress={() => setIsModalActive(false)}>
                    <Ionicons name="close-circle" size={32} color="#F3F4F6" />
                  </TouchableOpacity>
                </View>

                <View className="space-y-6">
                  {/* Title */}
                  <View>
                    <Text className="text-gray-400 font-bold text-[10px] uppercase mb-2 ml-1">
                      Title
                    </Text>
                    <TextInput
                      placeholder="e.g. Automata Assignment"
                      value={taskTitle}
                      onChangeText={setTaskTitle}
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-100 font-medium"
                    />
                  </View>

                  {/* Notes */}
                  <View>
                    <Text className="text-gray-400 font-bold text-[10px] uppercase mb-2 ml-1">
                      Notes
                    </Text>
                    <TextInput
                      placeholder="Optional details..."
                      value={summary}
                      onChangeText={setSummary}
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                    />
                  </View>

                  {/* Time Pickers */}
                  <View className="flex-row space-x-4">
                    <TouchableOpacity
                      onPress={() => setShowStartPicker(true)}
                      className="flex-1"
                    >
                      <Text className="text-gray-400 font-bold text-[10px] uppercase mb-2 ml-1">
                        Starts
                      </Text>
                      <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <Text className="text-gray-800 font-medium">
                          {dayjs(startTime).format("hh:mm A")}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setShowEndPicker(true)}
                      className="flex-1"
                    >
                      <Text className="text-gray-400 font-bold text-[10px] uppercase mb-2 ml-1">
                        Ends
                      </Text>
                      <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <Text className="text-gray-800 font-medium">
                          {dayjs(endTime).format("hh:mm A")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                    onPress={handleCreateTask}
                    disabled={isCreating}
                    className="bg-[#8C6E5E] py-4 rounded-2xl items-center mt-4 shadow-md"
                  >
                    {isCreating ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white font-bold text-lg">
                        Save Task
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {/* NATIVE PICKERS */}
        {showStartPicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            is24Hour={false}
            onChange={(e, d) => {
              setShowStartPicker(false);
              if (d) setStartTime(d);
            }}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            is24Hour={false}
            onChange={(e, d) => {
              setShowEndPicker(false);
              if (d) setEndTime(d);
            }}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default CalendarScreen;
