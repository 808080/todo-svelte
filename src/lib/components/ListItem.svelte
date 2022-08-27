<script lang="ts">
  import store from "../../utils/store";
  import type { Todo } from "src/utils/types";
  import Button from "./Button.svelte";

  export let todo: Todo;

  let isEdit = false;
  let text = todo.text;

  const handleBlur = () => {
    const val = text.trim();
    if (val) {
      todo.text = val;
      text = val;
      store.setStorage($store);
    }
    isEdit = false;
  };

  const handleChange = () => {
    store.refresh();
  };
</script>

<div class="list-item {todo.done ? 'completed' : ''}">
  <input
    type="checkbox"
    class="done"
    bind:checked={todo.done}
    on:change={handleChange}
  />
  {#if isEdit}
    <input type="text" bind:value={text} on:blur={handleBlur} />
  {:else}
    <div on:dblclick={() => (isEdit = true)} class="text">{todo.text}</div>
  {/if}
  <Button
    classList="delete"
    text="✘"
    type="button"
    on:click={() => store.removeTodo(todo.id)}
  />
</div>

<style>
  .list-item {
    text-align: left;
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .done {
    margin-right: 10px;
  }

  .completed {
    text-decoration: line-through;
  }

  .text {
    width: 100%;
    cursor: text;
  }
</style>
