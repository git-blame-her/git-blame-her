import Turn from './Turn'

type ScriptAction = () => Promise<void>
export type ScriptItem = string | ScriptAction

class ScriptTurn extends Turn {
	items: Array<ScriptItem>
	constructor(...items: Array<ScriptItem>) {
		super()
		this.items = items
	}
}

export default ScriptTurn