import * as fs from 'fs';
import { spawn } from 'child_process';
import { getPath } from './path';
import { IMPORT } from '../common/constants';

const saveFile = (solution: string, test: string) => {
	fs.writeFile('test/test.js', `${IMPORT}\n${solution}\n${test}`, (err) => {
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
		docker.on('close', (code) => {
			const response = output.toString();
			let parseResponse!: Record<string, unknown>;
			try {
				parseResponse = { response: JSON.parse(response) };
			} catch (e) {
				parseResponse = { error: response };
			} finally {
				resolve({ success: code === 0, ...parseResponse });
			}
		});
		docker.on('error', (error) => {
			resolve({ success: false, error: error.message });
		});
	});
};
