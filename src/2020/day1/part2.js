import { product, sortAsc, curry, sum, compose, then, split, map } from "../../lib/utils";
import { findPair } from "./common";
const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

const findThree = curry((max, data) => data.reduce((a, current) => {
	if (current > (max - data[0]) / 2) {
		const secondThird = findPair(max - current);
		const k = secondThird(data.filter(x => x !== current));
		if (sum(k.concat(current)) === 2020)
			a.push(current, ...k)
	}
	return a;
}, []));

compose(
	then(product), 
	then(findThree(2020)), 
	then(sortAsc),
	then(map(x => parseInt(x))),
	then(split("\n")),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day1/data/1.txt'); //?
