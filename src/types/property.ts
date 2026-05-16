export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: 'casa' | 'sitio' | 'departamento'
  status: 'venta' | 'arriendo'
  bedrooms?: number
  bathrooms?: number
  area_m2: number
  location: string
  region: string
  comuna: string
  images: string[]
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'user'
}
