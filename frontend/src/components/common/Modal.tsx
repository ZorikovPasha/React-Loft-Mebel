import React from 'react'
import { Button } from './Button'

interface IModalProps {
  content: React.ReactElement
  bodyClass?: string
  onModalClose: () => void
}

export const Modal: React.FC<IModalProps> = ({ bodyClass = '', onModalClose, content }) => {
  return (
    <div className='popup shown'>
      <div className={`popup__body ${bodyClass}`}>
        <Button
          type='button'
          title='Close modal'
          className='popup__close mob-menu__close'
          onClick={onModalClose}
        >
          <img
            src='/images/mob-menu/close.svg'
            alt=''
          />
        </Button>
        {content}
      </div>
    </div>
  )
}
