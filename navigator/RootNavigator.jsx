import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import BasketScreen from '../screens/BasketScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';

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
					component={BasketScreen}/>
			</Rootstack.Group>

			<Rootstack.Group
				screenOptions={{
					presentation: "fullScreenModal",
					headerShown: false
				}}>
				<Rootstack.Screen
					name='PreparingOrderScreen'
					component={PreparingOrderScreen}/>
				<Rootstack.Screen 
					name='Delivery'
					component={DeliveryScreen}/>
			</Rootstack.Group>

			<Rootstack.Group>
				<Rootstack.Screen name='My Ads' component={HomeScreen}/>
				<Rootstack.Screen name='Advertisement' component={RestaurantScreen}/>
				<Rootstack.Screen name='Profile' component={ProfileScreen}/>
			</Rootstack.Group>

	


		</Rootstack.Navigator>
	)
}

export default RootNavigator