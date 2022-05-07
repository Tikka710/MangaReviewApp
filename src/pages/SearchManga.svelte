
<form on:submit|preventDefault={handleSubmit}>
  <SearchBar bind:value={q} />
</form>
  <div class="text-center">
    {#if empty}
      <div>検索結果が見つかりませんでした。</div>
    {:else}
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {#each $mangas as manga (manga.id)}
        <BookCard {manga} />
        {/each}
    </div>
    <InfiniteScroll window threshold={100} on:loadMore={handleLoadMore} {hasMore} />
    {/if}
    {#await promise}
      <div class="flex justify-center">
        <Spinner />
      </div>
    {:catch e}
      <span class="text-red-600 text-sm">
        {e.message}
      </span>
  {/await}
    </div>

<script lang="ts">
import SearchBar from '../components/SearchBar.svelte'
import Spinner from '../components/Spinner.svelte'
// import type { Result, MangaItem } from '../repositories/manga'
import RepositoryFactory, { MANGA } from '../repositories/RepositoryFactory'
import BookCard from '../components/BookCard.svelte'
import InfiniteScroll from "svelte-infinite-scroll"
import { mangas } from '../store/manga'
import { onDestroy } from 'svelte'

const MangaRepository = RepositoryFactory[MANGA]

let q = ''
let empty = false
// let mangas: MangaItem[] = []
let promise: Promise<void>
let totalItems = 0
let startIndex = 0
let _mangas = MangaItem[]
const unsubscribe = mangas.subscribe(value => _mangas = value)

onDestroy(unsubscribe)

$: hasMore = totalItems > mangas.length

  const handleSubmit = () => {
    if (!q.trim()) return
    promise = getMangas()
  }

  const getMangas = async () => {
    $mangas = []
    empty = false
    startIndex = 0
    const result = await MangaRepository.get({ q, startIndex })
    empty = result.totalItems === 0
    totalItems = result.totalItems
    $mangas = result.items
  }

  const handleLoadMore = () => {
    startIndex += 10
    promise = getNextPage()
    console.log(promise)
  }

  const getNextPage = async () => {
    const result = await MangaRepository.get({ q, startIndex })
    
    // 取得データが既に存在するものを含む可能性があるので、idでフィルタリングしてます。
    const mangaIds = $mangas.map(maga => manga.id)
    const filterdItem = result.items.filter(item => {
      return !mangaIds.includes(item.id)
    })

    $mangas = [...$mangas, ...filterdItem]

  }

  

</script>