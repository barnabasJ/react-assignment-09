import { createSlice } from '@reduxjs/toolkit'
import { Gif, Pagination } from './types'

export interface SearchResult {
  data: Array<Gif>;
  pagination: Pagination;
}

export interface SearchState extends SearchResult {
  searchPending: boolean;
  error?: Error;
}

const initialState: SearchState = {
  data: [],
  pagination: {
    totalCount: 0,
    count: 0,
    offset: 0
  },
  searchPending: false
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchSuccessful: (
      state: SearchState,
      { payload: { data, pagination } }
    ): void => {
      console.log(data)
      state.data = data
      state.pagination = pagination
      state.searchPending = false
    },
    searchFailed: (state: SearchState, { payload }): void => {
      state.error = payload
      state.searchPending = false
    },
    searchPending: (state: SearchState): void => {
      state.searchPending = true
    }
  }
})

export const {
  searchSuccessful,
  searchFailed,
  searchPending
} = searchSlice.actions

export default searchSlice.reducer
