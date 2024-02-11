export interface Car {
  _id: string
  manufacturer: string
  name: string
  model: number
  km: number
  imageUrls: string[]
  note: string
  hand: number
  test: string
  price: number
}

export interface User {
  id:string
  fullName:string
  lastName: string
  phone: number
  IsAdamin: boolean
  profileImage: string
  numberAds: number
}