import { Text, useTheme, ScrollView, View, Image } from 'native-base';
import { Icon } from '@rneui/base';
import Balance from '../components/wallet/balance';
import ServicesGrid from '../components/wallet/services-grid';
import TransactionHistory from '../components/wallet/transaction-history';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';

export const WalletScreen = () => {
	const { colors } = useTheme();
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView className="bg-gray-100">
			{/* {Header} */}
			<View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Delivery Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <Icon 
                name='down'
                type='antdesign'
                color="#00CCBB"
                size={20}
              />
            </Text>
          </View>

					<TouchableOpacity
						onPress={() => navigation.navigate("Profile")}
					>
						<Icon 
							name='user'
							type='antdesign'
							color="#00CCBB"
							size={35}
						/>
					</TouchableOpacity>

          
        </View>
			<ScrollView

			>
				<Balance />
				<ServicesGrid />
				<TransactionHistory />
			</ScrollView>

		</SafeAreaView>



	);
};

export default WalletScreen