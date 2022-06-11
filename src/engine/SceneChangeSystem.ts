import { url } from '../util/css-functions'
import type { SetBackgroundParams, ChangeBackgroundFadeOutInParams, ApplyDarkChangeParams, ApplyCrossFadeInOutParams } from './types';
import { getElementById } from "../util/getElement";
import { animateWithSeconds } from '../util/css-animations';

class SceneChangeSystem {
  constructor(
		private sceneLayer: HTMLDivElement,
		private effectLayer: HTMLDivElement
	) {}

  setBackground(params: SetBackgroundParams) {
    this.sceneLayer.style.backgroundImage = url(params.path);
  }

  changeBackgroundFadeOutIn(params: ChangeBackgroundFadeOutInParams) {
    const sbr: SetBackgroundParams = {
      path: params.path
    };

    animateWithSeconds(this.sceneLayer, 'FADE_OUT', params.transitionTime / 2)
      .then(() => {
        this.setBackground(sbr);
        animateWithSeconds(this.sceneLayer, 'FADE_IN', params.transitionTime / 2);
      });
  }

  applyDarkChange(params: ApplyDarkChangeParams) {
    const sbr: SetBackgroundParams = {
      path: params.path
    };

    animateWithSeconds(this.effectLayer, 'FADE_IN', params.transitionTime / 2)
      .then(() => {
        this.setBackground(sbr);
        animateWithSeconds(this.effectLayer, 'FADE_OUT', params.transitionTime / 2);
      });
  }

  applyCrossFadeInOut(params: ApplyCrossFadeInOutParams) {
    const sbr: SetBackgroundParams = {
      path: params.path
    };

    this.effectLayer.style.backgroundImage = url(params.path);

    animateWithSeconds(this.effectLayer, 'FADE_IN', params.transitionTime);
    animateWithSeconds(this.sceneLayer, 'FADE_OUT', params.transitionTime)
      .then(() => {
        this.setBackground(sbr);
        this.sceneLayer.style.opacity = '1';
        this.effectLayer.style.opacity = '0';
        this.effectLayer.style.backgroundImage = 'none';
      });
  }
}

// export
const $background = getElementById<HTMLDivElement>('background')!;
const $backgroundEffect = getElementById<HTMLDivElement>('background-effect')!;
const scs = new SceneChangeSystem($background, $backgroundEffect);

export default scs;