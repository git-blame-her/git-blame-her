import validated from '../util/validated'
import createAnimation from '../util/css/createAnimation'
import keyframes from '../util/css/keyframes'
import type { EmotionDisplayData } from './types'

export const EMOTIONS = validated<Record<string, EmotionDisplayData>>()({
	EMBARRASSED: {
		imagePath: '../../embarrassed.png',
		width: 58,
		height: 74,
		offsetX: 120,
		offsetY: 60,
		animation: createAnimation(
			keyframes(
				
			)
		)
	}
})