import React from 'react'
import languagesIcon from '../../../assets/languages.svg'
import '../../../styles/stats.scss'

const Languages: React.FC = () => {
	return (
		<div>
			<div className='header'>
				<img src={languagesIcon} id="languagesIcon"/>
				<label htmlFor="languagesIcon" className="iconLabel">Languages</label>
			</div>
			<p>
				<span className="field-name">Total Languages Trained: </span>
				<span className="field-value">0</span>
			</p>
			<p>
				<span className="field-name">Highest Trained: </span>
				<span className="field-value">455</span>
			</p>
			<p>
				<span className="field-name">Most Recent: </span>
				<span className="field-value">JS</span>
			</p>
		</div>
	);
}

export default Languages;