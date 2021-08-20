import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class Task1629221348240 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const exampleData = [
			{
				name: 'Sum All Numbers in a Range',
				description: `We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first. 
                
                For example, sumAll([4,1]) should return 10 because sum of all the numbers between 1 and 4 (both inclusive) is 10.`,
				status: 'beta'
			},
			{
				name: 'Diff Two Arrays',
				description: `Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.`,
				status: 'beta'
			},
			{
				name: 'Seek and Destroy',
				description: `You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.`,
				status: 'beta'
			},
			{
				name: 'Wherefore art thou',
				description: `Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

                For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), because it contains the name and its value, that was passed on as the second argument.`,
				status: 'beta'
			},
			{
				name: 'Spinal Tap CasePassed',
				description: `Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.`,
				status: 'beta'
			},
			{
				name: 'Pig Latin',
				description: `Pig Latin is a way of altering English Words. The rules are as follows:
                
                - If a word begins with a consonant, take the first consonant or consonant cluster, move it to the end of the word, and add ay to it.

                - If a word begins with a vowel, just add way at the end.

                Translate the provided string to Pig Latin. Input strings are guaranteed to be English words in all lowercase.`,
				status: 'beta'
			},
			{
				name: 'Search and Replace',
				description: `Perform a search and replace on the sentence using the arguments provided and return the new sentence.

                First argument is the sentence to perform the search and replace on.

                Second argument is the word that you will be replacing (before).

                Third argument is what you will be replacing the second argument with (after).`,
				status: 'beta'
			},
			{
				name: 'DNA Pairing',
				description: `The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.

                Base pairs are a pair of AT and CG. Match the missing element to the provided character.

                Return the provided character as the first element in each array.

                For example, for the input GCG, return [["G", "C"], ["C","G"], ["G", "C"]]

                The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.`,
				status: 'beta'
			},
			{
				name: 'Missing letters',
				description: `Find the missing letter in the passed letter range and return it.

                If all letters are present in the range, return undefined.`,
				status: 'beta'
			},
			{
				name: 'Sorted Union',
				description: `Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

                In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

                The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

                Check the assertion tests for examples.`,
				status: 'beta'
			},
		];
		await getRepository('Task').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> { }
}
