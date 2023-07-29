import React, { FC, MouseEventHandler } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Aside, SortPopup, SalesItem, Breadcrumbs, Loader, Empty } from '../Components'
import { getFavorites } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { ProductType, submitValuesType } from '../types'
import { makeQueryParametersFromStringArr } from '../utils/makeQueryParametersFromStringArr'
import { ApiClient } from '../services/api'

const Catalog: FC = () => {
  const history = useHistory()

  const asideToggleRef = React.useRef(null)

  const filters = React.useRef({
    room: '',
    material: '',
    type: '',
    brands: [] as string[],
    colors: [] as string[],
    sort: 'asc'
  })

  const QueryCache = React.useRef(history.location.search + '&sort=asc')

  const [isAsideVisible, toggleAsideVisibility] = React.useState(false)
  const [items, setItems] = React.useState<ProductType[]>([])
  const [isLoading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    ApiClient.get<ProductType[]>('/api/furniture' + history.location.search).then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [history.location.search])

  const { favorites } = useSelector(getFavorites)

  const breadcrumbs = useBreadcrumbs()

  const handleFiltersSubmit = ({ brandsIds, colorsIds, room, material, type }: submitValuesType) => {
    filters.current.room = room
    filters.current.material = material
    filters.current.type = type
    filters.current.brands = brandsIds
    filters.current.colors = colorsIds

    const roomQuery = `${filters.current.room === 'all' ? '' : `&room=${filters.current.room}`}`
    const materialQuery = `${filters.current.material === 'all' ? '' : `&material=${filters.current.material}`}`
    const typeQuery = `${filters.current.type === 'all' ? '' : `&type=${filters.current.type}`}`
    const brandsQuery = makeQueryParametersFromStringArr(filters.current.brands, 'brand')
    const colorsQuery = makeQueryParametersFromStringArr(filters.current.colors, 'color')
    const sortQuery = filters.current.sort ? '&sort=' + filters.current.sort : ''

    let searchQuery = roomQuery + materialQuery + typeQuery + brandsQuery + colorsQuery + sortQuery

    if (searchQuery[0] === '&') {
      searchQuery = '?' + searchQuery.substring(1)
    }

    if (QueryCache.current !== searchQuery) {
      QueryCache.current = searchQuery

      history.push({
        pathname: '',
        search: searchQuery
      })
    }

    toggleAsideVisibility(false)
    document.documentElement.classList.remove('lock')
  }

  const onBtnClick: MouseEventHandler<HTMLButtonElement> = React.useCallback((): void => {
    toggleAsideVisibility(true)
    document.documentElement.classList.add('lock')
  }, [])

  const onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    toggleAsideVisibility(false)
    document.documentElement.classList.remove('lock')
  }

  const onSelectSortType = React.useCallback((cat: string): void => {
    filters.current.sort = cat
  }, [])

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className='catalog'>
        <div className='container'>
          <div className='catalog__inner'>
            {
              <Aside
                isAsideVisible={isAsideVisible}
                onAsideCloseClick={onAsideCloseClick}
                handleFiltersSubmit={handleFiltersSubmit}
              />
            }
            <div className='catalog__body'>
              <div className='catalog__controls controls'>
                <button
                  className='controls__toggle-aside'
                  onClick={onBtnClick}
                  ref={asideToggleRef}
                >
                  Фильтр
                </button>
                <SortPopup onSelectSortType={onSelectSortType} />
              </div>
              {isLoading ? (
                <Loader />
              ) : items.length ? (
                <div className='catalog__items'>
                  {items.map((item) => (
                    <SalesItem
                      key={item.id}
                      product={item}
                      baseDir={'../../'}
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
      </section>
    </>
  )
}

export default Catalog
