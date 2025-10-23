import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartitemstate';
export const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default store;