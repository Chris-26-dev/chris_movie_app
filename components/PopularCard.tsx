import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import HeartButton from "./HeartButton";

const PopularCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: PopularCardProps) => {
  const movieData = { id: movie_id, title, poster_path: poster_url.replace('https://image.tmdb.org/t/p/w500', '') };

  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity
        className="w-32 relative pb-3"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 6 }}
      >
        <View className="relative">
          <Image
            source={{ uri: poster_url }}
            className="w-32 h-48 rounded-xl"
            resizeMode="cover"
          />

          <View className="absolute top-1 -left-1 w-10 h-10 items-center justify-center">
            <MaskedView
              maskElement={
                <View className="flex items-center justify-center w-10 h-10">
                  <Text className="font-extrabold text-white text-4xl drop-shadow-lg">
                    {index + 1}
                  </Text>
                </View>
              }
            >
              <Image
                source={images.rankingGradient}
                className="w-10 h-10 rounded-full"
                resizeMode="cover"
              />
            </MaskedView>
          </View>

          
          <View className="absolute top-2 right-2">
            <HeartButton movie={movieData} size="medium" />
          </View>
        </View>

        <Text
          className="text-base font-bold mt-3 text-white text-center"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default PopularCard;