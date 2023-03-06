import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const CategoryCard = ({imgUrl, title}) => {
	const [isActive, setActive] = useState(false);

	const toggleActive = () => {
    setActive(!isActive);
  };

  return (
    <TouchableOpacity 
		className="relative mr-2"
		onPress={toggleActive}
		>
      <Image 
            source={{
                uri: imgUrl,
            }}
            className={`h-20 w-20 rounded ${isActive ? 'opacity-100' : 'opacity-70'}`}
      />
      <Text className= {`absolute bottom-1 left-1 text-white font-bold 
				${isActive ? 'text-black' : 'text-white'}`} >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard