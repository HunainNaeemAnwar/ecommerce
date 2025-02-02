// shopSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, ProductProps } from "@/types";

// Define the initial state
interface CartState {
  productData: CartProduct[];
}

const initialState: CartState = {
  productData: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.productData.find(
        (item) =>
          item._id === action.payload._id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ _id: string; selectedColor: string; selectedSize: string }>
    ) => {
      const product = state.productData.find(
        (item) =>
          item._id === action.payload._id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ _id: string; selectedColor: string; selectedSize: string }>
    ) => {
      const product = state.productData.find(
        (item) =>
          item._id === action.payload._id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ _id: string; selectedColor: string; selectedSize: string }>
    ) => {
      state.productData = state.productData.filter(
        (item) =>
          !(
            item._id === action.payload._id &&
            item.selectedColor === action.payload.selectedColor &&
            item.selectedSize === action.payload.selectedSize
          )
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = shopSlice.actions;

export default shopSlice.reducer;
