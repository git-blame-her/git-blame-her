export const ANIMATIONS = {
	FADE_IN: [
		{
			opacity: 0
		},
		{
			opacity: 1
		}
	],
	FADE_OUT: [
		{
      opacity: 1
    },
    {
      opacity: 0
    }
	],
}

export const animateWithSeconds = (element: HTMLElement, animation: keyof typeof ANIMATIONS | Array<Keyframe>, seconds: number) =>
	new Promise<void>((resolve) => {
		const $animation = element.animate(typeof animation === 'string' ? ANIMATIONS[animation] : animation, { duration: seconds * 1000 })
		$animation.addEventListener('finish', () => {
			resolve();
		});
	});