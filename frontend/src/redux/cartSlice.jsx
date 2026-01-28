import { createSlice } from "@reduxjs/toolkit"

const storedCart = localStorage.getItem("cart");

const defaultState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0 
};

let initialState = defaultState;
if (storedCart) {
  try {
    const parsedCart = JSON.parse(storedCart);
    initialState = {
      ...defaultState,
      ...parsedCart,
      products: Array.isArray(parsedCart.products) ? parsedCart.products : []
    };
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
  }
}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      // Ensure state.totalPrice is a number (handle potential bad state)
      if (typeof state.totalPrice !== 'number') state.totalPrice = 0;

      const newItem = action.payload
      const itemIndex = state.products.find((item) => item.id === newItem.id)

      const price = parseFloat(newItem.price) // Parse input price

      if (itemIndex) {
        itemIndex.quantity++;
        itemIndex.totalPrice += price
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: price,
          quantity: 1,
          totalPrice: price,
          Image: newItem.image 
        })
      }
      state.totalPrice += price;
      state.totalQuantity++;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      if (typeof state.totalPrice !== 'number') state.totalPrice = 0;

      const id = action.payload;
      const findItem = state.products.find((item) => item.id === id)
      if (findItem) {
        state.totalPrice -= findItem.totalPrice
        state.totalQuantity -= findItem.quantity
        state.products = state.products.filter(item => item.id !== id)
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaceQuantity(state, action) {
      if (typeof state.totalPrice !== 'number') state.totalPrice = 0;

      const id = action.payload
      const findItem = state.products.find((item) => item.id === id)
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price
        state.totalQuantity++;
        state.totalPrice += findItem.price
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaceQuantity(state, action) {
      if (typeof state.totalPrice !== 'number') state.totalPrice = 0;

      const id = action.payload
      const findItem = state.products.find((item) => item.id === id)
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price
        state.totalQuantity--;
        state.totalPrice -= findItem.price
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    }

  },


})
export const { addTocart, removeFromCart, increaceQuantity, decreaceQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer
