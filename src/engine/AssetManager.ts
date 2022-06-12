import { getAudioCtx } from './AudioCtx'
import type { Access } from './types'

export interface Asset {
  id: string
}

export interface AudioAsset extends Asset {
  buffer: AudioBuffer
}

interface IntrinsicAsset {
  audio: AudioAsset
}

const assetStores: {
  [AssetName in keyof IntrinsicAsset]: Map<string, IntrinsicAsset[AssetName]>
} = {
  audio: new Map()
}

export async function fetchAudio(audioId: string, src: string) {
  const actx = getAudioCtx()
  const buffer = await fetch(src)
    .then(response => response.blob())
    .then(blob => blob.arrayBuffer())
    .then(arrayBuffer => actx.decodeAudioData(arrayBuffer))
  assetStores.audio.set(audioId, {
    id: audioId,
    buffer,
  })
}

export function get<T extends keyof IntrinsicAsset>(type: T, id: Access<Access<IntrinsicAsset, T>, 'id'>): IntrinsicAsset[T] {
  const assets = assetStores[type]
  const asset = assets.get(id)
  if (asset == null) {
    throw new Error(`Unknown ${type} id: ${id}`)
  }
  return asset
}

export function pop<T extends keyof IntrinsicAsset>(type: T, id: Access<Access<IntrinsicAsset, T>, 'id'>): IntrinsicAsset[T] {
  const assets = assetStores[type]
  const got = get(type, id)
  assets.delete(id)
  return got
}