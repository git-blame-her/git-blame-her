import Animatable from './Animatable'
import Emotion from './Emotion'
import { CHARACTERS } from './characters'
import { EMOTIONS } from './emotions'
import { animateWithSeconds } from '../util/css-animations'
import jsx from '../util/jsx'
import type { ScriptDisplayParams } from './types'

interface CharacterParams {
  name: string
  x: number
  y: number
  animation?: 'CHARACTER_UP' | 'CHARACTER_DOWN'
  zIndex: number
  shadow: boolean
  emotion?: string
}
class Character extends Animatable {
	emotion: Emotion | null = null
	constructor(params: CharacterParams) {
		const character = CHARACTERS[params.name]
		const $character = (
			<div>
				<img
					src={character.imagePath}
					width={character.width}
					height={character.height}
				/>
			</div>
		)
		super($character)
		if ('emotion' in params) {
			this.emote(params.emotion)
		}
	}
	emote(emotionName: string) {
		new Emotion()
	}
}

export default Character