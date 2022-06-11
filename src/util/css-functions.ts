const createCssMacroFunction = <Args extends Array<any>>(functionName: string) =>
	<R>(f: (...args: Args) => R) =>
		(...args: Args) => `${functionName}(${f(...args)})`;
export const url = createCssMacroFunction<[ url: string ]>('url')(_url => _url);