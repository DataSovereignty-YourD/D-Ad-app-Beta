import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MyAdsScreen from '../screens/MyAdsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Icon } from '@rneui/base';
import WalletScreen from '../screens/WalletScreen';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);


	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarActiveTintColor: "#000000",
			tabBarInactiveTintColor: "gray",
			tabBarIcon: ({ focused, color, size }) => {
				if (route.name === 'My Ads') {
					return (
						<Icon
							name='box'
							type='entypo'
							color={focused ? "#000000" : "gray"}
						/>
					)
				} else if (route.name === 'Profile') {
					return (
						<Icon
							name='user'
							type='entypo'
							color={focused ? "#000000" : "gray"}
						/>
					)
				} else if (route.name === 'Wallet') {
					return (
							<Icon 
								name='wallet'
								type='entypo'
								color={focused ? "#000000" : "gray"}
							/>
						)
				}
			}
		})}>
			<Tab.Screen name='My Ads' component={MyAdsScreen} />
			<Tab.Screen name='Profile' component={ProfileScreen} />
			<Tab.Screen name='Wallet' component={WalletScreen} />
			{/* <Tab.Screen name='MapTest' component={MapScreen} /> */}
		</Tab.Navigator>
	)
}

export default TabNavigator