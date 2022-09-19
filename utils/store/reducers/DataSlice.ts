import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryKey, ICategory } from 'models/Category';
import { IProduct } from 'models/Product';

interface Categories {
  [key: string]: ICategory;
}

interface Products {
  [key: string]: IProduct;
}

interface DataState {
  rootCategories: string[];
  categories: Categories;
  products: Products;
  selectedCategory: ICategory | null;
  selectedProducts: number[];
}

export const initialState: DataState = {
  rootCategories: [],
  categories: {},
  products: {},
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
