import { AxiosError, isAxiosError } from 'axios'
import { api } from 'src/boot/axios'
import { config } from 'src/config'
import type { IReqItem, IFoundedItem } from 'src/types/items'

export async function getAllItems(offset = 0, limit = 50): Promise<IReqItem[]> {
  try {
    const { data } = await api(config.baseUrl + '/exhibits', {
      params: {
        limit,
        offset
      }
    })
    return data
  } catch (e) {
    if (isAxiosError(e)) {
      const axiosError: AxiosError = e as AxiosError
      console.log(`[Axios error] ${axiosError.code}: ${axiosError.message}`)
      return Promise.reject(axiosError)
    } else {
      console.log(`[Unknown error] ${e}`)
      return Promise.reject(e)
    }
  }
}

export async function findItem(file: File): Promise<IFoundedItem | null> {
  const formData = new FormData()
  formData.append('files', file)
  try {
    const { data } = await api.post('/exhibits/find_by_image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function findSimilarById(
  id: string
): Promise<IFoundedItem | null> {
  try {
    const { data } = await api('/exhibits/find_by_id', { params: { id } })
    return data
  } catch (error) {
    return null
  }
}

export async function findById(id: string): Promise<IReqItem> {
  try {
    const { data } = await api(`/exhibits/${id}`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
