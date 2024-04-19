import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'

import { Aside } from '../components/Catalog/Aside'
import { SortOptions, SortPopup } from '../components/Catalog/SortPopup'
import { Card } from '../components/common/card'
import { Empty } from '../components/common/Empty'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { getUserData } from '../redux/getters'
import { PublicApiClient } from '../api'
import { isDataOfFurniture } from '../api/types'
import { Button } from '../components/common/Button'
import { IProcessedFurniture, capitalizeFirstLetter, getQueryParams, sanitizeFurnitureItem } from '../utils'
import { setItemsActionCreator } from '../redux/actions/items'
import { IGetFurnitureSuccessRes } from '../../../server/src/furniture/types'
import { Pagination } from '../components/pagination'
import { Loader } from '../components/common/Loader'
import Head from 'next/head'

export interface ISelectOption {
  label: string
  value: string
}

export interface ISelectField {
  value: string | null
  options: ISelectOption[]
  label: string
}

export interface IRadiosField {
  value: string[]
  label: string
  options: ISelectOption[]
}

const processResponse = (data: IGetFurnitureSuccessRes) => {
  const sanitizedAll = data.all.map(sanitizeFurnitureItem)
  const sanitizedFiltered = data.filtered.map(sanitizeFurnitureItem)

  const allRoomsOptions = sanitizedAll.reduce((accum: string[], next) => {
    return typeof next.room === 'string' && accum.includes(next.room) ? accum : accum.concat(next.room as string)
  }, [])
  const allTypes = sanitizedAll.reduce((accum: string[], next) => {
    return typeof next.type === 'string' && accum.includes(next.type) ? accum : accum.concat(next.type as string)
  }, [])
  const allMaterials = sanitizedAll.reduce((accum: string[], next) => {
    return typeof next.material === 'string' && accum.includes(next.material)
      ? accum
      : accum.concat(next.material as string)
  }, [])
  const allBrands = sanitizedAll.reduce((accum: string[], next) => {
    return typeof next.brand === 'string' && accum.includes(next.brand) ? accum : accum.concat(next.brand as string)
  }, [])
  const allColors = sanitizedAll.reduce((accum: string[], next) => {
    const absentColors = next.colors.filter((c) => !accum.includes(c))
    return accum.concat(absentColors)
  }, [])
  return {
    allFurniture: sanitizedAll,
    filteredFurniture: sanitizedFiltered,
    allRoomsOptions: allRoomsOptions,
    allTypes,
    allMaterials,
    allBrands,
    allColors
  }
}

const defaultOption = {
  label: 'All',
  value: 'all'
}

const defaultSortOption = 'asc'

interface IProps {
  pageData: {
    furniture: {
      all: IProcessedFurniture[]
      filtered: IProcessedFurniture[]
    }
    initialRoomProps: ISelectField
    initialMaterialsProps: ISelectField
    initialTypeProps: ISelectField
    initialColorsProps: IRadiosField
    initialBrandProps: IRadiosField
    initialSortOption: SortOptions
    resolvedUrlFromBuildTime: string
  }
}

const Catalog: NextPage<IProps> = ({ pageData }) => {
  const {
    furniture,
    initialBrandProps,
    initialColorsProps,
    initialMaterialsProps,
    initialRoomProps,
    initialSortOption,
    initialTypeProps,
    resolvedUrlFromBuildTime
  } = pageData
  const router = useRouter()

  const scrollToTopTimeout = React.useRef<number | null>(null)
  const asideToggleRef = React.useRef<HTMLButtonElement | null>(null)
  const initialQuery = React.useRef<string | null>(null)
  const refetchesNumber = React.useRef(0)

  const [isAsideVisible, toggleAsideVisibility] = React.useState(false)
  const [filteredProducts, setFilteredProducts] = React.useState<IProcessedFurniture[]>(furniture.filtered)
  const [isLoading, setLoading] = React.useState(false)
  const [room, setRoom] = React.useState(initialRoomProps)
  const [type, setType] = React.useState(initialTypeProps)
  const [materials, setMaterials] = React.useState(initialMaterialsProps)
  const [brands, setBrands] = React.useState(initialBrandProps)
  const [colors, setColors] = React.useState(initialColorsProps)
  const [activeSortOption, setActiveSortOption] = React.useState<SortOptions>(initialSortOption)
  const [currentChunk, setCurrentChunk] = React.useState(1)

  const topSales = furniture.all.filter((item) =>
    typeof item.rating === 'string' ? parseFloat(item.rating) > 4.5 : false
  )

  const dispatch = useDispatch()

  React.useEffect(() => {
    // console.log('resolvedUrlFromBuildTime', resolvedUrlFromBuildTime)
    if (!initialQuery.current) {
      initialQuery.current = resolvedUrlFromBuildTime
    }
    // /catalog?x=y...
    // if query is same as from build we do not perform request
    if (initialQuery.current === router.asPath && refetchesNumber.current === 0) {
      return
    }

    refetchesNumber.current = refetchesNumber.current + 1

    // console.log('__further')

    const furnitureType = getQueryParams('type')
    const furnitureRoom = getQueryParams('room')
    const furnitureMaterial = getQueryParams('material')
    const furnitureBrand = getQueryParams('brand')
    const showOnlyDiscountedProducts = getQueryParams('sale')
    const sortBy = getQueryParams('sort')
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
    if (sortBy === 'asc' || sortBy === 'desc' || sortBy === 'pop') {
      assembleQueries.push(`sort=${sortBy}`)
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
        if (!isDataOfFurniture(data)) {
          return setLoading(false)
        }

        const { allFurniture, filteredFurniture, allTypes, allBrands, allColors, allMaterials, allRoomsOptions } =
          processResponse(data)

        if (showOnlyDiscountedProducts === '1') {
          const discountedProducts = filteredFurniture.filter((p) => {
            if (typeof p.priceOld === 'string' && typeof p.priceNew === 'string') {
              return parseFloat(p.priceOld) - parseFloat(p.priceNew) > 0
            } else {
              return false
            }
          })
          setFilteredProducts(discountedProducts)
        } else {
          setFilteredProducts(filteredFurniture)
        }

        dispatch(setItemsActionCreator(allFurniture))

        setRoom((prev) => ({
          ...prev,
          value: furnitureRoom ?? null,
          options: allRoomsOptions.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption)
        }))
        setMaterials((prev) => ({
          ...prev,
          value: furnitureMaterial ?? null,
          options: allMaterials.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption)
        }))
        setType((prev) => ({
          ...prev,
          value: furnitureType ?? null,
          options: allTypes.map((t) => ({ label: capitalizeFirstLetter(t), value: t })).concat(defaultOption)
        }))
        setColors((prev) => ({
          ...prev,
          options: allColors.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
        }))
        setBrands((prev) => ({
          ...prev,
          value: furnitureBrand?.split(',') ?? prev.value,
          options: allBrands.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
        }))
        setActiveSortOption((prev) => {
          if (sortBy === 'asc' || sortBy === 'desc' || sortBy === 'pop') {
            return sortBy
          }

          return prev
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => controller.abort()
  }, [router.asPath])

  const { favorites } = useSelector(getUserData)

  const breadcrumbs = [
    {
      name: 'Catalog',
      isLink: false,
      href: ''
    }
  ]

  const isNullOrUndefined = (value: unknown) => {
    return typeof value === 'undefined' || value === null
  }

  const handleFiltersSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const roomQuery = `${room.value === 'all' || isNullOrUndefined(room.value) ? '' : `&room=${room.value}`}`
    const materialQuery = `${
      materials.value === 'all' || isNullOrUndefined(materials.value) ? '' : `&material=${materials.value}`
    }`
    const typeQuery = `${type.value === 'all' || isNullOrUndefined(type.value) ? '' : `&type=${type.value}`}`
    const brandsQuery = `${brands.value.length ? '&brand=' + brands.value.join(',') : ''}`
    const colorsQuery = `${colors.value.length ? 'colors=' + colors.value.join(',') : ''}`
    const sortQuery = activeSortOption ? '&sort=' + activeSortOption : ''

    let searchQuery = roomQuery + materialQuery + typeQuery + brandsQuery + colorsQuery + sortQuery

    if (searchQuery[0] === '&') {
      searchQuery = '?' + searchQuery.substring(1)
    }

    router.push({
      pathname: '',
      search: searchQuery
    })
    // useeffect pointing on router.aspath gets invoked and performs refetch

    // const controller = new AbortController()
    // setLoading(true)

    // try {
    //   const data = await PublicApiClient.getFurniture(searchQuery, controller.signal)
    //   if (!isDataOfFurniture(data)) {
    //     return setLoading(false)
    //   }
    //   const { allFurniture, filteredFurniture, allTypes, allBrands, allColors, allMaterials, allRoomsOptions } =
    //     processResponse(data)

    //   setFilteredProducts(filteredFurniture)
    //   dispatch(setItemsActionCreator(allFurniture))

    //   setRoom((prev) => ({
    //     ...prev,
    //     options: allRoomsOptions.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption)
    //   }))
    //   setType((prev) => ({
    //     ...prev,
    //     options: allTypes.map((t) => ({ label: capitalizeFirstLetter(t), value: t })).concat(defaultOption)
    //   }))
    //   setMaterials((prev) => ({
    //     ...prev,
    //     options: allMaterials.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption)
    //   }))
    //   setBrands((prev) => ({
    //     ...prev,
    //     options: allBrands.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    //   }))
    //   setColors((prev) => ({
    //     ...prev,
    //     options: allColors.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
    //   }))
    //   setLoading(false)
    // } catch (error) {
    //   setLoading(false)
    // }
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

  const onSelect = (setState: React.Dispatch<React.SetStateAction<ISelectField>>) => (value: ISelectOption | null) => {
    setState((prev) => ({
      ...prev,
      value: value?.value ?? ''
    }))
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

  const productsPerPage = 20
  const currentBunchOfProducts = filteredProducts.slice(
    (currentChunk - 1) * productsPerPage,
    currentChunk * productsPerPage
  )
  // 0, 19
  // 1, 39
  const onChangeChunk = () => {
    if (typeof scrollToTopTimeout.current === 'number') {
      window.clearTimeout(scrollToTopTimeout.current)
    }
    scrollToTopTimeout.current = window.setTimeout(() => {
      document.querySelector('.breadcrumbs')?.scrollIntoView()
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Catalog</title>
        <meta
          name='description'
          content='Loft furniture for your slick modern designes'
        />
      </Head>

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
                <SortPopup
                  activeSortOption={activeSortOption}
                  setActiveSortOption={setActiveSortOption}
                />
              </div>
              {isLoading ? (
                <Loader />
              ) : currentBunchOfProducts.length ? (
                <div>
                  <div className='catalog__items'>
                    {currentBunchOfProducts.map((item) => (
                      <Card
                        key={item.id}
                        product={item}
                        isFavorite={typeof item.id === 'number' ? favorites.includes(item.id) : false}
                      />
                    ))}
                  </div>

                  <Pagination
                    rootElClass='mt-40'
                    currentPage={currentChunk}
                    totalCount={filteredProducts.length}
                    pageSize={productsPerPage}
                    setCurrentPage={setCurrentChunk}
                    onChange={onChangeChunk}
                  />
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
              {topSales.slice(0, 11).map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  isFavorite={typeof product.id === 'number' ? favorites.includes(product.id) : false}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
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

  const pagePropsIfError = {
    props: {
      pageData: {
        furniture: {
          all: [],
          filtered: []
        },
        initialRoomProps: roomProps,
        initialMaterialsProps: materialProps,
        initialTypeProps: typeProps,
        initialColorsProps: colorsProps,
        initialBrandProps: brandProps,
        initialSortOption: defaultSortOption as SortOptions,
        resolvedUrlFromBuildTime: context.resolvedUrl
      }
    }
  }

  const furnitureType = context.query.type
  const furnitureRoom = context.query.room
  const furnitureMaterial = context.query.material
  const furnitureBrand = context.query.brand
  const showOnlyDiscountedProducts = context.query.sale
  const sortBy = context.query.sort

  const assembleQueries: string[] = []
  if (typeof furnitureType !== 'undefined') {
    assembleQueries.push(`type=${furnitureType}`)
  }
  if (typeof furnitureRoom !== 'undefined') {
    assembleQueries.push(`room=${furnitureRoom}`)
  }
  if (typeof furnitureMaterial !== 'undefined') {
    assembleQueries.push(`material=${furnitureMaterial}`)
  }
  if (typeof furnitureBrand !== 'undefined') {
    assembleQueries.push(`brand=${furnitureBrand}`)
  }
  if (sortBy === 'asc' || sortBy === 'desc' || sortBy === 'pop') {
    assembleQueries.push(`sort=${sortBy}`)
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

  try {
    const res = await PublicApiClient.getFurniture(query)
    if (isDataOfFurniture(res)) {
      const { allFurniture, filteredFurniture, allTypes, allBrands, allColors, allMaterials, allRoomsOptions } =
        processResponse(res)

      let filteredProducts: IProcessedFurniture[] = filteredFurniture
      if (showOnlyDiscountedProducts === '1') {
        filteredProducts = filteredFurniture.filter((p) => {
          if (typeof p.priceOld === 'string' && typeof p.priceNew === 'string') {
            return parseFloat(p.priceOld) - parseFloat(p.priceNew) > 0
          } else {
            return false
          }
        })
      }

      // preparing filters for ssr for the first time
      let roomValue: string | null = null
      if (Array.isArray(furnitureRoom) && furnitureRoom[0]) {
        roomValue = furnitureRoom[0]
      } else if (typeof furnitureRoom === 'string') {
        roomValue = furnitureRoom
      }
      const initialRoomProps = {
        value: roomValue,
        options: allRoomsOptions.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption),
        label: 'Room'
      }

      let materialValue: string | null = null
      if (Array.isArray(furnitureMaterial) && furnitureMaterial[0]) {
        materialValue = furnitureMaterial[0]
      } else if (typeof furnitureMaterial === 'string') {
        materialValue = furnitureMaterial
      }
      const initialMaterialsProps = {
        value: materialValue,
        label: 'Material',
        options: allMaterials.map((c) => ({ label: capitalizeFirstLetter(c), value: c })).concat(defaultOption)
      }

      let typeValue: string | null = null
      if (Array.isArray(furnitureType) && furnitureType[0]) {
        typeValue = furnitureType[0]
      } else if (typeof furnitureType === 'string') {
        typeValue = furnitureType
      }
      const initialTypeProps = {
        value: typeValue,
        options: allTypes.map((t) => ({ label: capitalizeFirstLetter(t), value: t })).concat(defaultOption),
        label: 'Type'
      }

      const initialColorsProps = {
        label: 'Colors',
        value: [],
        options: allColors.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
      }

      const initialBrandProps = {
        value: !furnitureBrand ? [] : typeof furnitureBrand === 'string' ? furnitureBrand.split(';') : [],
        label: 'Brands',
        options: allBrands.map((c) => ({ label: capitalizeFirstLetter(c), value: c }))
      }

      const initialSortOption = sortBy === 'asc' || sortBy === 'desc' || sortBy === 'pop' ? sortBy : defaultSortOption
      return {
        props: {
          pageData: {
            furniture: {
              all: allFurniture,
              filtered: filteredProducts
            },
            initialRoomProps,
            initialMaterialsProps,
            initialTypeProps,
            initialColorsProps,
            initialBrandProps,
            initialSortOption,
            resolvedUrlFromBuildTime: context.resolvedUrl
          }
        }
      }
    }
    return pagePropsIfError
  } catch (error) {
    console.log('error')
    return pagePropsIfError
  }
}

export default Catalog
