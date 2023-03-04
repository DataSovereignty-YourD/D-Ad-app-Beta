import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Icon } from '@rneui/base';

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
					if (route.name === 'Home') {
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
					} 
			}
	})}>
			<Tab.Screen name='Home' component={HomeScreen}/>
			<Tab.Screen name='Profile' component={ProfileScreen} />
		</Tab.Navigator>
	)
}

export default TabNavigator