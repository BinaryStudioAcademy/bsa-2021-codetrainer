import { Request, Response, Router } from 'express';
import { HttpCodes } from "../common/enum/http-codes";
import { imageMiddleware, jwtMiddleware } from "../middleware";
import { ImagesService } from '../services';

export function imagesController(service: ImagesService): Router {
	const route = Router();

	route.get('/:key', (req: Request, res: Response) => {
		const { key } = req.params;
		const stream = service.getImageStream(key);
		stream.on('error', () => {
			res.status(HttpCodes.NOT_FOUND).send();
			stream.destroy();
		});
		stream.pipe(res);
		res.status(HttpCodes.OK);
	});

	route.post(
		'/upload',
		jwtMiddleware,
		imageMiddleware,
		async (req: Request, res: Response) => {
			const image = req.file;
			if (image) {
				const key = await service.putImage(image.buffer);
				res.status(HttpCodes.OK).json({ key });
			}
		}
	);

	return route;
};
