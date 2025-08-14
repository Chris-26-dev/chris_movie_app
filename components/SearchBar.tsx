import { Image, TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-lg px-5 py-2">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#4DA6FF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#66B2FF"
      />
    </View>
  );
};

export default SearchBar;