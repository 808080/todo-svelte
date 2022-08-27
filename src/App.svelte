<script lang="ts">
  import AddItem from "./lib/AddItem.svelte";
  import Filter from "./lib/Filter.svelte";
  import List from "./lib/List.svelte";
  import store, { STORAGE_NAME } from "./utils/store";
  import { type Store, type TodoList, Filters } from "./utils/types";

  store.subscribe((store: Store) => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(store));
  });

  const filterList = (todos: TodoList): { todos: TodoList; count: number } => {
    let res = [];
    if ($store.filter === Filters.Done) res = todos.filter((t) => t.done);
    else if ($store.filter === Filters.Active)
      res = todos.filter((t) => !t.done);
    else res = todos;
    return { todos: res, count: res.length };
  };

  $: filteredList = filterList($store.todos);
</script>

<main>
  <AddItem />
  <List {filteredList} />
  <Filter />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width: 320px;
  }
</style>
