import { HStack, VStack, Text, useTheme } from 'native-base';


const Balance = () => {
  const { colors } = useTheme();

  return (
    <HStack
      px={4}
      pb={6}
      alignItems="center"
      justifyContent="flex-start"
    >
      <VStack>
        <Text fontSize="xs" fontWeight="bold" color={colors.text[500]}>
          Total balance
        </Text>
        <HStack>
          <Text fontSize="3xl" fontWeight="bold" color={colors.text[500]}>
            23.00CAT
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Balance;
