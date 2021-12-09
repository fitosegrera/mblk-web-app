<script>
  //LIBS

  //COMPONENTS
  import WhitePaperButton from "../../buttons/retro/white-paper.svelte";
  import TwitterButton from "../../buttons/retro/twitter.svelte";
  import DiscordButton from "../../buttons/retro/discord.svelte";
  import Sketch from "../../sketches/threejs/three-js-viewer.svelte";

  //PROPS
  export let heading;
</script>

<div class="h-screen" />
<div id="wrapper" class="w-auto mx-240 pt-240">
  <h1 class="text-12xl text-center leading-10xl text-secondary-light">
    {heading.split("%%")[0]}
    <span class="color-anim-icon">{heading.split("%%")[1]}</span>
    {heading.split("%%")[2]}
  </h1>

  <div class="flex justify-center space-x-48 mt-56">
    <WhitePaperButton />
    <TwitterButton />
    <DiscordButton />
  </div>

  <div class="flex justify-center mt-160 h-120  animate-bounce">
    <img src="/assets/imgs/chevron-down.svg" alt="" />
  </div>
</div>

<Sketch sketch_name="terrain" />

<!-- <div id="alpha-layer" /> -->
<style>
  #wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  #generative {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #alpha-layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.534);
    width: 100vw;
    height: 100vh;
  }
</style>
