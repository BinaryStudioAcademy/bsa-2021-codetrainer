import * as fs from 'fs';
import { spawn } from 'child_process';
import { getPath, pathTestFile } from './path';

const saveFile = (solution: string, test: string) => {
	fs.writeFile(pathTestFile, `${solution}\n${test}`, (err) => {
		console.info('error save => ', err);
	});
};

const deleteFile = () => {
	fs.unlink(pathTestFile, (err) => {
		console.log('error delete => ', err);
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
				deleteFile();
				resolve({ success: code === 0, ...parseResponse });
			}
		});
		docker.on('error', (error) => {
			deleteFile();
			resolve({ success: false, error: error.message });
		});
	});
};
