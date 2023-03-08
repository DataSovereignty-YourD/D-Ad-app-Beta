import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
	}
}

export const advertisementSlice = createSlice({
	name: 'advertisement',
	initialState,
	reducers: {
		setAdvertisement: (state, action) => {
			state.advertisement = action.payload;
		},
	},
})

// Action creators are generated for each case reducer function
export const { setAdvertisement } = advertisementSlice.actions;

export const selectAdvertisement = (state) => state.advertisement.advertisement;

export default advertisementSlice.reducer