import { ScrollView, Text } from 'react-native'
import React, { useState } from 'react'
import CategoryCard from './CategoryCard'
import { categoryData } from '../constants/categories'

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryPress = (title) => {
    setActiveCategory(title);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      horizontal
      showsVerticalScrollIndicator={false}
      className=" bg-white py-3 max-h-24"
      // style={{height: 50}}
    >
      <CategoryCard
        img={require("../assets/images/all.jpg")}
        title="All"
        isActive={activeCategory === "All"}
        onPress={() => handleCategoryPress("All")}
      />
      {categoryData.map((category) => (
        category.title !== "All" && (
          <CategoryCard
            key={category.title}
            img={category.img}
            title={category.title}
            isActive={activeCategory === category.title}
            onPress={() => handleCategoryPress(category.title)}
          />
        )
      ))}
    </ScrollView>
  );
};

export default Categories;