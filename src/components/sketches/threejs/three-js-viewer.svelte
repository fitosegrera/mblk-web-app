<script>
  import { memoryData } from "../../../stores/stores";
  import { onMount } from "svelte";

  export let sketch_name;

  let e;
  let memory_data = [];
  let currentMemoryData;

  onMount(async () => {
    memory_data = await JSON.parse($memoryData);
    currentMemoryData = memory_data[0];

    console.log(currentMemoryData);
    const three = await import("./" + sketch_name + "");
    three.createScene(e, currentMemoryData);
  });
</script>

<div id="container" />
<canvas bind:this={e} />

<style>
  * {
    font-family: "Primary";
  }
  canvas {
    position: absolute;

    top: 0;
    left: 0;
  }
</style>
