import React from 'react'
import languagesIcon from '../../../assets/languages.svg'
import '../stats.scss'

interface LanguagesProps {
	languagesTrained: number,
	highestTrained: string,
	mostRecent: string
}

const Languages: React.FC<LanguagesProps> = (props) => {

	const {languagesTrained, highestTrained, mostRecent} = props;

	return (
		<div>
			<div className='header'>
				<img src={languagesIcon} id="languagesIcon"/>
				<label htmlFor="languagesIcon" className="icon-label">Languages</label>
			</div>
			<p>
				<span className="field-name">Total Languages Trained: </span>
				<span className="field-value">{languagesTrained}</span>
			</p>
			<p>
				<span className="field-name">Highest Trained: </span>
				<span className="field-value">{highestTrained}</span>
			</p>
			<p>
				<span className="field-name">Most Recent: </span>
				<span className="field-value">{mostRecent}</span>
			</p>
		</div>
	);
}

export default Languages;