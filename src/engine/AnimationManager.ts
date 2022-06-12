class AnimationManager {
	private animatingAnimations: Array<Animation> = []
	
	registerAnimation(animation: Animation) {
		this.animatingAnimations.push(animation)
		animation.addEventListener('finish', () => {
			this.animatingAnimations.splice(this.animatingAnimations.indexOf(animation), 1)
		})
	}
	bulkFinish() {
		this.animatingAnimations.forEach((animation) => {
			animation.finish()
		})
		this.animatingAnimations.splice(0, this.animatingAnimations.length)
	}
}

export default AnimationManager