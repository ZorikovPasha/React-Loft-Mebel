import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { SlidesType, fetchSlidesActionType, ActionsTypes } from '../../types';
import { stateType } from '../reducers/slidesReducer';
import { getDataByName } from '../../api';

const fetchSlidesActionCreator = (slides: SlidesType[]): fetchSlidesActionType => ({
  type: ActionsTypes.FETCH_SLIDES,
  payload: slides
});


export const fetchSlidesThunkCreator = (): ThunkAction<void, stateType, unknown, fetchSlidesActionType> => {
  return async (dispatch:  Dispatch<fetchSlidesActionType>) => {
    const slider = await getDataByName('slider');
    dispatch(fetchSlidesActionCreator(slider));
  }
}
