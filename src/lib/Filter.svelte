<script lang="ts">
  import { store } from "../utils/store";
  import Button from "../lib/components/Button.svelte";
  import { Filters } from "../utils/types";
</script>

<div>
  {#each Object.values(Filters) as filter}
    <Button
      text={filter}
      type="button"
      classList="filter"
      on:click={() => store.setFilter(filter)}
    />
  {/each}
</div>