import * as  React from 'react'
import { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import { SearchView } from './search-view';
import { TrendingView } from './trending-view';

const App = () => {
  const [showTrending, setShowTrending] = useState(false)
  return ( 
   <div>
      <button onClick={() => setShowTrending(showTrending => !showTrending)}>
        {showTrending ? 'Search' : 'Trending'}
      </button>
      {showTrending ? <TrendingView/> : <SearchView/>}
  </div>
 )
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <h1>Hello Giphy</h1>
      <App/>
    </Provider>,
    document.getElementById('root')
  )
}

render()