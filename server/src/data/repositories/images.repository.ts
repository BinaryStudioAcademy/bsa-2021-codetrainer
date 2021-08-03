import S3, { DeleteObjectRequest, GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import internal from 'stream';
import { ENV } from '../../common';

export class ImagesRepository {
	private s3: S3;

	constructor() {
		this.s3 = new S3({
			region: ENV.AWS.IMAGES.REGION,
			credentials: {
				accessKeyId: ENV.AWS.IMAGES.ACCESS_KEY,
				secretAccessKey: ENV.AWS.IMAGES.SECRET_KEY
			}
		});
	}

	getImageStreamByKey(key: string): internal.Readable {
		const getRequest: GetObjectRequest = {
			Bucket: ENV.AWS.IMAGES.BUCKET,
			Key: key
		};
		return this.s3.getObject(getRequest).createReadStream();
	}

	async putImage(key: string, imageBuffer: Buffer): Promise<void> {
		const putRequest: PutObjectRequest = {
			Bucket: ENV.AWS.IMAGES.BUCKET,
			Key: key,
			Body: imageBuffer
		};
		await this.s3.putObject(putRequest).promise();
	}

	async deleteImage(key: string): Promise<void> {
		const deleteRequest: DeleteObjectRequest = {
			Bucket: ENV.AWS.IMAGES.BUCKET,
			Key: key
		};
		await this.s3.deleteObject(deleteRequest).promise();
	}
}
