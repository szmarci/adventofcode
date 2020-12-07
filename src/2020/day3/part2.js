import { compose, then, split, replace, product, curry, map } from "../../lib/utils";
import { getTrees, findTrees } from "./common";
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const multiRoutes = curry(xs => data => xs.map(directions => findTrees(directions)(data)));

compose(
	then(product),
	then(map(getTrees)),
	then(multiRoutes([
		{right: 1, down: 1}, 
		{right: 3, down: 1}, 
		{right: 5, down: 1}, 
		{right: 7, down: 1}, 
		{right: 1, down: 2}
	])),
	then(replace(/\r$/, '')),
	then(split("\n")),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day3/data/3.txt'); //?