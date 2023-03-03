import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

const PreparingOrderScreen = () => {
	const navigation = useNavigation();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Delivery");
		}, 4000);
	}, []);

	return (
		<SafeAreaView className="bg-white flex-1 justify-center items-center">
			<Animatable.Image 
				source={require("../assets/giphy.gif")}
				animation="slideInUp"
				iterationCount={1}
				className="h-96 w-96"
			/>

			<Animatable.Text
				animation="slideInUp"
				iterationCount={1}
				className="text-lg my-10 font-bold text-center text-[#459A98]"
			>
				Waiting for Restaurant to accept your order!
			</Animatable.Text>

			<Progress.Circle size={60} indeterminate={true} color="white"/>
		</SafeAreaView>
	)
}

export default PreparingOrderScreen