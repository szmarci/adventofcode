import { compose, then, split, replace } from "../../lib/utils";
import { getTrees, findTrees } from "./common";
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

compose(
	then(getTrees),
	then(findTrees({right: 3, down: 1})),
	then(replace(/\r$/, '')),
	then(split("\n")),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day3/data/3.txt'); //?