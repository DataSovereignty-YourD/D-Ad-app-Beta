import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basketSlice';
import restaurantReducer from './features/advertisementSlice';
import videoReducer from './features/videoSlice';

export const store = configureStore({
  reducer: {
		basket: basketReducer,
		restaurant: restaurantReducer,
		video: videoReducer,
	},
})