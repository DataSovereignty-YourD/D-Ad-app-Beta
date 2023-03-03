import { SafeAreaView, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base';
import Categeries from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const HomeScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* {Header} */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Delivery Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <Icon 
                name='down'
                type='antdesign'
                color="#00CCBB"
                size={20}
              />
            </Text>
          </View>

          <Icon 
            name='user'
            type='antdesign'
            color="#00CCBB"
            size={35}
          />
        </View>

        {/* {Search} */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <Icon 
              name='search1'
              type='antdesign'
              color="gray"
              size={20}
            />
            <TextInput
              placeholder='Restaurants and cuisines'
              keyboardType='default'
            />
          </View>
          <Icon 
              name='equalizer'
              type='fontisto'
              color="#00CCBB"
            />
        </View>

        {/* {Body} */}
        <ScrollView
          className="bg-gray-100"
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {/* {Categories} */}
          <Categeries />

          {/* {Featured Rows} */}
          <FeaturedRow 
            id="123"
            title="Featured"
            description="Paid placements from our partners"
          />

          {/* {Tasty Discounts} */}
          <FeaturedRow 
            id="1234"
            title="Tasty Discounts"
            description="Everyone's been enjoying these juicy discounts!"
          />

          {/* {Offers near you} */}
          <FeaturedRow 
            id="12345"
            title="Offers near you!"
            description="Why not support your loca restaurant tonight!"
          />
          
        </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen