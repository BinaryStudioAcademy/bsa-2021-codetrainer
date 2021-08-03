import multer from 'multer';
import { HttpCodes , MAX_IMAGE_SIZE, IMAGE_MIMETYPES } from '../common';
import { ValidationError } from '../helpers';

export const imageMiddleware = multer({
	fileFilter: (_req, file, callback) => {
		if (!IMAGE_MIMETYPES.includes(file.mimetype)) {
			callback(new ValidationError({
				status: HttpCodes.UNSUPORTED_MEDIA_TYPE,
				message: 'Bad mimetype'
			}));
		}
		else {
			callback(null, true);
		}
	},
	limits:{
		files: 1,
		fileSize: MAX_IMAGE_SIZE
	}
}).single('image');
