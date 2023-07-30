import React from 'react'
import { useHistory } from 'react-router-dom'

interface IHeaderSearchFormProps {
  inputSpec?: boolean
}

export const HeaderSearchForm: React.FC<IHeaderSearchFormProps> = ({ inputSpec }) => {
  const [searchValue, setSearchValue] = React.useState('')
  const history = useHistory()

  const onSearchValChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setSearchValue(e.target.value)
  }

  const onSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    history.push({ pathname: '/search', search: '?value=' + searchValue })
  }

  return (
    <form
      className='header__form'
      onSubmit={onSearchSubmit}
    >
      <input
        className={`header__input ${inputSpec ? 'header__input--spec' : ''}`}
        type='text'
        placeholder='Поиск'
        value={searchValue}
        onChange={onSearchValChange}
      />
      <button
        className='header__search'
        type='submit'
      >
        <img
          src='/images/icons/search.svg'
          alt='search'
        />
      </button>
    </form>
  )
}
