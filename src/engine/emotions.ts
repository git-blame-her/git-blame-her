import validated from '../util/validated'
import type { EmotionDisplayData } from './types'

export const EMOTIONS = validated<Record<string, EmotionDisplayData>>()({
	embarrassed: {
		imagePath: '../../embarrassed.png',
		width: 58,
		height: 74,
		offsetX: 120,
		offsetY: 60
	}
})