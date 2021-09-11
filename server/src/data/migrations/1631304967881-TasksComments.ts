import {getCustomRepository, MigrationInterface, QueryRunner} from "typeorm";
import { UserRepository, TaskRepository, CommentTaskRepository } from '../repositories';

export class tasksComments1631304967881 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tasksRepository = getCustomRepository(TaskRepository);
        const usersRepository = getCustomRepository(UserRepository);

        const exampleData = [
            {
                task: await tasksRepository.findOne({ name: 'Pairs of integers from m to n' }),
                user: await usersRepository.getByEmail('timesofgrace@test.com'),
                body: 'I dont understand, when m = n, it must return [(m, m)]?',
                isLike: true,
            },
            {
                task: await tasksRepository.findOne({ name: 'Pairs of integers from m to n' }),
                user: await usersRepository.getByEmail('perfectcircle@test.com'),
                body: 'This task is over ranked IMHO',
                isLike: true,
            },
            {
                task: await tasksRepository.findOne({ name: 'Pairs of integers from m to n' }),
                user: await usersRepository.getByEmail('thejesu@test.com'),
                body: 'My first completed task yaaay',
                isLike: false,
            },
            {
                task: await tasksRepository.findOne({ name: 'IP Validation' }),
                user: await usersRepository.getByEmail('test@test.com'),
                body: 'I\'m waiting for ip6 validation task)',
                isLike: true,
            },
            {
                task: await tasksRepository.findOne({ name: 'Roman Numerals Encoder' }),
                user: await usersRepository.getByEmail('mouthbreather@test.com'),
                body: '(X)MXXXVII',
                isLike: false,
            },
            {
                task: await tasksRepository.findOne({ name: 'Roman Numerals Encoder' }),
                user: await usersRepository.getByEmail('shellac@test.com'),
                body: 'My favorite number is 30 if you know what I mean...',
                isLike: true,
            },
            {
                task: await tasksRepository.findOne({ name: 'Pyramid Array' }),
                user: await usersRepository.getByEmail('evol@test.com'),
                body: 'Hi, I got memory limit error, how to fix that?',
                isLike: false,
            },
            {
                task: await tasksRepository.findOne({ name: 'Pyramid Array' }),
                user: await usersRepository.getByEmail('panopticon@test.com'),
                body: 'So this is how the Egyptian pyramids were built...',
                isLike: true,
            },
            {
                task: await tasksRepository.findOne({ name: 'Captcha parser' }),
                user: await usersRepository.getByEmail('test@test.com'),
                body: 'How to complete this task if I am a robot?',
                isLike: true,
            },
            {
                task: await tasksRepository.findOne({ name: 'Captcha parser' }),
                user: await usersRepository.getByEmail('test@test.com'),
                body: 'Is it possible to have two digits in a same vertical position? Read from top to bottom in that case?',
                isLike: true,
            },
        ];

		await getCustomRepository(CommentTaskRepository).save(exampleData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
