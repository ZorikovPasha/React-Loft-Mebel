import { fetchSlidesActionType, SlidesType, ActionsTypes } from '../../types';

export type stateType = {
  slides: Array<SlidesType>
};

const initialState: stateType = {
  slides: []
}

const slidesReducer = (state = initialState, action: fetchSlidesActionType ): stateType => {
  switch (action.type) {
    case ActionsTypes.FETCH_SLIDES:
      return {
        ...state,
        slides: action.payload,
      }
    default:
      return state;
  };
};

export default slidesReducer;