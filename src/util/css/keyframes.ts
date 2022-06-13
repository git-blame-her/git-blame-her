type PercentageIndexedKeyframes = {
  [percentage: `${bigint}%`]: Keyframe
}

type ValidatedKeyframes<Keyframes extends PercentageIndexedKeyframes> =
  keyof Keyframes extends `${bigint}%`
  ? Keyframes
  : Pick<Keyframes, Extract<keyof Keyframes, `${bigint}%`>>

function keyframes(...keyframes: [Keyframe, ...Array<Keyframe>]): Array<Keyframe>
function keyframes<
  Keyframes extends PercentageIndexedKeyframes,
  >(keyframes: ValidatedKeyframes<Keyframes>): Array<Keyframe>
function keyframes(...keyframes: Array<any>): Array<Keyframe> {
  if (keyframes.length !== 1) return keyframes
  else {
    const percentageIndexedKeyframes = keyframes[0]
    return Object.keys(percentageIndexedKeyframes)
      .map(key => ({
        ...percentageIndexedKeyframes[key],
        offset: parseInt(key) / 100,
      }))
      .sort((a, b) => a.offset - b.offset)
  }
}

export default keyframes