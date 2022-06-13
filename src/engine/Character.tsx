import Animatable from './Animatable'
import Emotion from './Emotion'
import { CHARACTERS } from './characters'
import { EMOTIONS } from './emotions'
import { animateWithSeconds } from '../util/css/animateWithSeconds'
import jsx from '../util/jsx'
import type { ScriptDisplayParams } from './types'

interface CharacterParams {
  id: keyof typeof CHARACTERS
  x: number
  y: number
  animation?: 'CHARACTER_UP' | 'CHARACTER_DOWN'
  zIndex: number
  shadow: boolean
  emotion?: keyof typeof EMOTIONS
}
class Character extends Animatable {
	id: keyof typeof CHARACTERS
	emotion: Emotion | null = null
	constructor(params: CharacterParams) {
		super()
		this.id = params.id
		if ('emotion' in params) {
			this.emote(params.emotion)
		}
	}
	display() {
		const character = CHARACTERS[this.id]
		const $character = (
			<div>
				<img
					src={character.imagePath}
					width={character.width}
					height={character.height}
				/>
			</div>
		)
	}
	emote(emotionId: keyof typeof EMOTIONS) {
		new Emotion(emotionId)
	}
}

export default Character