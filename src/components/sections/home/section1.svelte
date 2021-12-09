<script>
  import BCIModel from "../../sketches/threejs/bci-model.svelte";
</script>

<div class="h-1440 pt-72">
  <div class="flex h-72 mt-96 space-x-160 justify-center">
    <img src="/assets/imgs/openbci.png" alt="" />
    <img src="/assets/imgs/cardano.png" alt="" />
  </div>
  <div
    class="mx-96 mt-160 text-6xl text-secondary-light text-center justify-center"
  >
    <div class="gradient-text-light">
      <div id="model" class="w-64">
        <!-- <BCIModel sketch_name="bci-model" /> -->
      </div>
      <p>
        Mental data captured using a brain computer interface BCI, a wearable
        camera and some mobility sensors.
      </p>
    </div>
  </div>
</div>

<style>
  #model {
  }
</style>
