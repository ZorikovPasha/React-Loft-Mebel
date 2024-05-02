import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Link from 'next/link'

import { Button } from '../../common/Button'
import { breakString, formatStr } from '../../../utils'
import { useScreenSize } from '../../../hooks/useScreenSize'
import { ISearchState } from '../../../layout'

interface IProps {
  state: ISearchState
  onCloseDropdown: () => void
}

const SearchResults = ({ state, onCloseDropdown }: IProps) => {
  const { query, queryToRender, searchResults } = state

  return (
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
        searchResults.map(({ item: { title, link, texts, imageUrl } }, idx) => {
          const textWithQuery = texts.find((t) => formatStr(t).includes(formatStr(queryToRender))) ?? undefined

          return (
            <Link
              href={link}
              key={idx + title}
            >
              <a
                className={`search__dropdown-item ${!idx ? 'search__dropdown-item--no-top-border' : ''} flex`}
                onClick={onCloseDropdown}
              >
                <span className='search__dropdown-item-img'>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BACKEND && imageUrl
                        ? process.env.NEXT_PUBLIC_BACKEND + imageUrl
                        : '/stub.jpg'
                    }
                    alt=''
                  />
                </span>
                <span>
                  <span className='search__dropdown-item-name'>{breakString(title, queryToRender)}</span>
                  {textWithQuery ? (
                    <span className='search__dropdown-item-text'>{breakString(textWithQuery, queryToRender)}</span>
                  ) : null}
                </span>
              </a>
            </Link>
          )
        })}
    </PerfectScrollbar>
  )
}

interface ISearchProps {
  state: ISearchState
  setSearch: React.Dispatch<React.SetStateAction<ISearchState>>
}

interface IMobileSearchProps {
  state: ISearchState
  onChange: React.ChangeEventHandler<HTMLInputElement>
  clearSearch: () => void
}

const MobileSearch = ({ state, clearSearch, onChange }: IMobileSearchProps) => {
  const { query } = state

  const inputRef = React.useRef<HTMLInputElement>(null)
  const searchFormRef = React.useRef<HTMLFormElement>(null)
  const dropDownRef = React.useRef(null)
  const searchButtonRef = React.useRef<HTMLButtonElement>(null)

  const [showSearch, setShowSearch] = React.useState(false)
  const [dropdownShown, setDropdownShown] = React.useState(query.length > 2)

  React.useEffect(() => {
    setDropdownShown(query.length > 2)
  }, [query])

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [showSearch])

  React.useEffect(() => {
    const onCloseByOutsideClick = (e: MouseEvent) => {
      const path = e.path || (e.composedPath && e.composedPath())
      setShowSearch((prev) => {
        if (
          prev &&
          !path.includes(searchFormRef.current) &&
          !path.includes(searchButtonRef.current) &&
          !path.includes(dropDownRef.current)
        ) {
          document.body.classList.remove('lock')
          return false
        } else {
          return prev
        }
      })
    }

    window.addEventListener('click', onCloseByOutsideClick)
    inputRef.current?.focus()

    return () => {
      window.removeEventListener('click', onCloseByOutsideClick)
    }
  }, [])

  const onSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  const openSearch = () => {
    setShowSearch(true)
  }

  const closeSearch = () => {
    setShowSearch(false)
  }

  const handleClearSearch = () => {
    clearSearch()
    inputRef.current?.focus()
  }

  return (
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
              {query.length > 0 ? (
                <Button
                  type='button'
                  className='header__search-close'
                  title='Clear search'
                  onClick={handleClearSearch}
                >
                  <img
                    className='width-full height-full'
                    src='/images/icons/cross.svg'
                    alt='cross icon'
                  />
                </Button>
              ) : null}
            </form>

            {dropdownShown && (
              <div
                className='search__dropdown'
                ref={dropDownRef}
              >
                <SearchResults
                  state={state}
                  onCloseDropdown={closeSearch}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

interface IDesktopSearchProps {
  state: ISearchState
  onChange: React.ChangeEventHandler<HTMLInputElement>
  clearSearch: () => void
}

export const DesktopSearch = ({ state, clearSearch, onChange }: IDesktopSearchProps) => {
  const searchWrapRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [dropdownShown, setDropdownShown] = React.useState(state.query.length > 2)

  React.useEffect(() => {
    setDropdownShown(state.query.length > 2)
  }, [state.query])

  React.useEffect(() => {
    const onCloseByOutsideClick = (e: MouseEvent) => {
      const path = e.path || (e.composedPath && e.composedPath())
      setDropdownShown((prev) => {
        if (prev && !path.includes(searchWrapRef.current)) {
          document.body.classList.remove('lock')
          return false
        } else {
          return prev
        }
      })
    }

    window.addEventListener('click', onCloseByOutsideClick)
    return () => {
      window.removeEventListener('click', onCloseByOutsideClick)
    }
  }, [])

  const onSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  const onCloseDropdown = () => {
    setDropdownShown(false)
  }

  const handleClearSearch = () => {
    clearSearch()
    inputRef.current?.focus()
  }

  return (
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
          value={state.query}
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
        {state.query.length > 0 ? (
          <Button
            type='button'
            className='header__search-close'
            title='Clear search'
            onClick={handleClearSearch}
          >
            <img
              className='width-full height-full'
              src='/images/icons/cross.svg'
              alt='cross icon'
            />
          </Button>
        ) : null}
      </form>

      {dropdownShown ? (
        <div className='search__dropdown bwhite'>
          <SearchResults
            state={state}
            onCloseDropdown={onCloseDropdown}
          />
        </div>
      ) : null}
    </div>
  )
}

export const Search = ({ state, setSearch }: ISearchProps) => {
  const isDesktop = useScreenSize()

  const clearSearch = () => {
    setSearch((prev) => ({
      ...prev,
      query: '',
      queryToRender: ''
    }))
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const s = e.target.value.trimStart()
    const newQueryToRender = e.target.value.trim()

    if (s.length < 3) {
      setSearch((prev) => ({
        ...prev,
        query: s,
        searchResults: []
      }))
      return
    }

    const data =
      state.searchEngine
        .search(newQueryToRender)
        .concat(state.searchResults)
        //removing duplicates
        .filter((v, i, arr) => arr.findIndex((v2) => v2.item.title === v.item.title) === i)
        .filter(({ item: { title, texts } }) => {
          return (
            formatStr(title).includes(formatStr(newQueryToRender)) ||
            texts.some((t) => formatStr(t).includes(formatStr(newQueryToRender)))
          )
        }) ?? []

    setSearch((prev) => ({
      ...prev,
      query: s,
      queryToRender: data && data.length > 0 ? e.target.value.trim() : state.queryToRender,
      ...(data && data.length > 0 && { searchResults: data })
    }))
  }

  return isDesktop ? (
    <DesktopSearch
      state={state}
      onChange={onChange}
      clearSearch={clearSearch}
    />
  ) : (
    <MobileSearch
      state={state}
      onChange={onChange}
      clearSearch={clearSearch}
    />
  )
}
