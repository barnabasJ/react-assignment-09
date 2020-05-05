import { combineReducers } from '@reduxjs/toolkit'
import search from './search'
import trending from './trending'

const rootReducer = combineReducers({
  search,
  trending
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
