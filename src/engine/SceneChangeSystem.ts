import { url } from '../util/css/macros'
import type { SetBackgroundParams, ChangeBackgroundFadeOutInParams, ApplyDarkChangeParams, ApplyCrossFadeInOutParams } from './types'
import { getElementById } from '../util/getElement'
import { animateWithSeconds } from '../util/css/animateWithSeconds'

class SceneChangeSystem {
	constructor(
		private _sceneLayer: HTMLDivElement,
		private _effectLayer: HTMLDivElement
	) { }

	setBackground(params: SetBackgroundParams) {
		this._sceneLayer.style.backgroundImage = url(params.path)
	}

	changeBackgroundFadeOutIn(params: ChangeBackgroundFadeOutInParams) {
		const sbr: SetBackgroundParams = {
			path: params.path
		}

		animateWithSeconds(this._sceneLayer, 'FADE_OUT', { seconds: params.transitionTime / 2 })
			.then(() => {
				this.setBackground(sbr)
				animateWithSeconds(this._sceneLayer, 'FADE_IN', { seconds: params.transitionTime / 2 })
			})
	}

	applyDarkChange(params: ApplyDarkChangeParams) {
		const sbr: SetBackgroundParams = {
			path: params.path
		}

		animateWithSeconds(this._effectLayer, 'FADE_IN', { seconds: params.transitionTime / 2 })
			.then(() => {
				this.setBackground(sbr)
				animateWithSeconds(this._effectLayer, 'FADE_OUT', { seconds: params.transitionTime / 2 })
			})
	}

	applyCrossFadeInOut(params: ApplyCrossFadeInOutParams) {
		const sbr: SetBackgroundParams = {
			path: params.path
		}

		this._effectLayer.style.backgroundImage = url(params.path)

		animateWithSeconds(this._effectLayer, 'FADE_IN', { seconds: params.transitionTime })
		animateWithSeconds(this._sceneLayer, 'FADE_OUT', { seconds: params.transitionTime })
			.then(() => {
				this.setBackground(sbr)
				this._sceneLayer.style.opacity = '1'
				this._effectLayer.style.opacity = '0'
				this._effectLayer.style.backgroundImage = 'none'
			})
	}
}

// export
const $background = getElementById<HTMLDivElement>('background')!
const $backgroundEffect = getElementById<HTMLDivElement>('background-effect')!
const scs = new SceneChangeSystem($background, $backgroundEffect)

export default scs