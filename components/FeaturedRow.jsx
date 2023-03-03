import { View, Text, ScrollView } from 'react-native'
import { Icon } from '@rneui/base'
import React from 'react'
import RestaurantCard from './RestaurantCard'

const FeaturedRow = ({ title, description, featuredCategory}) => {
  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4 ">
            <Text className="font-bold text-lg">{title}</Text>
            <Icon name='arrowright' type='antdesign'/>
        </View>
      
      <Text className="text-xs text-grey-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* {RestaurantCards...} */}
        <RestaurantCard 
            id={123}
            imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
            title="Yo! Sushi"
            rating={4.5}
            genre="Japanese"
            address="123 Main St"
            short_description="This is a Test description"
            dishes={[]}
            long={20}
            lat={0}
        />
        <RestaurantCard 
            id={123}
            imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
            title="Yo! Sushi"
            rating={4.5}
            genre="Japanese"
            address="123 Main St"
            short_description="This is a Test description"
            dishes={[]}
            long={20}
            lat={0}
        />
        <RestaurantCard 
            id={123}
            imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E"
            title="Yo! Sushi"
            rating={4.5}
            genre="Japanese"
            address="123 Main St"
            short_description="This is a Test description"
            dishes={[]}
            long={20}
            lat={0}
        />
      </ScrollView>
    </View>
  )
}

export default FeaturedRow