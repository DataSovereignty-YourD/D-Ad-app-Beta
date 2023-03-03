import { ScrollView, Text } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

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
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing1"
      />
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing2"
      />
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing3"
      />
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing4"
      />
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing5"
      />
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing6"
      />
      <CategoryCard 
        imgUrl="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" 
        title="Testing7"
      />
      </ScrollView>
  )
}

export default Categeries