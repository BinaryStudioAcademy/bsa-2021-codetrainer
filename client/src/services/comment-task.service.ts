import { HttpMethods } from 'constants/services';
import { CommentTaskApiPath } from 'enum/api';
import { http } from 'services';
import { WebApi } from 'typings/webapi';

export interface IFetchCommentArgs {
	itemsPerPage: number;
	page: number;
	taskId: string;
}

export const fetchComments = async ({
	page,
	itemsPerPage,
	taskId,
}: IFetchCommentArgs): Promise<{ comments: WebApi.Entities.ICommentTask; numberOfComments: number } | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.GET,
			endpoint: `${CommentTaskApiPath.ROOT}${taskId}`,
			query: {
				take: itemsPerPage,
				skip: (page - 1) * itemsPerPage,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};

export const postComment = async (taskId: string, body: string): Promise<WebApi.Entities.ICommentTask | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.POST,
			endpoint: `${CommentTaskApiPath.ROOT}${taskId}`,
			body: {
				body,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};

export const editComment = async (id: string, body: string): Promise<WebApi.Entities.ICommentTask | Error> => {
	try {
		const response = await http.callWebApi({
			method: HttpMethods.PUT,
			endpoint: `${CommentTaskApiPath.ROOT}${id}`,
			body: {
				body,
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};

export const deleteComment = async (id: string): Promise<void | Error> => {
	try {
		await http.callWebApi({
			method: HttpMethods.DELETE,
			endpoint: `${CommentTaskApiPath.ROOT}${id}`,
		});
	} catch (error) {
		throw error;
	}
};
