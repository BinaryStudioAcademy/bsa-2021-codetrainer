import {MigrationInterface, QueryRunner, getRepository, getCustomRepository} from "typeorm";
import { TaskRepository } from "../repositories/task/task-repository";
import { UserRepository } from "../repositories/user/user-repository";
import { Collection } from '../models/collection';
import { Task } from '../models/task';
import { User } from '../models/user';

export class Collections1629800266952 implements MigrationInterface {
    public async up(): Promise<void> {
        const tasksRepository = getCustomRepository(TaskRepository);
        const usersRepository = getCustomRepository(UserRepository);

        const collectionsSeeds: Partial<Collection>[] = await Promise.all(
            [
                {
                    name: 'Arrays',
                    avatar: 'https://codetrainer-images.s3.amazonaws.com/7549d8e3-0a9b-4631-a39c-773e878550e9.svg',
                    author: 'JohnDoe',
                    tasks: [
                        'Sum All Numbers in a Range',
                        'Sorted Union',
                        'Seek and Destroy',
                        'Diff Two Arrays'
                    ],
                    followers: [
                        'JaneDoe',
                        'GilesCorey',
                        'AaronTurner',
                    ],
                },
                {
                    name: 'Strings',
                    avatar: 'https://codetrainer-images.s3.amazonaws.com/04abc36b-bb42-4552-a654-56e21cf39fc3.svg',
                    author: 'JohnDoe',
                    tasks: [
                        'Spinal Tap CasePassed',
                        'Pig Latin',
                        'Search and Replace',
                        'DNA Pairing',
                        'Missing letters',
                    ],
                    followers: [
                        'JakeBlake',
                        'JohnDoe',
                        'KimGordon',
                        'DavidYow',
                    ],
                },
                {
                    name: 'Morse Code',
                    author: 'JaneDoe',
                    tasks: [
                        'Decode Morse I',
                        'Decode Morse II',
                        'Decode Morse III',
                    ],
                    followers: [
                        'SteveAlbini',
                        'JustinBroadrick',
                    ],
                },
                {
                    name: 'Fibonacci Pack',
                    avatar: 'https://codetrainer-images.s3.amazonaws.com/4bf8b705-5f6d-48b0-ac18-4d030467e5cb.svg',
                    author: 'JaneDoe',
                    tasks: [
                        'Fibonacci numbers',
                        'Memoized Fibonacci',
                        'The Millionth Fibonacci'
                    ],
                    followers: [
                    ],
                },
            ]
                .map(async ({ tasks, author, followers, ...collection }) => ({
                    ...collection,
                    author: await usersRepository.getByUsername(author) as User,
                    tasks:
                        (await Promise.all(
                            tasks.map(async name => tasksRepository.findOne({ where: { name } }))
                        )).filter(task => task) as Task[],
                    followers:
                        (await Promise.all(
                            followers.map(async username => (usersRepository.getByUsername(username)))
                        )).filter(follower => follower) as User[],
                }))
        );

		await getRepository('Collection').save(collectionsSeeds);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
