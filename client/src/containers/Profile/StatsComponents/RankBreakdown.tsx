import React from 'react'
import rankBreakdownIcon from '../../../assets/rankBreakdown.svg'
import '../../../styles/rankBreakdown.scss'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

const RankBreakdown: React.FC = () => {
    const percentage = 25;

    return (
        <div className="rank-breakdown">
            <div className='header'>
                <img src={rankBreakdownIcon} id="rankBreakdownIcon"/>
                <label htmlFor="rankBreakdownIcon" className="iconLabel">Rank Breakdown</label>
            </div>
            <div style={{width: "150px"}}> 
            <CircularProgressbarWithChildren
                    className='circular-progressbar'
                    value={percentage}
                    strokeWidth={5}
                    styles={buildStyles(circularProgressBarStyles)}
                >

                <strong className="circularProgress" style={{fontSize: "16px",paddingBottom: "50px"}}>Next Rank</strong>
                </CircularProgressbarWithChildren>
            </div>
            <div className="progress-circle-info">
                <strong>Overall: </strong><span>8</span>ran/<span>10</span>%
            </div>
        </div>
        )
}
export default RankBreakdown;

const circularProgressBarStyles = {
     strokeLinecap: 'butt',
    textSize: '14px',
    // pathTransitionDuration: 0.5,
    pathColor: `#ec4179`,
    // textColor: '#f88',
    trailColor: '#F0F3F9',
    backgroundColor: '#F0F3F9',
}