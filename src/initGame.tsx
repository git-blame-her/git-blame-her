import jsx from './util/jsx'
import { getElementById } from './util/getElement'

export function initGame() {
  const $nameDetermination = getElementById<HTMLDivElement>('name-determination')!
  const $inGame = (
    <div id="in-game">
      <div id="background"></div>
      <div id="background-effect"></div>
      <div id="characters"></div>
      <div id="effects"></div>
      <div id="script-container">
        <p id="name"></p>
        <p id="script"></p>
      </div>
    </div>
  )
  const $outermostFrame = getElementById<HTMLDivElement>('outermost-frame')!
  
  $nameDetermination.remove()
  $outermostFrame.appendChild($inGame)
}