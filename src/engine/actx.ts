// APS에서 사용할 오디오 컨텍스트
export const actx = new AudioContext({
  latencyHint: 'playback',
  sampleRate: 44100
});