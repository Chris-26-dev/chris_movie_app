import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const REACTIONS_ID = process.env.EXPO_PUBLIC_APPWRITE_REACTIONS_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

// Fixed the movie parameter type
export const updateMovieLikes = async (movie: { id: number; title: string; poster_path: string }) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, REACTIONS_ID, [
      Query.equal("movie_id", movie.id),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        REACTIONS_ID,
        existingMovie.$id,
        {
          likes: (existingMovie.likes || 0) + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, REACTIONS_ID, ID.unique(), {
        movie_id: movie.id,
        title: movie.title,
        likes: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating movie likes:", error);
    throw error;
  }
};

export const getMovieLikes = async (movieId: number): Promise<number> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, REACTIONS_ID, [
      Query.equal("movie_id", movieId),
    ]);

    if (result.documents.length > 0) {
      return result.documents[0].likes || 0;
    }
    return 0;
  } catch (error) {
    console.error("Error getting movie likes:", error);
    return 0;
  }
};

export const getPopularMovies = async (): Promise<any[]> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, REACTIONS_ID, [
      Query.orderDesc("likes"),
      Query.limit(10), // Adjust limit as needed
    ]);
    return result.documents;
  } catch (error) {
    console.error("Error getting popular movies:", error);
    return [];
  }
};

export const removeMovieLike = async (movieId: number) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, REACTIONS_ID, [
      Query.equal("movie_id", movieId),
    ]);
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      const newLikes = Math.max((existingMovie.likes || 1) - 1, 0);

      if (newLikes === 0) {
        await database.deleteDocument(DATABASE_ID, REACTIONS_ID, existingMovie.$id);
      } else {
        await database.updateDocument(
          DATABASE_ID,
          REACTIONS_ID,
          existingMovie.$id,
          {
            likes: newLikes,
          }
        );
      }
    }
  } catch (error) {
    console.error("Error removing movie like:", error);
  }
};