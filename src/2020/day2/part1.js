import { compose, then, split } from "../../lib/utils";
import { validatePolicies } from "./common";
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const validator = ({pass, min, max, char}) => {
	const sorted = pass.split("").sort().join("");
	if (sorted.includes(char.repeat(min)) && !sorted.includes(char.repeat(parseInt(max) + 1))) {
		return true
	}
	return false;
}

compose(
	then(validatePolicies(validator)),
	then(split(/\r\n/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day2/data/2.txt'); //?