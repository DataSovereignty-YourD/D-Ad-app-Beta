import { SafeAreaView, Text, View, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base';
import Categeries from '../components/Categories';

import AdCard from '../components/AdCard';
import { VStack } from 'native-base';

const MyAdsScreen = () => {

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);


	return (
		<SafeAreaView className="bg-white pt-5">
			{/* {Header} */}
			<View className="flex-row pt-2 pb-3 items-center mx-4 space-x-2 justify-between">

				<Text className="font-bold text-xl">
					My Ads
				</Text>

				<View className="flex-row ">
					<View className="px-4">
						<Icon
							name='search1'
							type='antdesign'
							size={20}

						/>
					</View>

					<Icon
						name='bell'
						type='feather'
						size={20}
					/>
				</View>

			</View>


			{/* {Body} */}
			<ScrollView
				className="bg-gray-100"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				{/* {Categories} */}
				<Categeries />
				<View>
					<Text className="px-4 pt-6 mb-3 font-bold text-xl">Videos</Text>
				</View>
				{/* {Featured Rows} */}
				{/* <FeaturedRow
					id="123"
					title="Featured"
					description="Paid placements from our partners"
				/> */}

				{/* {Tasty Discounts} */}
				{/* <FeaturedRow
					id="1234"
					title="None Target!"
					description="This is an advertisement for all D-Ad users!"
				/> */}

				{/* {Offers near you} */}
				{/* <FeaturedRow
					id="12345"
					title="Offers near you!"
					description="Why not support your loca restaurant tonight!"
				/> */}

				<VStack mx={-1} space={2}>

					<AdCard
						id={123}
						imgUrl={require('../assets/images/sushi.jpg')}
						title="Yoshi! Sushi"
						rating={4.5}
						genre="Food"
						address="123 Main St"
						short_description="This is a Test description"
						dishes={[]}
						long={127.060926}
						lat={37.619774}
						reward={10}
					/>

					<AdCard
						id={1234}
						imgUrl={require('../assets/images/pasta.jpg')}
						title="Benvenuto"
						rating={4.8}
						genre="Food"
						address="123 Main St"
						short_description="This is a Test description"
						dishes={[]}
						long={127.018548}
						lat={37.592699}
						reward={5}
					/>

					<AdCard
						id={12345}
						imgUrl={require('../assets/images/bread.jpg')}
						title="BUBA Bakery"
						rating={4.5}
						genre="Dessert"
						address="123 Main St"
						short_description="This is a Test description"
						dishes={[]}
						long={127.060926}
						lat={37.619774}
						reward={15}
					/>
				</VStack>


			</ScrollView>
		</SafeAreaView>
	);
};

export default MyAdsScreen