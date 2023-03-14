import { Box, HStack, Text, useTheme, VStack, Image } from 'native-base';
import { useCallback } from 'react';
import { TRANSACTIONS } from '../constants/transactions';
import { LAMPORTS_PER_SOL } from '../api';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';


const TransactionItem = ({ transaction, imgUrl, title, onPress }) => {
	const { colors } = useTheme();

  const handlePress = useCallback(() => {
    const url = `https://explorer.solana.com/tx/${transaction.signature}?cluster=devnet`;
    Linking.openURL(url);
  }, [transaction.signature]);

	return (
		<TouchableOpacity onPress={handlePress}>
			<HStack alignItems="center" py={3} px={3} backgroundColor="white" rounded={12}>
				<Box
					style={{ width: 60, height: 60 }}
					size="full"
					rounded={16}
					alignItems="center"
					justifyContent="center"
					overflow="hidden"
					mr={4}
				>
					<Image size={100} source={imgUrl} alt={title} />
				</Box>
				<VStack>
					<HStack>
						<Text
							fontSize="md"
							textTransform="capitalize"
							fontWeight="bold"
							color={colors.text[500]}
						>
							{transaction.status == 'finalized' ? 'Complete' : transaction.status == 'error' ? 'Transaction Error' : 'Search for this transcription.'}
						</Text>
					</HStack>
					<Text fontSize="xs" color={colors.gray[500]} mt={1}>
						{transaction.time.toLocaleString('en-US')}
					</Text>
				</VStack>
				<Text
					fontSize="xs"
					fontWeight="bold"
					flex={1}
					textAlign="right"
					color={colors.text[500]}
				>
					{title}
				</Text>
				<Text
					fontSize="md"
					fontWeight="bold"
					flex={1}
					textAlign="right"
					color={colors.text[500]}
				>
					{transaction.instructionsInfo[0].parsed.amount / LAMPORTS_PER_SOL} CAT
				</Text>
			</HStack>
		</TouchableOpacity>
	);
};

export default TransactionItem;
