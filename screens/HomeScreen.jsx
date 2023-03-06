import { SafeAreaView, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base';
import Categeries from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

import AdCard from '../components/AdCard';

const HomeScreen = () => {

	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView className="bg-white pt-5">
			{/* {Header} */}
			<View className="flex-row pb-3 items-center mx-4 space-x-2">
				<View className="flex-1">

					<Text className="font-bold text-xl">
						My Ads
					</Text>
				</View>

			</View>

			{/* {Search} */}
			<View className="flex-row items-center space-x-2 pb-2 mx-4">
				<View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
					<Icon
						name='search1'
						type='antdesign'
						color="gray"
						size={20}
					/>
					<TextInput
						placeholder='Restaurants and cuisines'
						keyboardType='default'
					/>
				</View>
				<Icon
					name='equalizer'
					type='fontisto'
					color="#00CCBB"
				/>
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

				<AdCard
					id={123}
					imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
					title="Yo! Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={127.060926}
					lat={37.619774}
				/>

				<AdCard
					id={123}
					imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
					title="Yo! Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={127.060926}
					lat={37.619774}
				/>

				<AdCard
					id={123}
					imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
					title="Yo! Sushi"
					rating={4.5}
					genre="Japanese"
					address="123 Main St"
					short_description="This is a Test description"
					dishes={[]}
					long={127.060926}
					lat={37.619774}
				/>


			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen