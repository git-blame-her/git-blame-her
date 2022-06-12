import { getElementById } from '../util/getElement'
import sleep from '../util/sleep'
import { ScriptTurn } from './builder'
import type { ScriptDisplayParams } from './types'

/*
'sds': {
  // 원래라면 글자가 하나씩 주루룩 나오는 애니메이션이 나와야 함
  // (예) {n}: n초간 글자 출력 애니메이션 정지 재생 (버벅거림)
  'script': "아직은 쌀쌀한 기색이 채 가시지 않은 3월 초... {1}나는 입학식으로 향하는 발걸음을 옮겼다.",
  'hideWindow': 'false' // 대사창 숨길지 띄울지 결정
},
*/

class ScriptDisplaySystem {
  private _nameBox: HTMLParagraphElement
  private _scriptBox: HTMLParagraphElement
  private _isPrintingScript = false
  private _isSkipped = false

  constructor(
    private _scriptContainer: HTMLDivElement
  ) {
    [this._nameBox, this._scriptBox] = this._scriptContainer.children as HTMLCollectionOf<HTMLParagraphElement>
    this._scriptContainer.addEventListener('click', () => {
      if (this._isPrintingScript) this.skip()
      else {
        
      }
    })
  }

  display(params: ScriptDisplayParams) {
    this._isSkipped = false
    this._nameBox.textContent = params.name
    this.playScript(params.script)
  }

  private async playScript(script: ScriptTurn) {
    outer:
    for (let i = 0; i < script.items.length; i++) {
      const scriptItem = script.items[i]
      if (typeof scriptItem === 'string') {
        for (const char of scriptItem) {
          if (this._isSkipped) {
            this._isSkipped = false
            
            if ({ nextScriptWhenSkipped: false }/* 옵션 */.nextScriptWhenSkipped) {
              // TODO
            } else {
              this._scriptBox.innerHTML = scriptItem
            }
            break outer
          }
          
          this._scriptBox.innerHTML += char
          await sleep(25)
        }
      }
    }
  }

  private skip() {
    this._isSkipped = true
  }
}

// export
const $scriptContainer = getElementById<HTMLDivElement>('script-container')!
const sds = new ScriptDisplaySystem($scriptContainer)

export default sds