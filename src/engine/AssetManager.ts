import { actx } from "./actx";
import type { AudioId } from "./types";

export interface AudioAsset {
  id: AudioId;
  buffer: AudioBuffer;
}

const assetStores = {
  audio: new Map<AudioId, AudioAsset>()
};

export async function fetchAudio(audioId: AudioId, src: string) {
  const response = await fetch(src);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = await actx.decodeAudioData(arrayBuffer);
  assetStores.audio.set(audioId, {
    id: audioId,
    buffer,
  });
}

interface IntrinsicAsset {
  audio: AudioAsset;
}

export function get<T extends keyof IntrinsicAsset>(type: T, id: AudioId, shouldDelete = false): IntrinsicAsset[T] {
  const assets = assetStores[type];
  const asset = assets.get(id);
  if (asset == null) {
    throw new Error("Unknown audio id: " + id);
  }
  if (shouldDelete) {
    assets.delete(id);
  }
  return asset;
}

export function pop<T extends keyof IntrinsicAsset>(type: T, id: AudioId): IntrinsicAsset[T] {
  return get(type, id, true);
}