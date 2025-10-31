export interface IProducts {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: IProducstRating
  discount?:number
}

export interface IProducstRating {
  rate: number
  count: number
}