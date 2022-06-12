import { getElementById } from './util/getElement'
import { initVoid } from './void'
import { initNameDet } from './initNameDet'

const $startBtn = getElementById<HTMLDivElement>('start-btn')!

initVoid()

$startBtn.addEventListener('click', () => {
  initNameDet()
})

console.log('main.ts loaded')