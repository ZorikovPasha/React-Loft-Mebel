import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom'

import { Button } from '../../common/Button'
import { getSearch } from '../../../redux/getters'
import { breakString, formatStr } from '../../../utils'
import { editSearchActionCreator } from '../../../redux/actions/search'
import { useScreenSize } from '../../../hooks/useScreenSize'

export const Search: React.FC = () => {
  const { query, queryToRender, searchEngine, searchResults } = useSelector(getSearch)

  const dropDownRef = React.useRef(null)
  const searchWrapRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const searchButtonRef = React.useRef<HTMLButtonElement>(null)
  const searchFormRef = React.useRef<HTMLFormElement>(null)

  const [dropdownShown, setDropdownShown] = React.useState(query.length > 2)
  const [showSearch, setShowSearch] = React.useState(false)

  const dispatch = useDispatch()
  const isDesktop = useScreenSize()

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  React.useEffect(() => {
    setDropdownShown(query.length > 2)
  }, [query])

  React.useEffect(() => {
    const onCloseByOutsideClick = (e: MouseEvent) => {
      const path = e.path || (e.composedPath && e.composedPath())
      if (
        !path.includes(searchWrapRef.current) &&
        !path.includes(searchButtonRef.current) &&
        !path.includes(dropDownRef.current) &&
        !path.includes(searchFormRef.current)
      ) {
        setShowSearch(false)
        document.body.classList.remove('lock')
        setDropdownShown(false)
      }
    }

    window.addEventListener('click', onCloseByOutsideClick)
    inputRef.current?.focus()

    return () => {
      window.removeEventListener('click', onCloseByOutsideClick)
    }
  }, [])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const s = e.target.value.trimStart()
    const newQueryToRender = e.target.value.trim()

    if (s.length < 3) {
      const payload = {
        query: s,
        searchResults: []
      }
      return dispatch(editSearchActionCreator(payload))
    }

    const data =
      searchEngine
        .search(newQueryToRender)
        .concat(searchResults)
        //removing duplicates
        .filter((v, i, arr) => arr.findIndex((v2) => v2.item.title === v.item.title) === i)
        .filter(({ item: { title, texts } }) => {
          return (
            formatStr(title).includes(formatStr(newQueryToRender)) ||
            texts.some((t) => formatStr(t).includes(formatStr(newQueryToRender)))
          )
        }) ?? []

    const payload = {
      query: s,
      queryToRender: data && data.length > 0 ? e.target.value.trim() : queryToRender,
      ...(data && data.length > 0 && { searchResults: data })
    }
    dispatch(editSearchActionCreator(payload))
  }

  const onSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  const onClose = () => {
    setDropdownShown(false)
  }

  const openSearch = () => {
    document.body.classList.add('lock')
    setShowSearch(true)
  }

  return isDesktop ? (
    <div
      className='header__form-wrapper'
      ref={searchWrapRef}
    >
      <form
        className='header__form'
        onSubmit={onSearchSubmit}
      >
        <input
          ref={inputRef}
          className='header__input'
          type='text'
          placeholder='Search'
          value={query}
          onChange={onChange}
        />

        <Button
          title='Search'
          className='header__search'
          type='submit'
        >
          <img
            src='/images/icons/search.svg'
            alt='search'
          />
        </Button>
      </form>

      {dropdownShown && (
        <div
          className='search__dropdown bwhite'
          ref={dropDownRef}
        >
          <PerfectScrollbar className='search__dropdown-list'>
            {!searchResults?.length && (
              <div className='search__empty'>
                <p className='search-results__query'>{query}</p>
                <p className='search-results__text'>
                  Searching ”{query}” found <span className='search-results__text--black'>0 results</span>
                </p>
              </div>
            )}

            {searchResults.length > 0 &&
              searchResults.map(({ item: { title, link, texts } }, idx) => {
                const textWithQuery = texts.find((t) => formatStr(t).includes(formatStr(queryToRender))) ?? ''
                return (
                  <Link
                    to={link}
                    key={idx + title}
                    className={`search__dropdown-item ${!idx ? 'search__dropdown-item--no-top-border' : ''}`}
                    onClick={onClose}
                  >
                    <p className='search__dropdown-item-name'>{breakString(title, queryToRender)}</p>
                    <p className='search__dropdown-item-text'>{breakString(textWithQuery, queryToRender)}</p>
                  </Link>
                )
              })}
          </PerfectScrollbar>
        </div>
      )}
    </div>
  ) : (
    <>
      <Button
        type='button'
        selfRef={searchButtonRef}
        title='Open search panel'
        className='header__search-icon'
        onClick={openSearch}
      >
        <img
          src='/images/icons/search.svg'
          alt=''
        />
      </Button>

      {showSearch && (
        <div className='search'>
          <div className='search__body'>
            <form
              ref={searchFormRef}
              className='header__form'
              onSubmit={onSearchSubmit}
            >
              <input
                ref={inputRef}
                className='header__input'
                type='text'
                placeholder='Search'
                value={query}
                onChange={onChange}
              />

              <span className='header__search'>
                <img
                  src='/images/icons/search.svg'
                  alt='search'
                />
              </span>
            </form>

            {dropdownShown && (
              <div
                className='search__dropdown'
                ref={dropDownRef}
              >
                <PerfectScrollbar className='search__dropdown-list'>
                  {!searchResults?.length && (
                    <div className='search__empty'>
                      <p className='search-results__query'>{query}</p>
                      <p className='search-results__text'>
                        Searching ”{query}” found <span className='search-results__text--black'>0 results</span>
                      </p>
                    </div>
                  )}

                  {searchResults.length > 0 &&
                    searchResults.map(({ item: { title, link, texts } }, idx) => {
                      const textWithQuery = texts.find((t) => formatStr(t).includes(formatStr(queryToRender))) ?? ''
                      return (
                        <Link
                          to={link}
                          key={idx + title}
                          className={`search__dropdown-item ${!idx ? 'search__dropdown-item--no-top-border' : ''}`}
                          onClick={onClose}
                        >
                          <p className='search__dropdown-item-name'>{breakString(title, queryToRender)}</p>
                          <p className='search__dropdown-item-text'>{breakString(textWithQuery, queryToRender)}</p>
                        </Link>
                      )
                    })}
                </PerfectScrollbar>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
