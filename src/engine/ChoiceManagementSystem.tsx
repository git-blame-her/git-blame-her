import { px } from '../util/css/macros'
import jsx from '../util/jsx'

/*
'cms': {
  'selections': {
    'c1': '고백한다',
    'c2': '사귀자고 한다',
    'c3': '말없이 손을 잡는다'
  },
  'timeout': '10' // 제한시간내에 답변 못하면 곤란해지는 시스템
}
*/

export class ChoiceManagementSystem {
  private _layer: HTMLDivElement
  private _choiceArea: { width: number, height: number }

  constructor (layer: HTMLDivElement) {
    this._layer = layer
    this._choiceArea = { width: 500, height: 300 }
  }

  displayChoices(choices: Array<string>) {
    const _$frag = <>{
      ...choices.map(choice => (
        <div
          class="choice"
          style={{
            width: px(this._choiceArea.width),
            height: px(this._choiceArea.height)
          }}
        >
          {choice}
        </div>
      ))
    }</>
  }
}