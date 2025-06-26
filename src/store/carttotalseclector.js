import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export const selectCartItemById = createSelector(
    [selectCartItems, (state, itemId) => itemId],
    (items, itemId) => items.find(item => item.id === itemId)
)
export const selectCartSummary = createSelector(
  [selectCartItems, selectCartTotalQuantity, selectCartTotalAmount],
  (items, totalQuantity, totalAmount) => ({
    items,
    totalQuantity,
    totalAmount,
    itemCount: items.length
  })
)