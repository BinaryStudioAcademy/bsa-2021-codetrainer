export interface IMessage {
	id: string;
	user: {
		id: string;
		name: string;
		surname: string;
		clan: {
			id: string;
			name: string;
		};
	};
	task: {
		id: string;
		name: string;
	};
	body: string;
	createdAt: Date;
}
