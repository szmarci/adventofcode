import { compose, then, split, curry } from "../../lib/utils";
import { validatePolicies } from "./common";
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const validator = ({pass, min, max, char}) => {
	const splitted = pass.split("");
	if ((splitted[min - 1] === char || splitted[max - 1] === char) && 
			!(splitted[min - 1] === char && splitted[max - 1] === char)) {
		return true;
	}
	return false;
}

compose(
	then(validatePolicies(validator)),
	then(split(/\r\n/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day2/data/2.txt'); //?