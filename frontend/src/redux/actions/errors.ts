export interface ItoggleSnackbarOpenAction {
  type: 'TOGGLE_SNACKBAR_OPEN'
  message: string
  variant: 'error' | 'warning' | 'success'
}

export interface ItoggleSnackbarCloseAction {
  type: 'TOGGLE_SNACKBAR_CLOSE'
}

export const toggleSnackbarOpen = (
  message = 'Something went wrong. Please, try again.',
  variant: ItoggleSnackbarOpenAction['variant'] = 'error'
): ItoggleSnackbarOpenAction => ({
  type: 'TOGGLE_SNACKBAR_OPEN',
  message,
  variant
})

export const toggleSnackbarClose = () => ({
  type: 'TOGGLE_SNACKBAR_CLOSE'
})
