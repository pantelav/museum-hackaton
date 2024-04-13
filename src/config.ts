const baseUrl = 'http://109.248.175.95:8000/api'
const imageUrl = baseUrl + '/images'

export const config = {
  baseUrl,
  imageUrl,
  getImageSrc: (id: string) => `${imageUrl}/${id}.jpg`
}
