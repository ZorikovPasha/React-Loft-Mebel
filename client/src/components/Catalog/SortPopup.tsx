import React from 'react'
import { Button } from '../common/Button'

interface ISortPopupProps {
  onSelectSortType: (cat: string) => void
}

export const SortPopup: React.FC<ISortPopupProps> = ({ onSelectSortType }) => {
  const items = [
    {
      value: 'desc',
      text: 'по убыванию цены'
    },
    {
      value: 'asc',
      text: 'по возрастанию цены'
    },
    {
      value: 'pop',
      text: 'по популярности'
    }
  ]

  const [isSortPopupVisible, toggleSortPopupVisibility] = React.useState(false)
  const [activeCat, setActiveCat] = React.useState<string>('asc')

  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  const onSortBtnClick = (): void => {
    toggleSortPopupVisibility(!isSortPopupVisible)
  }

  const onListItemClick = (type: string) => () => {
    setActiveCat(type)
    toggleSortPopupVisibility(false)
    onSelectSortType(type)
  }

  React.useEffect(() => {
    const handleOutsidePopupClick = (e: MouseEvent): void => {
      const path = e.path || (e.composedPath && e.composedPath())
      toggleSortPopupVisibility((prev) => (prev && !path.includes(buttonRef.current) ? false : prev))
    }

    document.body.addEventListener('click', handleOutsidePopupClick)

    return () => {
      document.body.removeEventListener('click', handleOutsidePopupClick)
    }
  }, [])

  return (
    <Button
      className='controls__sort'
      selfRef={buttonRef}
      title='Sort'
      type='button'
      onClick={onSortBtnClick}
    >
      <>
        <span className='controls__sort-choice'>{items.find((item) => item.value === activeCat)?.text}</span>
        {isSortPopupVisible ? (
          <ul className='sort-list'>
            {items.map(({ value, text }) => (
              <li
                className={`sort-list__item ${activeCat === value ? 'active' : ''}`}
                onClick={onListItemClick(value)}
                key={value}
              >
                {text}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
      </>
    </Button>
  )
}
