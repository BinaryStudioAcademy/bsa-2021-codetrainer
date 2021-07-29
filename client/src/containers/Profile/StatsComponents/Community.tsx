import React from 'react'
import communityIcon from '../../../assets/community.svg'
import '../stats.scss'

const Community: React.FC = () => {
	return (
		<div>
			<div className='header'>
				<img src={communityIcon} id="communityIcon"/>
				<label htmlFor="communityIcon" className="icon-label">Community</label>
			</div>
			<p>
				<span className="field-name">Comments: </span>
				<span className="field-value">0</span>
			</p>
			<p>
				<span className="field-name">Collections: </span>
				<span className="field-value">455</span>
			</p>
			<p>
				<span className="field-name">Transactions: </span>
				<span className="field-value">17</span>
			</p>
		</div>
	);
}

export default Community;