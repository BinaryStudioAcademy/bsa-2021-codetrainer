import { Router } from 'express';
import { ClanApiPath, REQ_TYPE } from '../../common';
import {
	clanAdminPermissionMiddleware,
	clanMemberPermissionMiddleware,
	dataValidationMiddleware,
	SchemasDataValidation,
	checkClanIdMiddleware,
} from '../../middleware';
import { ClanService } from '../../services';
import { IUserFields } from '../../types';

/**
 * @swagger
 * tags:
     - name: Clans
 * components:
 *   schemas:
 *     Clan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The clan's ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The clan's name.
 *           example: Leanne Graham
 *         isPublic:
 *           type: boolean
 *           example: true
 *     ClanInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The clan's name.
 *           example: Leanne Graham
 *         isPublic:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/clans:
 *   get:
 *     tags:
 *       - Clans
 *     summary: Retrieve a list of clans
 *     responses:
 *       200:
 *         description: A list of clans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans:
 *   post:
 *     tags:
 *       - Clans
 *     summary: Create a clan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClanInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans/{id}:
 *   put:
 *     tags:
 *       - Clans
 *     summary: Update a clan
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the clan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClanInput'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans/{id}:
 *   delete:
 *     tags:
 *       - Clans
 *     summary: Delete a clan
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the clan to delete
 *     responses:
 *       204:
 *         description: Deleted
 */

/**
 * @swagger
 * tags:
     - name: Clans
 * components:
 *   schemas:
 *     Clan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The clan's ID.
 *           example: 0
 *         name:
 *           type: string
 *           description: The clan's name.
 *           example: Leanne Graham
 *         isPublic:
 *           type: boolean
 *           example: true
 *     ClanInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The clan's name.
 *           example: Leanne Graham
 *         isPublic:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/clans:
 *   get:
 *     tags:
 *       - Clans
 *     summary: Retrieve a list of clans
 *     responses:
 *       200:
 *         description: A list of clans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans:
 *   post:
 *     tags:
 *       - Clans
 *     summary: Create a clan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClanInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans/{id}:
 *   put:
 *     tags:
 *       - Clans
 *     summary: Update a clan
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the clan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClanInput'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans/{id}:
 *   patch:
 *     tags:
 *       - Clans
 *     summary: Join or leave a clan
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the clan to join/leave
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Updated clan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clan'
 */

/**
 * @swagger
 * /api/clans/{id}:
 *   delete:
 *     tags:
 *       - Clans
 *     summary: Delete a clan
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the clan to delete
 *     responses:
 *       204:
 *         description: Deleted
 */

export const initClan = (appRouter: typeof Router, services: { clan: ClanService }) => {
	const { clan: clansService } = services;
	const router = appRouter();

	router
		.get(ClanApiPath.ROOT, (req, res, next) =>
			clansService
				.getClans(req.body)
				.then((data) => res.send(data))
				.catch(next),
		)
		.get(`${ClanApiPath.ROOT}:id`, clanMemberPermissionMiddleware, (req, res, next) =>
			clansService
				.getClan(req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.post(
			ClanApiPath.ROOT,
			dataValidationMiddleware(SchemasDataValidation.clanFieldsSchema, REQ_TYPE.BODY),
			(req, res, next) =>
				clansService
					.create(req.user, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.put(
			ClanApiPath.ROOT,
			clanAdminPermissionMiddleware,
			dataValidationMiddleware(SchemasDataValidation.clanFieldsSchema, REQ_TYPE.BODY),
			checkClanIdMiddleware,
			(req, res, next) =>
				clansService
					.update(req.clan, req.body)
					.then((data) => res.send(data))
					.catch(next),
		)
		.patch(`${ClanApiPath.ROOT}:id`, (req, res, next) =>
			clansService
				.toggleMember(req.user, req.params.id)
				.then((data) => res.send(data))
				.catch(next),
		)
		.delete(ClanApiPath.ROOT, clanAdminPermissionMiddleware, checkClanIdMiddleware, (req, res, next) =>
			clansService
				.delete(req.clan)
				.then((data) => res.send(data))
				.catch(next),
		);

	return router;
};
