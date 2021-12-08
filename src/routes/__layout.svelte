<script>
  import MainContainer from "../components/containers/main.svelte";
  import Navbar from "../components/navigation/navbar.svelte";
  import "../layout.css";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Electrolize&family=Geo&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Navbar />
<MainContainer>
  <slot />
</MainContainer>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  *,
  html,
  body {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
</style>
