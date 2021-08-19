import { http } from 'services';

export async function uploadImage(image: Blob): Promise<string> {
	const formData = new FormData();
	formData.append('image', image);
	const { href } = await http.callWebApi({
		method: 'POST',
		endpoint: 'images/upload',
		body: formData,
	});
	return href;
}
