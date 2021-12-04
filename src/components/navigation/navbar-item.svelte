<script>
	export let label, id;

	const handleMouseEnter = async () => {
		let underline = document.getElementById(id);
		underline.style.background = 'linear-gradient(90deg, #f4507b, #9c5ff3)';
	};

	const handleMouseLeave = async () => {
		let underline = document.getElementById(id);
		underline.style.background = '#00000000';
	};
</script>

<div
	id="wrapper"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	class="text-2xl w-auto"
>
	<div>
		<a href={'/' + id}>{label}</a>
	</div>
	<div {id} class="h-8" />
</div>

<style>
	#wrapper:hover {
		background: -webkit-linear-gradient(#f4507b, #9c5ff3);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	a {
		font-family: 'Electrolize', sans-serif;
		font-weight: 600;
	}
</style>
