import { Router } from 'express';
import { REQ_TYPE } from '../../common';
import { CommentTaskService } from '../../services';
import { CommentTaskApiPath } from '../../common/enum/api/comment-task-api-path';
import { dataValidationMiddleware, SchemasDataValidation } from '../../middleware';

export const initCommentTask = (appRouter: typeof Router, services: { commentTask: CommentTaskService }) => {
	const { commentTask: commentTaskService } = services;
	const router = appRouter();

	router
		.get(CommentTaskApiPath.ALL, (req, res, next) =>
			commentTaskService
				.getCommentTasks(req.params.id, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(
			CommentTaskApiPath.ROOT,
			dataValidationMiddleware(SchemasDataValidation.commentTaskFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				commentTaskService
					.create(req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(CommentTaskApiPath.ONE, (req, res, next) =>
			commentTaskService
				.remove(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
