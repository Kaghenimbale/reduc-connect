import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://randomuser.me/api/?results=5';

export const fetchData = createAsyncThunk('user/fetchDta', async () => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    return error.name;
  }
});

const initialState = {
  users: [],
  isLoading: true,
  error: null,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          users: action.payload,
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      });
  },
});

export default usersSlice.reducer;
