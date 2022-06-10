export type AudioId = string;

export type InitialNodeGroup = AudioBufferSourceNode | DelayNode | StereoPannerNode

export enum PossibleAudioNodes {
  AudioBufferSource = 'audioBufferSource',
  Delay = 'delay'
}

export type AudioNodeInfo = {
  node: PossibleAudioNodes.AudioBufferSource
  isMainNode: boolean;
} | {
  node: PossibleAudioNodes.Delay
  delayTime: number;
}

export interface AudioPipelineBuildResult {
  initialNodes: Array<AudioBufferSourceNode>;
  spn: StereoPannerNode;
  lfo: OscillatorNode;
  gn: GainNode;
}

interface BaseDetail {
  audioId: string;
}

export interface PlayAudioDetail extends BaseDetail {
  soundKind: string;
  pipeline: Array<AudioNodeInfo[]>;
  loop: boolean;
}

export interface StopAudioDetail extends BaseDetail {
}

export interface FadeOutDetail extends BaseDetail {
  volume: number;
  endTime: number;
}

export interface SetPannerDetail extends BaseDetail {
  pan: number;
}

export interface SwingAudioDetail extends BaseDetail {
  frequency: number;
}