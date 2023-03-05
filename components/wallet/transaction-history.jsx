import { useNavigation } from '@react-navigation/native';

import { Button, Heading, HStack, useTheme, VStack } from 'native-base';
import  TransactionItem  from '../transaction-item';
import { TRANSACTIONS } from '../../features/transactions'; 


const TransactionHistory = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

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
        {TRANSACTIONS.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </VStack>
    </VStack>
  );
};


export default TransactionHistory;