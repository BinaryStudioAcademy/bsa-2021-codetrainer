import { Request, Response, Router } from 'express';
import { HttpCodes } from '../common';
import { imageMiddleware } from '../middleware';
import { ImagesService } from '../services';

export function imagesRouter(service: ImagesService): Router {
	const route = Router();

	route.post('/upload', imageMiddleware, async (req: Request, res: Response) => {
		const image = req.file;
		if (image) {
			const href = await service.putImage(image);
			res.status(HttpCodes.OK).json({ href });
		} else {
			res.status(HttpCodes.BAD_REQUEST).json({ message: 'No image' });
		}
	});

	return route;
}
