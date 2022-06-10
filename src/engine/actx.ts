// APS에서 사용할 오디오 컨텍스트
export class ACtx {
  private static _actx: AudioContext
  static get() {
    if (this._actx === undefined) {
      this._actx = new AudioContext({
        latencyHint: 'playback',
        sampleRate: 44100
      });
    }

    return this._actx;
  }
}

window.addEventListener('click', async () => {
  window.dispatchEvent(new CustomEvent('test'));
}, { once: true });