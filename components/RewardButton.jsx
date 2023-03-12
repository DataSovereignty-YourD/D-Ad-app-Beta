import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectVideo, setVideoWatched } from '../features/videoSlice';

const RewardButton = ({ onPress, disable, error, advertisement }) => {

	const [isButtonPressed, setIsButtonPressed] = useState(false); // 버튼이 눌렸는지 여부를 저장하는 변수
	const video = useSelector(selectVideo)
	const dispatch = useDispatch();


	const handlePress = async () => {
		if (error) {
			return;
		} else {
			if (isButtonPressed) {
				return;
			}

			setIsButtonPressed(true);

			await onPress();
			dispatch(setVideoWatched());
		}


	};

	useEffect(() => {
		setIsButtonPressed(false); // 컴포넌트가 업데이트될 때마다 isButtonPressed 값을 초기화
  }, [disable]);

	return (
		<View className="absolute bottom-10 w-full z-50">
			<TouchableOpacity
				onPress={handlePress}
				className={`mx-5 p-4 rounded-lg flex-row items-center space-x-1 ${disable || !video.isWatched || isButtonPressed ? "bg-gray-300" : "bg-[#00CCBB]"
					}`}
				disabled={video.isWatched || disable ? disable : video.isWatched}
			>

				<Text className={`flex-1 text-white font-extrabold text-lg text-center`}>
					{video.isWatched && isButtonPressed ? "Already Rewarded" : `Getting ${advertisement.reward}CAT Reward`}
				</Text>
			</TouchableOpacity>

		</View>
	)


}

export default RewardButton