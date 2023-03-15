import { useNavigation } from '@react-navigation/native';
import { Button, Heading, HStack, Text, useTheme, VStack } from 'native-base';
import TransactionItem from '../transaction-item';
import { TRANSACTIONS } from '../../constants/transactions';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getTransactions } from '../../api';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions, setTransactions } from '../../features/transactionSlice';
import { account, tokenAccount } from '../../constants/account';


const TransactionHistory = ({prop, id, imgUrl, title }) => {
	// console.log(transaction);
	const { colors } = useTheme();
	const navigation = useNavigation();
	const [transactionList, setTransactionList] = useState([]);
	// const transactionList = useSelector(selectTransactions);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async (numTx) => {
			const tx = await getTransactions(numTx, tokenAccount);

			setTransactionList(tx.transactions);
			dispatch(setTransactions(
				tx.transactions.map((transaction) => ({
					...transaction,
					time: transaction.time.toLocaleString('en-US'),
				}))
			));
			setIsLoading(false);
		};

		fetchTransactions(5);
	}, [prop])



	return (
		<VStack px={4} py={4}>
			<HStack alignItems="center" justifyContent="space-between" mb={4} mt={1}>
				<Heading className="text-xl font-bold">
					Recent rewards
				</Heading>
				<Button
					variant="ghost"
					_text={{
						fontWeight: 'bold',
						fontSize: 'xs',
						color: colors.primary[500],
					}}
					_pressed={{
						bg: 'transparent',
						opacity: 0.7,
					}}
					p={0}
					onPress={() => navigation.navigate(StackRoutes.Transactions)}
					disabled={true}
				>
					Show all
				</Button>
			</HStack>
			{isLoading ? (
				<VStack px={4} py={6} justifyContent="center">
					<ActivityIndicator size="large" />
				</VStack>
			) : (
				<VStack mx={-1} my={-2} space={2}>
					{transactionList.length > 0 ? (
						transactionList.map((transaction) => (
							<TransactionItem
								key={transaction.signature}
								transaction={transaction}
								imgUrl={id === 123 ? require('../../assets/images/sushi.jpg') : imgUrl}
								title={id === 123 ? 'SandWiches': title}
							/>
						))
					) : (
						<VStack px={4} py={6}>
							<Text className="text-xl text-gray-500 text-center">No rewards found</Text>
						</VStack>
					)}
				</VStack>
			)}

		</VStack>
	);
};


export default TransactionHistory;