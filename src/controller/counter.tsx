import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CounterState {
  value :number
}
const initialState: CounterState = {
  value:10
}


const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add (state) {
      state.value++
    },
    addMount (state,action:PayloadAction<number>) {
      state.value +=action.payload
    }
  }
})

export const { add,addMount } = counterSlice.actions
export default counterSlice.reducer
