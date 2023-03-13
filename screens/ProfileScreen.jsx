import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LocationPermission from '../components/LocationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { UrlTile } from 'react-native-maps';
import getDistance from '../functions/getDistance';


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
		// const currentLocation = `${location.coords.latitude}, ${location.coords.longitude} ${location.timestamp}`;
		const currentLocation = [
			location.coords.latitude,
			location.coords.longitude,
		];

		console.log(currentLocation);
		// setCurrentLocation(currentLocation);
		setSearchTerms([...searchTerms, currentLocation]);
		setCurrentLocation(currentLocation);
	};

	const handleInject = () => {
		if (!currentLocation || !webViewRef.current) {
			return;
		}
		let injectedJavaScript = '';
		searchTerms.forEach((term) => {
			const distance = getDistance([37.592699, 127.018548], currentLocation);
			console.log(distance);
			injectedJavaScript += `
			var input = document.getElementById('CurrentLocationInput');
			input.value = '${distance} ${searchTerm}';
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
			<View className="flex-row pb-3 pt-2 items-center px-4 space-x-2">
				<View className="flex-1">

					<Text className="font-bold text-xl">
						Profile
					</Text>
				</View>
			</View>
			<WebView
				ref={webViewRef}
				source={{ url: "https://yourd-makeproof.herokuapp.com/" }}
				onMessage={(event) => { }}
			/>
			<View>
				<Button title='Get Current Location' onPress={handleSearch} />
				<Button title="Make Proof" onPress={handleInject} />
			</View>

		</SafeAreaView>
	)
}

export default ProfileScreen