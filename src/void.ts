import { getElementById } from './util/getElement'

const LINE_SPACE = 50

export function initVoid() {
  const $cvs = getElementById<HTMLCanvasElement>('void')!
  const ctx = $cvs.getContext('2d')!
  const computedCanvasStyle = getComputedStyle($cvs, null)

  $cvs.width = parseInt(computedCanvasStyle.width)
  $cvs.height = parseInt(computedCanvasStyle.height)

  ctx.fillStyle = 'rgb(53, 53, 53)'
  ctx.fillRect(0, 0, $cvs.width, $cvs.height)

  // 대각선 생성
  ctx.strokeStyle = 'rgb(83, 83, 83)'

  for (let i = 0; i < $cvs.width; i += LINE_SPACE) {
    ctx.moveTo(i, 0)
    ctx.lineTo(0, i)
  }

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const _ = windowWidth - windowWidth % LINE_SPACE

  // i로 생성 다 못한 거 마저 생성
  for (let j = LINE_SPACE - (windowWidth - _); j < $cvs.height; j += LINE_SPACE) {
    ctx.moveTo(windowWidth, j)
    ctx.lineTo(windowWidth - windowHeight + j, windowHeight)
  }

  ctx.stroke()
}