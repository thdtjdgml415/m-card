export interface Card {
  name: string
  corpName: string
  tags: string[]
<<<<<<< HEAD
  benefit: string[]
=======
  benefit: string
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

export interface AdBanner {
  title: string
  description: string
  link: string
}
