import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  video: {
		isWatched: false,
	}
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, action) => {
			state.video = action.payload;
		},
    setVideoWatched: (state) => {
      state.video.isWatched = true;
    },
  }
});

export const { setVideoWatched } = videoSlice.actions;

export const selectVideo = state => state.video.video;

export default videoSlice.reducer;
