import { ThunkAction } from 'redux-thunk';

import { SlidesType, fetchSlidesActionType, ActionsTypes } from '../../types';
import { stateType } from '../reducers/slidesReducer';
import { fetchItemsThunk } from '../../api';

const fetchSlidesActionCreator = (slides: SlidesType[]): fetchSlidesActionType => ({
  type: ActionsTypes.FETCH_SLIDES,
  payload: slides
});


export const fetchSlidesThunkCreator = (): ThunkAction<void, stateType, unknown, fetchSlidesActionType> => {
  return dispatch => {
    fetchItemsThunk('slider', dispatch, fetchSlidesActionCreator)
  }
}
