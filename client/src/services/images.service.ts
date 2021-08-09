import { http } from 'services';

export async function uploadImage(image: Blob) {
	const formData = new FormData();
	formData.append('image', image);
	await http.callWebApi({
		method: 'POST',
		endpoint: 'images/upload',
		body: formData,
	});
}
