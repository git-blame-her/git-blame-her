const validated = <T>() =>
	<V extends T>(value: T extends V ? V : Pick<V, Extract<keyof V, keyof T>>) => value

export default validated