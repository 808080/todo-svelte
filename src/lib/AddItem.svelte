<script lang="ts">
  import { store } from "../utils/store";
  import Button from "./components/Button.svelte";

  const addItem = () => {
    if (!$store.newItem) return;
    store.addTodo($store.newItem);
    $store.newItem = "";
  };
</script>

<form on:submit|preventDefault={addItem}>
  <input placeholder="What needs to be done?" bind:value={$store.newItem} />
  <Button text="Add" type="submit" />
</form>

<style>
  form {
    display: flex;
  }

  input {
    width: 100%;
  }
</style>
