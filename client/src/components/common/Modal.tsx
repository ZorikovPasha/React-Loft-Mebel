import React from 'react'

interface IModalProps {
  content: React.ReactElement
  onModalClose: () => void
}

export const Modal: React.FC<IModalProps> = ({ onModalClose, content }) => {
  return (
    <div className='popup shown'>
      <div className='popup__body'>
        <button
          type='button'
          title='Close modal'
          className='popup__close mob-menu__close'
          onClick={onModalClose}
        />
        {content}
      </div>
    </div>
  )
}
