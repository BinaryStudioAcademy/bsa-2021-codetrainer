import React from 'react'
import communityIcon from '../../../assets/community.svg'
import '../stats.scss'

interface CommunityProps {
	comments: number,
	collections: number,
	transactions: number
}

const Community: React.FC<CommunityProps> = (props) => {

	const {comments, collections, transactions} = props;

	return (
		<div>
			<div className='header'>
				<img src={communityIcon} id="communityIcon"/>
				<label htmlFor="communityIcon" className="icon-label">Community</label>
			</div>
			<p>
				<span className="field-name">Comments: </span>
				<span className="field-value">{comments}</span>
			</p>
			<p>
				<span className="field-name">Collections: </span>
				<span className="field-value">{collections}</span>
			</p>
			<p>
				<span className="field-name">Transactions: </span>
				<span className="field-value">{transactions}</span>
			</p>
		</div>
	);
}

export default Community;