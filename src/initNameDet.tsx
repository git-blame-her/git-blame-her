import jsx from './util/jsx'
import { getElementById } from './util/getElement'

export function initNameDet() {
  const $main = getElementById<HTMLDivElement>('main')!
  const $nameDetermination = (
    <div id="name-determination">
      <input id="name-input" type="text"/>
      <div id="input-clear-btn"></div>
      <div id="name-det-btn"></div>
    </div>
  )
  const $outermostFrame = getElementById<HTMLDivElement>('outermost-frame')!

  $main.remove()
  $outermostFrame.appendChild($nameDetermination)
}