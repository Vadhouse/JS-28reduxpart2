import { createSlice } from '@reduxjs/toolkit';
import {
  incrementAction,
  decrementAction,
  incrementByAmountAction,
} from './counterActions';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: incrementAction,
    decrement: decrementAction,
    incrementByAmount: incrementByAmountAction,
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
