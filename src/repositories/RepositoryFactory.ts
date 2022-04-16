import { MangaRepository, MangaRepositoryInterface } from './manga'

export const MANGA = Symbol('manga')

export interface Repositories {
  [MANGA]: MangaRepositoryInterface;
}

export default {
  [MANGA]: new MangaRepository()
} as Repositories

// const isMock = process.env.NODE_ENV === 'test'


// export default {
//   [BOOK]: isMock ? new MockBookRepository() new BookRepository()
// } as Repositories