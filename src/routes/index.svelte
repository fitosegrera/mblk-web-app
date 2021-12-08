<script>
  //LIBS
  import { onMount } from "svelte";

  //COMPONENTS
  import Hero from "../components/sections/home/hero.svelte";
  import Section1 from "../components/sections/home/section1.svelte";

  //STORES
  import { memoryData, dataUrl } from "../stores/stores";

  let heroHeading = "a %%metaverse%%created, literally, by your own mind";
  //let heroHeading = "Welcome to mindblocks %%[mblk]%%, the first CNFT plattform for collecting mental data.";

  const fetchData = async () => {
    let res = await fetch($dataUrl).then((response) => response.json());
    $memoryData = JSON.stringify(res.data);
    // console.log($memoryData);
  };

  onMount(async () => {
    fetchData();
  });
</script>

<Hero heading={heroHeading} subheading="" paragraph="" />
<Section1 />
