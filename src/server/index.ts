import express from 'express';
import { Modules } from '../modules';
import { Config } from '../shared/config';
import cors from 'cors';
import { createRoutes } from './common/routes';
import morgan from 'morgan';

export function setupServer(config: Config, mod: Modules) {
	const server = express();
	server.use(morgan('combined'));

	// system status endpoint
	server.get('/system', (req, res) => res.send('ok'));

	// set middleware
	server.use(cors());
	server.use(express.json());

	// set routes
	createRoutes(mod, server);

	// start server
	server.listen(config.server.port, () => {
		console.log(`Server started on port ${config.server.port} 🔥🔥🔥`);
	});
}
