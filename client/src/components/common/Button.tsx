import React from 'react'

type IButonProps = {
  type: 'button' | 'submit' | 'reset'
  children: string | React.ReactElement
  title: string
  disabled?: boolean
  className: string
  selfRef?: React.MutableRefObject<HTMLButtonElement | null>
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement> | undefined
  onSubmit?: (() => void) | React.FormEventHandler<HTMLButtonElement>
}

export const Button: React.FC<IButonProps> = ({ selfRef, disabled = false, children, title, className, ...rest }) => {
  return (
    <button
      className={className}
      type={rest.type}
      title={title}
      ref={selfRef}
      aria-label={title}
      disabled={disabled}
      {...(rest.type === 'button' && { onClick: rest.onClick })}
      {...(rest.type === 'submit' && { onSubmit: rest.onSubmit })}
    >
      {children}
    </button>
  )
}
