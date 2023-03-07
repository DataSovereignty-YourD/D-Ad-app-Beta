import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'


const RewardButton = () => {

	const handlePress = () => {
    Alert.alert('Congratulations!', 'You have received a 10CAT!', [
      { text: 'Check', onPress: () => console.log('Check pressed') },  
    ]);
  };


	return (
		<View className="absolute bottom-10 w-full z-50">
			<TouchableOpacity
				onPress={handlePress}
				className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row
			items-center space-x-1">
				<Text className="flex-1 text-white font-extrabold text-lg text-center">
					Getting 10CAT Reward
				</Text>
			</TouchableOpacity>

		</View>
	)
}

export default RewardButton