declare module 'just-group-by' {
	function groupBy<T>(
		array: T[],
		cb: (array: T) => string
	): Record<string, T[]>;
	export = groupBy;
}
