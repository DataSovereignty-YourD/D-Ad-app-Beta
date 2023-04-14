import { HStack, VStack, Text, useTheme } from 'native-base';
import { getCATBalance, getTestKeypair } from '../../api';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { account } from '../../constants/account';
import { useSelector } from 'react-redux';
import { selectTransactions } from '../../features/transactionSlice';
import { TransactionContext } from '../../contexts/TransactionContext';

const Balance = (isRefreshing) => {
  const { colors } = useTheme();

	const { balance, isLoading, fetchBalance } = useContext(TransactionContext); 

  useEffect(() => {
		fetchBalance("TLhQKEzhL6qBS8ihN5BeU1hBfHKuN8pW1t")

  }, [isRefreshing]);

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
            {`${balance} URD`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Balance;
