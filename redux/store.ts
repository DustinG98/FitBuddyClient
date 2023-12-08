import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducers from "./reducers";
import { Socket } from '../services/WebSocketService';


export const store = configureStore({
  reducer: reducers,
});

export const socket = new Socket()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;