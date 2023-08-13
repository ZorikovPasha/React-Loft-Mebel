import React from 'react'

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

  const popupRef = React.useRef(null)

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
      toggleSortPopupVisibility((prev) => (prev && !path.includes(popupRef.current) ? false : prev))
    }

    document.body.addEventListener('click', handleOutsidePopupClick)

    return () => {
      document.body.removeEventListener('click', handleOutsidePopupClick)
    }
  }, [])

  return (
    <button
      className='controls__sort'
      onClick={onSortBtnClick}
      ref={popupRef}
    >
      Сортировать: <span className='controls__sort-choice'>{items.find((item) => item.value === activeCat)?.text}</span>
      {isSortPopupVisible && (
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
      )}
    </button>
  )
}
