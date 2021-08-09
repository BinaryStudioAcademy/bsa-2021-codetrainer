namespace WebApi.Entities {
	interface IExample {
		id: string;
		name?: string;
		email?: string;
	}
	interface IUser {
		id: string;
		name: string;
		lastname: string;
		email: string;
		clan?: string;
		profileClan?: string;
	}
}
