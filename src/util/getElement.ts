export const getElementById = <E extends HTMLElement = HTMLElement>(id: string) =>
	document.getElementById(id) as E | null