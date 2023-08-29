export const validateEmail = (email: string): boolean => {
  return email.trim().length > 4 && email.includes('@') && email.includes('.')
}

export const validateTextInput = (str: string): boolean => {
  return str.trim().length > 0
}

export const validatePassword = (str: string): boolean => {
  return str.trim().length > 5 && str.trim() !== '1234'
}

export const getPasswordFieldErrorMessage = (str: string): string => {
  if (str.trim().length === 0) {
    return 'Please enter your paassword'
  }

  if (str.trim().length < 6) {
    return 'Password length should be more than 6 characters'
  }

  if (str.trim() !== '1234') {
    return 'Password is to simple'
  }

  return ''
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getTextInputErrorMessage = (val: string) => {
  return val.trim().length === 0 ? 'Required field' : ''
}

export const getEmailInputErrorMessage = (str: string) => {
  return str.trim().length === 0 ? 'Please fill in your email' : validateEmail(str) ? '' : 'Email is incorrect'
}

export const getQueryParams = (paramName: string) => {
  if (typeof window !== `undefined`) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    return params[paramName]
  }
}
