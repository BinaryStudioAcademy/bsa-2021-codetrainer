import { randomUUID } from 'crypto';
import internal from 'stream';
import { ImagesRepository } from '../data';

export class ImagesService {
	private readonly repository: ImagesRepository;

	constructor(repository: ImagesRepository) {
		this.repository = repository;
	}

	getImageStream(key: string): internal.Readable {
		return this.repository.getImageStreamByKey(key);
	}

	async putImage(imageBuffer: Buffer): Promise<string> {
		const key = randomUUID();
		await this.repository.putImage(key, imageBuffer);
		return key;
	}

	async deleteImage(key: string): Promise<void> {
		return this.repository.deleteImage(key);
	}
}
