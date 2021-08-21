import express from 'express';
import './config/amqplib';

const app = express();

app.listen(() => {
	console.info('Testing service listening');
});
