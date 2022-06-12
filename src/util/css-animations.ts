import AwaitableAnimation from './AwaitableAnimation'
import validated from './validated'
import { FADE_IN, FADE_OUT, CHARACTER_DOWN, CHARACTER_UP, EMBARRASSED } from './animations'

const ANIMATIONS = validated<Record<string, Array<Keyframe>>>()({
	FADE_IN,
	FADE_OUT,
	CHARACTER_DOWN,
	CHARACTER_UP,
	EMBARRASSED,
})

export const animateWithSeconds = (
	element: HTMLElement,
	animation: keyof typeof ANIMATIONS | Array<Keyframe> | PropertyIndexedKeyframes,
	options: Omit<KeyframeAnimationOptions, 'duration'> & { seconds: number }
) => {
	const $animation = element.animate(
		typeof animation === 'string'
			? ANIMATIONS[animation]
			: animation,
		{
			...options,
			duration: options.seconds * 1000,
		}
	)

	return new AwaitableAnimation($animation)
}
