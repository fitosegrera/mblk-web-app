<script>
  //LIBS
  import { Motion } from "svelte-motion";
  import Icon from "@iconify/svelte";

  export let id, url;

  const handleMouseEnter = async () => {
    let icon = document.getElementById(id);
    icon.style.color = "linear-gradient(90deg, #f4507b, #9c5ff3)";
  };

  const handleMouseLeave = async () => {
    let icon = document.getElementById(id);
    // underline.style.background = '#00000000';
  };
</script>

<Motion animate={{ scale: 1.25 }} transition={{ duration: 0.25 }} let:motion>
  <a href={url}>
    <div
      use:motion
      {id}
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
      class="w-48"
    >
      <div class="text-3xl color-anim-txt">
        <Icon icon={"akar-icons:" + id + "-fill"} />
      </div>
    </div>
  </a>
</Motion>

<style>
  div:hover {
  }
</style>
