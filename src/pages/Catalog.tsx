import React, { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { Aside, SortPopup, SalesItem, Breadcrumbs, Loader, Empty } from "../Components";
import { fetchItemsThunkCreator } from "../redux/actions/items";
import { getFavorites, getProducts } from "../redux/getters";
import { useBreadcrumbs } from '../hooks/useBreadcrumbs';
import { useLoading } from '../hooks/useLoading';
import { submitValuesType } from "../types";


const Catalog: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const asideToggleRef = React.useRef(null);

  const filters = React.useRef({
    room: '',
    material: '',
    type: '',
    brands: [] as string[],
    colors: [] as string[],
    sort: 'asc'
  });

  const QueryCache = React.useRef('');

  const [isLoading, setLoading] = React.useState(false);
  const [isAsideVisible, toggleAsideVisibility] = React.useState(false);

  useLoading(fetchItemsThunkCreator, setLoading, '?sort=asc')


  const favorites = useSelector(getFavorites);
  const products = useSelector(getProducts);

  const breadcrumbs = useBreadcrumbs();

  const makeQueryParametersFromStringArr = (arr: string[], type: string): string => {
    let query = '';
    let hasAll = false;

    query = arr.reduce((accum, value) => {
      if (value === 'all') {
        hasAll = true;
      }
      return accum + `&${type}=${value}`
    }, '');
    if (hasAll) {
      query = ''
    }
    return query;
  };

  const handleFiltersSubmit = ({
    brandsIds, 
    colorsIds, 
    room, 
    material, 
    type
  }: submitValuesType) => {
    filters.current.room = room;
    filters.current.material = material;
    filters.current.type = type;
    filters.current.brands = brandsIds;
    filters.current.colors = colorsIds;

    const roomQuery = `${filters.current.room === 'all' ? '' : `&room=${filters.current.room}`}`;
    const materialQuery = `${filters.current.material  === 'all' ? '' : `&material=${filters.current.material}`}`;
    const typeQuery = `${filters.current.type  === 'all' ? '' : `&type=${filters.current.type}`}`;
    const brandsQuery = makeQueryParametersFromStringArr(filters.current.brands, 'brand');
    const colorsQuery = makeQueryParametersFromStringArr(filters.current.colors, 'color');
    const sortQuery = filters.current.sort ? '&sort=' + filters.current.sort : ''

    let searchQuery = roomQuery + materialQuery + typeQuery + brandsQuery + colorsQuery + sortQuery;

    if (searchQuery[0] === '&') {
      searchQuery = '?' + searchQuery.substring(1);
    }
    
    history.push({
      pathname: '',
      search: searchQuery
    });


    if (QueryCache.current !== searchQuery) {
      dispatch(fetchItemsThunkCreator(searchQuery));
      QueryCache.current = searchQuery;
    }

    toggleAsideVisibility(false);
  };

  const onBtnClick: MouseEventHandler<HTMLButtonElement> = React.useCallback((): void => {
    toggleAsideVisibility(true);
    document.body.classList.add("lock");
  }, []);

  const onAsideCloseClick: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault();
    toggleAsideVisibility(false);
    document.body.classList.remove("lock");
  };

  const onSelectSortType = React.useCallback((cat: string): void => {
    filters.current.sort = cat;
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="catalog">
        <div className="container">
          <div className="catalog__inner">
            {<Aside 
              isAsideVisible={isAsideVisible}
              onAsideCloseClick={onAsideCloseClick}
              handleFiltersSubmit={handleFiltersSubmit}
              />}
            <div className="catalog__body">
              <div className="catalog__controls controls">
                <button 
                  className="controls__toggle-aside" 
                  onClick={onBtnClick} 
                  ref={asideToggleRef}
                  >
                  Фильтр
                </button>
                <SortPopup onSelectSortType={onSelectSortType} />
              </div>
              {
                isLoading 
                ? <Loader />
                : 
                  products.length 
                    ? <div className="catalog__items">
                        {products.map(product => (
                          <SalesItem 
                            key={product.id} 
                            product={product}
                            baseDir={'../../'}
                            isFavorite={favorites.includes(product.id)}
                            />
                        ))}
                      </div>
                    : <Empty text="Ничего не найдено"/>
                }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Catalog;
