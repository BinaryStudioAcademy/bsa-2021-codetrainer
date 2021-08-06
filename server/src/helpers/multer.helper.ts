import { TFile } from '../types';

export function mapMulterFileToFile(file: Express.Multer.File): TFile {
	return {
		buffer: file.buffer,
		name: file.originalname,
		mimetype: file.mimetype
	};
}
