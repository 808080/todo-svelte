<script lang="ts">
  import Store from "../utils/store";
  import Button from "./components/Button.svelte";

  const addItem = () => {
    if (!$Store.newItem) return;
    Store.addTodo($Store.newItem);
    $Store.newItem = "";
  };
</script>

<form on:submit|preventDefault={addItem}>
  <input placeholder="What needs to be done?" bind:value={$Store.newItem} />
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
