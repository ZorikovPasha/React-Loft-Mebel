import Fuse from 'fuse.js'
import { ISearchAction } from '../actions/search'
import { Actions } from '../../types/actionsTypes'

interface searchItemType {
  title: string
  link: string
  texts: string[]
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
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state
    }
  }
}
