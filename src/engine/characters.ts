import validated from '../util/validated'
import type { DisplayData } from './types'

export const CHARACTERS = validated<Record<string, DisplayData>>()({
	SISSELA: {
		imagePath: '../../character_stand.png',
		width: 232,
		height: 490
	}
})