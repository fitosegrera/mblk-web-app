<script>
  //LIBS
  import Icon from "@iconify/svelte";
  import { Motion } from "svelte-motion";
</script>

<Motion whileHover={{ scale: 1.1 }} let:motion>
  <button
    use:motion
    class="flex mt-72 justify-center items-center gradient-section-bg-dark-variant color-anim-bg color-anim-shadow shadow-buttons text-4xl w-360 h-80 space-x-20 gradient-icons px-8 py-16"
  >
    <div class="text-2xl gradient-icons">
      <Icon icon="clarity:file-group-solid" />
    </div>
    <h1>White Paper</h1>
  </button>
</Motion>

<style>
  div :global(svg) {
    font-size: 48px;
    line-height: 1em;
  }
</style>
