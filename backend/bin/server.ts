import express, { Application } from 'express';
import { config } from "dotenv"
import app from "../src/app"

config({path: '.env'})
const env = config().parsed
const server: Application = express()
const PORT = env?.PORT || 8000;

server.use('/api/v1', app)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/v1`);
});