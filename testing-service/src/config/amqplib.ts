import { Channel, connect, Connection, ConsumeMessage } from 'amqplib';
import { TestApiPath } from '../common/api';
import { TypeTest } from '../common/constants';
import { ENV } from '../common/env-enum';
import { sendTestResult } from '../helpers/call-api';
import { runTest } from '../helpers/run-test';

interface IMessageConsume {
	typeTest: TypeTest;
	taskId: string;
	solutionId: string;
	status: string;
	code: string;
	test: string;
	userId: string;
}

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
		try {
			this.connection = await connect(this.uri);
			this.channel = await this.connection.createChannel();
			this.channel.assertQueue(this.queueName, { durable: true });
			this.channel.prefetch(1);
			this.channel.consume(ENV.AMQP.QUEUE, this.consume.bind(this), { noAck: false });
		} catch (error) {
			console.error(error);
			throw new Error((error as Error)?.message ?? 'unknown error');
		}
	}

	async disconnect() {
		await this.channel.close();
		await this.connection.close();
	}

	private async consume(message: ConsumeMessage | null) {
		if (!message) {
			console.info('message is null');
			return;
		}
		const parseMessage: IMessageConsume = JSON.parse(message.content.toString());

		const result = await this.handler(parseMessage);

		this.channel.ack(message);
		sendTestResult(
			{ ...parseMessage, result },
			parseMessage.typeTest === TypeTest.TEST_TASK ? TestApiPath.RESULT_TASK : TestApiPath.RESULT_SOLUTION,
		);
	}

	private async handler({ code, test }: { code: string; test: string }) {
		const result = await runTest(code, test);
		return result;
	}
}

const rabbitConnect = new RabbitConnect();
rabbitConnect.connect();

process.on('exit', async () => {
	await rabbitConnect.disconnect();
});

export { rabbitConnect };
