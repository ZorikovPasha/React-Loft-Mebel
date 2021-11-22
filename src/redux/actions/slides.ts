import { ThunkAction } from 'redux-thunk';

import { ActionsTypes } from '../types';
import { SlidesType } from '../types';
import { fetchSlidesActionCreatorType } from '../types';
import { initialStateType } from '../reducers/slidesReducer';
import { fetchItemsThunk } from '../api';

import { CONST } from '../types';

const fetchSlidesActionCreator = (slides: SlidesType[]): fetchSlidesActionCreatorType => ({
  type: CONST.FETCH_SLIDES,
  payload: slides
});


export const fetchSlidesThunkCreator = (): ThunkAction<void, initialStateType, unknown, ActionsTypes> => {
  return dispatch => {
    fetchItemsThunk('slider', dispatch, fetchSlidesActionCreator)
  }
}
