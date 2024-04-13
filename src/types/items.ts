export interface IReqItem {
  name: string
  id: string
  description: string
  timestamp: number
  type_id: number
  exh_id: number
}

export interface ISimilarItem {
  cosine_similarity: number
  name: string
  id: string
  description: string
  type_id: number
}

export interface IFoundedItem {
  id: string
  type_id: number
  similar: ISimilarItem[]
}
