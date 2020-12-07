import { curry } from "../../lib/utils";

const slope = curry(({right, down}) => (shift, x) => shift - (down/right)*x);

export const getTrees = xs => xs.filter(x => x !== '.').length;

export const findTrees = curry(({right, down}, forest) => {
	const forestTileVertical = forest.length;
	const forestTileHorizontal = forest[0].length;
	let trees = [];
	let x = 0, y = 0;
	do {
		if (x % right === 0) {
			y = slope({right, down})(forestTileVertical, x);
			if (y <= 0)
				break;
			const row = forest[Math.abs(y - forestTileVertical)];
			const point = row[x % forestTileHorizontal];
			if (point)
				trees.push(point);
		}
		x++;
	} while (y >= 0);
	return trees;
})