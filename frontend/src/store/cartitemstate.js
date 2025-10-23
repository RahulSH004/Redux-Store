import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }else{
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            state.totalQuantity++;
            state.totalAmount += newItem.price;
        },
        removeFromCart: (state,action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        updateQuantity: (state,action) => {
            const {id,quantity} = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem){
                const pricediffrence = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity;
                state.totalQuantity += pricediffrence;
                state.totalAmount += pricediffrence * existingItem.price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
})
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;