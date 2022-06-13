const createAnimation = (keyframes: Array<Keyframe>, options?: KeyframeAnimationOptions, then?: () => void) => ({
	animateArgs: [ keyframes, options ],
	then
})

export default createAnimation