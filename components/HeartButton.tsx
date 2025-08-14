import { getMovieLikes, removeMovieLike, updateMovieLikes } from "@/services/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface HeartButtonProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
    };
    size?: "small" | "medium" | "large";
}

const HeartButton = ({ movie, size = "small" }: HeartButtonProps) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLikes();
        checkLocalReacted();
    }, [movie.id]);

    const loadLikes = async () => {
        try {
            const likesCount = await getMovieLikes(movie.id);
            setLikes(likesCount);
        } catch (error) {
            console.error("Error loading likes:", error);
        }
    };

    const checkLocalReacted = async () => {
        try {
            const reacted = await AsyncStorage.getItem(`reacted_${movie.id}`);
            setIsLiked(!!reacted);
        } catch (error) {
            setIsLiked(false);
        }
    };

    const handleLike = async () => {
        if (loading) return;
        setLoading(true);
        try {
            if (isLiked) {
                await removeMovieLike(movie.id);
                setLikes(prev => (prev > 0 ? prev - 1 : 0));
                setIsLiked(false);
                await AsyncStorage.removeItem(`reacted_${movie.id}`);
            } else {
                await updateMovieLikes(movie);
                setLikes(prev => prev + 1);
                setIsLiked(true);
                await AsyncStorage.setItem(`reacted_${movie.id}`, "true");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setLoading(false);
        }
    };

    const heartSize = size === "large" ? "text-lg" : size === "medium" ? "text-md" : "text-sm";
    const containerSize = size === "large" ? "px-3 py-2" : size === "medium" ? "px-2 py-1" : "px-1 py-0.5";

    return (
        <TouchableOpacity
            onPress={handleLike}
            className={`flex-row items-center bg-black/60 rounded-full ${containerSize}`}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <>
                    <Text className={`${heartSize} ${isLiked ? 'text-red-500' : 'text-white'}`}>
                        {isLiked ? '❤️' : '🤍'}
                    </Text>
                    {likes > 0 && (
                        <Text className="text-white text-xs ml-1">{likes}</Text>
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

export default HeartButton;