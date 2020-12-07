import { curry } from "../../lib/utils";

export const validatePolicies = curry(fn => policies => {
	return policies.reduce((a, c) => {
		const policy = c.match(/\d+|(\w+)/gm);
		const [min, max, char, pass] = policy;
		return fn({min, max, pass, char}) ? ++a : a;
	}, 0);
});