import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Aside } from '../components/Catalog/Aside'
import { SortPopup } from '../components/Catalog/SortPopup'
import { Card } from '../components/common/card'
import { Empty } from '../components/common/Empty'
import { Loader } from '../components/common/Loader'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { getUserData } from '../redux/getters'
import { useBreadcrumbs } from '../hooks/useBreadcrumbs'
import { submitValuesType } from '../types'
import { makeQueryParametersFromStringArr } from '../utils/makeQueryParametersFromStringArr'
import { PublicApiClient } from '../api'
import { IFurniture } from '../api/types'
import { Button } from '../components/common/Button'

const Catalog: React.FC = () => {
  const history = useHistory()

  const asideToggleRef = React.useRef<HTMLButtonElement | null>(null)

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
  const [items, setItems] = React.useState<IFurniture[]>([])
  const [isLoading, setLoading] = React.useState(false)

  console.log('items', items)

  React.useEffect(() => {
    const controller = new AbortController()

    setLoading(true)

    PublicApiClient.getFurniture(controller.signal)
      .then((data) => {
        setItems(data.items)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
    return () => controller.abort()
  }, [history.location.search])

  const { favorites } = useSelector(getUserData)

  const breadcrumbs = useBreadcrumbs()

  const colors = items.reduce((accum: string[], next) => {
    const absentColors = next.colors.filter((c) => !accum.includes(c))
    return accum.concat(absentColors)
  }, [])

  const brands = items.reduce((accum: string[], next) => {
    return accum.includes(next.brand) ? accum : accum.concat(next.brand)
  }, [])

  const rooms = items.reduce((accum: string[], next) => {
    return accum.includes(next.room) ? accum : accum.concat(next.room)
  }, [])

  const materials = items.reduce((accum: string[], next) => {
    return accum.includes(next.material) ? accum : accum.concat(next.material)
  }, [])

  const furnitureTypes = items.reduce((accum: string[], next) => {
    return accum.includes(next.type) ? accum : accum.concat(next.type)
  }, [])

  const handleFiltersSubmit = ({ brandsIds, colorsIds, room, material, type }: submitValuesType): void => {
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

  const onBtnClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((): void => {
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
          <div className='flex align-start'>
            <Aside
              colors={colors}
              brands={brands}
              rooms={rooms}
              types={furnitureTypes}
              materials={materials}
              isAsideVisible={isAsideVisible}
              onAsideCloseClick={onAsideCloseClick}
              handleFiltersSubmit={handleFiltersSubmit}
            />
            <div className='catalog__body'>
              <div className='catalog__controls controls flex'>
                <Button
                  className='controls__toggle-aside'
                  title='Filter'
                  type='button'
                  selfRef={asideToggleRef}
                  onClick={onBtnClick}
                >
                  <>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='3'
                        y='7'
                        width='11'
                        height='2'
                        fill='#000'
                      />
                      <rect
                        x='3'
                        y='11'
                        width='14'
                        height='2'
                        fill='#000'
                      />
                      <rect
                        x='3'
                        y='15'
                        width='17'
                        height='2'
                        fill='#000'
                      />
                    </svg>
                    Filter
                  </>
                </Button>
                <SortPopup onSelectSortType={onSelectSortType} />
              </div>
              {isLoading ? (
                <Loader />
              ) : items.length ? (
                <div className='catalog__items'>
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Catalog
