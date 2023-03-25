import dotEnv from 'dotenv'
import Server from './src/models/server';

dotEnv.config();

const server = new Server();
server.listen();