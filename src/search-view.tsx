import * as React from 'react'
import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SearchState} from './search';
import { searchGifs, searchGifsForward, searchGifsBackward, searchGifsPage } from './giphy';
import { PagerView, GifView } from './components'

interface SearchFormState {
  searchTerm: string;
}

export const SearchView = () => {
  const search: SearchState = useSelector(state => state.search)
  const dispatch = useDispatch();
  const onClick: (state: SearchFormState) => void = useCallback(
    ({searchTerm}: SearchFormState) => dispatch(searchGifs(searchTerm)), 
    [dispatch]
  )
  const [formState, setFormState] = useState({
    searchTerm: ''
  })

  const onForward = useCallback(() => {
    dispatch(searchGifsForward(formState.searchTerm))
  }, [dispatch, formState.searchTerm])

  const onBackward = useCallback(() => {
    dispatch(searchGifsBackward(formState.searchTerm))
  }, [dispatch, formState.searchTerm])

  const goToPage = useCallback(page => {
    dispatch(searchGifsPage(page, formState.searchTerm))
  }, [dispatch, formState.searchTerm])

  return (
    <div>
      <h1>SearchView</h1>
      <SearchFormView  
        onSubmit={onClick} 
        formState={formState} 
        setFormState={setFormState}/>
      { 
        search.data.length > 0 && 
        <PagerView 
          pagination={search.pagination} 
          goToPage={goToPage}
          onForward={onForward} 
          onBackward={onBackward}/> 
      }
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex'
      }}>
        { search.searchPending ? <p>loading ...</p> :
          search.data.map((gif) => <GifView key={gif.embed_url} gif={gif} />)
        }
      </div>
  </div>
  )
}

export const SearchFormView: React.FunctionComponent<{
  onSubmit: (state: SearchFormState) => void;
  formState: SearchFormState;
  setFormState: (updater: (state: SearchFormState) => SearchFormState) => void;
}> =  ({onSubmit, formState, setFormState}) => {
  const onChange = useCallback(fieldName => evt => {
    const value = evt.target.value
    setFormState(formState => ({
      ...formState,
      [fieldName]: value
    }))
  }, [setFormState])

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault()
    onSubmit(formState)
  }, [onSubmit, formState])

  return (
    <form onSubmit={onFormSubmit}>
      <input type='text' value={formState.searchTerm} onChange={onChange('searchTerm')}/>
      <button type="submit">Search</button>
    </form>
  )
}
