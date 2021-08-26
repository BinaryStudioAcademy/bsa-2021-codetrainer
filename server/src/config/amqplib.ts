import { Channel, connect, Connection } from 'amqplib';
import { ENV } from '../common';

class RabbitConnect {
	private uri: string;

	private queueName: string;

	private connection!: Connection;

	private channel!: Channel;

	constructor() {
		this.uri = ENV.AMQP.URL;
		this.queueName = ENV.AMQP.QUEUE;
	}

	async connect() {
		this.connection = await connect(this.uri);
		this.channel = await this.connection.createChannel();
	}

	async disconnect() {
		await this.channel.close();
		await this.connection.close();
	}

	async send(data: Record<string, any>) {
		await this.channel.assertQueue(this.queueName, { durable: true });
		this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)), {
			contentType: 'application/json',
		});
	}
}

const rabbitConnect = new RabbitConnect();
rabbitConnect.connect();

process.on('exit', async () => {
	await rabbitConnect.disconnect();
});

export { rabbitConnect };
