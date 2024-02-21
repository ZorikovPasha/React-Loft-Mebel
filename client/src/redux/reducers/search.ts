import Fuse from 'fuse.js'
import { ISearchAction } from '../actions/search'
import { Actions } from '../../types/actionsTypes'

interface searchItemType {
  title: string
  link: string
  texts: string[]
  imageUrl: string | undefined
}

export interface ISearchState {
  query: string
  queryToRender: string
  searchEngine: Fuse<searchItemType>
  searchResults: Fuse.FuseResult<searchItemType>[]
}

const initialState: ISearchState = {
  query: '',
  queryToRender: '',
  searchEngine: new Fuse([], { keys: ['title', 'texts'] }),
  searchResults: []
}

export const searchReducer = (state = initialState, action: ISearchAction): ISearchState => {
  switch (action.type) {
    case Actions.SEARCH: {
      const newState = {} as ISearchState
      if (typeof action.payload.query !== 'undefined') {
        newState.query = action.payload.query
      } else {
        newState.query = state.query
      }
      if (typeof action.payload.queryToRender !== 'undefined') {
        newState.queryToRender = action.payload.queryToRender
      } else {
        newState.queryToRender = state.queryToRender
      }
      if (typeof action.payload.searchResults !== 'undefined') {
        newState.searchResults = action.payload.searchResults
      } else {
        newState.searchResults = state.searchResults
      }
      if (typeof action.payload.searchEngine !== 'undefined') {
        newState.searchEngine = action.payload.searchEngine
      } else {
        newState.searchEngine = state.searchEngine
      }
      return newState
    }
    default: {
      return state
    }
  }
}
