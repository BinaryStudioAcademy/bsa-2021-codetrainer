import * as fs from 'fs';
import { spawn } from 'child_process';
import { getPath } from './path';
import { MOCHA_IMPORT } from '../common/constants';

const saveFile = (solution: string, test: string) => {
	fs.writeFile('test/test.js', `${MOCHA_IMPORT}\n${solution}\n${test}`, (err) => {
		console.info('error save => ', err);
	});
};

export const runTest = (solution: string, test: string) => {
	saveFile(solution, test);
	return new Promise((resolve) => {
		const docker = spawn('docker', ['run', '-v', `${getPath()}:/app/javascript:ro`, '--rm', 'node-test']);
		let output = '';
		docker.stderr.on('data', (data) => {
			output += data;
		});
		docker.stdout.on('data', (data) => {
			output += data;
		});
		docker.on('close', () => {
			resolve(output.toString());
		});
		docker.on('error', (error) => {
			resolve(error.message);
		});
	});
};
