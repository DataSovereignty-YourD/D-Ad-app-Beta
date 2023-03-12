import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basketSlice';
import advertisementReducer from './features/advertisementSlice';
import videoReducer from './features/videoSlice';
import transactionSlice from './features/transactionSlice';

export const store = configureStore({
  reducer: {
		basket: basketReducer,
		advertisement: advertisementReducer,
		video: videoReducer,
		transaction: transactionSlice,
	},
})