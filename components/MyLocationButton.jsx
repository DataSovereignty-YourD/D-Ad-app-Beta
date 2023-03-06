import { Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const MyLocationButton = ({ mapRef }) => {
	const handlePress = async () => {
		try {
			const { coords } = await Location.getCurrentPositionAsync({});
			const { latitude, longitude } = coords;
			const region = {
				latitude,
				longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			};
			mapRef.current.animateToRegion(region, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View
			className="absolute top-auto left-0 right-0 bottom-10 w-full"
		>
			<TouchableOpacity
			className="bg-slate-300/50"
				onPress={handlePress}
			>
				<Text className="flex-1 font-extrabold text-lg text-center">
					My Location
				</Text>
			</TouchableOpacity>
		</View>

	);
};

export default MyLocationButton;
