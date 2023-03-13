import { View, Text, Button, TextInput,StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LocationPermission from '../components/LocationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { UrlTile } from 'react-native-maps';
import getDistance from '../functions/getDistance';
import { ProfileButton, ProfileStyled, StyldWebView } from '../styles/screens/ProfileScreen';

const ProfileScreen = () => {
	const navigation = useNavigation();

	const [currentLocation, setCurrentLocation] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchTerms, setSearchTerms] = useState([]);
	const webViewRef = useRef(null);
	const SCREEN_HEIGHT = (Dimensions.get('window').height);
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
			<View style={ProfileStyled.ProfileTitle}>
				<Text className="font-bold text-xl">
					Profile
				</Text>
			</View>
			<StyldWebView height={SCREEN_HEIGHT} >
				<WebView
					ref={webViewRef}
					source={{ url: "http://localhost:3001" }}
					onMessage={(event) => { }}
				/>
			</StyldWebView>
				<ProfileButton  >
					<Button title='Get Current Location' onPress={handleSearch} />
				</ProfileButton>
				<ProfileButton>
					<Button title="Make Proof" onPress={handleInject} />
				</ProfileButton>
		</SafeAreaView>
	)
}

export default ProfileScreen