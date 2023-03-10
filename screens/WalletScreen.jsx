import { Text, ScrollView, View, Image } from 'native-base';
import { Icon } from '@rneui/base';
import Balance from '../components/wallet/balance';
import ServicesGrid from '../components/wallet/services-grid';
import TransactionHistory from '../components/wallet/transaction-history';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MintToken from '../api';
import { selectAdvertisement, setAdvertisement } from '../features/advertisementSlice';
import { useDispatch } from 'react-redux';

export const WalletScreen = () => {

	const navigation = useNavigation();
	const dispatch = useDispatch(selectAdvertisement);
	const { params: { id=123, imgUrl=require('../assets/images/sushi.jpg'), title='Yo! Sushi!' } = {}} = useRoute();
	
	useEffect(() => {
		dispatch(
			setAdvertisement({
				id,
				imgUrl,
				title,
			})
		)
	}, []);


	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView className="bg-white">
			{/* {Header} */}
			<View className="flex-row pb-3 pt-2 items-center mx-4 space-x-2">

				<View className="flex-1">

					<Text className="font-bold text-xl">
						Wallet
					</Text>
				</View>

			</View>
			<ScrollView
				className="bg-gray-100"
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				<Balance />
				<ServicesGrid />
				<TransactionHistory imgUrl={imgUrl} title={title}/>

			</ScrollView>

		</SafeAreaView>



	);
};

export default WalletScreen