import React from 'react'
import { Button } from '../common/Button'

export type SortOptions = 'asc' | 'desc' | 'pop'

interface ISortPopupProps {
  activeSortOption: SortOptions
  setActiveSortOption: React.Dispatch<React.SetStateAction<SortOptions>>
}

export const SortPopup: React.FC<ISortPopupProps> = ({ activeSortOption, setActiveSortOption }) => {
  const items = [
    {
      value: 'desc',
      text: 'Price ⬇️'
    },
    {
      value: 'asc',
      text: 'Price ⬆️'
    },
    {
      value: 'pop',
      text: 'Popularity ⭐'
    }
  ]

  const [isSortPopupVisible, toggleSortPopupVisibility] = React.useState(false)

  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  const onSortBtnClick = (): void => {
    toggleSortPopupVisibility(!isSortPopupVisible)
  }

  const onListItemClick = (type: SortOptions) => () => {
    setActiveSortOption(type)
    toggleSortPopupVisibility(false)
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
        <span className='controls__sort-choice'>{items.find((item) => item.value === activeSortOption)?.text}</span>
        {isSortPopupVisible ? (
          <ul className='sort-list'>
            {items.map(({ value, text }) => (
              <li
                className={`sort-list__item ${activeSortOption === value ? 'active' : ''}`}
                onClick={onListItemClick(value as SortOptions)}
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
