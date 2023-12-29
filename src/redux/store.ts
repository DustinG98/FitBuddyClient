import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducers from "./reducers";
import { Socket } from '../services/WebSocketService';
import { State } from './types/state';


export const store = configureStore({
  reducer: reducers,
});

export const socket = new Socket(store)

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  Action<string>
>;