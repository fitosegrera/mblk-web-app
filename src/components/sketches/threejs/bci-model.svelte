<script>
  import { onMount } from "svelte";

  export let sketch_name;

  let e;

  onMount(async () => {
    const three = await import("./" + sketch_name);
    three.createScene(e);
  });
</script>

<div class="">
  <canvas bind:this={e} />
</div>

<style>
  * {
    font-family: "Primary";
  }
</style>
