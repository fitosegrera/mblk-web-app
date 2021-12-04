<script>
	import Item from './navbar-item.svelte';
	import Icon from './navbar-icon.svelte';
</script>

<div class="text-secondary-light w-full px-240">
	<nav class="flex w-full space-x-120 py-32 items-center">
		<!-- <div class="flex flex-grow h-72">
			<img src="/assets/imgs/logo.png" alt="" />
		</div> -->
		<div class="flex flex-grow space-x-64">
			<Item label="About" id="about" />
			<Item label="White Paper" id="white-paper" />
			<Item label="1st Edition" id="edition-1" />
			<Item label="Explorer" id="explorer" />
		</div>
		<div class="flex justify-end space-x-72">
			<Icon img_url="/assets/imgs/discord-icon-h480.png" url="/" />
			<Icon img_url="/assets/imgs/twitter-icon-h480.png" url="/" />
		</div>
	</nav>
</div>

<style>
</style>
