import { HStack, VStack, Text, useTheme } from 'native-base';


const Balance = () => {
  const { colors } = useTheme();

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
            23.00CAT
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Balance;
