import { writable } from 'svelte/store'
import type { MangaItem } from '../../repositories/manga'


const dummyBooks = [
    {
        id: '1',
        volumeInfo: {
          title: 'title1',
          description: 'lorem ipsm'
        }
      },
      {
        id: '2',
        volumeInfo: {
          title: 'title2',
          description: 'lorem ipsm'
        }
      },
      {
        id: '3',
        volumeInfo: {
          title: 'title3',
          description: 'lorem ipsm'
        }
      },
] as MangaItem[];

const useMangaStore = () => {
    const { subscribe } = writable<MangaItem[]>([])

    return { subscribe }
}

export const mangas = useMangaStore()