import React from 'react'

type InputType = 'text' | 'email' | 'tel' | 'password'
type ElementType = 'input' | 'textarea'

export interface IInputProps {
  elementType: ElementType
  name: string
  label?: string
  type: InputType
  value: string
  errorMessage?: string
  rootElclass?: string
  labelClass?: string
  inputWrapClass?: string
  inputClassName?: string
  placeholder?: string
  customPlaceholder?: string
  required: boolean | undefined
  showErrors: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const AppTextField: React.FC<IInputProps> = ({
  value,
  name,
  elementType,
  label,
  labelClass = '',
  type = 'text',
  rootElclass = '',
  required = false,
  showErrors,
  inputWrapClass = '',
  inputClassName = '',
  placeholder = '',
  customPlaceholder,
  errorMessage,
  onChange
}) => {
  console.log('customPlaceholder', customPlaceholder, required)

  return (
    <div className={rootElclass}>
      {label && <label className={labelClass}>{label}</label>}
      <div className={inputWrapClass}>
        {elementType === 'textarea' ? (
          <textarea
            name={name}
            className={`${inputClassName} ${showErrors ? 'form-input--error' : ''}`}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            className={`${inputClassName} ${showErrors ? 'form-input--error' : ''}`}
            value={value}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}

        {customPlaceholder ? (
          <label
            className='profile__custom-placeholder'
            htmlFor={name}
          >
            {customPlaceholder}
          </label>
        ) : null}
      </div>

      {errorMessage && showErrors && <span className='form__error'>{errorMessage}</span>}
    </div>
  )
}

export default React.memo(AppTextField)
