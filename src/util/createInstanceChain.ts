const createInstanceChain = <
	Class extends new (...args: Array<any>) => Instance,
	Instance
>(Class: Class, ...argsList: Array<ConstructorParameters<Class>>) =>
	argsList.map(args => new Class(...args))