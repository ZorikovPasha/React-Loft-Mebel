import React from 'react'
import Fuse from 'fuse.js'
import { useDispatch } from 'react-redux'

import { Footer } from './components/layout/Footer'
import { MobMenu } from './components/layout/MobMenu'
import { Header } from './components/layout/Header/Header'
// import { useAuth } from './hooks/useAuth'
import { Snackbar } from './components/common/snackBar'
import { PublicApiClient, UserApiClient } from './api'
import { isDataOfFurniture } from './api/types'
import { sanitizeFurnitureItem } from './utils'
import { setItemsActionCreator } from './redux/actions/items'

interface searchItemType {
  title: string
  link: string
  texts: string[]
  imageUrl: string | undefined
}

export interface ISearchState {
  query: string
  queryToRender: string
  searchEngine: Fuse<searchItemType>
  searchResults: Fuse.FuseResult<searchItemType>[]
}

interface IProps {
  children: React.ReactNode
}

export const Layout = ({ children }: IProps) => {
  const [isMobMenuOpen, setMobMenuOpen] = React.useState(false)
  const [searchData, setSearchData] = React.useState<ISearchState>({
    query: '',
    queryToRender: '',
    searchEngine: new Fuse([], { keys: ['title', 'texts'] }),
    searchResults: []
  })

  const dispatch = useDispatch()

  React.useEffect(() => {
    window.addEventListener('beforeunload', async () => {
      try {
        await UserApiClient.logout()
      } catch (error) {
        console.log('error', error)
      }
    })
  }, [])

  React.useEffect(() => {
    const fetchAndSetFurnitureDataForSearch = async () => {
      const furniture = await PublicApiClient.getFurniture('')
      if (isDataOfFurniture(furniture)) {
        dispatch(setItemsActionCreator(furniture.all.map(sanitizeFurnitureItem)))
        const searchData = furniture.all.map(sanitizeFurnitureItem).map((p) => ({
          title: p.name ?? '',
          link: `/products/${p.id}`,
          imageUrl: p.image?.url,
          texts: [] as string[]
        }))

        setSearchData((prev) => ({
          ...prev,
          searchEngine: new Fuse(searchData, { keys: ['title', 'texts'] })
        }))
      }
    }

    fetchAndSetFurnitureDataForSearch()
  }, [])

  // useAuth()

  return (
    <div className='wrapper'>
      <Snackbar />

      <MobMenu
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
      />
      <Header
        search={searchData}
        setSearch={setSearchData}
        isMobMenuOpen={isMobMenuOpen}
        setMobMenuOpen={setMobMenuOpen}
      />
      <main className='main'>{children}</main>
      <Footer />
    </div>
  )
}
