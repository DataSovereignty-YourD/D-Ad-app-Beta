import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  RefreshControl,
} from "react-native";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import Categeries from "../components/Categories";
import axios from "axios";
import AdCard from "../components/AdCard";
import { VStack } from "native-base";
import Constants from "expo-constants"; //현재 단말기의 시스템 정보를 불러오기 위함
import { ProfileButton, StyldWebView } from "../styles/screens/ProfileScreen";
import WebView from "react-native-webview";
import getDistance from "../functions/getDistance";
import * as Location from "expo-location";

function AdsView(adsList) {
  if (adsList === null || adsList === undefined) return <Text className="text-center text-4xl font-bold text-red-500">Not Exist Advertisment</Text>;
  return adsList.map((ads, index) => {
    return (
      <AdCard
        key={index}
        id={123}
        imgUrl={ads.AdsCid}
        title={ads.Title}
        rating={4.5}
        genre={ads.Category}
        address="123 Main St"
        short_description={ads.Description}
        dishes={ads.Position}
        long={ads.StoreLocation[0].lng}
        lat={ads.StoreLocation[0].lat}
        reward={ads.RpP}
      />
    );
  });
}

const MyAdsScreen = () => {
  const navigation = useNavigation();
  const { manifest } = Constants;
  const [adsList, setAdsList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const webViewRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function CallAds() {
    axios
      .post(
        `http://${manifest.debuggerHost
          .split(":")
          .shift()}:8000/adslist/getads`,
        { Account: "6xZw2r77fqQcbVZRAeR4CN4HfCKqUX4Bcd8zvKh5Wsux" }
      )
      .then((res) => {
        console.log(res);
        setAdsList(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function onRefresh() {
		handleSearch()
	}
  
  const handleSearch = async () => {
	  let { status } = await Location.requestForegroundPermissionsAsync();
	  if (status !== "granted") {
		console.log("Permission to access location was denied");
		return;
	  }
	  let location = await Location.getCurrentPositionAsync({});
	  // const currentLocation = `${location.coords.latitude}, ${location.coords.longitude} ${location.timestamp}`;
	  const currentLocation = [
		location.coords.latitude,
		location.coords.longitude,
	  ];
  
	  console.log(currentLocation);
	  // setCurrentLocation(currentLocation);
	  // setSearchTerms([...searchTerms, currentLocation]);
	  setCurrentLocation(currentLocation);
	};

  const handleInject = async () => {
    if (!currentLocation || !webViewRef.current) {
      return;
    }
      const distance = getDistance([37.6232355, 127.060386], currentLocation);
      console.log(distance);
      injectedJavaScript = `
			var input = document.getElementById('CurrentLocationInput');
			input.value = '${distance} ';
			var button = document.getElementById('Verify_Button');
      		button.click();
		`;
    webViewRef.current.injectJavaScript(injectedJavaScript);
	setTimeout(()=> {
		CallAds();
	},3000);
  };

  return (
    <View className="h-screen">
      <SafeAreaView style={{ backgroundColor: "white" }} />
      {/* {Header} */}
      <View className="h-full">
        <View className="flex-row pt-5 pb-3 items-center mx-4 space-x-2 justify-between relative">
          <Text className="font-bold text-xl">My Ads</Text>
          <View className="flex-row h-full">
            <View className="px-4">
              <Icon name="search1" type="antdesign" size={20} />
            </View>
            <Icon name="bell" type="feather" size={20} />
          </View>
        </View>
        <Categeries />
        {/* {Body} */}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          {/* {Categories} */}

          <View>
            <Text className="px-4 pt-3 mb-3 font-bold text-xl">Videos</Text>
          </View>

          <VStack mx={-1} space={2}>
            {AdsView(adsList)}
          </VStack>
        </ScrollView>
        <View className="h-16 absolute inset-x-0 bottom-32 border ">
          <Button  title="Get Current Location" onPress={handleInject} />
        </View>
        <StyldWebView className="h-0">
          <WebView
            ref={webViewRef}
            source={{ url: `http://${manifest.debuggerHost
            .split(":")
            .shift()}:3001` }}
            onMessage={(event) => {}}
          />
        </StyldWebView>
      </View>
    </View>
  );
};

export default MyAdsScreen;
