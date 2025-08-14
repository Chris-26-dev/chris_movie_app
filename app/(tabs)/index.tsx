import MovieCard from "@/components/MovieCard";
import PopularCard from "@/components/PopularCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { images } from "@/constants/images";
import { fetchGenres, fetchMovies } from "@/services/api";
import { getPopularMovies, getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView as RNScrollView, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  const router = useRouter();
  const isFirstRender = useRef(true);
  const scrollViewRef = useRef<RNScrollView>(null);
  const latestMoviesY = useRef(0);
  const currentScrollY = useRef(0);
  const selectedGenreRef = useRef<number | null>(null); // Add this ref

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // Update ref whenever state changes
  useEffect(() => {
    selectedGenreRef.current = selectedGenre;
  }, [selectedGenre]);

  // Create fetch function that uses the ref
  const fetchMoviesWithCurrentGenre = useCallback(() => {
    return fetchMovies({ query: "", genreId: selectedGenreRef.current });
  }, []);

  const {
    data: genres,
    loading: genresLoading,
    error: genresError,
    refetch: refetchGenres,
  } = useFetch(fetchGenres);

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
  } = useFetch(fetchMoviesWithCurrentGenre, false);

  // Refresh data when screen comes into focus (but not on first render)
  useFocusEffect(
    useCallback(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      refetchGenres();
      refetchTrending();
      refetchMovies();
      refetchPopular();
    }, [])
  );

  useEffect(() => {
    refetchMovies();
  }, [selectedGenre]);

  // Update your restore effect:
  useEffect(() => {
    AsyncStorage.getItem("selectedGenre").then((value) => {
      if (value !== null && value !== "") {
        const genreId = Number(value);
        setSelectedGenre(genreId);
        // Manually refetch with the restored genre
        setTimeout(() => {
          refetchMovies();
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              y: latestMoviesY.current + 100,
              animated: true,
            });
          }
        }, 500);
      }
    });
  }, []);

  const handleGenreSelect = async (genreId: number | null) => {
    setSelectedGenre(genreId);
    await AsyncStorage.setItem("selectedGenre", genreId === null ? "" : genreId.toString());

    const targetY = latestMoviesY.current + 100;
    const currentY = currentScrollY.current;
    const threshold = 100;

    if (Math.abs(currentY - targetY) > threshold) {
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            y: targetY,
            animated: true,
          });
        }
      }, 500);
    }
  };


  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        onScroll={event => {
          currentScrollY.current = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <View className="mt-12 mb-5 mx-auto" />

        <View className="flex-1 mt-5 ">
          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search for a movie"
          />

          {/* Most Reacted Movies */}
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

          {/* Trending Movies */}
          {trendingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
          ) : trendingError ? (
            <Text>Error: {trendingError.message}</Text>
          ) : trendingMovies && (
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

          {/* Latest Movies */}
          <Text
            className="text-lg text-white font-bold mt-5 mb-3"
            onLayout={e => {
              latestMoviesY.current = e.nativeEvent.layout.y;
            }}
          >
            Latest Movies
          </Text>

          {/* Genre Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => handleGenreSelect(null)}
              style={{
                backgroundColor: selectedGenre === null ? "#fff" : "#333",
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  color: selectedGenre === null ? "#222" : "#fff",
                  fontWeight: "bold",
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            {genres?.map((genre) => (
              <TouchableOpacity
                key={genre.id}
                onPress={() => handleGenreSelect(genre.id)}
                style={{
                  backgroundColor: selectedGenre === genre.id ? "#fff" : "#333",
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: selectedGenre === genre.id ? "#222" : "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ minHeight: 300 }}>
            {moviesLoading ? (
              <View style={{ alignItems: "center", justifyContent: "center", height: 200 }}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            ) : moviesError ? (
              <Text>Error: {moviesError.message}</Text>
            ) : movies && movies.length > 0 ? (
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
                contentContainerStyle={{ paddingBottom: 32 }}
                scrollEnabled={false}
              />
            ) : (
              <Text style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
                No movies found.
              </Text>
            )}
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
