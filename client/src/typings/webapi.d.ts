namespace WebApi.Entities {
	interface IExample {
		id: string;
		name?: string;
		email?: string;
	}
	interface IUser {
		id: string;
		username: string;
		name: string;
		surname: string;
		email: string;
		clan?: string;
		profileClan?: string;
	}
}
