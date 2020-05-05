import * as React from 'react'
import { useCallback, useState } from 'react'
import { Gif, Pagination } from './types'

const calcCurrentPage = pagination => 
  (pagination.offset / pagination.count) + 1 

const calcLastPage = pagination => 
  Math.ceil(pagination.totalCount / pagination.count)

const isFirstPage = pagination => 
  calcCurrentPage(pagination) === 1

const isLastPage = pagination => 
  calcCurrentPage(pagination) === calcLastPage(pagination)

export const PagerView: React.FunctionComponent<{
  goToPage: (page: number) => void;
  onForward: () => void;
  onBackward: () => void;
  pagination: Pagination;
}> = ({goToPage, onForward, onBackward, pagination }) => {
  const [page, setPage] = useState('' + calcCurrentPage(pagination))
  const onChange = useCallback((evt) => {
    const newPage = evt.target.value
    setPage(newPage)
  }, [pagination, setPage])

  const onSubmit = useCallback(evt => {
    console.log('goToPage')
    const newPage = parseInt(page, 10) 
    if(!isNaN(newPage) && newPage >= 1 && newPage <= calcLastPage(pagination))
      goToPage(newPage);
  }, [goToPage, page, pagination])


  return (
    <div>
      { !isFirstPage(pagination) && <a href="#" onClick={onBackward}>back</a> }
      <form onSubmit={onSubmit}>
        <input value={page} onChange={onChange}/><span>{`/${calcLastPage(pagination)}`}</span>
        <button type="submit" >Go</button>
      </form>
      { !isLastPage(pagination) && <a href="#" onClick={onForward}>forward</a> }
    </div>
  )
}

export const GifView = ({gif}: {gif: Gif}) => {
  return (
  <div 
    style={
      {
        width: '25%',
        height: 'auto',
        position:'relative'
      }
    }>
      <iframe 
        src={gif.embed_url}
        width="100%" 
        height="100%" 
        frameBorder="0">
      </iframe>
  </div>
  )
}