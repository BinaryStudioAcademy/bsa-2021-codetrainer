import { TaskStatus } from 'typings/common/task';
import { SolutionStatus } from 'typings/common/solution';
import { WebApi } from 'typings/webapi';
import { chain, uniqueId } from 'lodash';
import moment from 'moment';

const usersMocks: WebApi.Entities.IUser[] = [
	{
		username: 'i-does-not-exists',
		name: 'Jane',
		surname: 'Doe',
		email: 'converge@test.com',
		rank: 4,
		honor: 1080,
	},
	{
		username: 'i-does-not-exists-too',
		name: 'John',
		surname: 'Doe',
		email: 'notconverge@test.com',
		rank: 4,
		honor: 1080,
	},
	{
		username: '0xDEADDEAD',
		name: 'Dead',
		surname: 'Inside',
		email: 'DEADDEAD@test.com',
		rank: 2,
		honor: 5432,
	},
].map((user) => ({ id: uniqueId('user'), ...user }));

const tasksMocks: WebApi.Entities.ITask[] = [
	{
		name: 'Five without numbers!',
		rank: 9,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Regular Expression for Binary Numbers Divisible by n',
		rank: 1,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Decode Morse I',
		rank: 7,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Decode Morse II',
		rank: 5,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Decode Morse III',
		rank: 2,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Fibonacci numbers',
		rank: 8,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Perimeter of squares in a rectangle',
		rank: 5,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Memoized Fibonacci',
		rank: 5,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'The Millionth Fibonacci',
		status: TaskStatus.BETA,
		rank: 3,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Assembler interpreter EASY',
		rank: 4,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Assembler interpreter HARD',
		rank: 2,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'A and B?',
		rank: 8,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Predict Math.random',
		rank: 4,
		author: usersMocks[0],
		createdAt: new Date(),
	},
	{
		name: 'Symbolic differentiation of prefix expressions',
		rank: 2,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Regular Expression for Binary Numbers Divisible by n',
		rank: 1,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'BECOME IMMORTAL',
		rank: 1,
		author: usersMocks[1],
		createdAt: new Date(),
	},
	{
		name: 'Brainf*ck transpiler',
		rank: 1,
		author: usersMocks[1],
		createdAt: new Date(),
	},
].map(
	(challenge) =>
		({
			id: uniqueId('task'),
			status: challenge.status || TaskStatus.APPROVED,
			...challenge,
		} as any as WebApi.Entities.ITask),
);

const solutionsMocks: WebApi.Entities.ISolution[] = [
	{
		status: SolutionStatus.COMPLETED,
		code: 'function unusualFive() {\n  return "five!".lenght;\n}',
		language: 'javascript',
		user: usersMocks[0],
		task: tasksMocks[0],
		createdAt: moment().subtract(2, 'days').subtract(4, 'hours').toDate(),
	},
	{
		status: SolutionStatus.COMPLETED,
		code: "#define ONE ('^' == '^')\n\nint unusual_five()\n{\n  return (ONE << ONE << ONE) | ONE;\n}",
		language: 'c',
		user: usersMocks[0],
		task: tasksMocks[0],
		createdAt: moment().subtract(2, 'days').subtract(4, 'hours').toDate(),
	},
	{
		status: SolutionStatus.COMPLETED,
		code: `object MorseDecoder {

  import MorseCodes.morseCodes

  def decodeBits(bits: String): String = {

    //trim zeroes from both directions
    val trimmedBits =
      bits
        .dropWhile (_ == '0')
        .reverse
        .dropWhile(_ == '0')
        .reverse

    //split bits to sequences of '1' or '0'
    val words = "(0+|1+)".r.findAllIn(trimmedBits).toArray

    //time unit is a minimum length of sequences
    val timeUnit: Int = words match {
      case Array() => 0
      case words => words.filter(word => word.nonEmpty).minBy(word => word.length).length
    }

    words.map(word => {
      (word(0), word.length / timeUnit) match {
        case ('1', 1) => "."
        case ('1', 3) => "-"
        case ('0', 7) => "   "
        case ('0', 3) => " "
        case ('0', 1) => ""
      }
    }).mkString("")

  }

  def decodeMorse(message: String): String =
    message
      .split("   ")
      .map(
        _
          .split(' ')
          .map(character => morseCodes(character))
          .mkString("")
      )
      .mkString(" ")

}`,
		language: 'scala',
		user: usersMocks[0],
		task: tasksMocks[3],
		createdAt: moment().subtract(2, 'days').subtract(4, 'hours').toDate(),
	},
	{
		status: SolutionStatus.COMPLETED,
		code: `import scala.collection.mutable.Map

object Fib {

  private val cache = Map(0 -> BigInt(0),1 -> BigInt(1), 2 -> BigInt(1))

  def fib(n: Int): BigInt = {
    if(!cache.contains(n)) {
      if(n < 0) cache.addOne(n, (if((-n + 1) % 2 == 0) 1 else -1) * fib(-n))
      else if(n % 2 == 0) {
        val f1 = fib(n / 2 + 1)
        val f2 = fib(n / 2 - 1)
        cache.addOne(n, f1 * f1 - f2 * f2)
      }
      else {
        val f1 = fib(n / 2)
        val f2 = fib(n / 2 + 1)
        cache.addOne(n, f1 * f1 + f2 * f2)
      }
    }
    cache(n)
  }

}`,
		language: 'scala',
		user: usersMocks[0],
		task: tasksMocks[8],
		createdAt: moment().subtract(2, 'days').subtract(4, 'hours').toDate(),
	},
	{
		status: SolutionStatus.NOT_COMPLETED,
		code: `object MorseDecoderReal {
  
  import MorseCodes.MORSE_CODE
  
  def decodeBitsAdvanced(bits: String): String = {

    val trimmed = bits.dropWhile(_ == '0').reverse.dropWhile(_ == '0').reverse

    val zeros = trimmed.split("1").filter(_.nonEmpty)
    val ones = trimmed.split("0").filter(_.nonEmpty)

    val t = (1 to math.max(zeros.map(_.length).maxOption.getOrElse(0), ones.map(_.length).maxOption.getOrElse(1))).map(t => {
      t -> (zeros.map(z => List[Int](math.abs(z.length - t), math.abs(z.length - 3 * t), math.abs(z.length - 7 * t)).min).sum +
        ones.map(z => List[Int](math.abs(z.length - t), math.abs(z.length - 3 * t)).min).sum)
    })

    val minError = t.minBy(pair => pair._2)._2
    val bestT = t.filter(pair => pair._2 == minError).minByOption(_._1).getOrElse((1, 0))._1
    
    "(0+|1+)".r.findAllIn(trimmed).map(word => {
      (word(0), List(1, 3, 7).map(size => size -> math.abs(word.length - size * bestT)).minBy(_._2)._1) match {
        case ('1', 1) => "."
        case ('1', 3) => "-"
        case ('0', 7) => "   "
        case ('0', 3) => " "
        case ('0', 1) => ""
      }
    }).mkString("")

  }

  def decodeMorse(msg: String): String = {
    msg
      .trim()
      .split("   ")
      .filter(_.nonEmpty)
      .map(word => word.split(" ").map(letter => MORSE_CODE.getOrElse(letter, "")).mkString(""))
      .mkString(" ")
  }
  
}`,
		language: 'scala',
		user: usersMocks[0],
		task: tasksMocks[4],
		createdAt: moment().subtract(2, 'days').subtract(4, 'hours').toDate(),
	},
].map((solution) => ({ id: uniqueId('solution'), ...solution }));

export type TTaskSolutions = {
	task: Partial<WebApi.Entities.ITask>;
	solutions: WebApi.Entities.ISolution[];
};

export const completedSolutionsMocks: TTaskSolutions[] = chain(solutionsMocks)
	.filter((solution) => solution.status === SolutionStatus.COMPLETED)
	.groupBy((solution) => solution.task.id)
	.map((solutions, task) => ({ task: solutions[0].task, solutions }))
	.value();

export const uncompletedSolutionsMocks: TTaskSolutions[] = chain(solutionsMocks)
	.filter((solution) => solution.status === SolutionStatus.NOT_COMPLETED)
	.groupBy((solution) => solution.task.id)
	.map((solutions, task) => ({ task: solutions[0].task, solutions }))
	.value();
