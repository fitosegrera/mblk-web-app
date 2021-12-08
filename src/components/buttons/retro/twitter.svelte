<script>
  //LIBS
  import { Motion } from "svelte-motion";
  import Icon from "@iconify/svelte";
</script>

<Motion whileHover={{ scale: 1.1 }} let:motion>
  <button
    use:motion
    class="flex mt-72 justify-center items-center gradient-section-bg-dark-variant color-anim-bg color-anim-shadow shadow-buttons w-96 h-80 space-x-20 text-secondary-light px-8 py-16"
  >
    <div class="text-2xl gradient-icons">
      <Icon icon="akar-icons:twitter-fill" />
    </div>
  </button>
</Motion>

<style>
  div :global(svg) {
    font-size: 48px;
    line-height: 1em;
  }
</style>
