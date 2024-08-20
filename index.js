#!/usr/bin/env node

import { editor, input } from "@inquirer/prompts";

export default async function main() {
	const seq = await editor({
		message: "Enter your invariant call stack",
	});

	const handler = await input({
		message: `Enter your handler contract variable name`,
		default: "handler",
	});

	const reg =
		/sender=(0x[0-9a-fA-F]+)\ addr=\[.+calldata=([A-Za-z0-9]+)\(.+args=\[((?:(?:([A-Za-z0-9]+(?:\s\[[0-9\.e]+\])?),?)\s?)*)\]/g;

	const matches = seq.matchAll(reg);

	for (const match of matches) {
		let [_, caller, fn, args] = match;
		args = args.replace(/\s?\[.*?\]/g, "");
		console.log(`${handler}.${fn}(${args});`);
	}
}

main();
