import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


class MyWeb extends Component {
	render() {
		return (
			<WebView
				source={{ uri: 'https://www.youtube.com/' }}
			/>
		);
	}
}

const ProfileScreen = () => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	
	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* {Header} */}
			<View className="flex-row pb-3 pt-2 items-center mx-4 space-x-2">
				<View className="flex-1">

					<Text className="font-bold text-xl">
						Profile
					</Text>
				</View>
			</View>
			<MyWeb />
		</SafeAreaView>
	)
}

export default ProfileScreen