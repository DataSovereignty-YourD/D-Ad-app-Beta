import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LocationPermission from '../components/LocationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { UrlTile } from 'react-native-maps';


const ProfileScreen = () => {
	const navigation = useNavigation();

	const [currentLocation, setCurrentLocation] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTerms, setSearchTerms] = useState([]);
	const webViewRef = useRef(null);

	const handleSearch = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.log('Permission to access location was denied');
			return;
		}
		let location = await Location.getCurrentPositionAsync({});
		const currentLocation = `${location.coords.latitude}, ${location.coords.longitude} ${location.timestamp}`;
		// const currentLocation = {
		//   latitude: location.coords.latitude,
		//   longitude: location.coords.longitude,
		// 	timestamp: location.timestamp,
		// };
		console.log(currentLocation);
		// setCurrentLocation(currentLocation);
		setSearchTerms([...searchTerms, currentLocation]);
		setCurrentLocation(currentLocation);
	};

	const handleInject = () => {
		if (!currentLocation || !webViewRef.current) {
			return;
		}
		const { latitude, longitude, timestamp } = currentLocation;
		let injectedJavaScript = '';
		searchTerms.forEach((term) => {
			injectedJavaScript += `
			var input = document.getElementsByName('q')[0];
			input.value += ' ${term} ${searchTerm}';
		`;
		});
		webViewRef.current.injectJavaScript(injectedJavaScript);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* {Header} */}
			<View className="flex-row pb-3 pt-2 items-center mx-4 space-x-2">
				<View className="flex-1">

					<Text className="font-bold text-xl">
						Profile
					</Text>
				</View>
			</View>
			<WebView
				ref={webViewRef}
				source={{ url: "https://www.google.com" }}
				onMessage={(event) => { }}
			/>
			<View>
				<Button title='Get Current Location' onPress={handleSearch} />
				<Button title="Search" onPress={handleInject} />
			</View>

		</SafeAreaView>
	)
}

export default ProfileScreen