import { fetchAudio } from '../src/engine/AssetManager'
import { PlayAudioDetail, AudioNodeInfo, PossibleAudioNodes, SwingAudioDetail, SetBackgroundParams, ChangeBackgroundFadeOutInParams, ApplyDarkChangeParams, ApplyCrossFadeInOutParams, RegisterCharacterParams } from '../src/engine/types'
import aps from '../src/engine/AudioPlaybackSystem'
import scs from '../src/engine/SceneChangeSystem'
import cds from '../src/engine/CharacterDisplaySystem'

async function audioTest() {
  aps.audioSettings.background.volume = 0.1

  await fetchAudio('bg', 'bg.wav')
  await fetchAudio('sissela', 'sissela.wav')

  const absn1: AudioNodeInfo = {
    node: PossibleAudioNodes.AudioBufferSource,
    isMainNode: false
  }

  const absn2: AudioNodeInfo = {
    node: PossibleAudioNodes.AudioBufferSource,
    isMainNode: true
  }

  const dn1: AudioNodeInfo = {
    node: PossibleAudioNodes.Delay,
    delayTime: 0.05
  }

  const absn3: AudioNodeInfo = {
    node: PossibleAudioNodes.AudioBufferSource,
    isMainNode: true
  }

  const pad1: PlayAudioDetail = {
    audioId: 'bg',
    soundKind: 'background',
    pipeline: [[absn1], [absn2, dn1]],
    loop: false
  }

  const pad2: PlayAudioDetail = {
    audioId: 'sissela',
    soundKind: 'sissela',
    pipeline: [[absn3]],
    loop: false
  }

  const sad1: SwingAudioDetail = {
    audioId: 'bg',
    frequency: 20
  }

  aps.playAudio(pad1)

  window.setTimeout(async () => {
    aps.playAudio(pad2)
    aps.swingAudio(sad1)
  }, 1000)
}

function sceneTest() {
  const sbp: SetBackgroundParams = {
    path: '../public/picture.jpg'
  }

  const cbfoip: ChangeBackgroundFadeOutInParams = {
    path: '../public/picture.jpg',
    transitionTime: 2
  }

  const adcp: ApplyDarkChangeParams = {
    path: '../public/picture.jpg',
    transitionTime: 2
  }

  const acfiop: ApplyCrossFadeInOutParams = {
    path: '../public/picture.jpg',
    transitionTime: 2
  }

  // scs.setBackground(sbp)
  scs.changeBackgroundFadeOutIn(cbfoip)
  // scs.applyDarkChange(adcp)
  // scs.applyCrossFadeInOut(acfiop)
}

function characterTest() {
  const rcp: RegisterCharacterParams = {
    name: 'sissela',
    x: 400,
    y: 100,
    // animation: 'CHARACTER_DOWN',
    zIndex: 0,
    shadow: true,
    emotion: 'embarrassed'
  }

  cds.registerCharacter(rcp)
}

window.addEventListener('test', characterTest)