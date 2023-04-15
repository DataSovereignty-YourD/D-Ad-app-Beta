import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Button, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Icon } from '@rneui/base';

import { useDispatch, useSelector } from 'react-redux';
import { setAdvertisement } from '../features/advertisementSlice';
import { selectAdvertisement } from '../features/advertisementSlice'

import RewardButton from '../components/RewardButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { mintCATTo, requestAirdrop } from '../api';
import { account } from '../constants/account';
import { selectVideo, setVideo, setVideoWatched } from '../features/videoSlice';
import axios from 'axios';
import Constants from 'expo-constants'

const AdvertisementScreen = () => {
	const video = useRef(null);
	const navigation = useNavigation();
	const advertisement = useSelector(selectAdvertisement);
	const videoState = useSelector(selectVideo);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [staus, setStaus] = useState({});
	const [isVideoEnded, setIsVideoEnded] = useState(false);
	const [isError, setError] = useState(false);
	const { manifest } = Constants

	useEffect(() => {
		dispatch(
			setVideo({ id: advertisement.id })
		);
	}, [])

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
			reward,
		} = {},
	} = useRoute();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}), [];

	const handleLoadStart = () => {
		setIsLoading(true);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleError = () => {
		setIsLoading(false);
		console.log('Error loading video');
	};

	const handlePlaybackStatusUpdate = (status) => {
		setStaus(status);
		if (status.didJustFinish) {
			dispatch(setVideoWatched());
			setIsVideoEnded(true); // 비디오 재생이 끝나면 isVideoEnded 값을 true로 업데이트
		}
	};



	const handleRewardButtonClick = async () => {
		if (videoState.isWatched) {
			// try {
			//   await requestAirdrop(account);
			// } catch (err) {
			//   Alert.alert('Error', err.message);
			// 	setError(true)
			//   return;
			// }

			// await mintCATTo("2CFRPpRoxA7bX5udXPdh8denNHeiSUhoy9Qcm6yyLkND", advertisement.reward);


			Alert.alert(
				'Congratulations!',
				`You have received a ${advertisement.reward}URD! Would you like to view the transaction history?`,
				[
					{
						text: 'No',
						onPress: () => navigation.goBack(),
						style: 'cancel',
					},
					{
						text: 'Yes',
						onPress: () => {
							axios.post("http://localhost:8000/reward",
								{ Account: "TD2i9VRM69su4kSANvvg421XRCwon3c1Cx", Reward: advertisement.reward }
							);
							navigation.navigate('Main', {
								screen: 'Wallet',
								params: {
									screen: 'Wallet',
									initial: false,
									id,
									imgUrl,
									title,
								},
							});
						},
					},
				]
			);
		} else {
			Alert.alert('Warning!', 'You can only get it if you watch the video.', [
				{ text: 'Check', onPress: () => console.log('Check pressed') },
			]);
		}
	};





	return (
		<SafeAreaView >

			<ScrollView>
				<View className="relative">
					<Video
						source={{ uri: `https://gateway.pinata.cloud/ipfs/${advertisement.imgUrl}` }}
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
					<View className="px-4 pt-3">
						<Text className="text-3xl font-bold">{advertisement.title}</Text>
						<View className="flex-row space-x-2 my-1 items-center ">
							<Icon
								name='star'
								type='fontawesome'
								opacity={0.5}
								size={22}
								color={"yellow"}
							/>
							<Text className="text-xs text-gray-400">
								<Text className="text-green-500">{advertisement.rating}</Text> - {advertisement.genre}
							</Text>
						</View>

						<View className="flex-row items-center space-x-1 my-1">
							<Icon
								name='location-pin'
								type='entypo'
								opacity={0.4}
								size={22}
								color={"red"}
							/>
							<Text className="text-xs text-gray-500">Nearby - {advertisement.address}</Text>
						</View>
					</View>

					<TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
						<Icon
							name='questioncircleo'
							type='antdesign'
							color="black"
							opacity={0.6}
							size={20}
						/>
						<Text className="pl-2 flex-1 font-bold">
							Have a food allergy?
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="flex-row items-center space-x-2 p-4 border-y border-gray-300"
						onPress={() => navigation.navigate("Location")}
					>
						<Icon
							name='location-pin'
							type='entypo'
							color="red"
							opacity={0.4}
							size={22}
						/>
						<Text className="pl-2 flex-1 font-bold">
							Map
						</Text>
					</TouchableOpacity>
				</View>

				<View>
					<Text className="px-4 pt-6 mb-3 font-bold text-xl">Video</Text>
				</View>

				<View className="flex-1 w-full h-64 justify-center items-center">
					{isLoading && (
						<View className="items-center">
							<ActivityIndicator />
							<Text className="pt-2">Loading video...</Text>
						</View>
					)}
					{/* https://gateway.pinata.cloud/ipfs/QmfVvFKpNrZaXemtDSc37awY4kweGmTDREy6uvjGQTtHC7 */}
					{/* https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4 */}
					<Video
						className="flex-1 w-full"
						ref={video}
						source={{ uri: `https://gateway.pinata.cloud/ipfs/${advertisement.imgUrl}` }}
						onLoadStart={handleLoadStart}
						onLoad={handleLoad}
						onError={handleError}
						resizeMode="contain"
						useNativeControls
						isLooping={false}
						onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
					/>
				</View>
				<View className="pb-40">
				</View>
				<RewardButton
					onPress={handleRewardButtonClick}
					disable={!isVideoEnded}
					error={isError}
					advertisement={advertisement}
				/>
			</ScrollView>
		</SafeAreaView>

	)
}

export default AdvertisementScreen