
<form on:submit|preventDefault={handleSubmit}>
  <SearchBar bind:value={q} />
</form>

    {#if empty}
      <div>検索結果が見つかりませんでした。</div>
    {:else}
      {#each mangas as manga (manga.id)}
        <div>{manga.volumeInfo.title}</div>
      {/each}
    {/if}
    {#await promise}
    <div>loading...</div>
    {:catch e}
      <span class="text-red-600 text-sm">
        {e.message}
      </span>
  {/await}

  



<script lang="ts">
import SearchBar from '../components/SearchBar.svelte'
import type { Result, MangaItem } from '../repositories/manga'
import RepositoryFactory, { MANGA } from '../repositories/RepositoryFactory'

const MangaRepository = RepositoryFactory[MANGA]

let q = ''
let empty = false
let mangas: MangaItem[] = []
let promise: Promise<void>

  const handleSubmit = () => {
    if (!q.trim()) return
    promise = getMangas()
  }

  const getMangas = async () => {
    mangas = []
    empty = false
    const result = await MangaRepository.get({ q })
    empty = result.totalItems === 0
    mangas = result.items
  }

</script>