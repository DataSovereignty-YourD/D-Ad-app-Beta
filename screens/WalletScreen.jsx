import { Text, ScrollView, View, Image } from 'native-base';
import { Icon } from '@rneui/base';
import Balance from '../components/wallet/balance';
import ServicesGrid from '../components/wallet/services-grid';
import TransactionHistory from '../components/wallet/transaction-history';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import MintToken, { getTransactions } from '../api';
import { selectAdvertisement, setAdvertisement } from '../features/advertisementSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions, setTransactions } from '../features/transactionSlice';
import { account, tokenAccount } from '../constants/account';
import { TransactionProvider } from '../contexts/TransactionContext';

export const WalletScreen = () => {

	const navigation = useNavigation();
	const dispatch = useDispatch(selectAdvertisement);
	const { params: { id = 12, imgUrl = require('../assets/images/Subway.png'), title = 'Subway' } = {} } = useRoute();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const transactions = useSelector(selectTransactions);

	

	useEffect(() => {
		dispatch(
			setAdvertisement({
				id,
				imgUrl,
				title,
			})
		)

	}, []);

	const onRefresh = async () => {
		setIsRefreshing(true);
		if (transactions.length === 0) {
			return setIsRefreshing(false);
		}
		const tx = await getTransactions(transactions.length, tokenAccount);
		if (tx.transactions.length !== transactions.length) {
			dispatch(setTransactions(tx.transactions));
		}
		setIsRefreshing(false);
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView className="bg-white">
			<TransactionProvider>
				{/* {Header} */}
				<View className="flex-row pb-3 pt-2 items-center px-4 space-x-2">

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
					refreshControl={
						<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
					}
				>
					<Balance isRefreshing={isRefreshing} />
					<ServicesGrid />
					<TransactionHistory isRefreshing={isRefreshing} id={id} imgUrl={imgUrl} title={title} />
					<View className="pb-40" />
				</ScrollView>
			</TransactionProvider>

		</SafeAreaView>


	);
};

export default WalletScreen