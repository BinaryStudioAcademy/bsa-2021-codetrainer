import React from 'react';
import { Switch } from 'react-router-dom';
import TaskInstructions from 'containers/TaskInstructions';
// import PublicRoute from 'components/PublicRoute';

interface Props {}

const Routing: React.FC<Props> = () => {
	return (
		<Switch>
			{/* <PublicRoute exact restricted={false} path="/" component={Example} /> */}
			<TaskInstructions
				title="Stop gninnipS My sdroW!"
				description="Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed."
				demands={[
					'Strings passed in will consist of only letters and spaces.',
					'Spaces will be included only when more than one word is present.',
				]}
				examples={[
					'spinWords("Hey fellow warriors") => "Hey wollef sroirraw" ',
					'spinWords("This is a test") => "This is a test"',
					'spinWords("This is another test") => "This is rehtona test"',
				]}
				tags={['Algorithms', 'Strings', 'Data Types', 'Formatting', 'Logic']}
			/>
		</Switch>
	);
};

export default Routing;
