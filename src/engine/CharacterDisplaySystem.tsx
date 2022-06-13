import { getElementById } from '../util/getElement'
import { RegisterCharacterParams } from './types'
import { px } from '../util/css/macros'
import { animateWithSeconds } from '../util/css/animateWithSeconds'
import jsx from '../util/jsx'



class CharacterDisplaySystem {
  constructor(
    private _characterLayer: HTMLDivElement,
    private _effectLayer: HTMLDivElement
  ) {
  }

  // 캐릭터 일괄 삭제
  bulkDelete() {
    const characters = [...this._characterLayer.children]

    characters.forEach((character) => {
      character.remove()
    })
  }

  registerCharacter(params: RegisterCharacterParams) {
    const defaultPosition = { x: 400, y: 200 }
    const computedPosition = {
      x: params.x ?? defaultPosition.x,
      y: params.y ?? defaultPosition.y
    }
    const character: Record<string, any> = {} // 임시
    
    const $character = (
      <img
        src={character.imagePath}
        width={character.width}
        height={character.height}
        style={{
          position: 'absolute',
          top: px(computedPosition.y),
          left: px(computedPosition.x),
          zIndex: params.zIndex,
          filter: params.shadow ? 'grayscale(100%)' : 'unset'
        }}
      />
    )

    if ('animation' in params) {
      switch (params.animation) {
        case 'CHARACTER_DOWN': {
          animateWithSeconds($character, 'CHARACTER_DOWN', { seconds: 0.25, easing: 'ease-out' })
            .then(() => {
              animateWithSeconds($character, 'CHARACTER_UP', { seconds: 0.25, easing: 'ease-in' })
            })
        }
          break

        case 'CHARACTER_UP': {
          animateWithSeconds($character, 'CHARACTER_UP', { seconds: 0.25, easing: 'ease-out' })
            .then(() => {
              animateWithSeconds($character, 'CHARACTER_DOWN', { seconds: 0.25, easing: 'ease-in' })
            })
        }
          break
      }
    }

    this._characterLayer.appendChild($character)
  }
}

// export
const $characters = getElementById<HTMLDivElement>('characters')!
const $effects = getElementById<HTMLDivElement>('effects')!
const cds = new CharacterDisplaySystem($characters, $effects)!

export default cds