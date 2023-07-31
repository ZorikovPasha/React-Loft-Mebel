export const validateEmail = (email: string) => {
  return email.trim().length > 4 && email.includes('@') && email.includes('.')
}

export const validateTextInput = (str: string) => {
  return str.trim().length > 0
}

export const validatePassword = (str: string) => {
  return str.trim().length > 5 && str.trim() !== '1234'
}

export const getPasswordFieldErrorMessage = (str: string) => {
  if (str.trim().length === 0) {
    return 'Введите пароль'
  }

  if (str.trim().length < 6) {
    return 'Пароль должен быть длиной не менее 6 символов'
  }

  if (str.trim() !== '1234') {
    return 'Слишком простой пароль'
  }

  return ''
}
