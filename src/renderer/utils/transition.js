export default {
	default: props =>
		'transition:' +
		props.map(prop => `${prop} 0.25s ease-in`).join(',') +
		';',
	hover: () => `
		transition-timing-function: ease-out;
    	transition-duration: 0.15s;`,
}
