import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Component, useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';


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

	
	return (
		<View className="flex-1">

			<MyWeb />
		</View>
	)
}

export default ProfileScreen