import { compose, sortAsc, then, split, filter } from "../../lib/utils";
import { getSeatIds } from "./common";
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

var getDiff = xs => xs.slice(1).map((x,i) => ({diff: x - xs[i], prev: xs[i], next: xs[i+1]}));

compose(
	then(xs => xs[0].prev + 1),
	then(filter(x => x.diff > 1)),
	then(getDiff),
	then(sortAsc),
	then(getSeatIds),
	then(split(/\r\n/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day5/data/5.txt'); //?