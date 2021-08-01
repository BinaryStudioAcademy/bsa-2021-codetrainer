export interface IMessage {
	id: string;
	userImageSource: string;
	userName: string;
	clan: string;
	date: string;
	text: string;
}

export interface IFeedProps {
	messages: IMessage[];
}
