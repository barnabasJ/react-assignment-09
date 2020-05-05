import { searchSuccessful, searchFailed, searchPending } from './search'
import { requestSuccessful, requestFailed, requestPending } from './trending'
import map from 'lodash/map'
import join from 'lodash/join'

const API_KEY = 'fgRT04SZ8ptzi9YgDuvadSjs9gV88TtM'
const API_BASE_URI = 'https://api.giphy.com/v1/gifs/'

const LIMIT = 20

const buildSearchUrl = query =>
  `${API_BASE_URI}search?api_key=${API_KEY}&q=${query}&`
const trendingUrl = `${API_BASE_URI}trending?api_key=${API_KEY}&`

const buildQueryParams = options =>
  join(
    map(options, (value, key) => `${key}=${value}`),
    '&'
  )

export const searchGifs = query => next => {
  next(searchPending())
  fetch(buildSearchUrl(query) + buildQueryParams({ limit: LIMIT }))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        searchSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(searchFailed(error)))
}

export const searchGifsPage = (page, query) => (next, getState) => {
  const pagination = getState().search.pagination
  const offset = (pagination.count * page) - pagination.count
  next(searchPending())
  fetch(buildSearchUrl(query) + buildQueryParams({ limit: LIMIT, offset }))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        searchSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(searchFailed(error)))
}

export const searchGifsForward = query => (next, getState) => {
  const state = getState()
  const pagination = state.search.pagination
  console.log(pagination)
  const options = {
    limit: LIMIT,
    offset: pagination.offset + pagination.count
  }
  console.log(options)
  next(searchPending())
  fetch(buildSearchUrl(query) + buildQueryParams(options))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        searchSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(searchFailed(error)))
}

export const searchGifsBackward = query => (next, getState) => {
  const state = getState()
  const pagination = state.search.pagination
  console.log(pagination)
  const options = {
    limit: LIMIT,
    offset: pagination.offset - pagination.count
  }
  console.log(options)
  next(searchPending())
  fetch(buildSearchUrl(query) + buildQueryParams(options))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        searchSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(searchFailed(error)))
}

export const trendingGifs = () => next => {
  next(requestPending())
  fetch(trendingUrl + buildQueryParams({ limit: LIMIT }))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        requestSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(requestFailed(error)))
}

export const trendingGifsPage = page => (next, getState) => {
  const pagination = getState().trending.pagination
  const offset = (pagination.count * page) - pagination.count
  next(requestPending())
  fetch(trendingUrl + buildQueryParams({ limit: LIMIT, offset }))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        requestSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(requestFailed(error)))
}

export const trendingGifsForward = () => (next, getState) => {
  const state = getState()
  const pagination = state.trending.pagination
  const options = {
    limit: LIMIT, 
    offset: pagination.offset + pagination.count
  }
  next(requestPending())
  fetch(trendingUrl + buildQueryParams(options))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        requestSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(requestFailed(error)))
}

export const trendingGifsBackward = () => (next, getState) => {
  const state = getState()
  const pagination = state.trending.pagination
  console.log(pagination)
  const options = {
    limit: LIMIT,
    offset: pagination.offset - pagination.count
  }
  console.log(options)
  next(requestPending())
  fetch(trendingUrl + buildQueryParams(options))
    .then(res => res.json())
    .then(({ data, pagination }) =>
      next(
        requestSuccessful({
          data,
          pagination: { ...pagination, totalCount: pagination.total_count }
        })
      )
    )
    .catch(error => next(requestFailed(error)))
}
