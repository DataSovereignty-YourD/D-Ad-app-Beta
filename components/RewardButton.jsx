import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setVideoWatched} from '../features/videoSlice';

const RewardButton = ({onPress, disable}) => {

  const [isButtonPressed, setIsButtonPressed] = useState(false); // 버튼이 눌렸는지 여부를 저장하는 변수
	const isWatched = useSelector((state) => state.video.video.isWatched);
	const dispatch = useDispatch();


  const handlePress = () => {
    if (isButtonPressed.current) {
      return  // 이미 버튼이 눌렸으면 함수 실행 중단
    }

    isButtonPressed.current = true; // 버튼이 처음 눌리면 변수 값을 true로 변경
    onPress(); // RewardButton 컴포넌트에서 전달된 onPress 함수 실행
		if (!isWatched) {
			
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
				className={`mx-5 p-4 rounded-lg flex-row items-center space-x-1 ${
          (disable || isButtonPressed || isWatched)  ? "bg-gray-300" : "bg-[#00CCBB]"
        }`}
				disabled={disable || isButtonPressed || isWatched}
			>
				<Text className={`flex-1 text-white font-extrabold text-lg text-center`}>
					{isWatched ? "Already Rewarded" : "Getting 10CAT Reward"}
				</Text>
			</TouchableOpacity>

		</View>
	)
}

export default RewardButton