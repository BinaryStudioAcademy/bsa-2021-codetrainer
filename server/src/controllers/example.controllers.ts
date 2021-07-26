import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Example } from '../entity/Example';

class ExampleController {
	getExample = async (req: Request, res: Response): Promise<void> => {
		const exampleRepository = getRepository(Example);
		const { name } = req.params;

		try {
			const example: Example = await exampleRepository.findOneOrFail({ where: { name } });
			res.send(example);
		} catch (error) {
			res.status(401).send();
		}
	};
}

export default ExampleController;
