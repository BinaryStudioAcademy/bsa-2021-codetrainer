import React from 'react'
import {Route , Switch, useRouteMatch} from 'react-router-dom'
import ProfileRouter from './ProfileRouter'
import Stats from './Stats'
import '../../styles/index.scss'
import './profile.scss'
import { ProfileBio } from './ProfileBio';


interface ProfileProps {
    match:{
        params:{
            name: string
        }
    }
}

const mockProfileBioProps = {
    img: 'https://hyperhost.ua/info/storage/avatars/user-ava.png',
    name: 'name',
    nickname: 'nickname',
    clan: 'clan',
    memberSince: '14 jul',
    lastSeen: '13 sep',
    gitHub: 'github link',
    following: 0,
    followers: 0,
    community: 3
}

export const Profile: React.FC<ProfileProps> = (props) => {
    //const userName: string= props.match.params.name;
    const match = useRouteMatch();
    
    return (
        <>
        <div className="profile">
            <div className="profile-bio">
               <ProfileBio {...mockProfileBioProps}/>
            </div>
            <div className="profile-info">
            <ProfileRouter/>
            <Switch>
                <Route path={match.url+"/stats"} exact>
                    <Stats/>
                </Route> 
                <Route path={match.url} exact>
                    <Stats/>
                </Route>
            </Switch>
            </div>
            
        </div>
        
</>
    )
}