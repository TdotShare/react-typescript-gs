import { createSlice , PayloadAction } from '@reduxjs/toolkit'

export type BreadcrumbsType = {
  value : string ,
  link : string ,
  active :  boolean
}

export interface  BreadcrumbsState  {
    item : Array<BreadcrumbsType>
}

const initialState: BreadcrumbsState = {
    item : []
}

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadCms: (state , action: PayloadAction<Array<BreadcrumbsType>> ) => {
      state.item = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBreadCms } = breadcrumbsSlice.actions

export default breadcrumbsSlice.reducer