import path from 'path';
import { randomUUID } from 'crypto';
import { ImagesRepository } from '../data';
import { TFile } from '../types';

export class ImagesService {
	private readonly repository: ImagesRepository;

	constructor(repository: ImagesRepository) {
		this.repository = repository;
	}

	async putImage(image: TFile): Promise<string> {
		const key = randomUUID();
		const ext = path.extname(image.name);
		return this.repository.putImage(key + ext, image.buffer, image.mimetype);
	}

	async deleteImage(key: string): Promise<void> {
		return this.repository.deleteImage(key);
	}
}
