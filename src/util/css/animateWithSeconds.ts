import ThenableAnimation from '../ThenableAnimation'
import validated from '../validated'
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
	animation: keyof typeof ANIMATIONS | Array<Keyframe>,
	options: Omit<KeyframeAnimationOptions, 'duration'> & { seconds: number }
) => {
	if (typeof animation === 'string') {
		
	}
	const $animation = element.animate(
		typeof animation === 'string'
			? ANIMATIONS[animation]
			: animation,
		{
			...options,
			duration: options.seconds * 1000,
		}
	)

	return new ThenableAnimation($animation)
}
