import createAnimation from '../createAnimation'
import keyframes from '../keyframes'
import Time from '../../Time'

export const EMBARRASSED = createAnimation(
  keyframes({
    '0%': {
      opacity: 0,
      marginTop: '0px'
    },
    '50%': {
      opacity: 1,
      marginTop: '20px'
    },
    '100%': {
      opacity: 0,
      marginTop: '50px'
    }
  }),
  {
    duration: Time.Second * 1
  }
)