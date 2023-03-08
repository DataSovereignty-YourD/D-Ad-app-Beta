import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const CategoryCard = ({img, title, isActive, onPress}) => {


  return (
    <TouchableOpacity 
		className="relative mr-2"
		onPress={onPress}
		>
      <Image 
            source={img}
            className={`h-20 w-20 rounded ${isActive ? 'opacity-100' : 'opacity-70'}`}
      />
      <Text className= {`absolute bottom-1 left-1 text-white
				${isActive ? 'font-bold' : 'text-white'}`} >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard