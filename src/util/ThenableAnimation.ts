class ThenableAnimation extends Promise<void> {
  constructor(public animation: Animation) {
		super((resolve, reject) => {
			this.animation.addEventListener('finish', () => {
				resolve()
			})
			this.animation.addEventListener('cancel', () => {
				reject()
			})
			this.animation.addEventListener('remove', () => {
				reject()
			})
		})
  }
}

export default ThenableAnimation