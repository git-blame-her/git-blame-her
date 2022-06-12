import Animatable from './Animatable'
import { EMOTIONS } from './emotions'
import { px } from '../util/css-macros'
import jsx from '../util/jsx'

interface EmotionDisplayParams {
	targetElement: HTMLElement
	x: number
	y: number
}
class Emotion extends Animatable {
	constructor(public emotionId: keyof typeof EMOTIONS) {
		super()
	}
	display(params: EmotionDisplayParams) {
		const emotion = EMOTIONS[this.emotionId]
		const $emotion = (
			<div class="emotion">
				<img
					src={emotion.imagePath}
					width={emotion.width}
					height={emotion.height}
					style={{
						position: 'absolute',
						top: px(params.y + emotion.offsetY),
						left: px(params.x + emotion.offsetX)
					}}
				/>
			</div>
		)

		switch (this.emotionId) {
			case 'embarrassed': {
				animateWithSeconds($emotion, 'EMBARRASSED', { seconds: 1 })
					.then(() => {
						$emotion.remove()
					})
			}
		}
		
		params.targetElement.appendChild($emotion)
	}
}

export default Emotion