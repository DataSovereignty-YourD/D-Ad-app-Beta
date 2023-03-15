import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import BasketScreen from '../deprecated/BasketScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import LocationScreen from '../screens/LocationScreen';
import MyAdsScreen from '../screens/MyAdsScreen';
import AdvertisementScreen from '../screens/AdvertisementScreen';
import MapScreen from '../screens/MapScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Rootstack = createNativeStackNavigator();


const RootNavigator = () => {
	return (
		<Rootstack.Navigator>
			<Rootstack.Group>
				<Rootstack.Screen name='Main' component={TabNavigator} />
			</Rootstack.Group>

			<Rootstack.Group
				screenOptions={{
					presentation: "modal",
					headerShown: false
				}}>
				<Rootstack.Screen
					name='Basket'
					component={BasketScreen} />
			</Rootstack.Group>

			<Rootstack.Group
				screenOptions={{
					presentation: "fullScreenModal",
					headerShown: false
				}}>
				<Rootstack.Screen
					name='PreparingOrderScreen'
					component={PreparingOrderScreen} />
				<Rootstack.Screen
					name='Location'
					component={LocationScreen} />
			</Rootstack.Group>

			<Rootstack.Group>
				<Rootstack.Screen name='My Ads' component={MyAdsScreen} />
				<Rootstack.Screen name='Advertisement' component={AdvertisementScreen} />
				<Rootstack.Screen name='Wallet' component={WalletScreen} />
				<Rootstack.Screen name='MapTest' component={MapScreen} />
				{/* <Rootstack.Screen name='Profile' component={ProfileScreen} /> */}
			</Rootstack.Group>


		</Rootstack.Navigator>
	)
}

export default RootNavigator