import { curry } from "../../lib/utils";

export const find = curry(({min, max, upper, lower}) => boardingPass => {
	return boardingPass.reduce((a, c) => {
		if (c === lower) {
			a = max = max - Math.floor((max - min) / 2) - 1
		} else if (c === upper) {
			a = min = min + Math.ceil((max - min) / 2)
		}
		return a;
	}, 0);
});

export const getSeatIds = x => {
	return x.reduce((a, c) => {
		const rowData = c.split("").slice(0, 7);
		const colData = c.split("").slice(7, 10);
		const row = find({min: 0, max: 127, upper: "B", lower: "F"})(rowData);
		const col = find({min: 0, max: 7, upper: "R", lower: "L"})(colData);
		a.push(row * 8 + col)
		return a; 
	}, [])
};