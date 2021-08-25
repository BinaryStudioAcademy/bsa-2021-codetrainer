export interface IMessage {
	id: string;
	user: {
		id: string;
		imageSource?: string;
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
	createdAt: string;
}

export interface IFeedProps {
	messages: IMessage[] | null;
	selectedFeedCategory: string;
	onSelectFeedCategory: (category: string) => void;
	isLastPage: boolean;
}
