module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	theme: {
		colors: {
			'primary-main': '#FF0099',
			'secondary-main': '#00ffff',
			'secondary-light': '#EDFFFF',
			'tertiary-main': '#FF9900',
			black: '#000000'
		},
		fontSize: {
			'20xl': '240px',
			'10xl': '120px',
			'8xl': '102px',
			'7xl': '80px',
			'6xl': '72px',
			'4xl': '48px',
			'2xl': '24px'
		},
		spacing: {
			4: '4px',
			8: '8px',
			12: '12px',
			16: '16px',
			32: '32px',
			48: '48px',
			56: '56px',
			64: '64px',
			72: '72px',
			80: '80px',
			120: '120px',
			240: '240px',
			1440: '1440px',
			full: '100%'
		},
		extend: {
			lineHeight: {
				'7xl': '72px',
				'8xl': '88px'
			}
		}
	}
};
