import amqp from 'amqplib';
import { ENV } from '../common';
// eslint-disable-next-line import/no-mutable-exports
let rabbitChannel: amqp.Channel;

const createConnectAmqp = async () => {
	try {
		const connect = await amqp.connect(ENV.AMQP.URL);
		rabbitChannel = await connect.createChannel();
		rabbitChannel.assertQueue(ENV.AMQP.QUEUE);
	} catch (e) {
		throw new Error('AMQP connection not available');
	}
};

createConnectAmqp();

process.on('exit', () => {
	rabbitChannel.close();
});

export { rabbitChannel };
