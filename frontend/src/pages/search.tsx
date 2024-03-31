import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { getFilteredProductsByName, getUserData } from '../redux/getters'
import { Empty } from '../components/common/Empty'
import { Card } from '../components/common/card'

const SearchResult: React.FC = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = React.useState('')
  const { favorites } = useSelector(getUserData)

  const items = useSelector(getFilteredProductsByName(searchValue))

  React.useEffect(() => {
    if (typeof router.query.search === 'string') {
      setSearchValue(router.query.search?.split('=')[1] ?? '')
    }
  }, [])

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
                    isFavorite={typeof item.id === 'number' ? favorites.includes(item.id) : false}
                  />
                ))}
              </div>
            ) : (
              <Empty text='Nothing found' />
            )}
          </div>
          <div className='mt-40' />
        </div>
      </div>
    </>
  )
}

export default SearchResult
