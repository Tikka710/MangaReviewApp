<div class="shadow flex">
    <input bind:value class="search-text w-full rounded p-2" type="text" placeholder="Search...">

    <button class="search-btn bg-white w-auto flex justify-end items-center p-2">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </button>
</div>

<style>
.search-text{
  color: theme('colors.border')
}
.search-btn{
  color: theme('colors.primary')
}


</style>

<script lang="ts">
export let value = '' // propsが渡されなかった時の初期値を定義できます。

</script>



