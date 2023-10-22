import { exit } from 'node:process';
import { setupServer } from './server';
import { createModules } from './modules';
import { connectDb } from './shared/mongo';
import { config } from './shared/config';

async function main() {
	try {
		console.log('Starting server...');
		// await connectDb();

		const modules = createModules(config);

		setupServer(config, modules);
	} catch (err) {
		console.error('RED CODE -- ', err);
		exit(1);
	}
}

main();
