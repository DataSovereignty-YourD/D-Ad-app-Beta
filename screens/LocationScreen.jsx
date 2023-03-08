import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectAdvertisement } from '../features/advertisementSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';


const LocationScreen = () => {
	const navigation = useNavigation();
	const restaurant = useSelector(selectAdvertisement);

	return (
		<View className="bg-[#00CCBB] flex-1">
			<SafeAreaView className="z-50">
				<View className="flew-row justify-between items-start p-5">
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon
							name='circle-with-cross'
							type='entypo'
							color="white"
							siz={30}
						/>
					</TouchableOpacity>

				</View>

				<View className="bg-white flex-row items-center space-x-5 p-3">
					<Image
						source={{
							uri: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
						}}
						className="h-12 w-12 bg-gray-300 rounded-full ml-5"
					/>
					<View className="flex-1">
						<Text className="text-lg">Sonny Sangha</Text>
						<Text className="text-gray-400">Restaurant Owner</Text>
					</View>

					<Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
				</View>
			</SafeAreaView>

			<MapView
				initialRegion={{
					latitude: restaurant.lat,
					longitude: restaurant.long,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}
				className="flex-1 -mt-10 z-0"
				mapType='mutedStandard'
			>
				<Marker
					coordinate={{
						latitude: restaurant.lat,
						longitude: restaurant.long,
					}}
					title={restaurant.title}
					description={restaurant.short_description}
					identifier="origin"
					pinColor="#00CCBB"
				/>
			</MapView>


		</View>
	)
}

export default LocationScreen