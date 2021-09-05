import { Router } from 'express';
import { CommentSolutionApiPath } from '../../common';
import {
	validationMiddleware,
	checkSolutionIdMiddleware,
	checkCommentSolutionIdMiddleware,
	solutionIdSchema,
	commentSolutionSchema,
	idSchema,
} from '../../middleware';
import { CommentSolutionService } from '../../services';

export const initCommentSolution = (
	appRouter: typeof Router,
	services: { commentSolution: CommentSolutionService },
) => {
	const { commentSolution: commentService } = services;
	const router = appRouter();

	router
		.get(
			CommentSolutionApiPath.ROOT,
			validationMiddleware([solutionIdSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) =>
				commentService
					.getComments(req.solution)
					.then((data) => res.send(data))
					.catch(next),
		)
		.get(
			CommentSolutionApiPath.$ID,
			validationMiddleware([idSchema, solutionIdSchema]),
			checkSolutionIdMiddleware,
			checkCommentSolutionIdMiddleware,
			(req, res) => {
				res.send({ commentSolution: req.commentSolution });
			},
		)
		.post(
			CommentSolutionApiPath.ROOT,
			validationMiddleware([solutionIdSchema, commentSolutionSchema]),
			checkSolutionIdMiddleware,
			(req, res, next) =>
				commentService
					.create({ user: req.user, solution: req.solution, ...req.validData })
					.then((data) => res.send(data))
					.catch(next),
		)
		.put(
			CommentSolutionApiPath.$ID,
			validationMiddleware([idSchema, solutionIdSchema, commentSolutionSchema]),
			checkSolutionIdMiddleware,
			checkCommentSolutionIdMiddleware,
			(req, res, next) =>
				commentService
					.update({ user: req.user, comment: req.commentSolution, ...req.validData })
					.then((data) => res.send(data))
					.catch(next),
		)
		.delete(
			CommentSolutionApiPath.$ID,
			validationMiddleware([idSchema, solutionIdSchema]),
			checkSolutionIdMiddleware,
			checkCommentSolutionIdMiddleware,
			({ user, commentSolution, solution }, res, next) =>
				commentService
					.delete({ user, comment: commentSolution, solution })
					.then((data) => res.send(data))
					.catch(next),
		);

	return router;
};
