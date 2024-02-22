import { Actions } from './types'
import { ISearchState } from '../reducers/search'

export const editSearchActionCreator = (payload: Partial<ISearchState>): ISearchAction => ({
  type: Actions.SEARCH,
  payload
})

export interface ISearchAction {
  type: typeof Actions.SEARCH
  payload: Partial<ISearchState>
}
