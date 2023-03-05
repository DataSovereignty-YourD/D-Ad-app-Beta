import { Box, FlatList } from 'native-base';
import { useWindowDimensions } from 'react-native';
import {CARDS} from '../../features/cards'


const CardList = () => {
  const { width } = useWindowDimensions();

  return (
    <FlatList
      horizontal
      stickyHeaderIndices={[0]}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      data={CARDS}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      renderItem={({ item }) => (
        <Box mb={6} px={2} style={{ width: width * 0.85 }}>
          <CARDS {...item} />
        </Box>
      )}
    />
  );
};

export default CardList;
