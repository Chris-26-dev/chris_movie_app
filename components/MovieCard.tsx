import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-4 rounded-lg overflow-hidden bg-dark-200">
        {/* Poster with gradient overlay */}
        <View className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x900/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-64"
            resizeMode="cover"
          />

          {/* Gradient fade at the bottom */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 90,
              padding: 8,
              justifyContent: "flex-end",
            }}
          >
            <Text
              className="text-white font-bold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>

            {/* Rating + Year row */}
            <View className="flex-row items-center justify-between mt-1">
              <View className="flex-row items-center gap-x-1">
                <Image source={icons.star} className="size-3" />
                <Text className="text-xs text-white font-semibold">
                  {(vote_average / 2).toFixed(1)} / 5
                </Text>
              </View>
              <Text className="text-xs text-light-300 font-bold">
                {release_date?.split("-")[0]}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
