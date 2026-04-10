import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "@/constants/icons";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import SearchBar from "@/components/SearchBar";
import { Colors } from "@/constants/colors";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";

// Hooks
import { useCourse } from "@/hooks/courses/useCourse";
import { useCreateNote } from "@/hooks/notes/useCreateNote";
import { useNotes } from "@/hooks/notes/useNotes";

// Components
import SkeletonLoader from "@/components/SkeletonLoader";
import NoteCard from "@/components/NoteCard";
import NoteSkeleton from "@/components/NoteSkeleton";
import * as DocumentPicker from "expo-document-picker";

const Course = () => {
  const { id } = useLocalSearchParams();
  const courseId = Array.isArray(id) ? id[0] : id;

  // Data Fetching
  const { data: course, isPending: courseLoading } = useCourse(
    courseId as string,
  );
  const { data: notes, isLoading: notesLoading } = useNotes(courseId as string);
  const { mutate: createNote, isPending: isUploading } = useCreateNote();

  // Form State
  const [isModalActive, setIsModalActive] = useState(false);
  const [form, setForm] = useState({
    title: "",
    file: null as DocumentPicker.DocumentPickerAsset | null,
  });

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword", "image/*"],
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setForm((prev) => ({ ...prev, file: result.assets[0] }));
    }
  };

  const handleOpenResource = async (fileUrl: string) => {
    try {
      await WebBrowser.openBrowserAsync(fileUrl);
    } catch (error) {
      alert("Could not open the file. Please try again.");
    }
  };

  const handleUpload = () => {
    if (!form.title || !form.file) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("courseId", courseId as string);

    const filePayload = {
      uri:
        Platform.OS === "ios"
          ? form.file.uri.replace("file://", "")
          : form.file.uri,
      name: form.file.name || `note_${Date.now()}.pdf`,
      type: form.file.mimeType || "application/pdf",
    };

    formData.append("file", filePayload as any);

    createNote(formData, {
      onSuccess: () => {
        setForm({ title: "", file: null });
        setIsModalActive(false);
        alert("Note uploaded successfully!");
      },
      onError: (err: any) => {
        alert(err.response?.data?.message || "Upload failed");
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="py-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={Icons.backArrowIcon}
                className="size-10"
                tintColor={Colors.primary}
              />
            </TouchableOpacity>
            {courseLoading ? (
              <SkeletonLoader className="w-32 h-6" />
            ) : (
              <Text className="font-bold text-xl text-primary">
                {course?.title}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setIsModalActive(true)}
            className="bg-[#8C6E5E] w-12 h-12 rounded-2xl items-center justify-center shadow-lg"
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <SearchBar />

        {/* Notes List Section */}
        <View className="flex-1 mt-6">
          <Text className="text-gray-400 font-bold mb-4 uppercase text-[10px] tracking-widest">
            Course Documents
          </Text>

          {notesLoading ? (
            <View className="mt-2">
              {[1, 2, 3, 4].map((item) => (
                <NoteSkeleton key={item} />
              ))}
            </View>
          ) : (
            <FlatList
              data={notes}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => (
                <NoteCard
                  title={item.title}
                  fileType={item.file}
                  onPress={() => handleOpenResource(item.file)}
                />
              )}
              ListEmptyComponent={() => (
                <View className="items-center justify-center mt-20 opacity-30">
                  <Ionicons name="documents-outline" size={80} color="gray" />
                  <Text className="text-gray-500 mt-2 font-medium">
                    No resources found
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>

      {/* Modal for Uploading */}
      <Modal visible={isModalActive} animationType="slide" transparent>
        <View className="flex-1 justify-end">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => !isUploading && setIsModalActive(false)}
            className="absolute inset-0 bg-black/40"
          />

          <View className="bg-white p-8 rounded-t-[40px] min-h-[450px] shadow-2xl">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mb-8" />
            <Text className="text-2xl font-bold text-gray-800 mb-6">
              Upload Note
            </Text>

            <View className="mb-6">
              <Text className="text-gray-500 font-semibold mb-2 ml-1">
                Note Title
              </Text>
              <TextInput
                placeholder="e.g. Chapter 1 Summary"
                value={form.title}
                editable={!isUploading}
                onChangeText={(t) => setForm((p) => ({ ...p, title: t }))}
                className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-800"
              />
            </View>

            <View className="mb-8">
              <Text className="text-gray-500 font-semibold mb-2 ml-1">
                Attachment (PDF / Image only)
              </Text>
              <TouchableOpacity
                onPress={handlePickDocument}
                disabled={isUploading}
                className="border-2 border-dashed border-gray-200 bg-gray-50 p-6 rounded-2xl items-center"
              >
                <Ionicons
                  name={form.file ? "document-attach" : "cloud-upload-outline"}
                  size={32}
                  color="#8C6E5E"
                />
                <Text className="mt-2 text-gray-600 font-medium text-center">
                  {form.file ? form.file.name : "Select PDF, Doc, or Image"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleUpload}
              disabled={isUploading}
              className={`py-4 rounded-2xl items-center shadow-sm ${isUploading ? "bg-gray-400" : "bg-[#8C6E5E]"}`}
            >
              {isUploading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Upload Note
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Course;
