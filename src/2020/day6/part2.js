import { compose, then, split, map, replace } from "../../lib/utils";
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

const count = allGroups => {
	return allGroups.reduce((a, group) => {
		const personCount = group.length;
		const re = new RegExp(`(\\w)\\1{${personCount - 1}}`, 'g');
		const sortedVotes = replace(/\n|\r/gm, "")(group)
			.join("")
			.split("")
			.sort()
			.join("");
		const allYes = sortedVotes.match(re)

		if (personCount === 1)
			return a + sortedVotes.length;

		if (allYes)
			return a + allYes.reduce((a, c) => c.length === personCount ? ++a : a, 0);

		return a;
	}, 0);
}

compose(
	then(xs => count(xs)),
	then(map(xs => xs.split(/\r\n/gm))),
	then(split(/\n\r/gm)),
	x => readFile(x, {encoding: 'utf8'}),
)('./src/2020/day6/data/6.txt'); //?