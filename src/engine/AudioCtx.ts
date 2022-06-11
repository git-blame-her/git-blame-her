// APS에서 사용할 오디오 컨텍스트

let actx: AudioContext

export const getAudioCtx = () => {
  if (actx === undefined) {
    actx = new AudioContext({
      latencyHint: 'playback',
      sampleRate: 44100
    });
  }

  return actx;
}

window.addEventListener('click', async () => {
  window.dispatchEvent(new CustomEvent('test'));
}, { once: true });