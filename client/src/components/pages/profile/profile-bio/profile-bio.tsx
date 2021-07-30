import React from 'react';
import { H5 } from '@blueprintjs/core';
import '../profile.scss';
import { List } from '../list';

interface IProfileBioProps {
	img: string;
	name: string;
	nickname: string;
	clan: string | undefined;
	memberSince: string;
	lastSeen: string;
	gitHub: string | undefined;
	following: number;
	followers: number;
	community: number;
}

export const ProfileBio: React.FC<IProfileBioProps> = (props) => {
	const { img, name, nickname, clan, memberSince, lastSeen, gitHub, following, followers, community } = props;

	const gitHubLink = gitHub ?
		<a href="#" className="link">{gitHub}</a> :
		gitHub;

	const listItems1 = [{name: 'Name', value: nickname}, {name: 'Clan', value: clan}];
	const listItems2 = [{name: 'Member since', value: memberSince}, {name: 'Last seen', value: lastSeen}, {name: 'Profile GitHub', value: gitHubLink}];
	const listItems3 = [{name: 'Following', value: following}, {name: 'Followers', value: followers}, {name: 'Community', value: community}];

	return (
		<>
			<div className="profile-header">
				<img src={img} className="avatar" />
				<H5>{name}</H5>
			</div>
			<div className="fields">
				<List items={listItems1}/>
				<List items={listItems2}/>
				<List items={listItems3}/>
			</div>
		</>
	);
};
