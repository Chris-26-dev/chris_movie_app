import { icons } from "@/constants/icons";
import { getPopularMovies } from "@/services/appwrite";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const [heartedMovies, setHeartedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getPopularMovies().then(movies => {
        setHeartedMovies(movies.filter(m => m.likes > 0));
        setLoading(false);
      });
    }, [])
  );

  return (
    <SafeAreaView className="bg-primary flex-1 px-5">
      <View className="flex flex-col items-center mt-10 mb-4">
        <Image source={icons.save} style={{ width: 40, height: 40, marginBottom: 8 }} tintColor="#fff" />
        <Text style={{ color: "#A8B5DB", fontSize: 22, fontWeight: "bold", marginBottom: 2 }}>Saved Movies</Text>
        <Text style={{ color: "#7C8DB5", fontSize: 14 }}>Your hearted collection</Text>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Loading...</Text>
        </View>
      ) : heartedMovies.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 16 }}>No hearted movies yet.</Text>
        </View>
      ) : (
        <FlatList
          data={heartedMovies}
          keyExtractor={item => item.movie_id.toString()}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10 }} />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#223A5F",
                borderRadius: 16,
                padding: 14,
                marginBottom: 2,
                borderWidth: 1,
                borderColor: "#353B4A",
              }}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.poster_url }}
                style={{
                  width: 65,
                  height: 95,
                  borderRadius: 12,
                  marginRight: 18,
                  backgroundColor: "#444",
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                  <Text style={{ fontSize: 18, marginRight: 6, color: "#FF4C6E" }}>❤️</Text>
                  <Text style={{ color: "#FF4C6E", fontSize: 15, fontWeight: "600" }}>
                    {item.likes} {item.likes === 1 ? "heart" : "hearts"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Save;