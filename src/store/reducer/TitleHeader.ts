import { createSlice , PayloadAction } from '@reduxjs/toolkit'

export interface TitleHeaderState {
  value: string
}

const initialState: TitleHeaderState = {
  value: "ชื่อเรื่อง Page",
}

export const titleHeaderSlice = createSlice({
  name: 'titleheader',
  initialState,
  reducers: {
    setTitle: (state , action : PayloadAction<string> ) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTitle } = titleHeaderSlice.actions

export default titleHeaderSlice.reducer