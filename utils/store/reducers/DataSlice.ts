import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from 'models/Category';

interface DataState {
  selectedCategory: ICategory | null;
  selectedProducts: number[];
}

export const initialState: DataState = {
  selectedCategory: null,
  selectedProducts: []
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    selectCategory(state, { payload }: PayloadAction<ICategory>) {
      state.selectedCategory = payload;
    },
    setSelectedProducts(state, { payload }: PayloadAction<number[]>) {
      state.selectedProducts = payload;
    }
  }
});

export default dataSlice.reducer;
