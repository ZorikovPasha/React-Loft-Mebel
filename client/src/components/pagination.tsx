import React from 'react'
const DOTS = '...'

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

interface IUsePagination {
  totalCount: number
  pageSize: number
  currentPage: number
  siblingCount?: number
  pointsToShow?: number
  offsetFromRight: number
}

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
  pointsToShow = 6,
  offsetFromRight
}: IUsePagination) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    //desktop view: (1) (...) (x) (x) (x) (...) = 4
    //    siblings ------------^
    //mobile view:     (1) (...) (x) (...) = 4
    // PountsToShow =  |_________________|

    // Points to show count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    // (1) (...) (x) (...) = 4

    /*
      If the number of pages is less than the page numbers we want to show in our paginationComponent, 
      we return the range [1..totalPageCount]
    */

    if (pointsToShow >= totalPageCount) {
      // if (pointsToShow >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */

    const shouldShowLeftDots = currentPage - siblingCount > 2
    const shouldShowRightDots = currentPage < totalPageCount - offsetFromRight

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 2 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, ...(totalPageCount === leftItemCount + 1 ? [] : [totalPageCount])]
    }
    const rightItemCount = 2 + 2 * siblingCount
    //  (...) (x) (y) (z)
    //         ^
    const numbersClusterLeftPosition = totalPageCount - rightItemCount + 1

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(numbersClusterLeftPosition, totalPageCount)
      return [...(numbersClusterLeftPosition === 2 ? [] : [firstPageIndex]), DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}

interface IPagination {
  rootElClass?: string
  totalCount: number
  pageSize?: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  onChange: () => void
}

export const Pagination = ({
  rootElClass = '',
  totalCount,
  pageSize = 10,
  currentPage,
  setCurrentPage,
  onChange
}: IPagination) => {
  const totalPageCount = Math.ceil(totalCount / pageSize)

  const range = usePagination({
    currentPage,
    totalCount,
    pageSize,
    offsetFromRight: 2
  })

  const lastPage = range[range.length - 1]

  const onSelect = (pageNumber: number) => () => {
    setCurrentPage(pageNumber)
    onChange()
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1)
    onChange()
  }

  if (currentPage === 0) {
    return <></>
  }

  console.log('range', range)

  return (
    <div className={`pagination ${rootElClass}`}>
      <ul className='pagination__list flex justify-center'>
        {range.map((pageNumber, idx) =>
          pageNumber === DOTS ? (
            <li
              className='pagination__list-item'
              key={idx}
            >
              <span className='pagination__list-dots flex justify-center'>{DOTS}</span>
            </li>
          ) : (
            <li
              className='pagination__list-item flex justify-center'
              key={idx}
            >
              <button
                className={`pagination__list-button ${
                  pageNumber === currentPage ? 'pagination__list-button--active' : ''
                }`}
                onClick={onSelect(pageNumber as number)}
              >
                {pageNumber}
              </button>
            </li>
          )
        )}

        {totalPageCount > 1 ? (
          <li className=''>
            <button
              className='pagination__list-next'
              disabled={currentPage === lastPage}
              onClick={onNext}
            >
              Next
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
