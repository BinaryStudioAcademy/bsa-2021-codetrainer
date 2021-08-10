import callWebApi from '../helpers/call-api.helper';

export async function uploadImage(image: Blob) {
	const formData = new FormData();
	formData.append('image', image);
	await callWebApi({
		method: 'POST',
		endpoint: 'images/upload',
		body: formData,
	});
}
