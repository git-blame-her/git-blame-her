import { getAudioCtx } from "./AudioCtx";
import { PossibleAudioNodes } from "./types";
import type { AudioPipelineBuildResult, PlayAudioDetail, StopAudioDetail, FadeOutDetail, SetPannerDetail, SwingAudioDetail } from "./types";
import * as AssetManager from "./AssetManager";

class AudioPlaybackSystem {
  // 변수선언
  private readonly currentPlaying = new Map<string, AudioPipelineBuildResult>();
  public audioSettings: Record<string, { volume: number }> = {
    background: {
      volume: 1
    },
    sissela: {
      volume: 1
    }
  };

  // 메서드 선언
  // 소리 재생
  playAudio(detail: PlayAudioDetail) {
    // destination으로의 연결 파이프라인 구축
    // 구축후, 각 라인의 처음 노드들을 반환 (처음 노드는 absn임)
    const audioPipelineBuildResult = this.buildAudioPipeLine(detail);

    // 현재 재생 중인 소리들을 가지고 있는 Map에 추가
    this.currentPlaying.set(detail.audioId, audioPipelineBuildResult);

    // 소리(들) 재생
    audioPipelineBuildResult.initialNodes.forEach((absn) => {
      absn.start();
    });
  }

  // 오디오 연결 선 구축
  private buildAudioPipeLine(detail: PlayAudioDetail) {
    const actx = getAudioCtx()
    const soundKind = detail.soundKind;
    const gn = new GainNode(actx, { gain: this.audioSettings[soundKind].volume });
    const spn = new StereoPannerNode(actx);
    const lfo = new OscillatorNode(actx);

    const initialNodes = detail.pipeline.map(audioGroup => {
      const nodesToBeConnected: Array<AudioBufferSourceNode | DelayNode> = audioGroup.map(audioNodeInfo => {
        switch (audioNodeInfo.node) {
          case PossibleAudioNodes.AudioBufferSource: {
            const absn = new AudioBufferSourceNode(actx, {
              buffer: AssetManager.get('audio', detail.audioId).buffer,
              loop: detail.loop
            });

            if (audioNodeInfo.isMainNode) {
              absn.addEventListener('ended', this.createRemoveEndedNodeListener(detail.audioId));
            }

            return absn;
          }
          
          case PossibleAudioNodes.Delay:
            return new DelayNode(actx, {
              delayTime: audioNodeInfo.delayTime
            });
        }
      });

      nodesToBeConnected.reduce((left, right) => {
        left.connect(right);
        return right;
      });

      // 생성된 노드들을 패너노드, 음량제어노드에 연결
      nodesToBeConnected.at(-1)?.connect(spn);
      spn.connect(gn);

      // 패너노드에 lfo 부착
      lfo.connect(spn.pan);
      
      return nodesToBeConnected[0] as AudioBufferSourceNode;
    });

    // 음량제어노드를 스피커에 연결
    gn.connect(actx.destination);
    
    return {
      initialNodes,
      spn,
      lfo,
      gn
    };
  }

  // 소리 정지시 현재재생중목록에서 제거
  private createRemoveEndedNodeListener(audioId: string) {
    const removeEndedNode = () => {
      this.currentPlaying.delete(audioId);
    };
    return removeEndedNode;
  }

  // 소리 정지
  stopAudio(detail: StopAudioDetail) {
    this.currentPlaying.get(detail.audioId)?.initialNodes.forEach((absn) => {
      absn.stop();
    });
  }

  // 소리가 서서히 지정된 값까지 줄어들게 하는 연출
  fadeOutAudio(detail: FadeOutDetail) {
    const currentTime = getAudioCtx().currentTime;

    this.currentPlaying.get(detail.audioId)?.gn.gain.linearRampToValueAtTime(detail.volume, currentTime + detail.endTime);
  }

  // 패너노드의 값을 지정하여 한쪽에서만 소리가 들리는 효과 연출 가능
  setPannerValue(detail: SetPannerDetail) {
    const currentAudio = this.currentPlaying.get(detail.audioId);
    
    if (currentAudio === undefined) return;
    
    currentAudio.spn.pan.value = detail.pan;
  }

  // 소리가 좌우로 왔다갔다 번갈아 출력되는 효과 연출 가능
  swingAudio(detail: SwingAudioDetail) {
    const currentAudio = this.currentPlaying.get(detail.audioId);

    if (currentAudio === undefined) return;

    currentAudio.lfo.frequency.value = detail.frequency;
    currentAudio.lfo.start();
  }
}

// export
const aps = new AudioPlaybackSystem();

export default aps;