import { compose, then, split, map, replace, filter } from "../../lib/utils";
import { checkRequiredFields, parsePassportData } from "./common";
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const validations = [
	{ key: "byr", validator: x => x >= 1920 && x <= 2002 },
	{ key: "iyr", validator: x => x >= 2010 && x <= 2020 },
	{ key: "eyr", validator: x => x >= 2020 && x <= 2030 },
	{ 
		key: "hgt", 
		validator: compose(
			x => {
				if (!x)
					return false;
				const f = x[0].split(/([0-9]+)/gm).filter(Boolean);
				if (f && f[1] === "in") {
					return f[0] >= 59 && f[0] <= 76;
				} else {
					return f[0] >= 150 && f[0] <= 193;
				}
			},
			x => x.match(/\d+(cm|in)/gm) ?? false
		)
	},
	{ key: "hcl", validator: x => x.match(/#[a-f0-9]{6}/gm) ?? false},
	{ key: "ecl", validator: x => x.match(/amb|blu|brn|gry|grn|hzl|oth/gm) ?? false},
	{ key: "pid", validator: x => x.match(/\b\d{9}\b/gm) ?? false},
]

const checkIfValid = (person) => {
	return validations.reduce((a, c) => {
		a.push(c.validator(person[c.key]));
		return a;
	}, []).every(x => x);
}

const checkPassport = (passports) => {
	return passports.reduce((a, person) => {
		if(checkRequiredFields(person)) {
			a.push(checkIfValid(person));
		} else {
			a.push(false);
		}
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