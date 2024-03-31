import { ItoggleSnackbarCloseAction, ItoggleSnackbarOpenAction } from '../actions/errors'

export interface IErrorsState {
  toggleSnackbar: boolean
  message: null | string
  variant: 'error' | 'warning' | 'success'
}

const initialState: IErrorsState = {
  toggleSnackbar: false,
  message: null,
  variant: 'error'
}

export const errorsReducer = (
  state = initialState,
  action: ItoggleSnackbarCloseAction | ItoggleSnackbarOpenAction
): IErrorsState => {
  switch (action.type) {
    case 'TOGGLE_SNACKBAR_OPEN': {
      return {
        ...state,
        toggleSnackbar: true,
        variant: action.variant,
        message: action.message
      }
    }

    case 'TOGGLE_SNACKBAR_CLOSE': {
      return {
        ...state,
        toggleSnackbar: false,
        message: null,
        variant: 'error'
      }
    }

    default: {
      return state
    }
  }
}
