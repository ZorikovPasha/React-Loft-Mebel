import React from 'react'

type IButonProps = {
  type: 'button' | 'submit'
  children: string | React.ReactElement
  title: string
  className: string
  selfRef?: React.MutableRefObject<HTMLButtonElement | null>
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement> | undefined
  onSubmit?: (() => void) | React.FormEventHandler<HTMLButtonElement>
}

export const Button: React.FC<IButonProps> = ({ selfRef, children, title, className, ...rest }) => {
  return (
    <button
      className={className}
      type={rest.type}
      title={title}
      ref={selfRef}
      aria-label={title}
      {...(rest.type === 'button' && { onClick: rest.onClick })}
      {...(rest.type === 'submit' && { onSubmit: rest.onSubmit })}
    >
      {children}
    </button>
  )
}
