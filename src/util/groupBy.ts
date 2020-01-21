const groupBy = (field: string) => <T>(array: T[]): { [key: string]: T[] } => {
	const object: { [key: string]: T[] } = {};
	for (const item of array) {
		if (field in item) {
			const value = (item as Record<string, any>)[field];
			if (!(value in object)) {
				object[value] = [];
			}
			object[value].push(item);
		}
	}
	return object;
};

export default groupBy;
