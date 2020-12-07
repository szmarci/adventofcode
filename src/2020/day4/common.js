export const parsePassportData = passwords => passwords.map(c => c.reduce((a, c) => {
	const key = c.split(":")[0];
	const value = c.split(":")[1];
	a[key] = value;
	return a;
}, {}));

export const checkRequiredFields = (p) => {
	const r = Object.keys(p).length;
	if (r === 8) {
		return true;
	} else if (r < 7) {
		return false;
	} else {
		return !p.hasOwnProperty("cid");
	}
}