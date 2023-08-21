export type CartItemType = {
  id: number
  quintity: number
}

export type BreadcrumbsLinkType = {
  name: string
  href: string
  isLink: boolean
}

export type submitValuesType = {
  brandsIds: string[]
  colorsIds: string[]
  material: string
  room: string
  type: string
}

export type userFormValuesType = {
  name: string
  email: string
  surname: string
  phone: string
  city: string
  street: string
  house: string
  apartment: string
}
