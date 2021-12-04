<script>
	export let id, url, img_url;

	const handleMouseEnter = async () => {
		let icon = document.getElementById(id);
		icon.style.color = 'linear-gradient(90deg, #f4507b, #9c5ff3)';
	};

	const handleMouseLeave = async () => {
		let icon = document.getElementById(id);
		// underline.style.background = '#00000000';
	};
</script>

<a href={url}>
	<div {id} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} class="w-48">
		<img src={img_url} alt="" />
	</div>
</a>

<style>
	div:hover {
	}
</style>
