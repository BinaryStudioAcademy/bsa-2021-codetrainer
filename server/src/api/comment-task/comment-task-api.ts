import { Router } from 'express';
import { REQ_TYPE } from '../../common';
import { CommentTaskService } from '../../services';
import { CommentTaskApiPath } from '../../common/enum/api/comment-task-api-path';
import {
	authorPermissionMiddleware,
	checkCommentTaskIdMiddleware,
	checkTaskIdMiddleware,
	dataValidationMiddleware,
	SchemasDataValidation,
} from '../../middleware';

export const initCommentTask = (appRouter: typeof Router, services: { commentTask: CommentTaskService }) => {
	const { commentTask: commentTaskService } = services;
	const router = appRouter();

	router
		.get(CommentTaskApiPath.ALL, checkTaskIdMiddleware, (req, res, next) =>
			commentTaskService
				.getCommentTasksByTaskId(req.params.id, req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(CommentTaskApiPath.ROOT, (req, res, next) =>
			commentTaskService
				.getAllCommentTasks(req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(
			CommentTaskApiPath.ALL,
			checkTaskIdMiddleware,
			dataValidationMiddleware(SchemasDataValidation.commentTaskFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				commentTaskService
					.create(req.task, req.user, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(CommentTaskApiPath.ONE, checkCommentTaskIdMiddleware, authorPermissionMiddleware, (req, res, next) =>
			commentTaskService
				.remove(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.put(
			CommentTaskApiPath.ONE,
			checkCommentTaskIdMiddleware,
			authorPermissionMiddleware,
			dataValidationMiddleware(SchemasDataValidation.commentTaskFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				commentTaskService
					.update(req.params.id, req.body)
					.then((data) => res.send(data))
					.catch(next),
		);

	return router;
};
