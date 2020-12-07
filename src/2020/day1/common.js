import { curry } from "../../lib/utils";

export const findPair = curry((max, data) => data.reduce((a, current) => {
	if (current < max - data[0]) {
		const found = data.filter(e => e === max - current);
		if (found.length)
			a.push(found[0]);
	}
	return a;
}, []));