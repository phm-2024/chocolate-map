export interface Position {
  brand: string
  image_url: string
  description: string
  uses_ethically_grown_cocoa: boolean
  link: string
  location: Location
}

interface Location {
  lat: number
  lng: number
  country: string
  city: string
}
