import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFilteredProductsByName, getUserData } from '../redux/getters'
import { Empty } from '../components/common/Empty'
import { Card } from '../components/common/SalesItem'

const SearchResult: React.FC = () => {
  const history = useHistory()
  const [searchValue, setSearchValue] = React.useState('')
  const { favorites } = useSelector(getUserData)

  const items = useSelector(getFilteredProductsByName(searchValue))

  React.useEffect(() => {
    setSearchValue(history.location.search.split('=')[1] ?? '')
  }, [history.location.search])

  return (
    <>
      <div className='search-results'>
        <div className='container'>
          <div className='mt-30'>
            <h1 className='search-results__title'>Результаты поиска</h1>
          </div>

          <div className='search-results__content'>
            {items.length ? (
              <div className='search-results__items catalog__items'>
                {items.map((item) => (
                  <Card
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
          <div className='mt-40' />
        </div>
      </div>
    </>
  )
}

export default SearchResult
