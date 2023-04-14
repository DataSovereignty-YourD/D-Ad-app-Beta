import { useNavigation } from '@react-navigation/native';
import { Button, Heading, HStack, Text, useTheme, VStack } from 'native-base';
import TransactionItem from '../transaction-item';
import { TRANSACTIONS } from '../../constants/transactions';
import { useContext, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getTransactions } from '../../api';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions, setTransactions } from '../../features/transactionSlice';
import { account, tokenAccount } from '../../constants/account';
import { TransactionContext } from '../../contexts/TransactionContext';


const TransactionHistory = ({ isRefreshing, id, imgUrl, title }) => {
	const { colors } = useTheme();
	const navigation = useNavigation();
	// const [transactionList, setTransactionList] = useState([]);


	// useContext를 사용하여 전역 transactions, isLoading 및 fetchTransactions 가져오기
	const { transactions, isLoading, fetchTransactions } = useContext(TransactionContext);

	useEffect(() => {
		fetchTransactions("TLhQKEzhL6qBS8ihN5BeU1hBfHKuN8pW1t");
	}, [isRefreshing])



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
					{transactions.length > 0 ? (
						transactions.map((transaction) => (
							<TransactionItem
								key={transaction.transaction_id}
								transaction={transaction}
								imgUrl={id === 123 ? require('../../assets/images/sushi.jpg') : imgUrl}
								title={id === 123 ? 'Yo! Sushi!': title}
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