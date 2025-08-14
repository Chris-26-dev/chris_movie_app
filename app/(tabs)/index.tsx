import MovieCard from "@/components/MovieCard";
import PopularCard from "@/components/PopularCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getPopularMovies, getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const isFirstRender = useRef(true);

  const {
    data: popularMovies,
    loading: popularLoading,
    error: popularError,
    refetch: refetchPopular,
  } = useFetch(getPopularMovies);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useFetch(() => fetchMovies({ query: "" }));

  // Refresh data when screen comes into focus (but not on first render)
  useFocusEffect(
    useCallback(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      refetchTrending();
      refetchMovies();
      refetchPopular();
    }, [])
  );


  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (

          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            {popularLoading ? (
              <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
            ) : popularError ? (
              <Text>Error: {popularError.message}</Text>
            ) : (
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Most Reacted Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={popularMovies}
                  renderItem={({ item, index }) => (
                    <PopularCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `popular-${item.movie_id}-${index}`}
                  contentContainerStyle={{ gap: 26 }}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </>
            )}


            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `trending-${item.movie_id}-${index}`}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item, index) => `movie-${item.id}-${index}`}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />

            </>
          </View>

        )}

      </ScrollView>
    </View>
  );
}
