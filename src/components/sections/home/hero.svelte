<script>
	export let heading, subheading, paragraph;
</script>

<div class="w-full mx-240 pt-72 text-center">
	<h1 class="text-8xl text-secondary-light leading-8xl">{heading}</h1>
</div>
<div id="bg-image"><img src="/assets/imgs/home-hero.png" alt="" /></div>

<style>
	#bg-image {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
