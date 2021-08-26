import { MigrationInterface, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user/user-repository';

export class MoreTasks1629799354371 implements MigrationInterface {
	public async up(): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository);
        const exampleData = [
            {
                name: 'Decode Morse I',
                description: `The Morse code encodes every character as a sequence of "dots" and "dashes". For example, the letter \`A\` is coded as \`·−\`, letter \`Q\` is coded as \`−−·−\`, and digit \`1\` is coded as \`·−−−−\`. The Morse code is case-insensitive, traditionally capital letters are used. When the message is written in Morse code, a single space is used to separate the character codes and 3 spaces are used to separate words. For example, the message \`HEY JUDE\` in Morse code is \`···· · −·−−   ·−−− ··− −·· ·\`.
            
                Your task is to implement a function that would take the morse code as input and return a decoded human-readable string.
            
                NOTE: Extra spaces before or after the code have no meaning and should be ignored.`,
                status: 'beta',
                user: {
                    ...usersRepository.getByEmail('converge@test.com'),
                }
            },
            {
                name: 'Decode Morse II',
                description: `Electric telegraph is operated on a 2-wire line with a key that, when pressed, connects the wires together, which can be detected on a remote station. The Morse code encodes every character being transmitted as a sequence of "dots" (short presses on the key) and "dashes" (long presses on the key).
            
                When transmitting the Morse code, the international standard specifies that:
            
                "Dot" – is 1 time unit long.
                "Dash" – is 3 time units long.
                Pause between dots and dashes in a character – is 1 time unit long.
                Pause between characters inside a word – is 3 time units long.
                Pause between words – is 7 time units long.
            
                However, the standard does not specify how long that "time unit" is. And in fact different operators would transmit at different speed. An amateur person may need a few seconds to transmit a single character, a skilled professional can transmit 60 words per minute, and robotic transmitters may go way faster.
            
                For this challenge we assume the message receiving is performed automatically by the hardware that checks the line periodically, and if the line is connected (the key at the remote station is down), \`1\` is recorded, and if the line is not connected (remote key is up), \`0\` is recorded. After the message is fully received, it gets to you for decoding as a string containing only symbols \`0\` and \`1\`.`,
                status: 'beta',
                user: {
                    ...usersRepository.getByEmail('converge@test.com'),
                }
            },
            {
                name: 'Decode Morse III',
                description: `In this challenge you have to deal with "real-life" scenarios, when Morse code transmission speed slightly varies throughout the message as it is sent by a non-perfect human operator. Also the sampling frequency may not be a multiple of the length of a typical "dot".
                For example, the message \`HEY JUDE\`, that is \`···· · −·−−   ·−−− ··− −··\` · may actually be received as follows:
            
                \`0000000011011010011100000110000001111110100111110011111100000000000111011111111011111011111000000101100011111100000111110011101100000100000\`
            
                As you may see, this transmission is generally accurate according to the standard, but some dots and dashes and pauses are a bit shorter or a bit longer than the others.
            
                Note also, that, in contrast to the previous kata, the estimated average rate (bits per dot) may not be a whole number – as the hypotetical transmitter is a human and doesn't know anything about the receiving side sampling rate.`,
                status: 'beta',
                user: {
                    ...usersRepository.getByEmail('converge@test.com'),
                }
            },
            {
                name: 'Fibonacci numbers',
                description: `Create function fib that returns n'th element of Fibonacci sequence (classic programming task).`,
                status: 'beta',
                user: {
                    ...usersRepository.getByEmail('converge@test.com'),
                }
            },
            {
                name: 'Memoized Fibonacci',
                description: `The Fibonacci sequence is traditionally used to explain tree recursion.
                Classic implementation is so inefficient that the time to calculate any Fibonacci number over 50 is simply too much. You may go for a cup of coffee or go take a nap while you wait for the answer.
                For this challenge we want to implement the memoization solution. This will be cool because it will let us keep using the tree recursion algorithm while still keeping it sufficiently optimized to get an answer very rapidly.`,
                status: 'beta',
                user: {
                    ...usersRepository.getByEmail('converge@test.com'),
                }
            },
            {
                name: 'The Millionth Fibonacci',
                description: `In this challenge you will have to calculate \`n\`'th element of Fibonacci sequence.
                Write an algorithm that can handle \`n\` up to \`2000000\`!
                Your algorithm must output the exact integer answer, to full precision. Also, it must correctly handle negative numbers as input.`,
                status: 'beta',
                user: {
                    ...usersRepository.getByEmail('converge@test.com'),
                }
            },
		];
		await getRepository('Task').save(exampleData);
	}

	public async down(): Promise<void> {}
}
