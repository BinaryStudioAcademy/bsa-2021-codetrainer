import React from 'react';

export const detailsData = {
	instructions: (
		<div className="task-instructions">
			<p>
				Write a function that takes in a string of one or more words, and returns the same string, but with all
				five or more letter words reversed.
			</p>
			<ul>
				<li>Strings passed in will consist of only letters and spaces.</li>
				<li>Spaces will be included only when more than one word is present.</li>
			</ul>
			<h3>Examples:</h3>
			<div className="example">
				<p>{`spinWords("Hey fellow warriors") => "Hey wollef sroirraw"`}</p>
				<p>{`spinWords("This is a test") => "This is a test"`}</p>
				<p>{`spinWords("This is another test") => "This is rehtona test"`}</p>
			</div>
			<div className="tags">
				<a>Algorithms</a>
				<a>Strings</a>
				<a>Data Types</a>
				<a>Formatting</a>
				<a>Logic</a>
			</div>
		</div>
	),
	output: <div>Output</div>,
};

export const mockData = {
	title: 'Stop gninnipS My sdroW!',
	favorites: 500,
	rating: 88,
	createdBy: { name: 'Emerson Saris', href: '#' },
	rank: 6,
};
