import type { ScriptTurn } from './builder'

export type Access<T, Key extends keyof T> = T extends { [_ in Key]: infer V } ? V : never

export interface AnimationWithOptionalCallback {
  animation: [ Array<Keyframe>, KeyframeAnimationOptions ]
  then?: () => void
}

export type InitialNodeGroup = AudioBufferSourceNode | DelayNode | StereoPannerNode

export enum PossibleAudioNodes {
  AudioBufferSource = 'audioBufferSource',
  Delay = 'delay'
}

export type AudioNodeInfo = {
  node: PossibleAudioNodes.AudioBufferSource
  isMainNode: boolean
} | {
  node: PossibleAudioNodes.Delay
  delayTime: number
}

export interface AudioPipelineBuildResult {
  initialNodes: Array<AudioBufferSourceNode>
  spn: StereoPannerNode
  lfo: OscillatorNode
  gn: GainNode
}

interface Detail {
  audioId: string
}

export interface PlayAudioDetail extends Detail {
  soundKind: string
  pipeline: Array<Array<AudioNodeInfo>>
  loop: boolean
}

export interface StopAudioDetail extends Detail {
}

export interface FadeOutDetail extends Detail {
  volume: number
  endTime: number
}

export interface SetPannerDetail extends Detail {
  pan: number
}

export interface SwingAudioDetail extends Detail {
  frequency: number
}

export interface SetBackgroundParams {
  path: string
}

export interface ChangeBackgroundFadeOutInParams {
  path: string
  transitionTime: number
}

export interface ApplyDarkChangeParams {
  path: string
  transitionTime: number
}

export interface ApplyCrossFadeInOutParams {
  path: string
  transitionTime: number
}

export interface RegisterCharacterParams {
  name: string
  x: number | null
  y: number | null
  animation?: 'CHARACTER_UP' | 'CHARACTER_DOWN'
  zIndex: number
  shadow: boolean
  emotion?: string
}

export interface DisplayData {
  imagePath: string
  width: number
  height: number
}

export interface EmotionDisplayData extends DisplayData {
  offsetX: number
  offsetY: number
}

export interface ScriptDisplayParams {
  name: string
  script: ScriptTurn
}
