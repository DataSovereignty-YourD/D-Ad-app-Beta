import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base'
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectBasketItemsWithId, removeFromBasket } from '../features/basketSlice';


const DishRow = ({ id, name, description, price, imageUrl }) => {
	const [isPressed, setIsPressed] = useState(false);
	const items = useSelector((state) => selectBasketItemsWithId(state, id));
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		dispatch(addToBasket({id, name, description, price, imageUrl })
	)}

	const removeItemFromBasket = () => {
		if (!items.length > 0) return;

		dispatch(removeFromBasket({ id }));
	}

	return (
		<View>
			<TouchableOpacity
				onPress={() => setIsPressed(!isPressed)}
				className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"
					}`}
			>
				<View className="flex-row">
					<View className="flex-1 pr-2">
						<Text className="text-lg mb-1">{name}</Text>
						<Text className="text-gray-400">{description}</Text>
						<Text className="text-gray-400 mt-2">
							<Currency quantity={price} currency="GBP" />
						</Text>
					</View>

					<View>
						<Image
							style={{
								borderWidth: 1,
								borderColor: "#F3F3F4",
							}}
							source={{ uri: imageUrl }}
							className="h-20 w-20 bg-gray-300 p-4"
						/>
					</View>

				</View>
			</TouchableOpacity>

			{isPressed && (
				<View className="bg-white px-4">
					<View className="flex-row items-center space-x-2 pb-3">
						<TouchableOpacity onPress={removeItemFromBasket}>
							<Icon
								name='minus'
								type='entypo'
								size={40}
								color={items.length > 0 ? "#00CCBB" : "gray"}
							/>
						</TouchableOpacity>

						<Text>{items.length}</Text>

						<TouchableOpacity onPress={addItemToBasket}>
							<Icon
								name='plus'
								type='entypo'
								size={40}
								color="#00CCBB"
							/>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	)
}

export default DishRow