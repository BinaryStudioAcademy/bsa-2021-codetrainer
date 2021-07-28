import React from 'react'
import {  Link,useRouteMatch } from 'react-router-dom'
interface ProfileRouterProps {
    userName:string
}

const ProfileRouter: React.FC<ProfileRouterProps> = (props) => {
    const match = useRouteMatch();
    
    return (
        <>
        <ul>
            <Link to={`${match.url}/stats`}>
                <li>Stats</li>
            </Link>
            <Link to={`${match.url}/stats`}>
                <li>Challenge</li>
            </Link>
            <Link to={`${match.url}/stats`}>
                <li>Solution</li>
            </Link>
            <Link to={`${match.url}/stats`}>
                <li>Social</li>
            </Link>
            <Link to={`${match.url}/stats`}>
                <li>Colections</li>
            </Link>
        </ul>
        
        </>
    )
}
export default  ProfileRouter