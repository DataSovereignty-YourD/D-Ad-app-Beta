import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

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
}) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("Advertisement", {
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
			}}
			className=" px-4 "
		>
			<Image
				source={imgUrl}
				className="h-36 w-full rounded-sm"
			/>

			<View className="bg-white px-3 pb-4">
				<Text className="font-bold text-lg pt-2">{title}</Text>
				<View className="flex-row items-center space-x-1">
					<Icon
						name='star'
						type='fontawesome'
						opacity={0.5}
						size={22}
					/>
					<Text className="text-xs text-gray-400">
						<Text className="text-green-500">{rating}</Text> - {genre}
					</Text>
				</View>

				<View className="flex-row items-center space-x-1">
					<Icon
						name='location-pin'
						type='entypo'
						opacity={0.4}
						size={22}
					/>
					<Text className="text-xs text-gray-500">Nearby - {address}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default AdCard