import { ActionsTypes } from '../../types/actionsTypes';


type quintityActionsTypes = ActionsTypes.QUINTITY;

type actionCreatorType<T> = (payload?: T) => { type: quintityActionsTypes, payload?: T}


export const quintityActionCreator: actionCreatorType<null> = () => ({
  type: ActionsTypes.QUINTITY,
});