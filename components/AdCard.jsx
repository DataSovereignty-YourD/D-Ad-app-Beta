import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setAdvertisement } from '../features/advertisementSlice'
import { Video } from 'expo-av'
import getDistance from '../functions/getDistance'
import * as Location from 'expo-location';
const AdCard = ({
	id,
	imgUrl,
	title,
	rating,
	genre,
	address,
	short_description,
	dishes,
	long,
	lat,
	reward
}) => {
	const dispatch = useDispatch();
  const navigation = useNavigation();
	const [distance, setDistance] = useState(0);

	useEffect(()=> {
		getdistance()
	},[])

  const handleAdCardPress = () => {
    dispatch(
      setAdvertisement({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
				reward,
      })
    );
    navigation.navigate('Advertisement');
  };
  const getdistance = async () => {
	dishes.map((D) => console.log(D.D))
	const AdsLocation = [lat, long];
	let location = await Location.getCurrentPositionAsync({});
	const currentLocation = [
		location.coords.latitude,
		location.coords.longitude,
	];
	const nearby = getDistance(AdsLocation,currentLocation);
	setDistance(nearby);
  }

	return (
		<TouchableOpacity
			onPress={handleAdCardPress}
			className=" px-4 relative h-fit "
		>
				<Video
					source={{uri:`https://gateway.pinata.cloud/ipfs/${imgUrl}`}}
					className="w-full h-64 rounded-sm bg-black rounded-t-xl border-black-500 border-2"
				/>

			<View className="bg-white px-3 pb-4 h-fit rounded-b-xl border-black-100 border">
				<Text className="font-bold text-lg pt-2">{title}</Text>
				<View className="flex-row items-center space-x-1">
					<Icon
						name='star'
						type='fontawesome'
						opacity={0.5}
						size={22}
						color="yellow"
					/>
					<Text className="text-xs text-gray-400">
						<Text className="text-green-500">{rating}</Text> - {genre }
					</Text>
				</View>

				<View className="flex-row items-center space-x-1">
					<Icon
						name='location-pin'
						type='entypo'
						opacity={0.4}
						size={22}
						color="red"
					/>
					<Text className="text-xs text-gray-500">Nearby - {distance}m</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default AdCard