import { configureStore } from '@reduxjs/toolkit'
import coutereReducer from '../counter'

export const store = configureStore({
  reducer: {
    counter: coutereReducer,
  },
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
