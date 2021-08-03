import S3, { DeleteObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import { ENV } from '../../common';

export class ImagesRepository {
	private s3Client: S3;

	constructor() {
		this.s3Client = new S3({
			region: ENV.AWS.IMAGES.REGION,
			credentials: {
				accessKeyId: ENV.AWS.IMAGES.ACCESS_KEY,
				secretAccessKey: ENV.AWS.IMAGES.SECRET_KEY
			}
		});
	}

	async putImage(key: string, buffer: Buffer, mimeType: string): Promise<string> {
		const putRequest: PutObjectRequest = {
			Bucket: ENV.AWS.IMAGES.BUCKET,
			Key: key,
			Body: buffer,
			ContentType: mimeType
		};
		const result = await this.s3Client.putObject(putRequest).promise();
		return `https://${ENV.AWS.IMAGES.BUCKET}.s3.amazonaws.com/${key}`;
	}

	async deleteImage(key: string): Promise<void> {
		const deleteRequest: DeleteObjectRequest = {
			Bucket: ENV.AWS.IMAGES.BUCKET,
			Key: key
		};
		await this.s3Client.deleteObject(deleteRequest).promise();
	}
}
