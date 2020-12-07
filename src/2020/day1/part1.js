import { product, sortAsc, compose, then, split, map } from "../../lib/utils";
import { findPair } from "./common";
const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

compose(
	then(product),
	then(findPair(2020)),
	then(sortAsc),
	then(map(x => parseInt(x))),
	then(split("\n")),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day1/data/1.txt'); //?
