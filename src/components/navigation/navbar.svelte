<script>
  import Item from "./navbar-item.svelte";
  import Icon from "./navbar-icon.svelte";
</script>

<div class="text-secondary-light w-full px-240 ">
  <nav class="flex w-full py-32 items-center space-x-120 justify-center">
    <div class="flex h-72">
      <img src="/assets/imgs/logo.png" alt="metamind logo" />
    </div>
    <div class="flex space-x-96 pt-16">
      <Item label="About" id="about" />
      <Item label="White Paper" id="white-paper" />
      <Item label="1st Edition" id="edition-1" />
      <Item label="Explorer" id="explorer" />
    </div>
    <div class="flex justify-end space-x-72">
      <Icon img_url="/assets/imgs/discord-icon-h480.png" url="/" id="twitter" />
      <Icon img_url="/assets/imgs/twitter-icon-h480.png" url="/" id="discord" />
    </div>
  </nav>
</div>

<style>
  nav {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
</style>
