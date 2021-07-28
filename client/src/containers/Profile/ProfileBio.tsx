import React from 'react';
import { H5 } from '@blueprintjs/core';
import '../../styles/profile.scss';

interface ProfileBioProps {
	img: string,
	name: string,
	nickname: string,
	clan: string | undefined,
	memberSince: string,
	lastSeen: string,
	gitHub: string | undefined,
	following: number,
	followers: number,
	community: number
}

export const ProfileBio: React.FC<ProfileBioProps> = (props) => {

	const {img, name, nickname, clan,
		memberSince, lastSeen, gitHub,
		following, followers, community} = props;

	return (
		<>
			<div className='profile-header'>
				<img src={img} className='avatar'/>
				<H5>{name}</H5>
			</div>
			<div className='fields'>
				<div>
					<p>
						<span className='field-name'>Name: </span>
						<span className='field-value'>{nickname}</span>
					</p>
					<p>
						<span className='field-name'>Clan: </span>
						<span className='field-value'>{clan}</span>
					</p>
				</div>
				<div>
					<p>
						<span className='field-name'>Member since: </span>
						<span className='field-value'>{memberSince}</span>
					</p>
					<p>
						<span className='field-name'>Last seen: </span>
						<span className='field-value'>{lastSeen}</span>
					</p>
					<p>
						<span className='field-name'>Profile GitHub: </span>
						<span className='field-value'>{gitHub}</span>
					</p>
				</div>
				<div>
					<p>
						<span className='field-name'>Following: </span>
						<span className='field-value'>{following}</span>
					</p>
					<p>
						<span className='field-name'>Followers: </span>
						<span className='field-value'>{followers}</span>
					</p>
					<p>
						<span className='field-name'>Community: </span>
						<span className='field-value'>{community}</span>
					</p>
				</div>
			</div>
		</>
	)
}
