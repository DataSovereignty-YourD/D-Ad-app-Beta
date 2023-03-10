import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
	advertisement: {
		id: null,
		imgUrl: null,
		title: null,
		rating: null,
		genre: null,
		address: null,
		short_description: null,
		dishes: null,
		long: null,
		lat: null,
	},
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
		setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
		setAdvertisements: (state, action) => {
			state.advertisement = action.payload;
		},

  },
});


export const selectTransactions = (state) => state.transaction.transactions;

export const selectAdvertisement = (state) => state.transaction.advertisement;

export const { setTransactions } = transactionSlice.actions;

export const { setAdvertisements } = transactionSlice.actions;

export default transactionSlice.reducer;
