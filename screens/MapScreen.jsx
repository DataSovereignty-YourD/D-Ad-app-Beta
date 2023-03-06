import { View, Text, Button } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import MyLocationButton from '../components/MyLocationButton';

const MapScreen = () => {

	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const mapRef = useRef(null);

	// useEffect(() => {
	// 	(async () => {
	// 		let { status } = await Location.requestForegroundPermissionsAsync();
	// 		if (status !== 'granted') {
	// 			setErrorMsg('Permission to access location was denied');
	// 			return;
	// 		}

	// 		let location = await Location.watchPositionAsync(
	// 			{ accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
	// 			(newLocation) => {
	// 				console.log('New Location:', newLocation.coords.latitude, newLocation.coords.longitude);
	// 				setLocation(newLocation);
	// 			}
	// 		);
	// 	})();
	// }, []);


	return (
		<View className="relative">
			<MapView
				className="h-full w-full"
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: location ? location.latitude : 37.619774,
					longitude: location ? location.longitude : 127.060926,
					latitudeDelta: 0.0005,
					longitudeDelta: 0.0005,
				}}
				ref={mapRef}
			>
				{location && (
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						title={'You are Here'}
						description={'This is a description of the marker'}
						identifier="origin"
						pinColor="#00CCBB"
					/>
				)}

				
			</MapView>
			
			<MyLocationButton
					mapRef={mapRef}
					className="absolute bottom-20 left-20"
				/>
		</View>
	)
}

export default MapScreen