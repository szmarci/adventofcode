import { compose, then, split, map, replace, filter } from "../../lib/utils";
import { checkRequiredFields, parsePassportData } from "./common";
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const checkPassport = passports => {
	return passports.reduce((a, c) => {
		a.push(checkRequiredFields(c))
		return a;
	}, [])
}

compose(
	then(xs => xs.length),
	then(filter(x => x)),
	then(checkPassport),
	then(parsePassportData),
	then(map(split(/\s/gm))),
	then(replace(/\r\n/gm, ' ')),
	then(split(/\r\n\r\n/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day4/data/4.txt'); //?