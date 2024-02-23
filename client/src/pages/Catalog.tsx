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
import { makeQueryParametersFromStringArr } from '../utils/makeQueryParametersFromStringArr'
import { PublicApiClient } from '../api'
import { IFurniture } from '../api/types'
import { Button } from '../components/common/Button'
import { capitalizeFirstLetter, getQueryParams } from '../utils'

export interface ISelectOption {
  label: string
  value: string
}

export interface ISelectField {
  value: string | undefined
  options: ISelectOption[]
  label: string
}

export interface IRadiosField {
  value: string[]
  label: string
  options: ISelectOption[]
}

const Catalog = () => {
  const roomProps: ISelectField = {
    value: 'all',
    options: [],
    label: 'Room'
  }

  const typeProps: ISelectField = {
    value: 'all',
    options: [],
    label: 'Type'
  }
  const materialProps: ISelectField = {
    value: 'all',
    options: [],
    label: 'Material'
  }

  const brandProps: IRadiosField = {
    value: [],
    options: [],
    label: 'Brands'
  }

  const colorsProps: IRadiosField = {
    value: [],
    label: 'Colors',
    options: []
  }

  const history = useHistory()

  const allProducts = React.useRef<IFurniture[]>([])
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
  const [room, setRoom] = React.useState(roomProps)
  const [type, setType] = React.useState(typeProps)
  const [materials, setMaterials] = React.useState(materialProps)
  const [brands, setBrands] = React.useState(brandProps)
  const [colors, setColors] = React.useState(colorsProps)

  const topSales = allProducts.current.filter((item) => parseFloat(item.rating) > 4.5)

  React.useEffect(() => {
    const furnitureType = getQueryParams('type')
    const furnitureRoom = getQueryParams('room')
    const furnitureMaterial = getQueryParams('material')
    const furnitureBrand = getQueryParams('brand')
    const showOnlyDiscountedProducts = getQueryParams('sale')
    const assembleQueries: string[] = []
    if (furnitureType) {
      assembleQueries.push(`type=${furnitureType}`)
    }
    if (furnitureRoom) {
      assembleQueries.push(`room=${furnitureRoom}`)
    }
    if (furnitureMaterial) {
      assembleQueries.push(`material=${furnitureMaterial}`)
    }
    if (furnitureBrand) {
      assembleQueries.push(`brand=${furnitureBrand}`)
    }

    let query = ''
    if (assembleQueries.length) {
      query = '?' + query
      assembleQueries.forEach((queryItem, index) => {
        if (index > 0) {
          query = query + '&' + queryItem
        } else {
          query = query + queryItem
        }
      })
    }
    const controller = new AbortController()
    setLoading(true)
    PublicApiClient.getFurniture(query, controller.signal)
      .then((data) => {
        const allRoomsOptions = data.all.reduce((accum: string[], next) => {
          return accum.includes(next.room) ? accum : accum.concat(next.room)
        }, [])
        const allTypes = data.all.reduce((accum: string[], next) => {
          return accum.includes(next.type) ? accum : accum.concat(next.type)
        }, [])
        const allMaterials = data.all.reduce((accum: string[], next) => {
          return accum.includes(next.material) ? accum : accum.concat(next.material)
        }, [])
        const allBrands = data.all.reduce((accum: string[], next) => {
          return accum.includes(next.brand) ? accum : accum.concat(next.brand)
        }, [])
        const allColors = data.all.reduce((accum: string[], next) => {
          const absentColors = next.colors.filter((c) => !accum.includes(c))
          return accum.concat(absentColors)
        }, [])
        if (showOnlyDiscountedProducts === '1') {
          const discountedProducts = data.filtered.filter((p) => parseFloat(p.priceOld) - parseFloat(p.priceNew) > 0)
          setItems(discountedProducts)
        } else {
          setItems(data.filtered)
        }
        allProducts.current = data.all

        const defaultOption = {
          label: 'All',
          value: 'all'
        }

        setRoom({
          value: furnitureRoom,
          options: allRoomsOptions.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption),
          label: 'Room'
        })
        setType({
          value: furnitureType,
          options: allTypes.map((t) => ({ label: capitalizeFirstLetter(t), value: t })).concat(defaultOption),
          label: 'Type'
        })
        setMaterials({
          value: furnitureMaterial,
          label: materials.label,
          options: allMaterials.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption)
        })
        setColors((prev) => ({
          ...prev,
          options: allColors.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
        }))
        setBrands((prev) => {
          if (!furnitureBrand) {
            return prev
          }

          return {
            value: furnitureBrand.split(','),
            label: brands.label,
            options: allBrands.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
          }
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const { favorites } = useSelector(getUserData)

  const breadcrumbs = [
    {
      name: 'Catalog',
      isLink: false,
      href: ''
    }
  ]

  const handleFiltersSubmit = () => {
    const roomQuery = `${room.value === 'all' || room.value === undefined ? '' : `&room=${room.value}`}`
    const materialQuery = `${
      materials.value === 'all' || materials.value === undefined ? '' : `&material=${materials.value}`
    }`
    const typeQuery = `${type.value === 'all' || type.value === undefined ? '' : `&type=${type.value}`}`
    const brandsQuery = `${brands.value.length ? '&brand=' + brands.value.join(',') : ''}`
    const colorsQuery = makeQueryParametersFromStringArr(colors.value, 'color')
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
      const controller = new AbortController()
      setLoading(true)
      PublicApiClient.getFurniture(searchQuery, controller.signal)
        .then((data) => {
          const allRoomsOptions = data.all.reduce((accum: string[], next) => {
            return accum.includes(next.room) ? accum : accum.concat(next.room)
          }, [])
          const allTypes = data.all.reduce((accum: string[], next) => {
            return accum.includes(next.type) ? accum : accum.concat(next.type)
          }, [])
          const allMaterials = data.all.reduce((accum: string[], next) => {
            return accum.includes(next.material) ? accum : accum.concat(next.material)
          }, [])
          const allBrands = data.all.reduce((accum: string[], next) => {
            return accum.includes(next.brand) ? accum : accum.concat(next.brand)
          }, [])
          const allColors = data.all.reduce((accum: string[], next) => {
            const absentColors = next.colors.filter((c) => !accum.includes(c))
            return accum.concat(absentColors)
          }, [])
          setItems(data.filtered)
          allProducts.current = data.all
          setRoom({
            value: room.value,
            options: allRoomsOptions.map((c) => ({ label: capitalizeFirstLetter(c), value: c })), // roomSelectOptions,
            label: 'Room'
          })
          setType({
            value: type.value,
            options: allTypes.map((t) => ({ label: capitalizeFirstLetter(t), value: t })),
            label: 'Type'
          })
          setMaterials({
            value: materials.value,
            label: materials.label,
            options: allMaterials.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
          })
          setBrands({
            value: brands.value,
            label: brands.label,
            options: allBrands.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
          })
          setColors((prev) => ({
            ...prev,
            options: allColors.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
          }))
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }

    toggleAsideVisibility(false)
    document.body.classList.remove('lock')
  }

  const openAside: React.MouseEventHandler<HTMLButtonElement> = React.useCallback((): void => {
    toggleAsideVisibility(true)
    document.body.classList.add('lock')
  }, [])

  const onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    toggleAsideVisibility(false)
    document.body.classList.remove('lock')
  }

  const onSelectSortType = React.useCallback((cat: string): void => {
    filters.current.sort = cat
  }, [])

  const onSelect = (setState: React.Dispatch<React.SetStateAction<ISelectField>>) => (value: ISelectOption | null) => {
    setState((prev) => {
      return {
        ...prev,
        value: value?.value ?? ''
      }
    })
  }

  const onBrand = (brand: string) => () => {
    setBrands((prev) => ({
      ...prev,
      value: prev.value.includes(brand) ? prev.value.filter((c) => c !== brand) : prev.value.concat(brand)
    }))
  }

  const onSelectColor = (color: string) => () => {
    setColors((prev) => ({
      ...prev,
      value: prev.value.includes(color) ? prev.value.filter((c) => c !== color) : prev.value.concat(color)
    }))
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className='catalog'>
        <div className='container'>
          <div className='flex align-start'>
            <Aside
              isAsideVisible={isAsideVisible}
              colors={colors}
              brands={brands}
              rooms={room}
              types={type}
              materials={materials}
              onSelectType={onSelect(setType)}
              onSelectRoom={onSelect(setRoom)}
              onSelectMaterial={onSelect(setMaterials)}
              onSelectBrand={onBrand}
              onSelectColor={onSelectColor}
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
                  onClick={openAside}
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
                <Empty text='Nothing found' />
              )}
            </div>
          </div>
        </div>
      </section>

      {topSales.length > 0 ? (
        <section className='sales'>
          <div className='container'>
            <h3 className='sales__title'>Top sales</h3>
            <div className='sales__items sales__items--product mt-30'>
              {topSales.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default Catalog
