import { HStack, VStack, Text, useTheme } from 'native-base';
import { getBalance, getTestKeypair } from '../../api';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { account } from '../../constants/account';
import { useSelector } from 'react-redux';
import { selectTransactions } from '../../features/transactionSlice';

const Balance = () => {
  const { colors } = useTheme();
	const [balance, setBalance] = useState(0);
	const transactions = useSelector(selectTransactions);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance(account);
      setBalance(balance);
    };

    fetchBalance();
  }, [transactions]);

  return (
    <HStack
      px={4}
			pt={6}
      pb={6}
      alignItems="center"
      justifyContent="flex-start"
    >
      <VStack>
        <Text className="text-xl font-bold">
          Total balance
        </Text>
        <HStack>
          <Text className="text-3xl text-gray-700">
            {`${balance * 10} CAT`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Balance;
