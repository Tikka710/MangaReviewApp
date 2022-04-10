import type {MangaRepositoryInterface, MangaItem, Params, Result} from './types'
import { httpClient } from '../httpClient'


export class MangaRepository implements MangaRepositoryInterface{
    async get(params: Params) {
        const { data } = await httpClient.get<Result>('/', { params })
        return data
      }

    async find(id: string){
        const { data } = await httpClient.get<MangaItem>(`/${id}`)
        return data
    }

}