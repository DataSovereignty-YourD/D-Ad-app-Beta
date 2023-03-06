import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Icon } from '@rneui/base';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import {selectRestaurant} from '../features/restaurantSlice'
import RestaurantCard from '../components/RestaurantCard';
import RewardButton from '../components/RewardButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const RestaurantScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch(selectRestaurant);


	const {
		params: {
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
		},
	} = useRoute();

	useEffect(() => {
		dispatch(
			setRestaurant({
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
			})
		)
	}, [])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}), [];


	return (
		<SafeAreaView>
			<BasketIcon />

			<ScrollView>
				<View className="relative">
					<Image
						source={{
							uri: imgUrl,
						}}
						className="w-full h-56 bg-gray-300 p-4"
					/>
					<TouchableOpacity
						onPress={navigation.goBack}
						className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
					>
						<Icon
							name='arrowleft'
							type='antdesign'
							size={20}
							color="#00CCBB"
						/>
					</TouchableOpacity>
				</View>

				<View className="bg-white">
					<View className="px-4 pt-4">
						<Text className="text-3xl font-bold">{title}</Text>
						<View className="flex-row space-x-2 my-1">
							<View className="flex-row items-center space-x-1">
								<Icon
									name='star'
									type='fontawesome'
									color="green"
									opacity={0.4}
									size={22}
								/>
								<Text className="text-gray-500 text-xs">
									<Text className="text-green-500">{rating}</Text> - {genre}
								</Text>
							</View>

							<View className="flex-row items-center space-x-1">
								<Icon
									name='location-pin'
									type='entypo'
									color="gray"
									opacity={0.4}
									size={22}
								/>
								<Text className="text-xs text-gray-500">Nearby - {address}</Text>
							</View>
						</View>

						<Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
					</View>

					<TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
						<Icon
							name='questioncircleo'
							type='antdesign'
							color="gray"
							opacity={0.6}
							size={20}
						/>
						<Text className="pl-2 flex-1 font-bold">
							Have a food allergy?
						</Text>
					</TouchableOpacity>
				</View>

				<View>
					<Text className="px-4 pt-6 mb-3 font-bold text-xl">Video</Text>
				</View>

				<View className="pb-40">
					<Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
					{/* {Dishrows} */}
					<DishRow
						key={987}
						id={987}
						name="fff"
						description="ffffff"
						price={100}
						imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
					/>
					<DishRow
						key={9876}
						id={9876}
						name="fff"
						description="ffffff"
						price={100}
						imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
					/>
					<DishRow
						key={98765}
						id={98765}
						name="fff"
						description="ffffff"
						price={100}
						imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
					/>
					

				</View>

				<RewardButton />

				

			</ScrollView>
		</SafeAreaView>

	)
}

export default RestaurantScreen