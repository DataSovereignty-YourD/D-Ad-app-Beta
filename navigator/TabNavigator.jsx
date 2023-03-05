import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Icon } from '@rneui/base';
import WalletScreen from '../screens/WalletScreen';

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
			tabBarActiveTintColor: "#59C1CC",
			tabBarInactiveTintColor: "gray",
			tabBarIcon: ({ focused, color, size }) => {
				if (route.name === 'My Ads') {
					return (
						<Icon
							name='home'
							type='entypo'
							color={focused ? "#EB6A7C" : "gray"}
						/>
					)
				} else if (route.name === 'Profile') {
					return (
						<Icon
							name='user'
							type='entypo'
							color={focused ? "#EB6A7C" : "gray"}
						/>
					)
				} else if (route.name === 'Wallet') {
					return (
							<Icon 
								name='wallet'
								type='entypo'
								color={focused ? "#EB6A7C" : "gray"}
							/>
						)
				}
			}
		})}>
			<Tab.Screen name='My Ads' component={HomeScreen} />
			<Tab.Screen name='Profile' component={ProfileScreen} />
			<Tab.Screen name='Wallet' component={WalletScreen} />
		</Tab.Navigator>
	)
}

export default TabNavigator