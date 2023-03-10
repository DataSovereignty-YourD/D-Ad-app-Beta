import { HStack, VStack, Text, useTheme } from 'native-base';
import { getBalance, getTestKeypair } from '../../api';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

const Balance = () => {
  const { colors } = useTheme();
	const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance("Cgs3VzDD3UgTHXHSJkRgKzyz1YJzXCsdZFA3C3Rha4RS");
      setBalance(balance);
    };

    fetchBalance();
  }, []);

  return (
    <HStack
      px={4}
			pt={8}
      pb={6}
      alignItems="center"
      justifyContent="flex-start"
    >
      <VStack>
        <Text className="font-xs font-bold">
          Total balance
        </Text>
        <HStack>
          <Text className="text-3xl font-bold text-gray-700">
            {`${balance} SOL`}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Balance;
