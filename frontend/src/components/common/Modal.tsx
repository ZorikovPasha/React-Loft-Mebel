import React from 'react'
import { Button } from './Button'

interface IModalProps {
  content: React.ReactElement
  showClose?: boolean
  bodyClass?: string
  onModalClose: () => void
}

export const Modal: React.FC<IModalProps> = ({ bodyClass = '', onModalClose, content, showClose = true }) => {
  const closePopupByEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onModalClose()
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', closePopupByEscape)

    return () => window.removeEventListener('keydown', closePopupByEscape)
  }, [])

  return (
    <div className='popup shown'>
      <div className={`popup__body ${bodyClass}`}>
        {showClose ? (
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
        ) : null}
        {content}
      </div>
    </div>
  )
}
