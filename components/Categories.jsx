import { ScrollView, Text } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import { categoryData } from '../constants/categories'

const Categeries = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsVerticalScrollIndicator={false}
    >

      {/* {CategoryCard} */}
			{categoryData.map(category => (
				<CategoryCard 
					key={category.title}
					imgUrl={category.imgUrl}
					title={category.title}
				/>
			))}
      
      </ScrollView>
  )
}

export default Categeries