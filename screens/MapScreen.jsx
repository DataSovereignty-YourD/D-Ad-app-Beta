import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';

const MapScreen = () => {

	const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
        (newLocation) => {
          console.log('New Location:', newLocation.coords.latitude, newLocation.coords.longitude);
          setLocation(newLocation);
        }
      );
    })();
  }, []);


	return (
		<View className="flex">
			<MapView
				className="h-full w-full"
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: location ? location.latitude : 37.619774,
					longitude: location ? location.longitude : 127.060926,
					latitudeDelta: 0.0005,
					longitudeDelta: 0.0005,
				}}
			/>
			{location && (
				<Marker
					draggable
					coordinate={{
						latitude: location.latitude,
						longitude: location.longitude,
					}}
					onDragEnd={
						(e) => alert(JSON.stringify(e.nativeEvent.coordinate))
					}
					title={'You are Here'}
					description={'This is a description of the marker'}
				/>
			)}

		</View>
	)
}

export default MapScreen