import path from 'path';
import { randomUUID } from 'crypto';
import { ImagesRepository } from '../data';
import { TFile } from '../types';
import { mapMulterFileToFile } from '../helpers';

export class ImagesService {
	private readonly repository: ImagesRepository;

	constructor(repository: ImagesRepository) {
		this.repository = repository;
	}

	async putImage(file: Express.Multer.File): Promise<string> {
		const image: TFile = mapMulterFileToFile(file);
		const key = randomUUID();
		const ext = path.extname(image.name);
		return this.repository.putImage(key + ext, image.buffer, image.mimetype);
	}

	async deleteImage(key: string): Promise<void> {
		return this.repository.deleteImage(key);
	}
}
