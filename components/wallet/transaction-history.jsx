import { useNavigation } from '@react-navigation/native';
import { Button, Heading, HStack, useTheme, VStack } from 'native-base';
import TransactionItem from '../transaction-item';
import { TRANSACTIONS } from '../../constants/transactions';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getTransactions } from '../../api';
import { ActivityIndicator } from 'react-native';


const TransactionHistory = ({ imgUrl, title }) => {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const [transactionList, setTransactionList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTransactions = async (numTx) => {
			const tx = await getTransactions(numTx, "Cgs3VzDD3UgTHXHSJkRgKzyz1YJzXCsdZFA3C3Rha4RS");

			setTransactionList(tx.transactions);
			setIsLoading(false);
		};

		fetchTransactions(5);
	}, [])



	return (
		<VStack px={4} py={6}>
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
					{transactionList.map((transaction) => (
						<TransactionItem
							key={transaction.signature}
							transaction={transaction}
							imgUrl={imgUrl}
							title={title}
						/>
					))}
				</VStack>
			)}
		</VStack>
	);
};


export default TransactionHistory;