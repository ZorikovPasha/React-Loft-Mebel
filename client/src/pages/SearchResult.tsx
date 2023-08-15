import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFavorites, getFilteredProductsByName } from '../redux/getters'
import { Empty } from '../components/common/Empty'
import { SalesItem } from '../components/common/SalesItem'

const SearchResult: React.FC = () => {
  const history = useHistory()
  const [searchValue, setSearchValue] = React.useState('')
  const { favorites } = useSelector(getFavorites)

  const items = useSelector(getFilteredProductsByName(searchValue))

  React.useEffect(() => {
    setSearchValue(history.location.search.split('=')[1] ?? '')
  }, [history.location.search])

  return (
    <>
      <div className='search-results'>
        <div className='container'>
          <div className='search-results__top'>
            <h1 className='search-results__title'>Результаты поиска</h1>
          </div>

          <div className='search-results__content'>
            {items.length ? (
              <div className='search-results__items catalog__items'>
                {items.map((item) => (
                  <SalesItem
                    key={item.id}
                    product={item}
                    isFavorite={favorites.includes(item.id)}
                  />
                ))}
              </div>
            ) : (
              <Empty text='Ничего не найдено' />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchResult
