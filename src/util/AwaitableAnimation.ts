type MembersToBeOmitted =
	 | 'oncancel'
	 | 'onfinish'
	 | 'onremove'

class AwaitableAnimation extends Promise<Animation> implements Omit<Animation, MembersToBeOmitted> {
  constructor(private _animation: Animation) {
    super((resolve) => {
      this._animation.addEventListener('fin', () => {
        resolve(this._animation)
      })
    })
  }
	
	get currentTime() {
		return this._animation.currentTime
	}
	set currentTime(currentTime: CSSNumberish | null) {
		this._animation.currentTime = currentTime
	}
	get effect() {
		return this._animation.effect
	}
	set effect(effect: AnimationEffect | null) {
		this._animation.effect = effect
	}
	get finished() {
		return this._animation.finished
	}
	get id() {
		return this._animation.id
	}
	set id(id: string) {
		this._animation.id = id
	}
	get oncancel() {
		return this._animation.oncancel
	}
	set oncancel(oncancel: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null) {
		this._animation.oncancel = oncancel
	}
	get onfinish() {
		return this._animation.onfinish
	}
	set onfinish(onfinish: ((this: Animation, ev: AnimationPlaybackEvent) => any) | null) {
		this._animation.onfinish = onfinish
	}
	get onremove() {
		return this._animation.onremove
	}
	set onremove(onremove: ((this: Animation, ev: Event) => any) | null) {
		this._animation.onremove = onremove
	}
	get pending() {
		return this._animation.pending
	}
	get playState() {
		return this._animation.playState
	}
	get playbackRate() {
		return this._animation.playbackRate
	}
	set playbackRate(playbackRate: number) {
		this._animation.playbackRate = playbackRate
	}
	get ready() {
		return this._animation.ready
	}
	get replaceState() {
		return this._animation.replaceState
	}
	get startTime() {
		return this._animation.startTime
	}
	set startTime(startTime: CSSNumberish | null) {
		this._animation.startTime = startTime
	}
	get timeline() {
		return this._animation.timeline
	}
	set timeline(timeline: AnimationTimeline | null) {
		this._animation.timeline = timeline
	}
	cancel() {
		this._animation.cancel()
	}
	commitStyles() {
		this._animation.commitStyles()
	}
  finish() {
    this._animation.finish()
  }
	pause() {
		this._animation.pause()
	}
	persist() {
		this._animation.persist()
	}
	play() {
		this._animation.play()
	}
	reverse() {
		this._animation.reverse()
	}
	updatePlaybackRate(playbackRate: number) {
		this._animation.updatePlaybackRate(playbackRate)
	}
	addEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void
	addEventListener(...args: [ type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions ]) {
		this._animation.addEventListener(...args)
	}
	dispatchEvent(event: Event): boolean {
		return this._animation.dispatchEvent(event)
	}
	removeEventListener<K extends keyof AnimationEventMap>(type: K, listener: (this: Animation, ev: AnimationEventMap[K]) => any, options?: boolean | EventListenerOptions): void
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void
	removeEventListener(...args: [ type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions ]) {
		this._animation.removeEventListener(...args)
	}
}

export default AwaitableAnimation