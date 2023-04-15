import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Button, Dimensions, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledInterest, StyledSave } from "../styles/screens/ProfileScreen";

const PreferenceScreen = () => {
    const navigation = useNavigation();
    // const SCREENHEIGHT = (Dimensions.get('window').height) -85;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const interests = ["Start up", "Adventure", "Trekking", "Scuba Diving", "Food Festival", "Mountain Biking","Web3","Fried Chicken", "Action Movie", "Block Chain", "Solana","Rust","Programming","Academy", "Cryptograpy", "Bussiness"]

    const[isActive,setIsActive] = useState(interests.map(()=> false));
    const handlePress =(index)=> {

        setIsActive((prevState)=> {
            const newStates = [...prevState];
            newStates[index] = !newStates[index];
            return newStates;
        });
    }
    return (
      <View className="flex-1">
        <SafeAreaView className="h-0" />
        <View>
          <Text className="text-center text-2xl font-bold ">
            Tell us about your interests
          </Text>
        </View>
        <View className="flex-row flex-wrap mt-10 justify-center">
            {interests.map((interest,index) => {
              return (
                  <TouchableOpacity key={index} onPress={()=> handlePress(index)}>
                      <StyledInterest isActive={isActive[index]}>
                    <Text className="text-white px-3 text-base font-bold">
                      {interest}
                    </Text>
                </StyledInterest>
                  </TouchableOpacity>
              );
            })}
        </View >
        <StyledSave >
            <TouchableOpacity className="w-full flex-1" onPress={()=> navigation.navigate("Profile")}>
                <Text className="text-center text-2xl pt-2 text-white font-bold">Save</Text>
            </TouchableOpacity>
        </StyledSave>
      </View>
    );

}

export default PreferenceScreen;