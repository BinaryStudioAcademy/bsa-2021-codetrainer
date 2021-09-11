import { getCustomRepository, getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { SOLUTION_STATUS } from '../../common/constants';
import { Solution } from '../models';
import { UserRepository, TaskRepository } from '../repositories';

export class Solutions1631039710974 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const usersRepository = getCustomRepository(UserRepository);
		const tasksRepository = getCustomRepository(TaskRepository);

		const solutionsSeeds: Partial<Solution>[] = await Promise.all(
			[
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Pyramid Array',
					code: `function pyramid(n) {\r\n  const res = [];\r\n  for(let i = 0; i < n; i++){\r\n    res.push([...Array(i+1)].fill(1))\r\n  }\r\n  return res;\r\n}`,
					user: 'taras-dubyk',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Pyramid Array',
					code: `function pyramid(n) {\r\n  const arrayData = [];\r\n  for(let i = 0; i < n; i++){\r\n    arrayData.push([...Array(i+1)].fill(1))\r\n  }\r\n  return arrayData;\r\n}`,
					user: 'kyrylo-burmelov',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Roman Numerals Encoder',
					code: `function solution(number){\r\n const roman = {M:1000,CM:900, D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1 }\r\n\r\n\tvar ans = '';\r\n\twhile(number>0){\r\n\t\tfor(a in roman){\r\n\t\t\tif(roman[a]<=number){ ans += a; number-=roman[a]; break;}\r\n\r\n\t\t}\r\n\t}\r\n\treturn ans;`,
					user: 'myroslav',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Removing Elements',
					code: `function removeEveryOther(arr){\r\n  return arr.filter(function(elem, index) {\r\n    return index % 2 === 0;\r\n  });\r\n}`,
					user: 'myroslav',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Convert string to camel case',
					code: `function toCamelCase(str){\r\n      var regExp=/[-_]\\w/ig;\r\n      return str.replace(regExp,function(match){\r\n            return match.charAt(1).toUpperCase();\r\n       });\r\n}`,
					user: 'myroslav',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Convert string to camel case',
					code: `function toCamelCase(str){\r\n      const regExp=/[-_]\\w/ig;\r\n      return str.replace(regExp,function(match){\r\n            return match.charAt(1).toUpperCase();\r\n       });\r\n}`,
					user: 'taras-dubyk',
				},
				{
					status: SOLUTION_STATUS.COMPLETED,
					task: 'Roman Numerals Decoder',
					code: `function solution(number){\r\n  // convert the number to a roman numeral\r\nvar  roman = {M:1000,CM:900, D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1 }\r\n\r\nvar ans = '';\r\nwhile(number>0){\r\n    for(a in roman){ \r\n        if(roman[a]<=number){ ans += a; number-=roman[a]; break;}\r\n            \r\n    }\r\n}\r\nreturn ans;\r\n}`,
					user: 'kyrylo-burmelov',
				},
			].map(async ({ task, user, ...solution }) => ({
				...solution,
				task: await tasksRepository.findOne({ name: task }),
				user: await usersRepository.getByUsername(user),
			})),
		);

		getRepository(Solution).save(solutionsSeeds);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
