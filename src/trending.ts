import { createSlice } from '@reduxjs/toolkit'

export interface Gif {
  embed_url: string;
}

export interface Pagination {
  totalCount: number;
  count: number;
  offset: number;
}

export interface TrendingResult {
  data: Array<Gif>;
  pagination: Pagination;
}

export interface TrendingState extends TrendingResult {
  requestPending: boolean;
  error?: Error;
}

const initialState: TrendingState = {
  data: [],
  pagination: {
    totalCount: 0,
    count: 0,
    offset: 0
  },
  requestPending: false
}

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    requestSuccessful: (
      state: TrendingState,
      { payload: { data, pagination } }
    ): void => {
      state.data = data
      state.pagination = pagination
      state.requestPending = false
    },
    requestFailed: (state: TrendingState, { payload }): void => {
      state.error = payload
      state.requestPending = false
    },
    requestPending: (state: TrendingState): void => {
      state.requestPending = true
    }
  }
})

export const {
  requestSuccessful,
  requestFailed,
  requestPending
} = trendingSlice.actions

export default trendingSlice.reducer
