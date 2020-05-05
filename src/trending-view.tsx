import * as React from 'react'
import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { trendingGifsForward, trendingGifsBackward, trendingGifs, trendingGifsPage } from './giphy';
import { TrendingState } from './trending';
import { PagerView, GifView } from './components'

export const TrendingView = () => {
  const trending: TrendingState = useSelector(state => state.trending)
  console.log(trending)
  const dispatch = useDispatch();

  useEffect(() => 
    dispatch(trendingGifs())
  , [])

  const onForward = useCallback(() => {
    dispatch(trendingGifsForward())
  }, [dispatch])
  const onBackward = useCallback(() => {
    dispatch(trendingGifsBackward())
  }, [dispatch])

  const goToPage = useCallback((page) => {
    dispatch(trendingGifsPage(page))
  }, [dispatch])

  return (
    <div>
      <h1>Trending</h1>
      { 
        trending.data.length > 0 && 
        <PagerView 
          pagination={trending.pagination} 
          goToPage={goToPage}
          onForward={onForward} 
          onBackward={onBackward}/> 
      }
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex'
      }}>
        { trending.requestPending ? <p>loading ...</p> :
          trending.data.map((gif) => <GifView key={gif.embed_url} gif={gif} />)
        }
      </div>
  </div>
  )
}