import React from 'react'

type InputType = 'text' | 'email' | 'tel' | 'password'
type ElementType = 'input' | 'textarea'

interface IInputProps {
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
  placeholder: string
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
  errorMessage,
  onChange
}) => {
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
      </div>

      {errorMessage && showErrors && <span className='form__error'>{errorMessage}</span>}
    </div>
  )
}

export default React.memo(AppTextField)
