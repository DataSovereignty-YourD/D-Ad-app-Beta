import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const MapScreen = () => {
	return (
		<View className="flex">
			<MapView 
			className="h-full w-full"
				provider={PROVIDER_GOOGLE}
				initialRegion={{ latitude: 37.619774, longitude: 127.060926, latitudeDelta: 0.0005, longitudeDelta: 0.0005, }} 
			/>
			<Marker
            draggable
            coordinate={{
              latitude: 37.619774,
              longitude: 127.060926,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
		</View>
	)
}

export default MapScreen