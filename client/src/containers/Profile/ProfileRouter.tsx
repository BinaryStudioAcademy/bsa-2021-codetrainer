import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import {Menu, MenuItem} from '@blueprintjs/core'
import '../../styles/index.scss'
interface ProfileRouterProps {
    userName:string
}

const ProfileRouter: React.FC<ProfileRouterProps> = (props) => {
    const match = useRouteMatch();
    
    return (
        <Menu className="navmenu">
            <MenuItem href={match.url+"/stats"} className="navmenu-item active" text="Stats"></MenuItem>
            <MenuItem href={match.url+"/stats"} className="navmenu-item" text="Challenge"></MenuItem>
            <MenuItem href={match.url+"/stats"} className="navmenu-item" text="Solution"></MenuItem>
            <MenuItem href={match.url+"/stats"} className="navmenu-item" text="Social"></MenuItem>
            <MenuItem href={match.url+"/stats"} className="navmenu-item" text="Colections"></MenuItem>
        </Menu>
    )
}
export default  ProfileRouter