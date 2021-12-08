<script>
  import { memoryData } from "../../../stores/stores";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let e;
  let memory_data = [];
  let currentMemoryData;

  onMount(async () => {
    memory_data = await JSON.parse($memoryData);
    currentMemoryData = memory_data[0];

    console.log(currentMemoryData);
    const three = await import("./scene");
    three.createScene(e, currentMemoryData);
  });

  const scriptLoaded = async () => {};
</script>

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
