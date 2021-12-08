<script>
  //LIBS
  import { Motion } from "svelte-motion";

  export let label, id;

  const handleMouseEnter = async () => {
    let underline = document.getElementById(id);
    underline.style.background = "linear-gradient(90deg, #f4507b, #9c5ff3)";
  };

  const handleMouseLeave = async () => {
    let underline = document.getElementById(id);
    underline.style.background = "#00000000";
  };
</script>

<div
  id="wrapper"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="text-xl w-auto"
>
  <Motion
    animate={{ scale: 1.5 }}
    transition={{ duration: 0.25 }}
    whileHover={{ scale: 1.6 }}
    whileTap={{ scale: 1.25 }}
    let:motion
  >
    <div class="text-secondary-light color-anim-txt" use:motion>
      <a href={"/" + id}>{label}</a>
      <div {id} class="h-4" />
    </div>
  </Motion>
</div>

<style>
  #wrapper:hover {
  }

  a {
    font-family: "Electrolize", sans-serif;
    font-weight: 600;
  }
</style>
