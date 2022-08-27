<script lang="ts">
  import Store from "../utils/store";

  import type { Todo, TodoList } from "../utils/types";
  import ListItem from "./components/ListItem.svelte";

  export let filteredList: { todos: TodoList; count: number };

  let mouseYCoordinate: number = null;
  let distanceTopGrabbedVsPointer: number = null;

  let draggingItem: Todo = null;
  let draggingItemId: number = null;
  let draggingItemIndex: number = null;

  let hoveredItemIndex: number = null;
  let hoveredItemId: number = null;

  $: {
    if (
      draggingItemIndex != null &&
      hoveredItemIndex != null &&
      draggingItemIndex != hoveredItemIndex
    ) {
      [$Store.todos[draggingItemIndex], $Store.todos[hoveredItemIndex]] = [
        $Store.todos[hoveredItemIndex],
        $Store.todos[draggingItemIndex],
      ];

      draggingItemIndex = hoveredItemIndex;
    }
  }
</script>

<ul>
  {#if mouseYCoordinate}
    <li
      class="ghost"
      style="top: {mouseYCoordinate + distanceTopGrabbedVsPointer}px;"
    >
      <ListItem todo={draggingItem} />
    </li>
  {/if}

  {#each filteredList.todos as todo (todo.id)}
    <li
      class="item {draggingItemId === todo.id ? 'invisible' : ''}"
      draggable="true"
      on:dragstart={(e) => {
        mouseYCoordinate = e.clientY;
        draggingItem = todo;
        draggingItemIndex = $Store.todos.findIndex((t) => t.id === todo.id);
        draggingItemId = todo.id;

        distanceTopGrabbedVsPointer =
          e.currentTarget.getBoundingClientRect().y - e.clientY;
      }}
      on:drag={(e) => {
        mouseYCoordinate = e.clientY;
      }}
      on:dragover={() => {
        if (hoveredItemId === todo.id) return;
        hoveredItemIndex = $Store.todos.findIndex((t) => t.id === todo.id);
        hoveredItemId = todo.id;
      }}
      on:dragend={() => {
        draggingItemId = null;
        hoveredItemIndex = null;
      }}
    >
      <ListItem {todo} />
    </li>
  {/each}
</ul>
<p>
  {filteredList.count} todo{filteredList.count === 1 ? "" : "s"} in the list
</p>

<style>
  ul {
    padding: 0;
    width: inherit;
  }

  .item {
    cursor: grab;
  }

  .invisible {
    opacity: 0;
  }

  .ghost {
    pointer-events: none;
    z-index: 100;
    position: fixed;
    top: 0;
    width: inherit;
  }
</style>
