import { ProductType } from "../types";


export const ascendingSort = (array: ProductType[]) => {
  for (let i = 0; i < array.length; i++) {
      let minElemIdx = i

      for (let j = i+1; j < array.length; j++) {
        if ( Number(array[j].priceNew.split(' ').join('')) < Number(array[minElemIdx].priceNew.split(' ').join('')) ) {
          minElemIdx = j
        }
      }
      let tmp = {...array[i]} 
      array[i] = {...array[minElemIdx]}
      array[minElemIdx] = {...tmp}
  }
  return array;
}

export const descendingSort = (array: ProductType[], field: keyof ProductType) => {
  for (let i = array.length - 1; i >= 0; i--) {
      let maxElemIdx = i

      for (let j = i - 1; j >= 0; j--) {
        if ( field === 'priceNew' && Number(array[j][field].split(' ').join('')) > Number(array[maxElemIdx][field].split(' ').join('')) ) {
          maxElemIdx = j;
        }
        if ( field === 'rating' && array[j][field] > array[maxElemIdx][field] ) {
          maxElemIdx = j;
        }
      }
      let tmp = {...array[i]} 
      array[i] = {...array[maxElemIdx]}
      array[maxElemIdx] = {...tmp}
  }
  return array;
}