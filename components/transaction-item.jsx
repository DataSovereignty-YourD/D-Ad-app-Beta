import { Box, HStack, Text, useTheme, VStack, Image } from 'native-base';
import { useCallback } from 'react';
import { TRANSACTIONS } from '../constants/transactions';
import AmazonIcon from '../assets/images/amazon.jpeg';
import NetflixIcon from '../assets/images/netflix.jpeg';
import SpotifyIcon from '../assets/images/spotify.jpeg';
import UberIcon from '../assets/images/uber.jpeg';
import { LAMPORTS_PER_SOL } from '../api';


const TransactionItem = ({ transaction, imgUrl, title }) => {
	const { colors } = useTheme();


	return (
		<HStack alignItems="center" py={3} px={3} backgroundColor="white">
			<Box
				style={{ width: 60, height: 60 }}
				size="full"
				rounded={16}
				alignItems="center"
				justifyContent="center"
				overflow="hidden"
				mr={4}
			>
				<Image size={100} source={imgUrl} />
			</Box>
			<VStack>
				<HStack>
					<Text
						fontSize="md"
						textTransform="capitalize"
						fontWeight="bold"
						color={colors.text[500]}
					>
						{
							transaction.status == 'finalized' ? "Complete" :
								transaction.status == 'error' ? "Transaction Error" :
									"Search for this transcription."
						}
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
				{transaction.instructionsInfo[0].parsed.lamports / LAMPORTS_PER_SOL * 10} CAT
			</Text>
		</HStack>
	);
};


export default TransactionItem;