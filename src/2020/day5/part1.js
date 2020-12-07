import { compose, sortAsc, then, split, last } from "../../lib/utils";
import { getSeatIds } from "./common";
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

compose(
	then(last),
	then(sortAsc),
	then(getSeatIds),
	then(split(/\r\n/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day5/data/5.txt'); //?