import { View, Text, Button } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LocationPermission from '../components/LocationPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


const ProfileScreen = () => {
	const navigation = useNavigation();

	const [savedData, setSavedData] = useState('');

	const [location, setLocation] = useState(null);
	const webViewRef = useRef(null);

	const handleReload = () => {
		if (webViewRef.current) {
			webViewRef.current.reload();

			const fetchLocation = async () => {
				// 현재 위치 정보 가져오기
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					console.log('Permission to access location was denied');
					return;
				}
				let location = await Location.getCurrentPositionAsync({});
				const currentLocation = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				};
				// myData 키로 위치 정보를 저장
				const data = JSON.stringify({ currentLocation });
				await AsyncStorage.setItem('myData', data);
				setSavedData(data);
				console.log('fetch', data);
			};

			fetchLocation();
		}

	};

	const injectedJavaScript = `
	window.onload = function() {
		document.getElementById('current-location').innerHTML = 'Current Location: ${JSON.stringify(savedData)}';
	}
	
`;

	useEffect(() => {
		const fetchData = async () => {
			const data = await AsyncStorage.getItem('myData');
			setSavedData(data);
		};
		fetchData();
	}, []);


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
				source={require('../assets/webview/index.html')}
				injectedJavaScript={injectedJavaScript}
			/>
			<View>
				<Text>Saved data: {savedData}</Text>
				<Button title="Reload" onPress={handleReload} />
			</View>

		</SafeAreaView>
	)
}

export default ProfileScreen