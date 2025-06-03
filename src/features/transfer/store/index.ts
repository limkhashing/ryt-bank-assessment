import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { transactionSlice } from './slices/transactionSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    transactions: transactionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { setUser, setLoading: setUserLoading, setError: setUserError, updateBalance } = userSlice.actions;
export const { 
  setTransactions, 
  addTransaction, 
  setLoading: setTransactionLoading, 
  setError: setTransactionError 
} = transactionSlice.actions;