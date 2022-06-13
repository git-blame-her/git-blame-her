import type { AnimationWithOptionalCallback } from '../../engine/types'

const promisifyAnimation = (animation: Animation) =>
	new Promise<void>((resolve, reject) => {
		animation.addEventListener('finish', () => {
			resolve()
		})
		animation.addEventListener('cancel', () => {
			reject()
		})
		animation.addEventListener('remove', () => {
			reject()
		})
	})

const animate = (element: HTMLElement, animation: AnimationWithOptionalCallback) => {
	const $animation = element.animate(...animation.animation)
	const promisifiedAnimation = promisifyAnimation($animation)
	promisifiedAnimation.then(animation.then)
}

export default animate