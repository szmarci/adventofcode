import { compose, then, split, replace } from "../../lib/utils";
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

compose(
	then(xs => xs.reduce((a, c) => a + c.size, 0)),
	then(xs => xs.map(x => new Set(x))),
	then(replace(/\n|\r/gm, "")),
	then(split(/\n\r/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day6/data/6.txt'); //?