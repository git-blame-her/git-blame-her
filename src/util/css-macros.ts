const createCssMacro = <Args extends Array<any>, R>(f: (...args: Args) => R) =>
	(...args: Args) => f(...args)
export const url = createCssMacro<[url: string], string>(_url => `url(${_url})`)
export const px = createCssMacro((value: number) => `${value}px`)