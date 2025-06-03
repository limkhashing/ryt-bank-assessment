import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import mockUser from '../../data/mockUser.json';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: mockUser as User,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.balance = action.payload;
      }
    },
  },
});
