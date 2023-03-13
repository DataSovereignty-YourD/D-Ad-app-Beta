import { SafeAreaView, Text, View, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Button, RefreshControl } from 'react-native'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base';
import Categeries from '../components/Categories';
import axios from "axios";
import AdCard from '../components/AdCard';
import { VStack } from 'native-base';
import Constants from 'expo-constants'  //현재 단말기의 시스템 정보를 불러오기 위함
function AdsView(adsList) {
	if (adsList === null) return <Text>텅</Text>
	return (
		adsList.map((ads, index) => {
			console.log(ads.Category[0]);
			return (
				<AdCard
					key={index}
					id={123}
					imgUrl={ads.AdsCid}
					title={ads.Title}
					rating={4.5}
					genre={ads.Category}
					address="123 Main St"
					short_description={ads.Description}
					dishes={[]}
					long={ads.StoreLocation[0].lng}
					lat={ads.StoreLocation[0].lat}
					reward={ads.RpP}
				/>
			)
		})
	)
}




const MyAdsScreen = () => {

	const navigation = useNavigation();
	const { manifest } = Constants
	const [adsList, setAdsList] = useState(null);
	const [loading, setLoading] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);


	useEffect(() => {
		CallAds()
	}, []);


	function CallAds() {
		axios.post(`http://${manifest.debuggerHost.split(':').shift()}:8000/adslist`,)
			.then(res => {
				setAdsList(JSON.parse(JSON.stringify(res.data)));
			}).catch(err => console.log(err))
			.finally(() => setLoading(false));
	};


	function onRefresh() {
		CallAds();
	}

	
	return (
		<SafeAreaView className="bg-white pt-5">
			{/* {Header} */}
			<View className="flex-row pt-2 pb-3 items-center px-4 space-x-2 justify-between">

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
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={onRefresh}
					/>
				}
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
					{AdsView(adsList)}
				</VStack>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyAdsScreen