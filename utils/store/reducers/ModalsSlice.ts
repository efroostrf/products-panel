import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const MODALS_CATEGORY_NEW = "MODALS_CATEGORY_NEW";
export const MODALS_CATEGORY_EDIT = "MODALS_CATEGORIES_EDIT";
export const MODALS_CATEGORY_DELETE = "MODALS_CATEGORY_DELETE";
export const MODALS_PRODUCT_NEW = "MODALS_PRODUCT_NEW";
export const MODALS_PRODUCT_EDIT = "MODALS_PRODUCT_EDIT";
export const MODALS_PRODUCT_DELETE = "MODALS_PRODUCT_DELETE";
export const MODALS_PRODUCT_IMPORT = "MODALS_PRODUCT_IMPORT";
export const MODALS_PRODUCT_EXPORT = "MODALS_PRODUCT_EXPORT";
export const MODALS_SELECT_CATEGORY = "MODALS_SELECT_CATEGORY";

interface CategoriesModals {
  isCreatingNew: boolean;
  isEditing: boolean;
  isDeleting: boolean;
}

interface ProductsModals extends CategoriesModals {
  isImporting: boolean;
  isExporting: boolean;
}

interface ModalsState {
  categories: CategoriesModals;
  products: ProductsModals;
  isSelectingCategory: boolean;
}

export const initialState: ModalsState = {
  categories: {
    isCreatingNew: false,
    isEditing: false,
    isDeleting: false
  },
  products: {
    isCreatingNew: false,
    isEditing: false,
    isDeleting: false,
    isImporting: false,
    isExporting: false
  },
  isSelectingCategory: false
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    show(state, { payload }: PayloadAction<string>) {
      switch (payload) {
        case MODALS_CATEGORY_NEW:
          state.categories.isCreatingNew = true;
          break;
        case MODALS_CATEGORY_EDIT:
          state.categories.isEditing = true;
          break;
        case MODALS_CATEGORY_DELETE:
          state.categories.isDeleting = true;
          break;
        case MODALS_PRODUCT_NEW:
          state.products.isCreatingNew = true;
          break;
        case MODALS_PRODUCT_EDIT:
          state.products.isEditing = true;
          break;
        case MODALS_PRODUCT_DELETE:
          state.products.isDeleting = true;
          break;
        case MODALS_PRODUCT_IMPORT:
          state.products.isImporting = true;
          break;
        case MODALS_PRODUCT_EXPORT:
          state.products.isExporting = true;
          break;
        case MODALS_SELECT_CATEGORY:
          state.isSelectingCategory = true;
          break;
      }
    },
    hide(state, { payload }: PayloadAction<string>) {
      switch (payload) {
        case MODALS_CATEGORY_NEW:
          state.categories.isCreatingNew = false;
          break;
        case MODALS_CATEGORY_EDIT:
          state.categories.isEditing = false;
          break;
        case MODALS_CATEGORY_DELETE:
          state.categories.isDeleting = false;
          break;
        case MODALS_PRODUCT_NEW:
          state.products.isCreatingNew = false;
          break;
        case MODALS_PRODUCT_EDIT:
          state.products.isEditing = false;
          break;
        case MODALS_PRODUCT_DELETE:
          state.products.isDeleting = false;
          break;
        case MODALS_PRODUCT_IMPORT:
          state.products.isImporting = false;
          break;
        case MODALS_PRODUCT_EXPORT:
          state.products.isExporting = false;
          break;
        case MODALS_SELECT_CATEGORY:
          state.isSelectingCategory = false;
          break;
      }
    }
  }
});

export default modalsSlice.reducer;
