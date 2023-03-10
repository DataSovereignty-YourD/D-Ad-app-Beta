import { useNavigation } from '@react-navigation/native';
import { Button, Heading, HStack, useTheme, VStack } from 'native-base';
import TransactionItem from '../transaction-item';
import { TRANSACTIONS } from '../../constants/transactions';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getTransactions } from '../../api';


const TransactionHistory = () => {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const [transactionList, setTransactionList] = useState([]);

	useEffect(() => {
		const fetchTransactions = async (numTx) => {
			const tx = await getTransactions(numTx, "Cgs3VzDD3UgTHXHSJkRgKzyz1YJzXCsdZFA3C3Rha4RS");

			setTransactionList(tx.transactions);
		};

		fetchTransactions(5);
	}, [])



	return (
		<VStack px={4} py={6}>
			<HStack alignItems="center" justifyContent="space-between" mb={4} mt={1}>
				<Heading fontSize="lg" color={colors.text[500]}>
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
			<VStack>
				{transactionList.map(transaction => (
					<TransactionItem
						key={transaction.transactionNo}
						transaction={transaction}
						/>
				))}
			</VStack>
		</VStack>
	);
};


export default TransactionHistory;